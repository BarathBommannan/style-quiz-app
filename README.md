👕 Style Quiz – Fashion Recommendation App

A mobile-first fashion recommendation app built using Expo (React Native), FastAPI, and machine learning.
Users answer a visual like/dislike quiz, and the app generates personalized outfit recommendations with confidence scores and natural-language explanations using a locally hosted LLM (Ollama).


## 🎥 Demo Video

Short walkthrough of the app:

[▶️ Watch Demo Video](./OutputVideo.mp4)


✨ Features

Gender-based visual quiz

Like / dislike interaction using heart icons

Preference aggregation from quiz responses

ML-based recommendation scoring (TF-IDF + Logistic Regression)

Natural-language explanations using a local LLM (Ollama)

Clean, modern UI built with Expo

Fully runnable locally for demo purposes

🧠 Tech Stack

Frontend: Expo (React Native), expo-router, Ionicons

Backend: FastAPI (Python)

ML: TF-IDF + Logistic Regression

LLM: Ollama (llama3.1:8b – runs locally)

Communication: REST API over local network

🚀 How to Run the Project
⚠️ Important: Update Your Local IP Address

Before running the app, update your local machine IP in the frontend.

File:
app/loading.tsx

Update this line:

const res = await fetch("http://192.168.1.10:8000/recommend", {


➡️ Replace 192.168.1.10 with your current local IP address
(use ipconfig on Windows or ifconfig on macOS/Linux)

This allows the Expo app to communicate with the backend over WiFi.

1️⃣ Install Ollama

Download and install Ollama from:
👉 https://ollama.com

Verify installation:

ollama --version

2️⃣ Download the LLM Model (One-Time Setup)
ollama run llama3.1:8b


📦 Note:

Downloads ~4GB

Required only once

Model is reused on future runs

3️⃣ Start the Frontend (Expo App)

From the project root folder, run:

npm install
npm start

or

npx expo start

Open the app using Expo Go on your mobile device

Ensure your phone and laptop are on the same WiFi network

4️⃣ Start the Backend (FastAPI)

Open a new terminal, navigate to the backend folder:

cd backend

Run the server:

uvicorn main:app --host 0.0.0.0 --port 8000 --reload


Backend will be available at:

http://<YOUR_LOCAL_IP>:8000

5️⃣ Start Ollama (If Needed)

Ollama usually runs automatically. To verify:

ollama list

🔄 Application Flow

1. User selects gender

2. User likes/dislikes outfit images

3. Preferences are sent to the backend

4. ML model scores recommendations

5. Ollama generates human-like explanations

6. Results are displayed with:

      Product image

      Match explanation

      Confidence score