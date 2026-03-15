# TechFit: Resume-to-Career Matcher

TechFit is a personal project built to help people see where their skills fit in the tech industry. It takes a resume file, analyzes the text, and suggests the top three job roles that match the user's experience.


<img src="frontend/images/techfit-preview.png" width="1100">

<br/>

## Project Description

I built this app because I kept asking myself a simple question:

**“Where do my skills actually fit in tech?”**

Am I leaning more toward **Cybersecurity? Software Engineering? Or ML/AI?**

Sometimes your skills are a mix of many things — a bit of security, some programming, maybe some AI — and it’s not always obvious which direction they point to. Instead of just guessing, I decided to **build a tool that could analyze it.**

This project is a **full-stack application** built with a **React frontend** and a **FastAPI backend**. It uses a **machine learning model** to analyze a resume and classify it into different tech roles based on the skills and experiences listed.

The goal is simple:

> **Based on your skills, what tech role do you most likely fit into?**

I built this because I experienced the same confusion myself. If you're also exploring different paths in tech and wondering where your skills might fit, this tool might help you figure it out.

<br/>

### How it Works

1. **Text Extraction:** When a user uploads a PDF or TXT resume, the backend reads the document and cleans the text.
2. **Machine Learning:** I used a **Random Forest** classifier for the intelligence. This model was trained on a dataset of resumes and job categories. It looks for keywords and patterns to determine which role fits best.
3. **Real-time Results:** The frontend sends the file to the backend, waits for the Random Forest model to finish its prediction, and then displays the results with a confidence score.

<br/>

## Future Improvements
* **Manual Skill Entry:** Add a "Build Profile" mode for users without a resume, allowing them to select skills from a predefined list to receive role matches.
* **Personalized Roadmaps:** Compare extracted skills against target role requirements to generate a step-by-step learning path.
* **Skill Gap Analysis:** Highlight specific "missing" skills that would significantly increase the match percentage for a specific role.
* **Exportable Reports:** Allow users to download their matches and roadmaps as a clean PDF summary.

---

**Developed by Rasheed Gavin** *Learning project focused on Machine Learning integration.*
