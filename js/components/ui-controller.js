// UI Controller — phase control, navigation, auto-play, ARIA, keyboard nav

function sizeCv(){
  const wrap = document.getElementById('cv-wrap');
  const W = wrap.clientWidth - 60;
  const H = wrap.clientHeight - 18;
  const side = Math.min(W, H, 760);
  cv.width  = side;
  cv.height = Math.round(side * 0.88);
}

function renderLegend(phaseIndex){
  const legendEl = document.getElementById('legend');
  const legendItems = getLegendData(phaseIndex);
  legendEl.innerHTML = `<div class="legend-head">${t('app_legend')}</div>` +
    legendItems.map(item =>
      `<div class="legend-item">
         <span class="legend-dot" style="background:${item.color}"></span>
         <span class="legend-label">${item.label}</span>
       </div>`
    ).join('');
}

function updateFactHighlight(){
  const facts = document.querySelectorAll('.fact');
  const totalFacts = facts.length;
  if(totalFacts === 0) return;
  const activeFactIdx = Math.floor(prog * totalFacts);
  facts.forEach((fact, idx) => {
    if(idx < activeFactIdx){
      fact.classList.add('active');
    } else {
      fact.classList.remove('active');
    }
  });
}

function updateAutoBtn(){
  const btn=document.getElementById('auto-btn');
  btn.innerHTML=isPlaying?t('app_auto_pause'):t('app_auto_start');
  btn.classList.toggle('playing',isPlaying);
}

function updatePhaseContent(n){
  cur = n;
  prog = 0;
  const d = getPhaseData(n);
  const tbPhase = document.getElementById('tb-phase');
  tbPhase.style.animation = 'fadeOutPhase 0.2s ease forwards';
  const onPhaseOut = () => {
    tbPhase.removeEventListener('animationend', onPhaseOut);
    tbPhase.textContent = d.name.toUpperCase();
    tbPhase.style.animation = 'fadeInPhase 0.3s ease forwards';
    const onPhaseIn = () => {
      tbPhase.removeEventListener('animationend', onPhaseIn);
      tbPhase.style.animation = 'none';
    };
    tbPhase.addEventListener('animationend', onPhaseIn);
  };
  tbPhase.addEventListener('animationend', onPhaseOut);
  document.getElementById('tb-count').textContent = t('app_tb_phase') + ' ' + n + ' / 6';
  document.getElementById('i-badge').textContent = d.badge;
  document.getElementById('i-name').textContent = d.name;
  document.getElementById('i-desc').textContent = d.desc;
  document.getElementById('i-result').textContent = d.result;
  document.getElementById('i-facts').innerHTML = d.facts.map((f,idx) =>
    `<div class="fact" data-fact-idx="${idx}"><div class="fdot"></div><div class="ftext">${f}</div></div>`
  ).join('');

  document.querySelectorAll('.tl').forEach((el,i) => {
    el.classList.remove('active','done');
    if(i === n) el.classList.add('active');
    else if(i < n) el.classList.add('done');
    el.setAttribute('aria-selected', i === n ? 'true' : 'false');
  });

  const legendEl = document.getElementById('legend');
  const legendItems = getLegendData(n);
  legendEl.innerHTML = `<div class="legend-head">${t('app_legend')}</div>` +
    legendItems.map(item =>
      `<div class="legend-item">
         <span class="legend-dot" style="background:${item.color}"></span>
         <span class="legend-label">${item.label}</span>
       </div>`
    ).join('');

  // Show/hide cell type selector (only for Cytokinesis phase 6)
  const selector = document.getElementById('cell-type-selector');
  if(n === 6){
    selector.classList.add('active');
  } else {
    selector.classList.remove('active');
  }

  // Update progress bar ARIA
  const progFill = document.getElementById('prog-fill');
  progFill.setAttribute('aria-valuenow', Math.round(((n + prog) / 7) * 100));

  sizeCv();
}

function setPhase(n){
  if(n < 0 || n > 6) return;
  if(n === cur) return;
  if(isAnimating) return;

  isAnimating = true;
  prog = 0;
  transNext = n;
  transDir = -1;
  transAlpha = 0;

  renderLegend(n);

  const infoEl = document.getElementById('info');
  const isInitial = cur === -1;

  if(!isInitial){
    infoEl.style.animation = 'fadeOutInfo 0.3s ease forwards';
    let fired = false;
    const onExitEnd = () => {
      if(fired) return;
      fired = true;
      infoEl.removeEventListener('animationend', onExitEnd);
      pendingFadeIn = true;
    };
    infoEl.addEventListener('animationend', onExitEnd);
    setTimeout(onExitEnd, 400); // Fallback in case event is missed
  } else {
    pendingFadeIn = true;
  }
}

function resetSimulation(){
  if(phaseAdvanceTimeout){
    clearTimeout(phaseAdvanceTimeout);
    phaseAdvanceTimeout = null;
  }
  isPlaying=false;
  prog=0;
  transAlpha=0;
  transDir=0;
  transNext=-1;
  isAnimating=false;
  pendingFadeIn=false;
  
  // Forcefully remove any pending animations on info panel
  const infoEl = document.getElementById('info');
  infoEl.style.animation = 'none';
  const iName = document.getElementById('i-name');
  const iDesc = document.getElementById('i-desc');
  iName.classList.remove('appear');
  iDesc.classList.remove('appear');
  iName.style.opacity = '1';
  iDesc.style.opacity = '1';

  autoPhaseAdv = false;
  cytokinesisType = 0;
  document.querySelectorAll('.ct-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelector('.ct-btn[data-type="0"]').classList.add('active');
  cur = -1; // Reset cur so setPhase(0) doesn't return early
  setPhase(0);
  updateAutoBtn();
}

// Navigation handlers
document.getElementById('nav-p').onclick=()=>setPhase(cur-1);
document.getElementById('nav-n').onclick=()=>setPhase(cur+1);

// Auto-play handler
document.getElementById('auto-btn').onclick=()=>{
  if(!isPlaying && phaseAdvanceTimeout){
    clearTimeout(phaseAdvanceTimeout);
    phaseAdvanceTimeout = null;
    // FIX: autoPhaseAdv is now a proper declared variable
    autoPhaseAdv = false;
  }
  isPlaying=!isPlaying;
  if(!isPlaying && phaseAdvanceTimeout){
    clearTimeout(phaseAdvanceTimeout);
    phaseAdvanceTimeout = null;
    autoPhaseAdv = false;
  }
  updateAutoBtn();
};

// Reset handler
document.getElementById('reset-btn').onclick=resetSimulation;

// Timeline click handlers
document.querySelectorAll('.tl').forEach(el=>{
  el.onclick=()=>setPhase(+el.dataset.p);
});

// Cell type selector handlers
document.querySelectorAll('.ct-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.ct-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    cytokinesisType = parseInt(btn.dataset.type);
  });
});

// Keyboard navigation
// FIX: tagName is always UPPERCASE in HTML — was 'input'/'textarea', now 'INPUT'/'TEXTAREA'
document.addEventListener('keydown', (e) => {
  const tag = e.target.tagName;
  if(tag === 'INPUT' || tag === 'TEXTAREA') return;

  switch(e.key){
    case 'ArrowLeft':
      e.preventDefault();
      setPhase(cur - 1);
      break;
    case 'ArrowRight':
      e.preventDefault();
      setPhase(cur + 1);
      break;
    case ' ':
      if(document.activeElement === document.getElementById('auto-btn')){
        e.preventDefault();
        document.getElementById('auto-btn').click();
      }
      break;
    case 'r':
    case 'R':
      e.preventDefault();
      resetSimulation();
      break;
    case '1': setPhase(0); break;
    case '2': setPhase(1); break;
    case '3': setPhase(2); break;
    case '4': setPhase(3); break;
    case '5': setPhase(4); break;
    case '6': setPhase(5); break;
    case '7': setPhase(6); break;
  }
});

// Window resize handler
window.addEventListener('resize',()=>{
  resizeIntro(); initBg(); sizeCv();
});