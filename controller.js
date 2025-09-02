// controller.js

// Helper to trigger keyboard events for game.js compatibility
function triggerKeyEvent(keyCode, eventType) {
  const evt = new KeyboardEvent(eventType, { keyCode: keyCode, which: keyCode });
  document.dispatchEvent(evt);
}

// --- Joystick setup ---
const joystickContainer = document.getElementById("joystickContainer");
const joystick = document.getElementById("joystick");

let startX, startY;
let active = false;

joystickContainer.addEventListener("touchstart", function (e) {
  e.preventDefault();
  active = true;
  const touch = e.touches[0];
  startX = touch.clientX;
  startY = touch.clientY;
});

joystickContainer.addEventListener("touchmove", function (e) {
  if (!active) return;
  const touch = e.touches[0];
  const dx = touch.clientX - startX;
  const dy = touch.clientY - startY;

  const distance = Math.min(Math.sqrt(dx * dx + dy * dy), 40); // limit joystick range
  const angle = Math.atan2(dy, dx);

  const x = distance * Math.cos(angle);
  const y = distance * Math.sin(angle);

  joystick.style.transform = `translate(${x}px, ${y}px)`;

  // Map movement to Arrow keys (simulate keyboard for game.js)
  if (dy < -20) triggerKeyEvent(38, "keydown"); // Up
  else triggerKeyEvent(38, "keyup");

  if (dy > 20) triggerKeyEvent(40, "keydown"); // Down
  else triggerKeyEvent(40, "keyup");

  if (dx < -20) triggerKeyEvent(37, "keydown"); // Left
  else triggerKeyEvent(37, "keyup");

  if (dx > 20) triggerKeyEvent(39, "keydown"); // Right
  else triggerKeyEvent(39, "keyup");
});

joystickContainer.addEventListener("touchend", function () {
  active = false;
  joystick.style.transform = "translate(0,0)";
  ["38", "40", "37", "39"].forEach((code) => triggerKeyEvent(code, "keyup"));
});

// --- Fire button ---
const fireBtn = document.getElementById("fireBtn");
fireBtn.addEventListener("touchstart", () => triggerKeyEvent(88, "keydown")); // X key
fireBtn.addEventListener("touchend", () => triggerKeyEvent(88, "keyup"));

// Block double tap zoom
document.addEventListener("gesturestart", (e) => e.preventDefault());
document.addEventListener("dblclick", (e) => e.preventDefault());
