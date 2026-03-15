import type { JobSuggestion } from "./jobSuggestion";

export interface PredictionResponse {
  filename: string;
  extracted_skills: string[];
  suggestions: JobSuggestion[];
}