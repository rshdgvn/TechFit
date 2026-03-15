import axios from 'axios';
import type { PredictionResponse } from '../types/predictionResponse';
import { API_URL } from '../utils/config';


export const analyzeResume = async (file: File): Promise<PredictionResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await axios.post<PredictionResponse>(`${API_URL}/predict`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error uploading the resume:", error);
    throw new Error("Failed to analyze resume. Make sure the backend is running!");
  }
};