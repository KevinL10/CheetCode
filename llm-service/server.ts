import server from "bunrest";
import { BunRequest } from "bunrest/src/server/request";
import { createPrompt, llm } from "./lib/llm";

const app = server();
const cors = require('cors');
app.use(cors({
    origin: '*'
}));


/**
 * Get the server status.
 *
 * @returns {void}
 */
app.get("/", (req, res) => {
    res.status(200).json({ message: "ok" });
});

interface Question extends BunRequest {
    body?:
        | {
              question: string;
              signature: string;
          }
        | string
        | { [key: string]: any };
}

/**
 * Solve the given problem, and feed it into the Python executable.
 *
 * @returns {void}, after a while
 */
app.post("/solution", async (req: Question, res) => {
    if (
        !req.body ||
        typeof req.body === "string" ||
        !req.body?.question ||
        !req.body?.signature
    ) {
        res.status(400).json({ message: "Bad request" });
        return;
    }

    const { question, signature } = req.body;
    const prompt = createPrompt(question, signature);

    console.log(prompt)
    const response = await llm.translate(prompt);

    console.log(response)
    fetch('http://10.33.133.156:5000/activate', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            code: response
        })
    }).then((response) => {
        console.log(response);
    })

    if (!response.success) {
        console.log(response.message);

        res.status(500).json({
            message:
                "LLM failed to produce a result; perhaps you've hit the rate limit?",
        });

        return;
    }

    res.status(200).json({
        message: "ok",
        ...response.data,
    });
});

app.listen(3000);

console.log({ ...process.env });
console.log(`Listening on http://localhost:3000...`);
