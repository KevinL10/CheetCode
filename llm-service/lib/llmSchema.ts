/**
 * The schema for a problem solution.
 *
 */

/**
 * Language is the programming language used.
 *
 * Function header and body separate the signature from the implementation for
 * easier printing.
 */
export interface LlmResponse {
    language: "python3" | "javascript";
    functionHeader: string;
    functionBody: string;
}
