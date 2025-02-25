const canvas = document.getElementById("speedometer");
const ctx = canvas.getContext("2d");
let speed = 0; // Initial speed

function drawMeter(speed) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw Outer Circle
  ctx.beginPath();
  ctx.arc(150, 150, 120, 0, Math.PI, true);
  ctx.lineWidth = 8;
  ctx.strokeStyle = "#000";
  ctx.stroke();

  // Draw Scale Marks
  for (let i = 0; i <= 180; i += 20) {
    let angle = Math.PI * (i / 180) - Math.PI;
    let x1 = 150 + Math.cos(angle) * 110;
    let y1 = 150 + Math.sin(angle) * 110;
    let x2 = 150 + Math.cos(angle) * 120;
    let y2 = 150 + Math.sin(angle) * 120;

    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineWidth = 3;
    ctx.strokeStyle = "#000";
    ctx.stroke();

    // Add Speed Labels
    ctx.font = "14px Arial";
    ctx.fillStyle = "#000";
    let textX = 150 + Math.cos(angle) * 95;
    let textY = 150 + Math.sin(angle) * 95;
    ctx.fillText(i, textX - 10, textY + 5);
  }

  // Draw Needle
  let needleAngle = Math.PI * (speed / 180) - Math.PI;
  let x = 150 + Math.cos(needleAngle) * 90;
  let y = 150 + Math.sin(needleAngle) * 90;

  ctx.beginPath();
  ctx.moveTo(150, 150);
  ctx.lineTo(x, y);
  ctx.lineWidth = 4;
  ctx.strokeStyle = "red";
  ctx.stroke();

  // Draw Center Circle
  ctx.beginPath();
  ctx.arc(150, 150, 5, 0, 2 * Math.PI);
  ctx.fillStyle = "red";
  ctx.fill();
}

function updateSpeed() {
  let inputSpeed = parseInt(document.getElementById("speedInput").value);
  if (inputSpeed >= 0 && inputSpeed <= 180) {
    speed = inputSpeed;
    drawMeter(speed);
  } else {
    alert("Please enter a speed between 0 and 180 km/h.");
  }
}

// Initial draw
drawMeter(speed);

function startTracking() {
  if ("geolocation" in navigator) {
    navigator.geolocation.watchPosition(
      function (position) {
        let speed = position.coords.speed; // Speed in meters per second

        if (speed !== null) {
          let speedKmh = (speed * 3.6).toFixed(2); // Convert to km/h
          document.getElementById("speed").innerText = speedKmh;
          drawMeter(speedKmh);
        } else {
          document.getElementById("speed").innerText = "no speed";
        }
      },
      function (error) {
        console.error("Error getting location: ", error);
        alert("Error getting location. Ensure GPS is enabled.");
      },
      { enableHighAccuracy: true }
    );
  } else {
    alert("Geolocation is not supported by this browser.");
  }
}

startTracking();
