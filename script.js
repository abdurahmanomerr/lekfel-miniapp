const tg = window.Telegram.WebApp;
tg.ready();
tg.expand();

// Get Telegram user
const user = tg.initDataUnsafe?.user;
const username = user?.username || user?.first_name || "Guest";

// Generate fake 6-digit driver code
const driverCode = Math.floor(100000 + Math.random() * 900000);

// Show info
document.getElementById("username").innerText =
  "User: @" + username;

document.getElementById("driver").innerText =
  "Driver Code: " + driverCode;

// Create seats
const bus = document.querySelector(".bus");
let selectedSeat = null;

for (let i = 1; i <= 12; i++) {
  const seat = document.createElement("div");
  seat.className = "seat";
  seat.innerText = i;

  seat.onclick = () => {
    document
      .querySelectorAll(".seat")
      .forEach(s => s.classList.remove("selected"));

    seat.classList.add("selected");
    selectedSeat = i;
  };

  bus.appendChild(seat);
}

// Confirm button
document.querySelector(".confirm").onclick = () => {
  if (!selectedSeat) {
    tg.showAlert("Please select a seat first");
    return;
  }

  tg.showPopup({
    title: "Seat Confirmed",
    message: `Seat ${selectedSeat} selected`,
    buttons: [{ type: "ok" }]
  });
};
