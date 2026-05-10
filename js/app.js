// App Main — state, intro, background, main loop, prefers-reduced-motion

// ── State variables ───────────────────────────────────────────────────────────
let cur = -1;
let tick = 0;
let prog = 0;
let isPlaying = false;
let phaseAdvanceTimeout = null;
let zoom = 1;
let isAnimating = false;
let cytokinesisType = 0; // 0=Tier, 1=Mensch, 2=Pflanze

// FIX: was used in ui-controller.js but never declared — implicit global caused
// a ReferenceError in strict mode and polluted window in sloppy mode.
let autoPhaseAdv = false;

// Phase transition overlay
let transAlpha = 0; // 0..1 overlay opacity
let transDir = 0;   // 0=idle, -1=fadeOut old, 1=fadeIn new
let transNext = -1;  // next phase to switch to
let pendingFadeIn = false; // info panel fade in pending

// Check for reduced motion preference
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// Canvas setup
var cv = document.getElementById('cell-canvas');
var cx = cv.getContext('2d');

// Zoom Support
cv.addEventListener('wheel', (e) => {
  e.preventDefault();
  const zoomFactor = e.deltaY > 0 ? 0.92 : 1.08;
  zoom = Math.max(0.4, Math.min(4, zoom * zoomFactor));
}, { passive: false });

// ── INTRO PARTICLES ───────────────────────────────────────────────────────────
const iCanvas = document.getElementById('intro-canvas');
const iCtx = iCanvas.getContext('2d');
let iParts = [];

function resizeIntro(){iCanvas.width=innerWidth;iCanvas.height=innerHeight}
function initIParts(){
  iParts=[];
  for(let i=0;i<60;i++) iParts.push({
    x:Math.random()*iCanvas.width, y:Math.random()*iCanvas.height,
    r:Math.random()*1.2+0.2,
    vx:(Math.random()-0.5)*0.2, vy:(Math.random()-0.5)*0.2,
    a:Math.random()*0.3+0.05,
    c:Math.random()>.5?'rgba(122,143,170,':'rgba(107,127,78,'
  });
}

let iRaf;
function animIntro(){
  iCtx.clearRect(0,0,iCanvas.width,iCanvas.height);
  for(const p of iParts){
    p.x+=p.vx; p.y+=p.vy;
    if(p.x<0)p.x=iCanvas.width; if(p.x>iCanvas.width)p.x=0;
    if(p.y<0)p.y=iCanvas.height; if(p.y>iCanvas.height)p.y=0;
    iCtx.globalAlpha=p.a; iCtx.fillStyle=p.c+(p.a*0.4)+')';
    iCtx.beginPath(); iCtx.arc(p.x,p.y,p.r,0,Math.PI*2); iCtx.fill();
  }
  iCtx.globalAlpha=1;
  iRaf=requestAnimationFrame(animIntro);
}
resizeIntro(); initIParts();

// ── START APP ─────────────────────────────────────────────────────────────────
let appStarted = false;
document.getElementById('start-btn').onclick=()=>{
  if(appStarted) return;
  appStarted = true;
  const intro=document.getElementById('intro');
  if(prefersReducedMotion){
    intro.style.display='none';
    document.getElementById('app').classList.add('on');
    initBg(); setPhase(0); mainLoop();
  } else {
    intro.style.opacity='0';
    cancelAnimationFrame(iRaf);
    setTimeout(()=>{
      intro.style.display='none';
      document.getElementById('app').classList.add('on');
      initBg(); setPhase(0); mainLoop();
    },950);
  }
};

// ── BACKGROUND PARTICLES ──────────────────────────────────────────────────────
const bgC = document.getElementById('bg-canvas');
const bgX = bgC.getContext('2d');
let bParts=[];

function initBg(){
  bgC.width=innerWidth; bgC.height=innerHeight; bParts=[];
  for(let i=0;i<40;i++) bParts.push({
    x:Math.random()*bgC.width, y:Math.random()*bgC.height,
    r:Math.random()*0.8+0.1,
    vx:(Math.random()-0.5)*0.08, vy:(Math.random()-0.5)*0.08,
    a:Math.random()*0.15+0.03,
    c:Math.random()>.5?'rgba(122,143,170,':'rgba(107,127,78,'
  });
}

function drawBg(){
  bgX.clearRect(0,0,bgC.width,bgC.height);
  for(const p of bParts){
    p.x+=p.vx; p.y+=p.vy;
    if(p.x<0)p.x=bgC.width; if(p.x>bgC.width)p.x=0;
    if(p.y<0)p.y=bgC.height; if(p.y>bgC.height)p.y=0;
    bgX.globalAlpha=p.a; bgX.fillStyle=p.c+(p.a*0.3)+')';
    bgX.beginPath(); bgX.arc(p.x,p.y,p.r,0,Math.PI*2); bgX.fill();
  }
  bgX.globalAlpha=1;
}

// ── MAIN LOOP ─────────────────────────────────────────────────────────────────
function mainLoop(){
  requestAnimationFrame(mainLoop);
  if(isPlaying) tick++;

  // Handle phase transition overlay
  if(transDir === -1){
    transAlpha = prefersReducedMotion ? 1 : Math.min(1, transAlpha + 0.025);
    if(transAlpha >= 1){
      // Wait for the info panel's CSS fade-out to complete before proceeding
      if(!pendingFadeIn && !prefersReducedMotion && cur !== -1) return;

      updatePhaseContent(transNext);
      transDir = prefersReducedMotion ? 0 : 1;
      
      // We are ready to fade in
      pendingFadeIn = false;
      const infoEl = document.getElementById('info');
      if(prefersReducedMotion){
        infoEl.style.opacity = '1';
      } else {
        infoEl.style.animation = 'fadeInInfo 0.4s ease forwards';
      }
        const onEnterEnd = () => {
          infoEl.removeEventListener('animationend', onEnterEnd);
          infoEl.style.animation = '';
          const iName = document.getElementById('i-name');
          const iDesc = document.getElementById('i-desc');
          iName.classList.remove('appear');
          iDesc.classList.remove('appear');
          void iName.offsetWidth;
          if(prefersReducedMotion){
            iName.style.opacity = '1';
            iDesc.style.opacity = '1';
            iName.style.color = 'var(--accent)';
            iDesc.style.color = 'var(--accent)';
            isAnimating = false;
          } else {
            iName.classList.add('appear');
            iDesc.classList.add('appear');
            isAnimating = false;
          }
        };
        if(prefersReducedMotion){
          onEnterEnd();
        } else {
          infoEl.addEventListener('animationend', onEnterEnd);
          // Fallback in case animationend fails
          setTimeout(() => { if(isAnimating) onEnterEnd(); }, 500);
        }
    }
  } else if(transDir === 1){
    transAlpha = prefersReducedMotion ? 0 : Math.max(0, transAlpha - 0.025);
    if(transAlpha <= 0){
      transDir = 0;
    }
  }

  if(isPlaying && !isAnimating){
    prog=Math.min(1,prog+0.0008);
    if(prog>=1){
      if(cur>=6){
        isPlaying=false;updateAutoBtn();
      } else {
        setPhase(cur+1);
      }
    }
  }

  document.getElementById('prog-fill').style.width=(((cur + prog) / 7) * 100)+'%';

  updateFactHighlight();

  const W=cv.width, H=cv.height;
  cx.clearRect(0,0,W,H);

  cx.save();
  cx.translate(W/2, H/2);
  cx.scale(zoom, zoom);
  cx.translate(-W/2, -H/2);

  grid(W,H);

  switch(cur){
    case 0: drawInterphase(W,H,prog,tick); break;
    case 1: drawProphase(W,H,prog,tick);   break;
    case 2: drawPrometaphase(W,H,prog,tick); break;
    case 3: drawMetaphase(W,H,prog,tick);  break;
    case 4: drawAnaphase(W,H,prog,tick);   break;
    case 5: drawTelophase(W,H,prog,tick);  break;
    case 6: drawCytokinese(W,H,prog,tick); break;
  }

  cx.restore();

  // Draw phase transition overlay
  if(transDir !== 0){
    cx.fillStyle=`rgba(245,243,239,${transAlpha})`;
    cx.fillRect(0,0,W,H);
  }

  drawBg();
}

// Initialize background and start intro animation
initBg();
if(!prefersReducedMotion){
  animIntro();
}