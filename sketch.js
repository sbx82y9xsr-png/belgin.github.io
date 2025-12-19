function setup() {
  createCanvas(600, 400);
}

function draw() {
  background(200, 230, 255);

  // ----- Kopf (fest) -----
  let headX = width / 2;
  let headY = height / 2;
  let headSize = 200;
  fill(0);
  noStroke();
  ellipse(headX, headY, headSize, headSize);

  // ----- Augen/Nase/Ohren Bewegung -----
  let lookX = map(mouseX, 0, width, -15, 15);
  let lookY = map(mouseY, 0, height, -10, 10);

  // ----- Ohren breiter, nach innen gebogen, Basis tiefer, leicht beweglich -----
  fill(0);
  // linkes Ohr
  beginShape();
  vertex(headX - 110 + lookX * 0.3, headY - 10 + lookY * 0.3); // Basis tiefer, außen
  bezierVertex(headX - 90 + lookX * 0.3, headY - 120 + lookY * 0.3, headX - 40 + lookX * 0.3, headY - 120 + lookY * 0.3, headX - 20 + lookX * 0.3, headY - 10 + lookY * 0.3); // Spitze gebogen, endet am Kopf
  endShape(CLOSE);

  // rechtes Ohr
  beginShape();
  vertex(headX + 110 + lookX * 0.3, headY - 10 + lookY * 0.3);
  bezierVertex(headX + 90 + lookX * 0.3, headY - 120 + lookY * 0.3, headX + 40 + lookX * 0.3, headY - 120 + lookY * 0.3, headX + 20 + lookX * 0.3, headY - 10 + lookY * 0.3);
  endShape(CLOSE);

  // ----- Augen -----
  let eyeRadius = 25;
  let pupilRadiusX = 18; // horizontal größer
  let pupilRadiusY = 30; // vertikal kleiner für Oval
  let eyeYBase = headY + 15;

  let leftEyeX = headX - 50;
  let rightEyeX = headX + 50;

  fill(255);
  noStroke();
  circle(leftEyeX + lookX, eyeYBase + lookY, eyeRadius * 2);
  circle(rightEyeX + lookX, eyeYBase + lookY, eyeRadius * 2);

  // Pupillen
  drawPupilClipped(leftEyeX + lookX, eyeYBase + lookY, eyeRadius, pupilRadiusX, pupilRadiusY);
  drawPupilClipped(rightEyeX + lookX, eyeYBase + lookY, eyeRadius, pupilRadiusX, pupilRadiusY);

  // ----- Nase -----
  fill(255, 150, 150);
  ellipse(headX + lookX, eyeYBase + 55 + lookY, 25, 15);
}

// Pupillen bleiben innerhalb der Augen
function drawPupilClipped(ex, ey, eyeRadius, prX, prY) {
  push();
  drawingContext.beginPath();
  drawingContext.arc(ex, ey, eyeRadius, 0, TWO_PI);
  drawingContext.clip();

  let dx = mouseX - ex;
  let dy = mouseY - ey;
  let angle = atan2(dy, dx);
  let offset = eyeRadius - max(prX, prY) / 2; // maximaler Abstand
  let px = ex + cos(angle) * offset;
  let py = ey + sin(angle) * offset;

  fill(0);
  noStroke();
  ellipse(px, py, prX * 2, prY * 2); // Oval
  pop();
}
