# TechFit: Resume-to-Career Matcher

TechFit is a personal project built to help people see where their skills fit in the tech industry. It takes a resume file, analyzes the text, and suggests the top three job roles that match the user's experience.

## Project Description

I built this app to solve a simple problem: figuring out which tech career path to take based on your current resume. The app is a full-stack project consisting of a React frontend and a FastAPI backend. It uses a machine learning model to categorize resumes into different tech roles.

### How it Works

1. **Text Extraction:** When a user uploads a PDF or TXT resume, the backend reads the document and cleans the text.
2. **Machine Learning:** I used a **Random Forest** classifier for the intelligence. This model was trained on a dataset of resumes and job categories. It looks for keywords and patterns to determine which role fits best.
3. **Real-time Results:** The frontend sends the file to the backend, waits for the Random Forest model to finish its prediction, and then displays the results with a confidence score.

## Tech Stack

### Frontend
* **React 19 & TypeScript:** For building the UI and ensuring type safety.
* **Vite:** For a fast development environment.

### Backend
* **FastAPI:** A Python framework used to handle the API requests.
* **Scikit-Learn:** Used to implement the **Random Forest** model and handle text vectorization.
* **Python:** The core language for data processing and the ML pipeline.

## Future Improvements
* **Manual Skill Entry:** Add a "Build Profile" mode for users without a resume, allowing them to select skills from a predefined list to receive role matches.
* **Personalized Roadmaps:** Compare extracted skills against target role requirements to generate a step-by-step learning path.
* **Skill Gap Analysis:** Highlight specific "missing" skills that would significantly increase the match percentage for a specific role.
* **Exportable Reports:** Allow users to download their matches and roadmaps as a clean PDF summary.

## Installation

### To run the Frontend:
1. Go to the frontend folder.
2. Install packages: `npm install`
3. Start the app: `npm run dev`

### To run the Backend:
1. Go to the backend folder.
2. Install Python libraries: `pip install -r requirements.txt`
3. Start the server: `uvicorn main:app --reload`

---

**Developed by Rasheed Gavin** *Learning project focused on Machine Learning integration.*
