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
    const prompt = `Solve the coding challenge, using Python3:
    \`\`\`${question}\`\`\`
    Your solution must match this function signature:
    \`\`\`${signature}\`\`\`
    Do not include comments in your solution. Make sure your code passes all test cases, is readable, and is efficient.
    `;

    // console.log(prompt);

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
