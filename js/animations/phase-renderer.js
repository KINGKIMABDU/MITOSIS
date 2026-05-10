// Phase Renderers — drawing functions for each mitosis phase

function grid(W,H){
  cx.strokeStyle='rgba(100,100,90,0.02)'; cx.lineWidth=1;
  for(let x=0;x<W;x+=40){cx.beginPath();cx.moveTo(x,0);cx.lineTo(x,H);cx.stroke();}
  for(let y=0;y<H;y+=40){cx.beginPath();cx.moveTo(0,y);cx.lineTo(W,y);cx.stroke();}
}

// ─── INTERPHASE ───────────────────────────────────────────────────────────────
function drawInterphase(W,H,p,t){
  const cx2=W/2, cy2=H/2;
  const pulse=Math.sin(t*.045)*3;
  const rx=W*.27+pulse, ry=H*.3+pulse;
  cell(W,H,rx,ry);
  nucleus(cx2,cy2,rx*.38+pulse*.3,1);
  chromatin(cx2,cy2,rx*.38,1,t);
  // Nucleolus (disappears in Prophase)
  cx.save(); cx.globalAlpha=0.6; cx.fillStyle='rgba(80,60,80,0.8)';
  cx.beginPath(); cx.arc(cx2, cy2, rx*.38*0.2, 0, Math.PI*2); cx.fill();
  cx.restore();

  // G1 / S / G2 sub-phase label that progresses across the phase
  const subPhaseLabels = ['G1', 'S', 'G2'];
  const subPhaseY = cy2 - ry - 10;
  for(let i=0;i<3;i++){
    const start = i * 0.33, end = (i+1) * 0.33;
    const a = Math.max(0, Math.min(1, (p - start) / (end - start)));
    if(a > 0){
      cx.globalAlpha = a;
      label(cx2, subPhaseY + i*15, subPhaseLabels[i], 'rgba(100,100,90,0.35)', 8);
      cx.globalAlpha = 1;
    }
  }

  if(p>0.25){
    const rp=ease(Math.min(1,(p-.25)/.75));
    const nR=rx*.38;
    for(let i=0;i<6;i++){
      const a=(i/6)*Math.PI*2+t*.015;
      const d=nR*.5;
      const px=cx2+Math.cos(a)*d, py=cy2+Math.sin(a)*d*.65;
      cx.globalAlpha=.5; cx.fillStyle='rgba(100,80,100,0.6)';
      cx.beginPath(); cx.arc(px,py,3,0,Math.PI*2); cx.fill();
      if(rp>i/6){
        const ox=6, oy=1;
        cx.fillStyle='rgba(130,110,160,0.6)';
        cx.beginPath(); cx.arc(px+ox,py+oy,3,0,Math.PI*2); cx.fill();
        cx.globalAlpha=.2; cx.strokeStyle='rgba(100,100,90,0.3)'; cx.lineWidth=.8;
        cx.beginPath(); cx.moveTo(px,py); cx.lineTo(px+ox,py+oy); cx.stroke();
      }
      cx.globalAlpha=1;
    }
    if(rp>.2){
      cx.globalAlpha=rp*.5;
      label(cx2,cy2+ry+18,window.t('canvas_dna'),'rgba(100,100,90,0.35)',9);
      cx.globalAlpha=1;
    }
  }
  label(cx2,cy2,window.t('canvas_nucleus'),'rgba(120,90,120,0.35)',8);
}

// ─── PROPHASE ─────────────────────────────────────────────────────────────────
function drawProphase(W,H,p,t){
  const cx2=W/2, cy2=H/2;
  const pulse=Math.sin(t*.045)*2;
  const rx=W*.27+pulse, ry=H*.3+pulse;
  cell(W,H,rx,ry);

  const nR=rx*.38;
  // Nuclear envelope fades but only disappears fully at p≈0.9 (not early)
  const nAlpha=Math.max(0, 1 - p * 1.1);
  if(nAlpha > 0.02) nucleus(cx2,cy2,nR,nAlpha);
  // Nucleolus fades out during Prophase
  if(nAlpha > 0.05){
    cx.save(); cx.globalAlpha = nAlpha * 0.6; cx.fillStyle='rgba(80,60,80,0.8)';
    cx.beginPath(); cx.arc(cx2, cy2, nR*0.2, 0, Math.PI*2); cx.fill();
    cx.restore();
  }

  // Chromosomes condense IN SITU — fixed positions, only size changes
  const eP=ease(p);
  for(let i=0;i<6;i++){
    const pos = NUC_POS[i];
    const sz = CDATA[i].sz * (0.3 + eP * 0.7);
    chrom(cx2+pos.x, cy2+pos.y, sz, CDATA[i].ang,
      'rgba(100,80,100,'+(0.5+eP*0.3)+')', 'rgba(140,120,160,0.6)', Math.min(1, eP*2));
  }

  // Spindle poles form gradually
  const spA = Math.max(0, (p - 0.2) / 0.8);
  if(spA > 0.01){
    const pa = ease(spA);
    pole(cx2, cy2 - H*0.36*pa, pa*0.8);
    pole(cx2, cy2 + H*0.36*pa, pa*0.8);
    if(pa > 0.3){
      for(let i=0;i<6;i++){
        const pos = NUC_POS[i];
        spindle(cx2, cy2 - H*0.36*pa, cx2+pos.x, cy2+pos.y, pa*0.3, t);
        spindle(cx2, cy2 + H*0.36*pa, cx2+pos.x, cy2+pos.y, pa*0.3, t);
      }
    }
  }

  // Vesicles appear as envelope breaks down (starts later now)
  if(p > 0.5){
    drawVesicles(cx2, cy2, nR, (p - 0.5) / 0.5, t);
  }
}

// ─── PROMETAPHASE ─────────────────────────────────────────────────────────────
function drawPrometaphase(W,H,p,t){
  const cx2=W/2, cy2=H/2;
  const pulse=Math.sin(t*.038)*2;
  const rx=W*.27+pulse, ry=H*.3+pulse;
  cell(W,H,rx,ry);

  const eP = ease(p);
  drawVesicles(cx2, cy2, rx*.38, 0.8 + eP*0.2, t);

  pole(cx2, cy2 - H*0.37, 1);
  pole(cx2, cy2 + H*0.37, 1);

  const mp = metaPos(W);
  for(let i=0;i<6;i++){
    const pos = NUC_POS[i];
    const px = lerp(cx2+pos.x, mp[i].x, eP);
    const py = lerp(cy2+pos.y, cy2+mp[i].y, eP);
    chrom(px, py, CDATA[i].sz, CDATA[i].ang, 'rgba(100,80,100,0.8)', 'rgba(140,120,160,0.6)');
    if(eP > 0.2){
      const sA = 0.4 * Math.min(1, (eP-0.2)/0.8);
      spindle(cx2, cy2 - H*0.37, px, py, sA, t);
      spindle(cx2, cy2 + H*0.37, px, py, sA, t);
    }
  }
}

// ─── METAPHASE ────────────────────────────────────────────────────────────────
function drawMetaphase(W,H,p,t){
  const cx2=W/2, cy2=H/2;
  const pulse=Math.sin(t*.038)*2;
  cell(W,H,W*.27+pulse,H*.3+pulse);
  pole(cx2,cy2-H*.37); pole(cx2,cy2+H*.37);

  cx.save(); cx.strokeStyle='rgba(100,100,90,0.12)'; cx.lineWidth=.8;
  cx.setLineDash([3,6]); cx.beginPath();
  cx.moveTo(cx2-W*.25,cy2); cx.lineTo(cx2+W*.25,cy2); cx.stroke();
  cx.setLineDash([]); cx.restore();
  label(cx2+W*.28,cy2+3,window.t('canvas_equator'),'rgba(100,100,90,0.2)',8);

  const mp=metaPos(W);
  const eP=ease(p);
  for(let i=0;i<6;i++){
    const px=lerp(cx2+NUC_POS[i].x, mp[i].x, eP);
    const py=lerp(cy2+NUC_POS[i].y, cy2+mp[i].y, eP);
    chrom(px,py,CDATA[i].sz,CDATA[i].ang,'rgba(100,80,100,0.8)','rgba(140,120,160,0.6)');
    if(eP>.3){
      const sA=(0.6*(eP-.3)/.7);
      spindle(cx2,cy2-H*.37,px,py,sA,t);
      spindle(cx2,cy2+H*.37,px,py,sA,t);
    }
  }

  // M-Checkpoint label fades in at p > 0.7
  if(p > 0.7){
    const cpA = Math.min(1, (p-0.7)/0.3);
    cx.globalAlpha = cpA * 0.6;
    label(cx2, cy2 - H*0.25, window.t('canvas_checkpoint'), 'rgba(100,100,90,0.55)', 9);
    cx.globalAlpha = 1;
  }
}

// ─── ANAPHASE ─────────────────────────────────────────────────────────────────
//
// SCIENTIFIC FIX:
//   Before: separated chromatids were still drawn as X-shapes (two sister
//   chromatids joined at a centromere) — but that shape only exists BEFORE
//   centromere splitting. After Anaphase-A the centromere has split and each
//   chromosome is a single V/J shape with the centromere leading toward the pole.
//
//   After: `chromSingle()` draws a V-shape — two arms spreading away from a
//   leading centromere — which accurately represents a post-separation chromatid.
//
function chromSingle(x, y, sz, ang, towardPole, c1, c2, alpha){
  // towardPole: +1 = moving upward (toward top pole), -1 = downward
  if(alpha === undefined) alpha = 1;
  cx.save();
  cx.globalAlpha = alpha;
  cx.translate(x, y);
  // Rotate so the centromere points toward the pole
  cx.rotate(ang + (towardPole > 0 ? -Math.PI/2 : Math.PI/2));
  const L = sz;
  const W2 = sz * 0.32;
  cx.lineCap = 'round';
  cx.lineJoin = 'round';
  // Two arms spreading from the centromere (V-shape)
  cx.strokeStyle = c1;
  cx.lineWidth = W2;
  cx.beginPath(); cx.moveTo(0, 0); cx.lineTo(-L * 0.8, L * 1.1); cx.stroke();
  cx.beginPath(); cx.moveTo(0, 0); cx.lineTo( L * 0.8, L * 1.1); cx.stroke();
  // Centromere dot (leading end toward pole)
  cx.fillStyle = c2;
  cx.beginPath(); cx.arc(0, 0, W2 * 0.55, 0, Math.PI * 2); cx.fill();
  cx.restore();
}

function drawAnaphase(W,H,p,t){
  const cx2=W/2, cy2=H/2;

  // A: chromatids separate (0–60%)   B: poles move apart / cell elongates (40–100%)
  const aPhase = Math.min(1, p / 0.6);
  const bPhase = Math.max(0, (p - 0.4) / 0.6);

  const elongY = ease(bPhase) * H * 0.18;
  cell(W, H, W*.27 + ease(bPhase)*W*.07, H*.3 + elongY);

  const poleOff = H*.37 + elongY;
  pole(cx2, cy2-poleOff); pole(cx2, cy2+poleOff);

  const mp = metaPos(W);
  const travel = ease(aPhase) * H * .28;

  for(let i=0;i<6;i++){
    const bx = mp[i].x;
    const col = 'rgba(100,80,100,0.8)';
    const c2  = 'rgba(160,120,120,0.6)';

    if(aPhase < 0.08){
      // Still X-shaped right at the moment of separation (centromere not yet split)
      chrom(bx, cy2 - travel, CDATA[i].sz, CDATA[i].ang, col, c2);
      chrom(bx, cy2 + travel, CDATA[i].sz, CDATA[i].ang, col, c2);
    } else {
      // SCIENTIFIC FIX: V-shaped single chromatids after centromere splitting
      chromSingle(bx, cy2 - travel, CDATA[i].sz, CDATA[i].ang,  1, col, c2);
      chromSingle(bx, cy2 + travel, CDATA[i].sz, CDATA[i].ang, -1, col, c2);
    }

    if(aPhase < .9){
      const fa=Math.max(0,(1-aPhase/.9)*.4);
      spindle(cx2,cy2-poleOff, bx, cy2-travel, fa, t);
      spindle(cx2,cy2+poleOff, bx, cy2+travel, fa, t);
    }
  }

  if(p > 0.1 && p < 0.5){
    cx.globalAlpha=0.4;
    label(cx2, cy2-poleOff-15, window.t('canvas_ana_a'), 'rgba(100,100,90,0.4)', 8);
    cx.globalAlpha=1;
  }
  if(p > 0.5){
    cx.globalAlpha=0.4;
    label(cx2, cy2+poleOff+18, window.t('canvas_ana_b'), 'rgba(100,100,90,0.4)', 8);
    cx.globalAlpha=1;
  }
}

// ─── TELOPHASE ────────────────────────────────────────────────────────────────
function drawTelophase(W,H,p,t){
  const cx2=W/2, cy2=H/2;
  const eP=ease(p);

  // Cell is elongated (from Anaphase) and starts to constrict
  const cellRy = H * 0.38;
  const cellRx = W * 0.30;
  cell(W, H, cellRx - eP*W*.03, cellRy);

  const nOff = cellRy * 0.52;
  const nR   = Math.max(3, eP * cellRy * 0.28);

  if(nR > 2){
    // ── Top nucleus ──
    nucleus(cx2, cy2-nOff, nR, eP, 'rgba(120,90,120,');
    if(eP > 0.3){
      const chrA = Math.min(1, (eP-0.3)*2);
      for(let i=0;i<6;i++){
        const a = (i/6)*Math.PI*2 + t*0.01;
        chrom(cx2 + Math.cos(a)*nR*0.5,
              cy2-nOff + Math.sin(a)*nR*0.5*0.65,
              CDATA[i].sz*0.65, CDATA[i].ang,
              'rgba(100,80,100,'+chrA+')', 'rgba(140,120,160,0.5)', chrA);
      }
    }
    if(eP > 0.6){
      chromatin(cx2, cy2-nOff, nR*0.7, (eP-0.6)*0.5, t);
    }

    // ── Bottom nucleus ──
    nucleus(cx2, cy2+nOff, nR, eP, 'rgba(120,90,120,');
    if(eP > 0.3){
      const chrA = Math.min(1, (eP-0.3)*2);
      for(let i=0;i<6;i++){
        const a = (i/6)*Math.PI*2 + t*0.01 + Math.PI/6;
        chrom(cx2 + Math.cos(a)*nR*0.5,
              cy2+nOff + Math.sin(a)*nR*0.5*0.65,
              CDATA[i].sz*0.65, CDATA[i].ang,
              'rgba(100,80,100,'+chrA+')', 'rgba(140,120,160,0.5)', chrA);
      }
    }
    if(eP > 0.6){
      chromatin(cx2, cy2+nOff, nR*0.7, (eP-0.6)*0.5, t);
    }
  }

  // Spindle remnants fade out
  if(eP < 0.7){
    const ra = (1 - eP/0.7) * 0.3;
    cx.save(); cx.strokeStyle='rgba(140,120,80,'+ra+')'; cx.lineWidth=0.8;
    cx.beginPath(); cx.moveTo(cx2-W*.2,cy2-nOff); cx.lineTo(cx2+W*.2,cy2-nOff); cx.stroke();
    cx.beginPath(); cx.moveTo(cx2-W*.2,cy2+nOff); cx.lineTo(cx2+W*.2,cy2+nOff); cx.stroke();
    cx.restore();
  }
}

// ─── CYTOKINESIS DISPATCHER ───────────────────────────────────────────────────
function drawCytokinese(W,H,p,t){
  if(cytokinesisType === 0)      drawCytokineseTier(W,H,p,t);
  else if(cytokinesisType === 1) drawCytokineseMensch(W,H,p,t);
  else                           drawCytokinesePflanze(W,H,p,t);
}

// ─── CYTOKINESIS HELPER: figure-8 / hourglass outline ────────────────────────
function _drawHourglass(cx2, cy2, dR, waistRx){
  const topCy = cy2 - dR;
  const botCy = cy2 + dR;
  const k = 0.55;

  cx.beginPath();
  cx.moveTo(cx2, topCy - dR);

  cx.bezierCurveTo(cx2 + dR*k,  topCy - dR,
                   cx2 + dR,    topCy - dR*k,
                   cx2 + dR,    topCy);

  cx.bezierCurveTo(cx2 + dR,      cy2 - dR*0.25,
                   cx2 + waistRx, cy2 - 1,
                   cx2 + waistRx, cy2);

  cx.bezierCurveTo(cx2 + waistRx, cy2 + 1,
                   cx2 + dR,      cy2 + dR*0.25,
                   cx2 + dR,      botCy);

  cx.bezierCurveTo(cx2 + dR,    botCy + dR*k,
                   cx2 + dR*k,  botCy + dR,
                   cx2,         botCy + dR);

  cx.bezierCurveTo(cx2 - dR*k,  botCy + dR,
                   cx2 - dR,    botCy + dR*k,
                   cx2 - dR,    botCy);

  cx.bezierCurveTo(cx2 - dR,      cy2 + dR*0.25,
                   cx2 - waistRx, cy2 + 1,
                   cx2 - waistRx, cy2);

  cx.bezierCurveTo(cx2 - waistRx, cy2 - 1,
                   cx2 - dR,      cy2 - dR*0.25,
                   cx2 - dR,      topCy);

  cx.bezierCurveTo(cx2 - dR,    topCy - dR*k,
                   cx2 - dR*k,  topCy - dR,
                   cx2,         topCy - dR);

  cx.closePath();
}

// ─── TIERZELLE (Animal cell cytokinesis) ──────────────────────────────────────
function drawCytokineseTier(W,H,p,t){
  const cx2=W/2, cy2=H/2;
  const eP=ease(p);

  const dR = Math.min(W, H) * 0.28;
  const topCy = cy2 - dR;
  const botCy = cy2 + dR;

  const waistRx = Math.max(1.5, dR * (1 - eP * 0.98));

  _drawHourglass(cx2, cy2, dR, waistRx);

  const g = cx.createRadialGradient(cx2,cy2,0, cx2,cy2, dR*1.4);
  g.addColorStop(0,'rgba(230,235,220,0.55)');
  g.addColorStop(1,'rgba(210,218,200,0.30)');
  cx.fillStyle = g;
  cx.fill();
  cx.strokeStyle = 'rgba(100,110,95,0.45)';
  cx.lineWidth = 1.5;
  cx.stroke();

  // Contractile ring (actin/myosin) at the waist
  if(eP > 0.08){
    const ringA = Math.min(1, (eP - 0.08) * 2);
    cx.save();
    cx.globalAlpha = ringA * 0.75;
    cx.strokeStyle = 'rgba(139,115,85,0.9)';
    cx.lineWidth   = Math.max(1, 3.5 * (1 - eP * 0.7));
    cx.beginPath();
    cx.moveTo(cx2 - waistRx - 8, cy2 - 4);
    cx.quadraticCurveTo(cx2, cy2 + 3, cx2 + waistRx + 8, cy2 - 4);
    cx.stroke();
    cx.beginPath();
    cx.moveTo(cx2 - waistRx - 8, cy2 + 4);
    cx.quadraticCurveTo(cx2, cy2 - 3, cx2 + waistRx + 8, cy2 + 4);
    cx.stroke();
    cx.restore();
  }

  const nR = dR * 0.32;
  if(nR > 2){
    nucleus(cx2, topCy, nR, eP, 'rgba(120,90,120,');
    nucleus(cx2, botCy, nR, eP, 'rgba(120,90,120,');

    if(eP > 0.3){
      const chrA = Math.min(1, (eP-0.3)*1.4);
      for(let i=0;i<6;i++){
        const aTop = (i/6)*Math.PI*2 + t*0.008;
        chrom(cx2 + Math.cos(aTop)*nR*0.48,
              topCy + Math.sin(aTop)*nR*0.48*0.65,
              nR*0.48, aTop,
              'rgba(100,80,100,'+chrA+')', 'rgba(140,120,160,0.5)', chrA);

        const aBot = aTop + Math.PI/6;
        chrom(cx2 + Math.cos(aBot)*nR*0.48,
              botCy + Math.sin(aBot)*nR*0.48*0.65,
              nR*0.48, aBot,
              'rgba(100,80,100,'+chrA+')', 'rgba(140,120,160,0.5)', chrA);
      }
    }
  }

  if(eP > 0.55){
    const la = (eP-0.55)/0.45;
    cx.globalAlpha = la;
    label(cx2, topCy - dR - 12, window.t('canvas_daughter_1'), 'rgba(100,100,90,0.5)', 10);
    label(cx2, botCy + dR + 18, window.t('canvas_daughter_2'), 'rgba(100,100,90,0.5)', 10);
    cx.globalAlpha = 1;
  }
}

// ─── MENSCHENZELLE ────────────────────────────────────────────────────────────
function drawCytokineseMensch(W,H,p,t){
  drawCytokineseTier(W,H,p,t);

  const cx2=W/2, cy2=H/2;
  const eP=ease(p);
  const dR = Math.min(W,H) * 0.28;
  const topCy = cy2 - dR;
  const botCy = cy2 + dR;

  if(eP > 0.3){
    const lA = Math.min(1, (eP-0.3)*1.3);
    cx.save();
    cx.globalAlpha = lA;
    cx.font='bold 9px "Segoe UI",Arial,sans-serif';
    cx.fillStyle='rgba(80,80,130,0.9)';
    cx.textAlign='center';
    cx.fillText(window.t('canvas_human_46'), cx2, topCy - dR - 26);
    cx.font='8px "Segoe UI",Arial,sans-serif';
    cx.fillStyle='rgba(80,80,130,0.7)';
    cx.fillText(window.t('canvas_cleavage'), cx2, botCy + dR + 32);
    cx.restore();
  }
}

// ─── PFLANZENZELLE ────────────────────────────────────────────────────────────
// Plant cytokinesis: one rigid parent cell wall, cell plate grows at cy2,
// two daughter cells each occupy their own half of the parent.
function drawCytokinesePflanze(W,H,p,t){
  const cx2=W/2, cy2=H/2;
  const eP=ease(p);

  // Parent cell wall — rectangular (plant cells have a rigid wall)
  const parentRx = W  * 0.33;
  const parentRy = H  * 0.38;

  cx.save();
  // fill parent cell body
  const gParent = cx.createLinearGradient(cx2-parentRx, cy2, cx2+parentRx, cy2);
  gParent.addColorStop(0, 'rgba(220,228,210,0.35)');
  gParent.addColorStop(1, 'rgba(210,220,200,0.25)');
  cx.fillStyle = gParent;
  cx.beginPath();
  cx.roundRect(cx2 - parentRx, cy2 - parentRy, parentRx*2, parentRy*2, 6);
  cx.fill();
  cx.strokeStyle = 'rgba(90,105,80,0.55)';
  cx.lineWidth = 2.5;
  cx.stroke();
  cx.restore();

  // Each daughter cell center sits in the middle of its half
  // top half: cy2 - parentRy  ..  cy2
  // bot half: cy2             ..  cy2 + parentRy
  const halfH   = parentRy * 0.5;            // half the parent interior
  const topCy   = cy2 - halfH;               // centre of top daughter
  const botCy   = cy2 + halfH;               // centre of bottom daughter
  const dCellRx = parentRx * 0.78;           // daughter cell x-radius
  const dCellRy = halfH    * 0.82;           // daughter cell y-radius (fits in half)

  // Draw daughter cell bodies (ellipses inside the parent wall)
  drawSingleCell(cx2, topCy, dCellRx, dCellRy, Math.min(1, eP*1.3));
  drawSingleCell(cx2, botCy, dCellRx, dCellRy, Math.min(1, eP*1.3));

  // Nuclei — centred inside each daughter half
  const nR = dCellRy * 0.38;
  if(nR > 2){
    nucleus(cx2, topCy, nR, eP, 'rgba(120,90,120,');
    nucleus(cx2, botCy, nR, eP, 'rgba(120,90,120,');

    if(eP > 0.25){
      const chrA = Math.min(1, (eP-0.25)*1.5);
      for(let i=0;i<6;i++){
        const aTop = (i/6)*Math.PI*2 + t*0.008;
        chrom(cx2 + Math.cos(aTop)*nR*0.46,
              topCy + Math.sin(aTop)*nR*0.46*0.65,
              nR*0.44, aTop,
              'rgba(100,80,100,'+chrA+')', 'rgba(140,120,160,0.5)', chrA);
        const aBot = aTop + Math.PI/6;
        chrom(cx2 + Math.cos(aBot)*nR*0.46,
              botCy + Math.sin(aBot)*nR*0.46*0.65,
              nR*0.44, aBot,
              'rgba(100,80,100,'+chrA+')', 'rgba(140,120,160,0.5)', chrA);
      }
    }
    // Chromatin decondenses later in the phase
    if(eP > 0.65){
      const chA = (eP-0.65)/0.35 * 0.45;
      chromatin(cx2, topCy, nR*0.7, chA, t);
      chromatin(cx2, botCy, nR*0.7, chA, t);
    }
  }

  // ── Cell plate at cy2 — grows from centre outward ──
  if(eP > 0.02){
    const maxW     = parentRx * 0.96;
    const plateW   = Math.min(eP * parentRx * 1.05, maxW);
    const plateA   = Math.min(1, eP * 1.8);
    const plateThk = 5;

    cx.save();
    // Plate fill (cellulose colour)
    cx.fillStyle = 'rgba(180,162,110,' + (plateA * 0.82) + ')';
    cx.fillRect(cx2 - plateW, cy2 - plateThk/2, plateW*2, plateThk);
    // Plate border
    cx.strokeStyle = 'rgba(130,108,65,' + plateA + ')';
    cx.lineWidth = 1.5;
    cx.strokeRect(cx2 - plateW, cy2 - plateThk/2, plateW*2, plateThk);

    // Growing vesicles at the plate tips (phragmoplast) — fade out as plate completes
    if(eP < 0.80){
      const vA = (1 - eP/0.80) * 0.6;
      const tipX = cx2 + plateW;
      for(let side = -1; side <= 1; side += 2){
        for(let i=0;i<4;i++){
          const vx = cx2 + side*(plateW + 3 + i*6) + Math.sin(t*0.03+i)*2;
          const vy = cy2 + (Math.random()-0.5)*3;
          cx.globalAlpha = vA * (1 - i*0.2);
          cx.fillStyle = 'rgba(210,190,145,0.75)';
          cx.beginPath(); cx.arc(vx, vy, 2.2, 0, Math.PI*2); cx.fill();
        }
      }
      cx.globalAlpha = 1;
    }
    cx.restore();
  }

  // Labels
  if(eP > 0.4){
    const la = Math.min(1,(eP-0.4)/0.4);
    cx.globalAlpha = la;
    label(cx2, cy2 - parentRy - 10, window.t('canvas_plant_1'), 'rgba(90,100,80,0.6)', 9);
    label(cx2, cy2 + parentRy + 16, window.t('canvas_plant_2'), 'rgba(90,100,80,0.6)', 9);
    cx.globalAlpha = 1;
  }
  if(eP > 0.15){
    const la2 = Math.min(1,(eP-0.15)/0.35);
    cx.globalAlpha = la2 * 0.7;
    label(cx2, cy2 + parentRy + 30, window.t('canvas_cellplate'), 'rgba(130,108,65,0.7)', 8);
    cx.globalAlpha = 1;
  }
}