/**
 * The interface for varying LLMs.
 */

import dotenv from "dotenv";
import fs from "fs";
import path from "path";

import { createJsonTranslator, createLanguageModel } from "typechat";

import { ExplanationResponse, SolutionResponse } from "./llmSchema";

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
export const createSolutionPrompt = (
    question: string,
    signature: string,
): string => {
    const prompt = `Solve the coding challenge, using Python3:

    \`\`\`${question}\`\`\`

    Your solution must match this function signature:

    \`\`\`${signature}\`\`\`

    Do not include comments in your solution. Make sure your code passes all test cases, is readable, and is efficient.
    `;

    // console.log(prompt);

    return prompt;
};

export const createExplanationPrompt = (question: string): string => {
    const prompt = `Explain a solution to the following coding challenge in plain English.

    \`\`\`${question}\`\`\`
    `;

    return prompt;
};

const model = createLanguageModel(process.env);
const schema = fs.readFileSync(
    path.join(process.cwd(), "lib", "llmSchema.ts"),
    "utf8",
);

export const solutionLlm = createJsonTranslator<SolutionResponse>(
    model,
    schema,
    "SolutionResponse",
);

export const explanationLlm = createJsonTranslator<ExplanationResponse>(
    model,
    schema,
    "ExplanationResponse",
);
