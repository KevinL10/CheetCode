/**
 * The interface for varying LLMs.
 */

import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(__dirname, "../.env") });

const model = createLanguageModel(process.env);
const schema = fs.readFileSync(
  path.join(__dirname, "sentimentSchema.ts"),
  "utf8",
);
const translator = createJsonTranslator<SentimentResponse>(
  model,
  schema,
  "SentimentResponse",
);
