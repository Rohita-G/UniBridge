# UniBridge

# UniBridge – Your Career Companion

UniBridge is a full-stack AI-powered web platform designed to help university students discover personalized project ideas and relevant internship opportunities based on their interests and skills.

## 🌟 Features

### 🔍 AI Project Recommendation

* Input your domain, skill level, preferred tools, and constraints.
* Receive 3 detailed project ideas instantly.
* Ask for more suggestions or similar projects.

### 🌐 Internship Finder

* Enter your preferred domain, location, and timeframe.
* Get real-time internship listings scraped from trusted sites.
* Instantly see job title, company, location, and application link.

---

## 🧱 Tech Stack

| Layer     | Technology                     |
| --------- | ------------------------------ |
| Frontend  | React.js + Tailwind CSS        |
| Backend   | Java (Spring Boot optional)    |
| AI Engine | Python (OpenAI / GPT-2)        |
| Scraper   | Python (Playwright/Scrapy)     |
| Database  | Not integrated yet             |
| Hosting   | TBD (Render / Vercel / Heroku) |

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/unibridge.git
cd unibridge
```

### 2. Start Frontend (React)

```bash
cd client
npm install
npm start
```

### 3. Start Backend (Java)

```bash
cd server
# Use your Java IDE or CLI to run the backend
```

### 4. Start AI Engine (Python)

```bash
cd ai
python generateIdeas.py
```

### 5. Start Internship Scraper (Python)

```bash
cd scraper
python scrapeJobs.py
```

---

## 📁 Folder Structure

```
UniBridge/
├── client/            # React frontend
├── server/            # Java backend
├── ai/                # Python AI logic
├── scraper/           # Internship scraper
├── README.md
├── project-handover.md
```

---

## 📌 Future Improvements

* Add user authentication
* Integrate database for saving results
* Improve AI project accuracy
* Add mobile version (React Native / Expo)

