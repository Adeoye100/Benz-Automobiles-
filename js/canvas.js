document.addEventListener('DOMContentLoaded', function() {
  // Get the canvas and set its size to cover the viewport
  const canvas = document.getElementById("cursor-canvas");
  if (!canvas) return; // Exit if canvas doesn't exist
  
  const ctx = canvas.getContext('2d');
  
  // Handle retina displays
  const dpr = window.devicePixelRatio || 1;
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  ctx.scale(dpr, dpr);
  
  // Generate dots
  let dots = [];
  const arrayColors = ['#4ecdc4', '#d32727', '#4b0082', '#4b0082', '#28a745'];
  const dotCount = Math.floor(window.innerWidth / 20); // Responsive dot count
  
  for (let i = 0; i < dotCount; i++) {
    dots.push({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 3 + 2,
      color: arrayColors[Math.floor(Math.random() * arrayColors.length)],
      originalX: 0,
      originalY: 0,
      speed: Math.random() * 0.2 + 0.1
    });
  }
  
  // Draw all dots
  function drawDots() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Always use a blend mode that makes dots visible on both dark and light backgrounds
    ctx.globalCompositeOperation = 'screen';
    dots.forEach(dot => {
      ctx.beginPath();
      ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
      ctx.fillStyle = dot.color;
      ctx.fill();
      ctx.closePath();
    });
    ctx.globalCompositeOperation = 'source-over'; // reset
  }
  
  // Mouse move event
  window.addEventListener('mousemove', (event) => {
    const mouse = {
      x: event.clientX,
      y: event.clientY
    };
    
    drawDots();
    
    dots.forEach(dot => {
      const distance = Math.sqrt(Math.pow(mouse.x - dot.x, 2) + Math.pow(mouse.y - dot.y, 2));
      if (distance < 150) {
        ctx.beginPath();
        ctx.moveTo(dot.x, dot.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = dot.color;
        ctx.lineWidth = 0.5;
        ctx.globalAlpha = 1 - (distance / 150);
        ctx.stroke();
        ctx.globalAlpha = 1;
        ctx.closePath();
      }
    });
  });
  
  window.addEventListener('mouseleave', drawDots);
  
  // Handle window resize
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth * dpr;
    canvas.height = window.innerHeight * dpr;
    ctx.scale(dpr, dpr);
    drawDots();
  });
  
  // Listen for theme toggle to redraw with correct blend mode
  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      setTimeout(drawDots, 300); 
    });
  }
  
  // Initial draw
  drawDots();
});