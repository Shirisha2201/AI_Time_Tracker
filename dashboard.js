import { auth, db } from "./firebase.js";
import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const params = new URLSearchParams(window.location.search);
const selectedDate = params.get("date") || new Date().toISOString().slice(0, 10);

document.getElementById("dateLabel").innerText = selectedDate;

const noDataEl = document.getElementById("noData");
const statsArea = document.getElementById("statsArea");
const totalMinutesEl = document.getElementById("totalMinutes");
const activityCountEl = document.getElementById("activityCount");
const aiAnalyzeBtn = document.getElementById("aiAnalyzeBtn");
const aiResult = document.getElementById("aiResult");
const backBtn = document.getElementById("backBtn");

backBtn.addEventListener("click", () => window.location = `home.html?date=${selectedDate}`);

auth.onAuthStateChanged(async (user) => {
  if (!user) return (window.location = "index.html");

  // CORRECT DB PATH
  const col = collection(db, "users", user.uid, "activities");
  const snap = await getDocs(col);

  const list = snap.docs
    .map(doc => ({ id: doc.id, ...doc.data() }))
    .filter(a => a.date === selectedDate);

  if (list.length === 0) {
    noDataEl.style.display = "block";
    statsArea.style.display = "none";
    return;
  }

  // stats
  const total = list.reduce((t, a) => t + Number(a.minutes || 0), 0);
  totalMinutesEl.innerText = total;
  activityCountEl.innerText = list.length;

  const byCategory = {};
  for (const a of list) {
    const cat = a.category || "General";
    byCategory[cat] = (byCategory[cat] || 0) + Number(a.minutes);
  }

  // PIE
  new Chart(document.getElementById("pieChart"), {
    type: "pie",
    data: {
      labels: Object.keys(byCategory),
      datasets: [{
        data: Object.values(byCategory),
        backgroundColor: ["#0ea5e9", "#60a5fa", "#34d399", "#f97316", "#f472b6", "#a78bfa"]
      }]
    }
  });

  // BAR
  new Chart(document.getElementById("barChart"), {
    type: "bar",
    data: {
      labels: list.map(a => a.title),
      datasets: [{
        label: "Minutes",
        data: list.map(a => a.minutes),
        backgroundColor: "#60a5fa"
      }]
    },
    options: { indexAxis: "y" }
  });

  statsArea.style.display = "block";
  noDataEl.style.display = "none";

  aiAnalyzeBtn.addEventListener("click", async () => {
    aiResult.style.display = "block";
    aiResult.innerText = "Thinking...";
    try {
      const text = await analyseWithAI(list);
      aiResult.innerHTML = text.replace(/\n/g, "<br>");
    } catch (e) {
      aiResult.innerText = "AI error: " + e.message;
    }
  });
});