let stream;
let currentMode = "";

// Switch tabs
function showTab(tab) {
  document.getElementById("student").classList.add("hidden");
  document.getElementById("assistant").classList.add("hidden");

  document.getElementById(tab).classList.remove("hidden");
}

// Open camera
function openCamera(mode) {
  currentMode = mode;

  document.getElementById("cameraBox").classList.remove("hidden");

  navigator.mediaDevices.getUserMedia({ video: true })
    .then(s => {
      stream = s;
      document.getElementById("video").srcObject = stream;
    });
}

// Capture image
function capture() {
  const video = document.getElementById("video");
  const canvas = document.createElement("canvas");

  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  canvas.getContext("2d").drawImage(video, 0, 0);

  const faceImage = canvas.toDataURL("image/png");

  stream.getTracks().forEach(track => track.stop());
  document.getElementById("cameraBox").classList.add("hidden");

  if (currentMode === "issue") {
    const tool = document.getElementById("tool").value;
    const time = new Date().toLocaleString();

    localStorage.setItem("issuedTool", JSON.stringify({
      tool,
      time,
      faceImage
    }));

    document.getElementById("studentStatus").innerText =
      `Tool "${tool}" issued at ${time}`;
  }

  if (currentMode === "register") {
    const name = document.getElementById("studentName").value;
    const id = document.getElementById("studentId").value;

    localStorage.setItem(id, JSON.stringify({
      name,
      faceImage
    }));

    document.getElementById("assistantStatus").innerText =
      "Student registered successfully";
  }
}

