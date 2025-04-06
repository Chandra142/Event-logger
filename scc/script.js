const socket = new WebSocket("ws://localhost:3000");

const logContainer = document.getElementById("logContainer");
const eventList = document.getElementById("eventList");
const logButton = document.getElementById("logEvent");

logButton.addEventListener("click", () => {
  const timestamp = new Date().toLocaleString();
  const logItem = document.createElement("li");
  logItem.textContent = `Event Logged: ${timestamp}`;
  eventList.prepend(logItem);
  saveLogToLocal(logItem.textContent);
});

socket.onmessage = (event) => {
  const data = JSON.parse(event.data);

  const entry = document.createElement("div");
  entry.innerHTML = `
    ${data.timestamp}<br>
    OS: ${data.operatingSystem} | CPU: ${data.cpuUsage} | Memory: ${data.freeMemory}<br>
    Event: ${data.securityEvent}
  `;

  logContainer.prepend(entry);
};

function saveLogToLocal(log) {
  const logs = JSON.parse(localStorage.getItem("eventLogs")) || [];
  logs.unshift(log);
  localStorage.setItem("eventLogs", JSON.stringify(logs));
}

window.onload = () => {
  const logs = JSON.parse(localStorage.getItem("eventLogs")) || [];
  logs.forEach((log) => {
    const item = document.createElement("li");
    item.textContent = log;
    eventList.appendChild(item);
  });
};
