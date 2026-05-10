// Simulation Helpers — drawing functions and shared data

function lerp(a,b,t){return a+(b-a)*Math.max(0,Math.min(1,t))}
function ease(t){return t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2}

// Chromosome layout data
const CDATA=[
  {ang:.12,sz:12},{ang:-.14,sz:13},{ang:.22,sz:11},
  {ang:-.09,sz:12},{ang:.05,sz:13},{ang:-.18,sz:11}
];

// Chromosome positions within the nucleus (in situ, center-relative)
const NUC_POS = [
  {x:-12,y:-8},{x:10,y:-10},{x:-8,y:6},
  {x:14,y:8},{x:-16,y:2},{x:6,y:-4}
];

function metaPos(W){
  const cx2=W/2;
  return CDATA.map((_,i)=>({x:cx2+(i-2.5)*22, y:0}));
}

function cell(W,H,rx,ry){
  const cx2=W/2, cy2=H/2;
  const g=cx.createRadialGradient(cx2,cy2,0,cx2,cy2,Math.max(rx,ry));
  g.addColorStop(0,'rgba(230,235,220,0.5)');
  g.addColorStop(1,'rgba(210,218,200,0.3)');
  cx.beginPath(); cx.ellipse(cx2,cy2,rx,ry,0,0,Math.PI*2);
  cx.fillStyle=g; cx.fill();
  cx.strokeStyle='rgba(100,110,95,0.4)'; cx.lineWidth=1.5;
  cx.beginPath(); cx.ellipse(cx2,cy2,rx,ry,0,0,Math.PI*2); cx.stroke();
}

function nucleus(x,y,r,alpha,col,colorPrefix){
  if(alpha===undefined) alpha=1;
  if(col===undefined && colorPrefix===undefined) col='rgba(120,90,120,';
  if(col===undefined && colorPrefix!==undefined) col=colorPrefix;
  if(r<2)return;
  cx.save(); cx.globalAlpha=alpha;
  const g=cx.createRadialGradient(x,y,0,x,y,r);
  g.addColorStop(0,col+(alpha*0.35)+')');
  g.addColorStop(1,col+(alpha*0.2)+')');
  cx.beginPath(); cx.arc(x,y,r,0,Math.PI*2);
  cx.fillStyle=g; cx.fill();
  cx.strokeStyle=col+(alpha*0.5)+')'; cx.lineWidth=1.2;
  cx.beginPath(); cx.arc(x,y,r,0,Math.PI*2); cx.stroke();
  cx.restore();
}

function chromatin(x,y,r,alpha,t){
  const n=14;
  cx.save(); cx.globalAlpha=alpha;
  for(let i=0;i<n;i++){
    const a=(i/n)*Math.PI*2+t*.012*(i%3-1);
    const d=(i%3)*.28*r+Math.sin(t*.018+i)*3;
    const px=x+Math.cos(a)*d, py=y+Math.sin(a)*d*.65;
    cx.fillStyle='rgba(100,80,100,'+(alpha*0.5)+')';
    cx.beginPath(); cx.arc(px,py,1.6,0,Math.PI*2); cx.fill();
  }
  cx.restore();
}

function chrom(x,y,sz,ang,c1,c2,alpha){
  if(alpha===undefined) alpha=1;
  cx.save(); cx.globalAlpha=alpha;
  cx.translate(x,y); cx.rotate(ang);
  const L=sz, W2=sz*.36;
  cx.lineCap='round'; cx.lineJoin='round';
  cx.strokeStyle=c1; cx.lineWidth=W2;
  cx.beginPath(); cx.moveTo(-L,-L); cx.lineTo(L,L); cx.stroke();
  cx.beginPath(); cx.moveTo(L,-L); cx.lineTo(-L,L); cx.stroke();
  cx.strokeStyle=c2; cx.lineWidth=W2*.28;
  cx.beginPath(); cx.moveTo(-L*.48,-L*.48); cx.lineTo(L*.48,L*.48); cx.stroke();
  cx.beginPath(); cx.moveTo(L*.48,-L*.48); cx.lineTo(-L*.48,L*.48); cx.stroke();
  cx.fillStyle=c2; cx.beginPath(); cx.arc(0,0,W2*.52,0,Math.PI*2); cx.fill();
  cx.restore();
}

function spindle(x1,y1,x2,y2,a,t){
  if(a===undefined) a=0.4;
  if(t===undefined) t=0;
  cx.save(); cx.globalAlpha=a;
  cx.strokeStyle='rgba(140,120,80,0.4)'; cx.lineWidth=.8;
  cx.setLineDash([4,5]); cx.lineDashOffset=-t*.04;
  cx.beginPath(); cx.moveTo(x1,y1); cx.lineTo(x2,y2); cx.stroke();
  cx.setLineDash([]); cx.restore();
}

function pole(x,y,a){
  if(a===undefined) a=1;
  cx.save(); cx.globalAlpha=a;
  cx.strokeStyle='rgba(140,120,80,0.5)'; cx.lineWidth=1.2;
  cx.beginPath(); cx.arc(x,y,5,0,Math.PI*2); cx.stroke();
  cx.fillStyle='rgba(140,120,80,0.4)'; cx.beginPath(); cx.arc(x,y,2.5,0,Math.PI*2); cx.fill();
  cx.restore();
}

function label(x,y,txt,col,fs){
  if(col===undefined) col='rgba(100,100,90,0.4)';
  if(fs===undefined) fs=9;
  cx.save(); cx.font=fs+'px "Segoe UI",Arial,sans-serif';
  cx.fillStyle=col; cx.textAlign='center';
  cx.fillText(txt,x,y); cx.restore();
}

function drawSingleCell(cx2, cy2, rx, ry, alpha){
  cx.save(); cx.globalAlpha=alpha;
  const g=cx.createRadialGradient(cx2,cy2,0,cx2,cy2,Math.max(rx,ry));
  g.addColorStop(0,'rgba(230,235,220,0.5)');
  g.addColorStop(1,'rgba(210,218,200,0.3)');
  cx.beginPath(); cx.ellipse(cx2,cy2,rx,ry,0,0,Math.PI*2);
  cx.fillStyle=g; cx.fill();
  cx.strokeStyle='rgba(100,110,95,0.4)'; cx.lineWidth=1.5;
  cx.beginPath(); cx.ellipse(cx2,cy2,rx,ry,0,0,Math.PI*2); cx.stroke();
  cx.restore();
}

// Nuclear envelope vesicles (for prophase/prometaphase)
function drawVesicles(cx2, cy2, nR, p, t) {
  const count = 12;
  cx.save();
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2 + t * 0.008;
    const dist = nR * (0.8 + p * 0.6);
    const vx = cx2 + Math.cos(a) * dist + Math.sin(t * 0.01 + i) * (p * 12);
    const vy = cy2 + Math.sin(a) * dist * 0.65 + Math.cos(t * 0.012 + i) * (p * 8);
    const vr = 2 + p * 3 + Math.sin(t * 0.02 + i) * 1;
    const alpha = Math.min(1, p * 2) * (0.3 + Math.sin(t * 0.015 + i) * 0.2);
    cx.globalAlpha = alpha;
    cx.fillStyle = 'rgba(160,130,160,0.5)';
    cx.beginPath(); cx.arc(vx, vy, vr, 0, Math.PI * 2); cx.fill();
    cx.strokeStyle = 'rgba(120,90,120,0.4)'; cx.lineWidth = 0.8;
    cx.beginPath(); cx.arc(vx, vy, vr, 0, Math.PI * 2); cx.stroke();
  }
  cx.restore();
}
