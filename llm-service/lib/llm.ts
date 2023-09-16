/**
 * The interface for varying LLMs.
 */

import dotenv from "dotenv";
import fs from "fs";
import path from "path";

import { createJsonTranslator, createLanguageModel } from "typechat";

import { LlmResponse } from "./llmSchema";

dotenv.config({ path: ".env" });

/**
 * Format a prompt.
 *
 * TODO(michaelfromyeg): language support.
 *
 * @param {string} question
 * @param {string} signature
 * @returns {string}
 */
export const createPrompt = (question: string, signature: string): string => {
    const prompt = `You are an expert competitive programmer. You write efficient code. You are currently in a technical interview.

    Output the solution to the following programming question. Only output code. Do not output any explanatory comments. The function should be written in Python3. Every line output should be valid Python3. Here is your problem:

    ${question}

    Your solution must match this function signature:

    ${signature}

    Make sure to think of common test cases and edge cases. Your solution should be as efficient as possible. Good luck!
    `;

    console.log(prompt);

    return prompt;
};

const model = createLanguageModel(process.env);
const schema = fs.readFileSync(
    path.join(process.cwd(), "lib", "llmSchema.ts"),
    "utf8",
);

export const llm = createJsonTranslator<LlmResponse>(
    model,
    schema,
    "LlmResponse",
);
