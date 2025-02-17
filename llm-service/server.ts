import server from "bunrest";
import { BunRequest } from "bunrest/src/server/request";
import { emailInstructions } from "./email";
import {
    createExplanationPrompt,
    createSolutionPrompt,
    explanationLlm,
    solutionLlm,
} from "./lib/llm";

const app = server();
const cors = require("cors");

app.use(
    cors({
        origin: "*",
    }),
);

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

    const solutionPrompt = createSolutionPrompt(question, signature);
    const solutionResponse = await solutionLlm.translate(solutionPrompt);

    console.log(solutionResponse);

    if (!solutionResponse.success) {
        console.log(solutionResponse.message);

        res.status(500).json({
            message:
                "LLM failed to produce a solution result; perhaps you've hit the rate limit?",
        });

        return;
    }

    try {
        await fetch("http://10.33.133.156:5000/activate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                code: solutionResponse,
            }),
            signal: AbortSignal.timeout(5000),
        });
    } catch (error) {
        console.error(error);
    }

    const explanationPrompt = createExplanationPrompt(question);
    const explanationResponse =
        await explanationLlm.translate(explanationPrompt);

    console.log(explanationResponse);

    if (!explanationResponse.success) {
        console.log(explanationResponse.message);

        res.status(500).json({
            message:
                "LLM failed to produce an explanation result; perhaps you've hit the rate limit?",
        });

        return;
    }

    await emailInstructions(explanationResponse.data.explanation);

    res.status(200).json({
        message: "ok",
        ...solutionResponse.data,
    });
});

app.listen(3000);

console.log({ ...process.env });
console.log(`Listening on http://localhost:3000...`);
