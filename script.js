// import { auth, db } from "./firebase.js";
// import {
//   collection,
//   doc,
//   getDocs,
//   addDoc,
//   deleteDoc,
//   updateDoc,
//   where,
//   query
// } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// import {
//   signOut,
//   onAuthStateChanged
// } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// // DOM
// const dateInput = document.getElementById("dateInput");
// const activityTitle = document.getElementById("activityTitle");
// const activityCategory = document.getElementById("activityCategory");
// const activityMinutes = document.getElementById("activityMinutes");
// const addActivityBtn = document.getElementById("addActivityBtn");
// const activitiesList = document.getElementById("activitiesList");
// const remainingSpan = document.getElementById("remainingSpan");
// const analyseBtn = document.getElementById("analyseBtn");
// const dashboardBtn = document.getElementById("dashboardBtn");
// const logoutBtn = document.getElementById("logoutBtn");

// // today default
// let currentDateString = new Date().toISOString().slice(0, 10);
// dateInput.value = currentDateString;

// // auth check
// onAuthStateChanged(auth, user => {
//   if (!user) {
//     window.location = "index.html";
//   } else {
//     loadActivities();
//   }
// });

// // on date change
// dateInput.addEventListener("change", () => {
//   currentDateString = dateInput.value;
//   loadActivities();
// });

// // logout
// logoutBtn.addEventListener("click", async () => {
//   await signOut(auth);
//   window.location = "index.html";
// });

// // dashboard
// dashboardBtn.addEventListener("click", () => {
//   window.location = `dashboard.html?date=${currentDateString}`;
// });

// // load activities
// async function loadActivities() {
//   activitiesList.innerHTML = "Loading...";

//   const user = auth.currentUser;
//   if (!user) return;

//   const activitiesRef = collection(db, "users", user.uid, "activities");

//   const q = query(
//     activitiesRef,
//     where("date", "==", currentDateString)
//   );

//   const snapshot = await getDocs(q);

//   const list = [];
//   snapshot.forEach(docSnap => list.push({ id: docSnap.id, ...docSnap.data() }));

//   renderActivities(list);
// }

// // render activities
// function renderActivities(list) {
//   activitiesList.innerHTML = "";
//   let total = 0;

//   list.forEach(item => {
//     total += Number(item.minutes);

//     const el = document.createElement("div");
//     el.className = "activity-item";

//     el.innerHTML = `
//       <div>
//         <strong>${escapeHtml(item.title)}</strong>
//         <div class="small">${escapeHtml(item.category)} • ${item.minutes} min</div>
//       </div>
//       <div>
//         <button class="btn outline" data-action="edit" data-id="${item.id}">Edit</button>
//         <button class="btn outline" data-action="delete" data-id="${item.id}">Delete</button>
//       </div>
//     `;

//     activitiesList.appendChild(el);
//   });

//   remainingSpan.innerText = Math.max(1440 - total, 0);
//   analyseBtn.disabled = total < 1440;

//   // edit / delete
//   activitiesList.querySelectorAll("button[data-action]").forEach(btn => {
//     btn.onclick = async () => {
//       const id = btn.dataset.id;
//       const action = btn.dataset.action;
//       const user = auth.currentUser;

//       const docRef = doc(db, "users", user.uid, "activities", id);

//       if (action === "delete") {
//         if (!confirm("Delete activity?")) return;
//         await deleteDoc(docRef);
//         loadActivities();
//       }

//       if (action === "edit") {
//         const newTitle = prompt("New title:", "");
//         const newCat = prompt("New category:", "");
//         const newMin = prompt("New minutes:", "");

//         if (newTitle && newMin) {
//           await updateDoc(docRef, {
//             title: newTitle,
//             category: newCat || "General",
//             minutes: Number(newMin)
//           });
//           loadActivities();
//         }
//       }
//     };
//   });
// }

// // add activity
// addActivityBtn.addEventListener("click", async () => {
//   const title = activityTitle.value.trim();
//   const category = activityCategory.value.trim() || "General";
//   const minutes = Number(activityMinutes.value);

//   if (!title || minutes <= 0) {
//     alert("Enter valid title and minutes.");
//     return;
//   }

//   const user = auth.currentUser;
//   const activitiesRef = collection(db, "users", user.uid, "activities");

//   const q = query(activitiesRef, where("date", "==", currentDateString));
//   const snapshot = await getDocs(q);

//   let total = 0;
//   snapshot.forEach(docSnap => total += Number(docSnap.data().minutes));

//   if (total + minutes > 1440) {
//     alert("Total minutes exceed 1440.");
//     return;
//   }

//   await addDoc(activitiesRef, {
//     date: currentDateString,
//     title,
//     category,
//     minutes,
//     createdAt: Date.now()
//   });

//   activityTitle.value = "";
//   activityCategory.value = "";
//   activityMinutes.value = "";

//   loadActivities();
// });

// // analyse
// analyseBtn.addEventListener("click", () => {
//   window.location = `dashboard.html?date=${currentDateString}`;
// });

// // escape HTML
// function escapeHtml(s) {
//   return String(s).replace(/[&<>"']/g, m => ({
//     "&": "&amp;",
//     "<": "&lt;",
//     ">": "&gt;",
//     '"': "&quot;",
//     "'": "&#039;"
//   }[m]));
// }



import { auth, db } from "./firebase.js";

import {
  collection,
  doc,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

// DOM
const dateInput = document.getElementById("dateInput");
const activityTitle = document.getElementById("activityTitle");
const activityCategory = document.getElementById("activityCategory");
const activityMinutes = document.getElementById("activityMinutes");
const addActivityBtn = document.getElementById("addActivityBtn");
const activitiesList = document.getElementById("activitiesList");
const remainingSpan = document.getElementById("remainingSpan");
const analyseBtn = document.getElementById("analyseBtn");
const dashboardBtn = document.getElementById("dashboardBtn");
const logoutBtn = document.getElementById("logoutBtn");

// today default
let currentDateString = new Date().toISOString().slice(0, 10);
dateInput.value = currentDateString;

// auth check
onAuthStateChanged(auth, user => {
  if (!user) {
    window.location = "index.html";
  } else {
    loadActivities();
  }
});

// date change
dateInput.addEventListener("change", () => {
  currentDateString = dateInput.value;
  loadActivities();
});

// logout
logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  window.location = "index.html";
});

// go to dashboard
dashboardBtn.addEventListener("click", () => {
  window.location = `dashboard.html?date=${currentDateString}`;
});

/* -----------------------------------------------------
   LOAD ACTIVITIES (Correct nested Firestore structure)
----------------------------------------------------- */
async function loadActivities() {
  activitiesList.innerHTML = "Loading...";

  const user = auth.currentUser;
  if (!user) return;

  const activitiesRef = collection(
    db,
    "users",
    user.uid,
    "days",
    currentDateString,
    "activities"
  );

  const snapshot = await getDocs(activitiesRef);

  const list = [];
  snapshot.forEach(docSnap =>
    list.push({ id: docSnap.id, ...docSnap.data() })
  );

  renderActivities(list);
}

/* -----------------------------------------------------
   RENDER ACTIVITIES
----------------------------------------------------- */
function renderActivities(list) {
  activitiesList.innerHTML = "";
  let total = 0;

  list.forEach(item => {
    total += Number(item.minutes);

    const el = document.createElement("div");
    el.className = "activity-item";

    el.innerHTML = `
      <div>
        <strong>${escapeHtml(item.title)}</strong>
        <div class="small">${escapeHtml(item.category)} • ${item.minutes} min</div>
      </div>
      <div>
        <button class="btn outline" data-action="edit" data-id="${item.id}">Edit</button>
        <button class="btn outline" data-action="delete" data-id="${item.id}">Delete</button>
      </div>
    `;

    activitiesList.appendChild(el);
  });

  remainingSpan.innerText = Math.max(1440 - total, 0);
  analyseBtn.disabled = total === 0;

  // Event for edit/delete
  activitiesList.querySelectorAll("button[data-action]").forEach(btn => {
    btn.onclick = async () => {
      const id = btn.dataset.id;
      const action = btn.dataset.action;
      const user = auth.currentUser;

      const docRef = doc(
        db,
        "users",
        user.uid,
        "days",
        currentDateString,
        "activities",
        id
      );

      if (action === "delete") {
        if (!confirm("Delete activity?")) return;
        await deleteDoc(docRef);
        loadActivities();
      }

      if (action === "edit") {
        const newTitle = prompt("New title:", item.title);
        const newCat = prompt("New category:", item.category);
        const newMin = prompt("New minutes:", item.minutes);

        if (newTitle && newMin) {
          await updateDoc(docRef, {
            title: newTitle,
            category: newCat || "General",
            minutes: Number(newMin)
          });
          loadActivities();
        }
      }
    };
  });
}

/* -----------------------------------------------------
   ADD ACTIVITY (correct Firestore path)
----------------------------------------------------- */
addActivityBtn.addEventListener("click", async () => {
  const title = activityTitle.value.trim();
  const category = activityCategory.value.trim() || "General";
  const minutes = Number(activityMinutes.value);

  if (!title || minutes <= 0) {
    alert("Enter valid title and minutes.");
    return;
  }

  const user = auth.currentUser;

  const activitiesRef = collection(
    db,
    "users",
    user.uid,
    "days",
    currentDateString,
    "activities"
  );

  // calculate total minutes
  const snapshot = await getDocs(activitiesRef);
  let total = 0;
  snapshot.forEach(d => (total += Number(d.data().minutes)));

  if (total + minutes > 1440) {
    alert("Total minutes exceed 1440.");
    return;
  }

  await addDoc(activitiesRef, {
    title,
    category,
    minutes,
    createdAt: Date.now()
  });

  activityTitle.value = "";
  activityCategory.value = "";
  activityMinutes.value = "";

  loadActivities();
});

/* -----------------------------------------------------
   ANALYSE BUTTON
----------------------------------------------------- */
analyseBtn.addEventListener("click", () => {
  window.location = `dashboard.html?date=${currentDateString}`;
});

/* -----------------------------------------------------
   Escape HTML
----------------------------------------------------- */
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, m => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#039;"
  }[m]));
}
