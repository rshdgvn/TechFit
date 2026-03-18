import axios from 'axios';
import type { PredictionResponse } from '../types/predictionResponse';
import { API_URL } from '../utils/config';
import type { ManualProfilePayload } from '../types/manualProfilePayload';

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
  } catch (error: any) {
    console.error("Error uploading the resume:", error);
  
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }

    throw new Error("Techfit couldn’t process your resume right now. Please try again.");
  }
};

export const analyzeManualProfile = async (payload: ManualProfilePayload): Promise<PredictionResponse> => {
  try {
    const response = await axios.post<PredictionResponse>(`${API_URL}/match-profile`, payload, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error: any) {
    console.error("Error analyzing manual profile:", error);
  
    if (error.response?.data?.error) {
      throw new Error(error.response.data.error);
    }

    throw new Error("Techfit couldn’t process your profile right now. Please try again.");
  }
};