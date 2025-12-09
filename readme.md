# AI-Powered Daily Time Tracking & Analytics Dashboard

Short description: Log daily activities in minutes, analyze daily time allocation with charts and AI insights.

## Live demo
<add deployed link>

## Video walkthrough
<add YouTube/Drive link (2–5 min)>

## Features
- Firebase Authentication (Email + Google)
- Date-based activity logging (title, category, minutes)
- Daily minutes validation (≤1440)
- Add / edit / delete activities
- Date-based analytics: Pie + Bar charts
- Friendly "No data available" screen
- AI analysis that summarizes the day and gives suggestions

## Tech stack
- HTML, CSS, JavaScript
- Firebase Authentication & Firestore
- Chart.js for charts
- OpenAI (or Google Gemini) for AI insights

## How to run locally
1. Clone repo
2. Open folder and replace `firebase.js` config with your Firebase values
3. If using AI, create serverless function and set API key there; set `ai.js` to call your serverless endpoint
4. Open `index.html` in browser or use a simple static server

## Firebase structure
`users/{uid}/days/{YYYY-MM-DD}/activities/{activityId}`

## How I used AI
- Used OpenAI/Gemini for summarizing day & suggestions. (Explain prompts & screenshots here.)

## Future improvements
- Better timeline visualization, weekly analytics, PDF export, mobile UI polish.
