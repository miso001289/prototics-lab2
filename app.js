let currentMode = "";
let stream = null;

// Start Camera
function startCamera(mode) {
  currentMode = mode;

  navigator.mediaDevices.getUserMedia({ video: true })
    .then(s => {
      stream = s;
      document.getElementById("video").srcObject = s;
      document.getElementById("cameraBox").classList.remove("hidden");
    });
}

// Capture Face
function capture() {
  const video = document.getElementById("video");
  const canvas = document.createElement("canvas");

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  canvas.getContext("2d").drawImage(video, 0, 0);
  const faceImage = canvas.toDataURL("image/png");

  stream.getTracks().forEach(track => track.stop());
  document.getElementById("cameraBox").classList.add("hidden");

  // ISSUE TOOL
  if (currentMode === "issue") {
    const tool = document.getElementById("tool").value;
    const time = new Date().toLocaleString();

    const student = "STUDENT_001"; // simulated biometric

    const record = {
      tool,
      student,
      status: "IN USE",
      time
    };

    let records = JSON.parse(localStorage.getItem("records")) || [];
    records.push(record);
    localStorage.setItem("records", JSON.stringify(records));

    document.getElementById("studentStatus").innerText =
      `Tool "${tool}" issued to ${student}`;

    loadRecords();
  }

  // REGISTER STUDENT
  if (currentMode === "register") {
    const name = document.getElementById("studentName").value;
    const id = document.getElementById("studentId").value;

    localStorage.setItem(id, JSON.stringify({ name, faceImage }));

    document.getElementById("assistantStatus").innerText =
      "Student registered successfully";
  }
}

// LOAD RECORDS
function loadRecords() {
  const table = document.querySelector("#toolTable tbody");
  table.innerHTML = "";

  const records = JSON.parse(localStorage.getItem("records")) || [];

  records.forEach(r => {
    const row = `
      <tr>
        <td>${r.tool}</td>
        <td>${r.student}</td>
        <td>${r.status}</td>
        <td>${r.time}</td>
      </tr>
    `;
    table.innerHTML += row;
  });
}

window.onload = loadRecords;



