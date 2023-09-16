/**
 * The schema for a problem solution.
 */

export interface LlmResponse {
    // Metadata about the problem, solution
    language: "python3" | "javascript";

    // The actual solution (broken into signature, implementation)
    functionHeader: string;
    functionBody: string;

    // TODO: helpers? Or prompt model to implement helpers as nested functions?
}
