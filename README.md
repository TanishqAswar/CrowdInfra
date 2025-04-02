# CrowdInfra: Powering Smart Infrastructure Through Community Demand

## 📌 Overview
CrowdInfra is a crowdsourced demand-mapping platform that empowers communities to influence infrastructure development. Users can pin locations where essential services are needed, upvote demands, and help businesses and policymakers make data-driven decisions.

## 🚀 Features
- **Community-Driven Demand Mapping** – Users can pin locations and upvote service requests (e.g., hospitals, ATMs, banks, canteens).
- **AI-Powered Insights** – Uses Google Gemini API to analyze market competition, demand trends, and feasibility.
- **Real-Time Analytics** – Provides businesses and policymakers with up-to-date demand data.
- **Property Marketplace** – Property owners can list spaces, and businesses can discover high-demand locations.
- **Interactive Map** – Uses Google Maps API for visualization of demand hotspots and property listings.
- **User Engagement** – Users can comment on demands and share requests within their network.

## 🛠️ Tech Stack
- **Frontend:** Next.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **AI Integration:** Google Gemini API
- **Mapping:** Google Maps API

## 📥 Installation & Setup
1. **Clone the Repository:**
   ```sh
   git clone https://github.com/yourusername/crowdinfra.git
   cd crowdinfra
   ```

2. **Setup Frontend:**
   ```sh
   cd crowdinfra_frontend
   npm install
   ```
   **Create a `.env` file inside `crowdinfra_frontend` with:**
   ```
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=<your-google-maps-api-key>
   ```
   **Start the frontend server:**
   ```sh
   npm run dev
   ```

3. **Setup Backend:**
   ```sh
   cd ../crowdinfra_backend
   npm install
   ```
   **Create a `.env` file inside `crowdinfra_backend` with:**
   ```
   MONGO_URI=<your-mongodb-uri>
   GEMINI_API_KEY=<your-google-gemini-api-key>
   ```
   **Start the backend server:**
   ```sh
   npm run start
   ```

## ⚙️ How It Works
1. Users log in and pin locations where they need essential services.
2. Other users can upvote or comment on existing demands.
3. Google Gemini API analyzes the data to provide insights on demand hotspots and business feasibility.
4. Property owners list available spaces for businesses to explore.
5. Businesses and policymakers access real-time analytics to make informed decisions.

## 🌍 Future Enhancements
- **Radius-Based Demand Selection** – Let users define an area instead of a pinpoint location.
- **Enhanced AI Analysis** – Optimize Google Gemini API for more precise insights.
- **Business & Property Recommendations** – Match businesses with high-demand areas.
- **UI/UX Improvements** – Improve interface for a smoother user experience.
- **Scalability & Security** – Ensure a robust and secure infrastructure.

## 👥 Team Members
- **Tanishq Aswar**
- **Pranav Reddy K** 
- **Mayank Mishra**

## 🎥 Demo & Screenshots
- [Screenshots](https://drive.google.com/drive/folders/1U-NyO2vEY45Ps-9mBNcHgH2Rj7egfcXX)
- [Live Demo](#) *(Coming Soon)*
- [Deployed Link](https://infra-crowd.vercel.app)

---
_This project is proprietary and not open-source. Unauthorized distribution or reproduction is prohibited._
