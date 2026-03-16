export interface JobSuggestion {
  job_title: string;
  confidence: number;
  required_skills: string;
  job_description?: string;
}