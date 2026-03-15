import re
import string

def clean_resume_text(text: str) -> str:
    text = text.lower()
    text = re.sub(r'http\S+\s*', ' ', text)
    text = re.sub(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b', ' ', text)
    text = re.sub(r'[%s]' % re.escape(string.punctuation), ' ', text)
    text = re.sub(r'[^\x00-\x7f]', r' ', text)
    text = re.sub(r'\s+', ' ', text).strip()
    return text

def extract_skills(text: str, known_skills_list: list) -> list:
    detected = []
    text_lower = text.lower()
    
    for skill in known_skills_list:
        skill_lower = skill.lower()
        
        if any(c in skill_lower for c in ['+', '#', '.']):
            pattern = r'(?<![a-z0-9])' + re.escape(skill_lower) + r'(?![a-z0-9])'
        else:
            pattern = r'\b' + re.escape(skill_lower) + r'\b'
            
        if re.search(pattern, text_lower):
            detected.append(skill)
            
    return list(set(detected))