# 🛡️ CyberShield – Your Shield Against Cyber Fraud

[![Status](https://img.shields.io/badge/status-live-brightgreen.svg)](https://cyber-safety-platform-hibx.vercel.app/)

> **An innovative cyber safety platform designed to protect every Indian — from students to seniors — against online threats, frauds, and scams.**

---

## 🌐 Live Demo

**👉 [Visit CyberShield Now](https://cyber-safety-platform-hibx.vercel.app/)**

---

## 📌 Overview
**CyberShield** is a community-driven cybersecurity platform that offers:
- Scam detection using ML models
- Educational resources for safe internet practices
- Real-time alerts
- Anonymous scam reporting
- A reputation-based feedback system
- Chatbot assistance for cyber queries

Tailored for all demographics across India — senior citizens, students, homemakers, professionals, and rural users — CyberShield empowers every citizen to take control of their digital safety.

---

## ✨ Key Features

- 🧠 **AI-Powered Scam Detector** – Detect fraudulent messages and links in real-time  
- 🗣️ **ChatBot Assistance** – Instantly answer queries related to cyber threats  
- 📰 **CyberShield Feed** – Latest news and scam alerts across regions  
- 👥 **Community Reputation System** – Crowd-sourced scam reporting with public verification  
- 🧪 **Interactive Learning Modules** – Quizzes, short videos, and localized content  
- 🔐 **User Authentication** – Secure login/signup  
- 🕵️ **Anonymous Reporting** – Submit reports without identity exposure  

---

## 🎯 Built For

| User Segment        | Benefits                                                                 |
|---------------------|--------------------------------------------------------------------------|
| 👴 Senior Citizens   | Voice-friendly, jargon-free alerts and scam detection guides             |
| 🎓 Students          | Cyber awareness through interactive learning                             |
| 🏡 Homemakers        | Real-world tips on avoiding online fraud in shopping and payments         |
| 💼 Professionals     | Data security insights, phishing detection for workplace safety           |
| 🧑‍🌾 Rural Users      | Low-bandwidth support, regional language content for mobile/banking frauds |

---
## ⚙️ Architecture and Workflow
The project is structured with a modular design, separating the frontend, backend API, and machine learning models into distinct, manageable components. The following diagrams illustrate the key workflows.
### Frontend
<img width="1166" height="618" alt="Screenshot 2025-08-23 151356" src="https://github.com/user-attachments/assets/ddccc92a-79a3-43bb-a547-962bbdc4986d" />


### Backend

<img width="1300" height="568" alt="Screenshot 2025-08-23 151406" src="https://github.com/user-attachments/assets/c0d5072f-07ec-4981-9508-5823a8ad3864" />

### Chatbot Workflow
The core logic of the application follows a clear path from user input to final response. The process includes a crucial step for data sanitization before a response is generated.
## Chatbot Workflow

<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/53ac2f81-184b-4bae-8fa1-140ee8118281" />
### Text Detection Workflow
This machine learning pipeline is responsible for identifying and cleaning various forms of sensitive information from the raw text input.
## Machine learning model 1 - text detection  Workflow

<img width="1039" height="571" alt="image" src="https://github.com/user-attachments/assets/76a2037d-0667-43fd-948b-f33c680a9e9c" />
### Phone Detection Workflow
A specialized, rule-based model is used for the quick and accurate detection of phone numbers, ensuring this common form of PII is handled effectively.
## Machine learning model 2 - phone detection  Workflow

<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/213e7e37-68b9-4cce-bcb3-dcc0d56501d2" />
### API to Deployment Workflow
The backend API is designed for modern, serverless deployment. It is first developed locally and then packaged for deployment on AWS Lambda, with automatically generated API documentation.#

## API generation from local to deployment


<img width="1536" height="1024" alt="image" src="https://github.com/user-attachments/assets/dca39c33-a9e3-40ac-950e-1d0079ba1c69" />


