/* Geometric Logo Animation */
const logoCanvas = document.getElementById('logoCanvas');
const logoCtx = logoCanvas.getContext('2d');
const lw = logoCanvas.width;
const lh = logoCanvas.height;
const lcenterX = lw / 2;
const lcenterY = lh / 2;
let logoAngle = 0;

function drawLogo() {
  logoCtx.clearRect(0, 0, lw, lh);
  logoCtx.save();
  logoCtx.translate(lcenterX, lcenterY);
  logoCtx.rotate(logoAngle);
  
  // Create a gradient for the hexagon stroke
  const gradient = logoCtx.createLinearGradient(-25, -25, 25, 25);
  gradient.addColorStop(0, '#ffa500');
  gradient.addColorStop(1, '#ff8700');
  
  // Draw a 6-sided polygon (hexagon)
  const sides = 6;
  const radius = 25;
  logoCtx.beginPath();
  for (let i = 0; i < sides; i++) {
    const theta = (i / sides) * 2 * Math.PI;
    const x = radius * Math.cos(theta);
    const y = radius * Math.sin(theta);
    if (i === 0) {
      logoCtx.moveTo(x, y);
    } else {
      logoCtx.lineTo(x, y);
    }
  }
  logoCtx.closePath();
  
  // Fill and stroke the hexagon
  logoCtx.fillStyle = '#1e1e1e';
  logoCtx.fill();
  logoCtx.lineWidth = 2;
  logoCtx.strokeStyle = gradient;
  logoCtx.stroke();
  logoCtx.restore();
  
  logoAngle += 0.02;
  requestAnimationFrame(drawLogo);
}

drawLogo();

/* Dynamic Type Effect for the Header */
const services = [
  "System Administration",
  "Process Automation",
  "Programming & Scripting",
  "Data Analytics",
  "Technical"
];

const typedTextElement = document.getElementById('typed-text');
let serviceIndex = 0;
let charIndex = 0;
const typeSpeed = 100;
const pauseTime = 2000;
const highlightTime = 500;

function type() {
  const currentService = services[serviceIndex];
  if (charIndex < currentService.length) {
    typedTextElement.textContent = currentService.substring(0, charIndex + 1);
    charIndex++;
    setTimeout(type, typeSpeed);
  } else {
    setTimeout(() => {
      typedTextElement.classList.add('highlight');
      setTimeout(() => {
        typedTextElement.classList.remove('highlight');
        typedTextElement.textContent = "";
        charIndex = 0;
        serviceIndex = (serviceIndex + 1) % services.length;
        setTimeout(type, typeSpeed);
      }, highlightTime);
    }, pauseTime);
  }
}

type();

/* Mouse Trail Effect */
let lastPos = null;
document.addEventListener('mousemove', function(e) {
  if (lastPos) {
    const x1 = lastPos.x;
    const y1 = lastPos.y;
    const x2 = e.clientX;
    const y2 = e.clientY;
    const dx = x2 - x1;
    const dy = y2 - y1;
    const distance = Math.sqrt(dx * dx + dy * dy);
    lastPos = { x: x2, y: y2 };
    const angle = Math.atan2(dy, dx) * 180 / Math.PI;
    
    const trail = document.createElement('div');
    trail.classList.add('mouse-trail-segment');
    trail.style.left = x1 + 'px';
    trail.style.top = y1 + 'px';
    trail.style.width = distance + 'px';
    trail.style.height = '2px';
    trail.style.transform = `rotate(${angle}deg)`;
    
    document.body.appendChild(trail);
    setTimeout(() => {
      trail.remove();
    }, 800);
  }
  lastPos = { x: e.clientX, y: e.clientY };
});

/* Footer Year Update */
const yearSpan = document.getElementById('year');
if (yearSpan) {
  yearSpan.textContent = new Date().getFullYear();
}
