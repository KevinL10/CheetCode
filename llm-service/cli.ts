import { stdin as input, stdout as output } from "node:process";
import * as readline from "node:readline/promises";
import { createPrompt, llm } from "./lib/llm";

const rl = readline.createInterface({ input, output });

const read = async (prompt: string) => {
    return rl.question(prompt);
};

const write = (text: string) => {
    console.log(text);
};

/**
 * Expects the user to input the question prompt and then the function signature.
 *
 * Returns the LLMs solution.
 */
const cli = async (): Promise<undefined> => {
    const question = await read("");
    console.log(`The question is ${question}`);

    const signature = await read("");
    console.log(`The function signature is ${signature}`);

    const prompt = createPrompt(question, signature);

    const response = await llm.translate(prompt);

    if (!response.success) {
        console.log(response.message);
        process.exit(1);
    }

    console.log(`The programming language is ${response.data.language}`);

    write(response.data.functionHeader);
    write(response.data.functionBody);

    // TODO(michaelfromyeg): call the Python keylogger

    process.exit(0);
};

cli();
