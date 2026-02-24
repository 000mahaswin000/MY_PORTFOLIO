import { useRef, useEffect, useState, useCallback } from 'react';
import { motion } from 'motion/react';
import { Send, Github, Twitter, Linkedin, Instagram, Mail, MapPin } from 'lucide-react';

// ── Detailed continent outlines (lat, lon) ────────────────────────────
const continents: number[][][] = [
  // North America
  [
    [60,-142],[62,-137],[64,-139],[66,-140],[68,-144],[70,-150],[71,-156],
    [71,-162],[70,-165],[65,-168],[63,-165],[60,-163],[58,-160],[56,-159],
    [55,-162],[54,-165],[53,-169],[55,-160],[57,-155],[58,-150],[60,-147],
    [60,-142],
  ],
  // NA mainland
  [
    [70,-140],[72,-130],[74,-123],[76,-120],[74,-95],[72,-85],[70,-83],
    [68,-78],[67,-76],[66,-65],[64,-63],[60,-64],[55,-58],[47,-53],
    [44,-59],[43,-63],[42,-66],[41,-69],[40,-74],[38,-75],[36,-76],
    [35,-76],[33,-78],[30,-81],[28,-82],[25,-80],[24,-82],[25,-88],
    [26,-90],[28,-94],[26,-97],[25,-97],[22,-97],[19,-96],[17,-92],
    [16,-89],[15,-88],[14,-87],[12,-84],[10,-83],[8,-77],[7,-76],
    [9,-79],[14,-84],[16,-87],[17,-91],[18,-94],[20,-96],[21,-97],
    [22,-100],[24,-104],[26,-106],[28,-109],[30,-112],[31,-114],[32,-117],
    [33,-118],[35,-120],[37,-122],[39,-123],[41,-124],[43,-124],[45,-124],
    [48,-124],[50,-127],[52,-129],[54,-130],[56,-132],[57,-135],[58,-136],
    [60,-140],[62,-144],[64,-141],[66,-139],[68,-138],[70,-140],
  ],
  // Greenland
  [
    [76,-19],[78,-18],[80,-19],[82,-22],[83,-30],[83,-42],[82,-50],
    [80,-56],[78,-60],[76,-67],[74,-58],[72,-55],[70,-52],[68,-51],
    [66,-44],[64,-42],[63,-40],[62,-42],[62,-44],[61,-46],[61,-48],
    [63,-50],[64,-52],[66,-53],[68,-54],[70,-54],[72,-52],[74,-50],
    [76,-48],[78,-44],[80,-36],[81,-26],[80,-20],[78,-18],[76,-19],
  ],
  // South America
  [
    [12,-70],[11,-73],[10,-75],[8,-77],[7,-77],[5,-77],[3,-78],
    [0,-80],[-2,-80],[-4,-79],[-5,-81],[-7,-80],[-8,-79],[-10,-78],
    [-12,-77],[-14,-76],[-16,-73],[-18,-71],[-20,-70],[-22,-70],
    [-24,-70],[-26,-69],[-28,-70],[-30,-71],[-33,-72],[-36,-73],
    [-38,-73],[-40,-72],[-42,-72],[-44,-72],[-46,-75],[-48,-74],
    [-50,-74],[-52,-70],[-54,-68],[-55,-66],[-54,-64],[-52,-68],
    [-50,-70],[-48,-66],[-46,-67],[-44,-65],[-40,-62],[-38,-58],
    [-36,-56],[-34,-53],[-32,-52],[-30,-50],[-28,-48],[-26,-47],
    [-24,-46],[-22,-44],[-20,-40],[-18,-38],[-16,-39],[-14,-38],
    [-12,-37],[-10,-36],[-8,-35],[-6,-35],[-4,-34],[-2,-44],
    [0,-50],[2,-51],[4,-52],[5,-56],[7,-58],[8,-60],[10,-62],
    [11,-67],[12,-70],
  ],
  // Africa
  [
    [37,-5],[36,-3],[35,0],[36,3],[37,10],[36,12],[34,11],
    [33,12],[30,10],[28,10],[24,10],[20,10],[18,10],[15,10],
    [12,10],[10,10],[8,10],[6,10],[5,8],[4,5],[4,2],
    [5,-2],[6,-5],[8,-8],[10,-12],[12,-14],[14,-16],[16,-17],
    [18,-16],[20,-17],[22,-16],[24,-15],[26,-14],[28,-13],
    [30,-10],[32,-8],[34,-5],[36,-5],[37,-5],
  ],
  // Africa east coast
  [
    [37,10],[36,12],[34,11],[33,12],[32,24],[30,32],[28,33],
    [25,35],[22,37],[18,40],[14,42],[10,42],[8,44],[5,42],
    [2,41],[0,42],[-4,40],[-8,38],[-12,38],[-16,36],
    [-20,35],[-24,33],[-28,30],[-32,28],[-34,26],[-34,18],
    [-30,16],[-28,14],[-24,12],[-20,12],[-16,12],[-12,12],
    [-8,10],[-4,8],[0,5],[4,5],[5,8],[6,10],[8,10],
    [10,10],[12,10],[15,10],[18,10],[20,10],[24,10],[28,10],
    [30,10],[33,12],[34,11],[36,12],[37,10],
  ],
  // Europe
  [
    [71,28],[70,25],[68,20],[66,14],[64,10],[62,5],[60,5],
    [58,8],[56,8],[54,10],[52,6],[50,3],[48,0],[46,-1],
    [44,0],[43,3],[42,3],[40,0],[38,-4],[36,-6],[36,-5],
    [37,-2],[38,0],[39,2],[40,3],[42,5],[43,8],[44,12],
    [44,15],[42,16],[40,18],[38,20],[37,22],[36,28],[38,26],
    [40,26],[42,28],[44,28],[46,30],[48,32],[50,35],[52,38],
    [54,40],[56,42],[58,44],[60,48],[62,42],[64,38],[66,32],
    [68,30],[70,28],[71,28],
  ],
  // Asia (simplified large shape)
  [
    [71,28],[71,50],[72,60],[74,70],[76,80],[76,100],[74,110],
    [72,120],[71,130],[70,140],[68,150],[66,160],[64,165],[62,168],
    [60,170],[58,162],[56,155],[54,142],[52,141],[50,140],
    [48,135],[46,134],[44,132],[42,131],[40,130],[38,127],
    [36,126],[34,128],[32,131],[30,122],[28,120],[26,118],
    [24,115],[22,114],[20,110],[18,108],[16,108],[14,109],
    [12,108],[10,106],[8,105],[6,104],[4,103],[2,104],
    [0,104],[-2,106],[-4,105],[-6,106],[-8,110],[-8,115],
    [-6,118],[-4,116],[-2,112],[0,110],[2,108],[4,108],
    [6,106],[8,108],[10,104],[8,100],[6,100],[4,98],
    [2,98],[0,96],[-2,98],[0,100],[4,102],
    [6,103],[8,102],[10,100],[12,99],[14,100],[16,100],
    [18,98],[20,96],[22,92],[24,88],[26,84],[28,78],
    [26,72],[24,68],[22,62],[20,58],[22,55],[24,56],
    [26,56],[28,55],[30,50],[32,48],[34,46],[36,44],
    [38,44],[40,44],[42,42],[44,40],[46,38],[48,36],
    [50,38],[52,40],[54,42],[56,44],[58,48],[60,50],
    [62,48],[64,42],[66,36],[68,32],[70,30],[71,28],
  ],
  // India
  [
    [28,78],[26,72],[24,68],[22,72],[20,73],[18,73],[16,74],
    [14,75],[12,76],[10,76],[8,77],[8,78],[10,80],[12,80],
    [14,80],[16,80],[18,80],[20,84],[22,88],[24,88],[26,84],
    [28,78],
  ],
  // Australia
  [
    [-14,129],[-12,132],[-12,136],[-14,136],[-16,139],[-18,140],
    [-20,141],[-22,144],[-24,148],[-26,150],[-28,153],[-30,153],
    [-32,152],[-34,151],[-36,150],[-38,148],[-38,146],[-38,144],
    [-38,140],[-36,137],[-34,136],[-32,134],[-32,132],[-30,128],
    [-28,124],[-26,120],[-24,116],[-22,114],[-20,114],[-18,116],
    [-16,120],[-14,124],[-14,129],
  ],
  // Japan
  [
    [45,142],[44,144],[42,143],[40,140],[38,139],[36,138],
    [34,136],[32,132],[31,131],[33,132],[35,133],[37,136],
    [39,140],[41,141],[43,142],[45,142],
  ],
  // UK / Ireland
  [
    [58,-6],[57,-4],[56,-3],[55,-2],[54,-1],[53,0],[52,1],
    [51,1],[50,0],[50,-2],[51,-5],[52,-5],[53,-4],[54,-5],
    [55,-6],[56,-7],[57,-6],[58,-6],
  ],
  // New Zealand
  [
    [-35,174],[-36,175],[-38,176],[-40,176],[-42,174],
    [-44,170],[-46,168],[-46,166],[-44,168],[-42,172],
    [-40,174],[-38,176],[-36,175],[-35,174],
  ],
];

// Cloud data – random lat/lon clusters
function generateClouds(count: number): { lat: number; lon: number; size: number; opacity: number }[] {
  const clouds: { lat: number; lon: number; size: number; opacity: number }[] = [];
  const seed = 42;
  const rng = (i: number) => {
    const x = Math.sin(seed + i * 127.1 + i * i * 0.013) * 43758.5453;
    return x - Math.floor(x);
  };
  for (let i = 0; i < count; i++) {
    clouds.push({
      lat: (rng(i * 3) - 0.5) * 140,
      lon: (rng(i * 3 + 1) - 0.5) * 360,
      size: 4 + rng(i * 3 + 2) * 14,
      opacity: 0.08 + rng(i * 7) * 0.18,
    });
  }
  return clouds;
}

const clouds = generateClouds(90);

// City lights
const cityLights: [number, number][] = [
  [40.7,-74],[51.5,-0.1],[35.7,139.7],[28.6,77.2],[48.9,2.3],
  [-23.5,-46.6],[55.8,37.6],[39.9,116.4],[31.2,121.5],[34.1,-118.2],
  [41.9,12.5],[59.3,18.1],[37.6,127],[1.3,103.8],[22.3,114.2],
  [33.9,-6.9],[30,31.2],[-1.3,36.8],[-33.9,151.2],[19.4,-99.1],
  [13.8,100.5],[-6.2,106.8],[23.1,113.3],[35.2,136.9],[43.7,-79.4],
  [52.5,13.4],[45.5,-73.6],[38.7,-9.1],[41,29],[25.3,55.3],
  [14.6,121],[6.5,3.4],[-34.6,-58.4],[-4,-38],[37.5,127],
  [32.1,34.8],[47.5,19.1],[44.4,26.1],[60.2,25],
  [56.9,24.1],[50.1,14.4],[48.1,11.6],[45.8,9.2],[40.4,-3.7],
];

function projectPoint(
  lat: number, lon: number,
  rotY: number, rotX: number,
  cx: number, cy: number, radius: number
) {
  const phi = (90 - lat) * Math.PI / 180;
  const theta = (lon + rotY) * Math.PI / 180;

  const x = Math.sin(phi) * Math.sin(theta);
  const y = Math.cos(phi);
  const z = Math.sin(phi) * Math.cos(theta);

  const cosRX = Math.cos(rotX * Math.PI / 180);
  const sinRX = Math.sin(rotX * Math.PI / 180);
  const y2 = y * cosRX - z * sinRX;
  const z2 = y * sinRX + z * cosRX;

  return {
    screenX: cx + x * radius,
    screenY: cy - y2 * radius,
    depth: z2,
  };
}

function drawGlobe(
  ctx: CanvasRenderingContext2D,
  cx: number, cy: number, radius: number,
  rotY: number, rotX: number, time: number
) {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;
  ctx.clearRect(0, 0, w, h);

  // ── Outer atmosphere glow ──
  const atmo1 = ctx.createRadialGradient(cx, cy, radius * 0.92, cx, cy, radius * 1.55);
  atmo1.addColorStop(0, 'rgba(60,140,255,0)');
  atmo1.addColorStop(0.35, 'rgba(70,160,255,0.06)');
  atmo1.addColorStop(0.6, 'rgba(50,120,255,0.04)');
  atmo1.addColorStop(1, 'rgba(30,60,200,0)');
  ctx.fillStyle = atmo1;
  ctx.beginPath();
  ctx.arc(cx, cy, radius * 1.55, 0, Math.PI * 2);
  ctx.fill();

  // Soft blue halo
  const atmo2 = ctx.createRadialGradient(cx, cy, radius * 0.98, cx, cy, radius * 1.15);
  atmo2.addColorStop(0, 'rgba(100,180,255,0.2)');
  atmo2.addColorStop(0.4, 'rgba(80,160,255,0.08)');
  atmo2.addColorStop(1, 'rgba(60,120,255,0)');
  ctx.fillStyle = atmo2;
  ctx.beginPath();
  ctx.arc(cx, cy, radius * 1.15, 0, Math.PI * 2);
  ctx.fill();

  // ── Clip to sphere ──
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.clip();

  // ── Ocean ──
  const oceanGrad = ctx.createRadialGradient(
    cx - radius * 0.25, cy - radius * 0.3, 0,
    cx, cy, radius
  );
  oceanGrad.addColorStop(0, '#2563eb');
  oceanGrad.addColorStop(0.2, '#1d4ed8');
  oceanGrad.addColorStop(0.5, '#1e40af');
  oceanGrad.addColorStop(0.75, '#1e3a8a');
  oceanGrad.addColorStop(1, '#0c1d4d');
  ctx.fillStyle = oceanGrad;
  ctx.fillRect(0, 0, w, h);

  // ── Subtle ocean texture (grid lines) ──
  ctx.strokeStyle = 'rgba(100,180,255,0.04)';
  ctx.lineWidth = 0.4;
  for (let lat = -80; lat <= 80; lat += 15) {
    ctx.beginPath();
    let started = false;
    for (let lon = -180; lon <= 180; lon += 3) {
      const p = projectPoint(lat, lon, rotY, rotX, cx, cy, radius);
      if (p.depth > -0.05) {
        if (!started) { ctx.moveTo(p.screenX, p.screenY); started = true; }
        else ctx.lineTo(p.screenX, p.screenY);
      } else started = false;
    }
    ctx.stroke();
  }
  for (let lon = 0; lon < 360; lon += 20) {
    ctx.beginPath();
    let started = false;
    for (let lat = -85; lat <= 85; lat += 3) {
      const p = projectPoint(lat, lon, rotY, rotX, cx, cy, radius);
      if (p.depth > -0.05) {
        if (!started) { ctx.moveTo(p.screenX, p.screenY); started = true; }
        else ctx.lineTo(p.screenX, p.screenY);
      } else started = false;
    }
    ctx.stroke();
  }

  // ── Draw continents with realistic shading ──
  // Sun direction (from upper-left)
  const sunDirX = -0.5;
  const sunDirY = -0.6;
  const sunDirZ = 0.6;

  continents.forEach((polygon) => {
    const projections = polygon.map(([lat, lon]) =>
      projectPoint(lat, lon, rotY, rotX, cx, cy, radius)
    );

    const avgDepth = projections.reduce((sum, p) => sum + p.depth, 0) / projections.length;
    if (avgDepth < -0.2) return;

    // Filter visible points for drawing
    const visiblePoints = projections.filter(p => p.depth > -0.25);
    if (visiblePoints.length < 3) return;

    ctx.beginPath();
    let started = false;
    projections.forEach((p) => {
      if (p.depth > -0.25) {
        if (!started) { ctx.moveTo(p.screenX, p.screenY); started = true; }
        else ctx.lineTo(p.screenX, p.screenY);
      }
    });
    ctx.closePath();

    // Lighting factor
    const avgX = (projections.reduce((s, p) => s + p.screenX, 0) / projections.length - cx) / radius;
    const avgY = (projections.reduce((s, p) => s + p.screenY, 0) / projections.length - cy) / radius;
    const lightFactor = Math.max(0, -(avgX * sunDirX + avgY * sunDirY + avgDepth * sunDirZ));
    const brightness = 0.35 + lightFactor * 0.65;
    const edgeFade = Math.max(0.2, Math.min(1, (avgDepth + 0.3) * 1.8));

    // Land gradient — earthy greens/browns
    const r1 = Math.round(35 + brightness * 60);
    const g1 = Math.round(80 + brightness * 100);
    const b1 = Math.round(35 + brightness * 40);
    const r2 = Math.round(50 + brightness * 40);
    const g2 = Math.round(75 + brightness * 55);
    const b2 = Math.round(30 + brightness * 25);

    const landGrad = ctx.createLinearGradient(
      cx - radius, cy - radius, cx + radius, cy + radius
    );
    landGrad.addColorStop(0, `rgba(${r1},${g1},${b1},${edgeFade})`);
    landGrad.addColorStop(0.5, `rgba(${r2},${g2},${b2},${edgeFade})`);
    landGrad.addColorStop(1, `rgba(${r1 - 15},${g1 - 20},${b1 - 10},${edgeFade * 0.7})`);
    ctx.fillStyle = landGrad;
    ctx.fill();

    // Subtle land border
    ctx.strokeStyle = `rgba(100,180,100,${Math.max(0.05, edgeFade * 0.25)})`;
    ctx.lineWidth = 0.5;
    ctx.stroke();

    // Inner highlight for lit side
    if (lightFactor > 0.3) {
      ctx.fillStyle = `rgba(120,200,120,${lightFactor * 0.08 * edgeFade})`;
      ctx.fill();
    }
  });

  // ── Clouds layer ──
  const cloudRotOffset = time * 0.008;
  clouds.forEach((cloud) => {
    const p = projectPoint(cloud.lat, cloud.lon + cloudRotOffset, rotY, rotX, cx, cy, radius * 1.01);
    if (p.depth > 0.05) {
      const lightVal = Math.max(0, p.depth);
      const alpha = cloud.opacity * lightVal * 0.7;
      const grad = ctx.createRadialGradient(
        p.screenX, p.screenY, 0,
        p.screenX, p.screenY, cloud.size * (radius / 160)
      );
      grad.addColorStop(0, `rgba(255,255,255,${alpha * 0.7})`);
      grad.addColorStop(0.5, `rgba(240,245,255,${alpha * 0.35})`);
      grad.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(p.screenX, p.screenY, cloud.size * (radius / 160), 0, Math.PI * 2);
      ctx.fill();
    }
  });

  // ── City lights on the dark side ──
  cityLights.forEach(([lat, lon]) => {
    const p = projectPoint(lat, lon, rotY, rotX, cx, cy, radius * 0.99);
    if (p.depth > -0.1) {
      // Determine if on dark side
      const nx = (p.screenX - cx) / radius;
      const ny = (p.screenY - cy) / radius;
      const lightness = -(nx * sunDirX + ny * sunDirY + p.depth * sunDirZ);
      if (lightness < 0.15) {
        const darknessIntensity = Math.max(0, 0.3 - lightness) / 0.3;
        const flicker = 0.7 + 0.3 * Math.sin(time * 0.003 + lat * 0.1 + lon * 0.1);
        const alpha = darknessIntensity * p.depth * flicker * 0.9;
        if (alpha > 0.02) {
          const sz = (1.5 + darknessIntensity) * (radius / 200);
          const glow = ctx.createRadialGradient(
            p.screenX, p.screenY, 0,
            p.screenX, p.screenY, sz * 3
          );
          glow.addColorStop(0, `rgba(255,220,120,${alpha * 0.8})`);
          glow.addColorStop(0.3, `rgba(255,200,80,${alpha * 0.4})`);
          glow.addColorStop(1, 'rgba(255,180,50,0)');
          ctx.fillStyle = glow;
          ctx.beginPath();
          ctx.arc(p.screenX, p.screenY, sz * 3, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = `rgba(255,240,180,${alpha})`;
          ctx.beginPath();
          ctx.arc(p.screenX, p.screenY, sz * 0.7, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }
  });

  // ── Specular highlight ──
  const specX = cx - radius * 0.32;
  const specY = cy - radius * 0.32;
  const specGrad = ctx.createRadialGradient(
    specX, specY, 0,
    specX, specY, radius * 0.55
  );
  specGrad.addColorStop(0, 'rgba(255,255,255,0.25)');
  specGrad.addColorStop(0.3, 'rgba(220,240,255,0.1)');
  specGrad.addColorStop(0.6, 'rgba(200,230,255,0.03)');
  specGrad.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = specGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, radius, 0, Math.PI * 2);
  ctx.fill();

  // ── Day/night terminator gradient ──
  const termGrad = ctx.createLinearGradient(
    cx - radius * 0.8, cy - radius * 0.6,
    cx + radius * 0.8, cy + radius * 0.6
  );
  termGrad.addColorStop(0, 'rgba(0,0,0,0)');
  termGrad.addColorStop(0.45, 'rgba(0,0,0,0)');
  termGrad.addColorStop(0.55, 'rgba(0,5,20,0.2)');
  termGrad.addColorStop(0.7, 'rgba(0,5,20,0.45)');
  termGrad.addColorStop(0.85, 'rgba(0,3,15,0.6)');
  termGrad.addColorStop(1, 'rgba(0,2,10,0.7)');
  ctx.fillStyle = termGrad;
  ctx.fillRect(0, 0, w, h);

  // ── Edge shadow (spherical darkening) ──
  const edgeShadow = ctx.createRadialGradient(cx, cy, radius * 0.5, cx, cy, radius);
  edgeShadow.addColorStop(0, 'rgba(0,0,0,0)');
  edgeShadow.addColorStop(0.7, 'rgba(0,0,0,0)');
  edgeShadow.addColorStop(0.88, 'rgba(0,5,30,0.3)');
  edgeShadow.addColorStop(0.96, 'rgba(0,8,40,0.55)');
  edgeShadow.addColorStop(1, 'rgba(0,10,50,0.8)');
  ctx.fillStyle = edgeShadow;
  ctx.fillRect(0, 0, w, h);

  ctx.restore();

  // ── Fresnel rim light (atmosphere edge) ──
  const rimGrad = ctx.createRadialGradient(cx, cy, radius * 0.92, cx, cy, radius * 1.06);
  rimGrad.addColorStop(0, 'rgba(80,160,255,0.22)');
  rimGrad.addColorStop(0.4, 'rgba(60,140,255,0.12)');
  rimGrad.addColorStop(0.7, 'rgba(50,120,255,0.06)');
  rimGrad.addColorStop(1, 'rgba(40,100,255,0)');
  ctx.fillStyle = rimGrad;
  ctx.beginPath();
  ctx.arc(cx, cy, radius * 1.06, 0, Math.PI * 2);
  ctx.fill();

  // ── Thin bright rim on lit side ──
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, radius * 1.02, -Math.PI * 0.8, Math.PI * 0.25);
  ctx.strokeStyle = 'rgba(140,200,255,0.2)';
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.restore();
}

function EarthGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rotYRef = useRef(0);
  const rotXRef = useRef(10);
  const targetYRef = useRef(0);
  const targetXRef = useRef(10);
  const baseRotRef = useRef(0);
  const animRef = useRef<number>();
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;

    const dpr = window.devicePixelRatio || 1;

    const setSize = () => {
      const container = containerRef.current;
      if (!container) return;
      const size = Math.min(container.clientWidth, container.clientHeight, 420);
      canvas.width = size * dpr;
      canvas.height = size * dpr;
      canvas.style.width = size + 'px';
      canvas.style.height = size + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setSize();
    window.addEventListener('resize', setSize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      targetYRef.current = dx * 50;
      targetXRef.current = 10 + dy * 20;
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (touch.clientX - cx) / (rect.width / 2);
      const dy = (touch.clientY - cy) / (rect.height / 2);
      targetYRef.current = dx * 50;
      targetXRef.current = 10 + dy * 20;
    };

    const animate = () => {
      timeRef.current += 16;
      rotYRef.current += (targetYRef.current - rotYRef.current) * 0.03;
      rotXRef.current += (targetXRef.current - rotXRef.current) * 0.03;
      baseRotRef.current += 0.12;

      const totalY = rotYRef.current + baseRotRef.current;
      const totalX = rotXRef.current;
      const displaySize = Math.min(containerRef.current?.clientWidth || 400, 420);
      const radius = displaySize * 0.42;
      const drawCx = displaySize / 2;
      const drawCy = displaySize / 2;

      ctx.clearRect(0, 0, canvas.width / (window.devicePixelRatio || 1), canvas.height / (window.devicePixelRatio || 1));
      drawGlobe(ctx, drawCx, drawCy, radius, totalY, totalX, timeRef.current);
      animRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current!);
      window.removeEventListener('resize', setSize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: '100%',
        aspectRatio: '1 / 1',
        maxWidth: 420,
        margin: '0 auto',
        position: 'relative',
        cursor: 'grab',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
}

export function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div
      style={{
        minHeight: 'calc(100vh - 64px)',
        position: 'relative',
        padding: 'clamp(40px, 6vw, 80px) 20px',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          style={{ marginBottom: 'clamp(30px, 5vw, 60px)' }}
        >
          <div
            style={{
              color: '#f43f5e',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: 'uppercase',
              marginBottom: 8,
            }}
          >
            GET IN TOUCH
          </div>
          <h1
            style={{
              color: '#fff',
              fontSize: 'clamp(40px, 8vw, 80px)',
              fontWeight: 900,
              lineHeight: 1,
              display: 'flex',
              alignItems: 'baseline',
              gap: 2,
            }}
          >
            Contact
            <span style={{ color: '#f43f5e' }}>.</span>
          </h1>
        </motion.div>

        {/* Main Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: 'clamp(30px, 5vw, 70px)',
            alignItems: 'center',
          }}
        >
          {/* Left: Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div
              style={{
                background: 'rgba(8,8,25,0.85)',
                border: '1px solid rgba(100,100,200,0.2)',
                borderRadius: 20,
                padding: 'clamp(24px, 4vw, 40px)',
                backdropFilter: 'blur(20px)',
              }}
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  style={{ textAlign: 'center', padding: '40px 0' }}
                >
                  <div style={{ fontSize: 48, marginBottom: 16 }}>🚀</div>
                  <h3 style={{ color: '#8b5cf6', fontSize: 22, fontWeight: 700, marginBottom: 8 }}>
                    Message Sent!
                  </h3>
                  <p style={{ color: 'rgba(180,180,220,0.7)' }}>
                    I'll get back to you soon.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {/* Name */}
                  <div style={{ marginBottom: 20 }}>
                    <label
                      style={{
                        display: 'block',
                        color: 'rgba(200,200,240,0.8)',
                        fontSize: 13,
                        marginBottom: 8,
                        fontWeight: 500,
                      }}
                    >
                      Your Name*
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused(null)}
                      placeholder="John Doe"
                      required
                      style={{
                        width: '100%',
                        background: 'rgba(15,15,40,0.7)',
                        border: `1px solid ${focused === 'name' ? '#8b5cf6' : 'rgba(100,100,200,0.25)'}`,
                        borderRadius: 10,
                        padding: '12px 16px',
                        color: '#fff',
                        fontSize: 14,
                        outline: 'none',
                        boxShadow:
                          focused === 'name'
                            ? '0 0 15px rgba(139,92,246,0.3)'
                            : 'none',
                        transition: 'all 0.2s ease',
                      }}
                    />
                  </div>

                  {/* Email */}
                  <div style={{ marginBottom: 20 }}>
                    <label
                      style={{
                        display: 'block',
                        color: 'rgba(200,200,240,0.8)',
                        fontSize: 13,
                        marginBottom: 8,
                        fontWeight: 500,
                      }}
                    >
                      Your Email*
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                      placeholder="johndoe@email.com"
                      required
                      style={{
                        width: '100%',
                        background: 'rgba(15,15,40,0.7)',
                        border: `1px solid ${focused === 'email' ? '#8b5cf6' : 'rgba(100,100,200,0.25)'}`,
                        borderRadius: 10,
                        padding: '12px 16px',
                        color: '#fff',
                        fontSize: 14,
                        outline: 'none',
                        boxShadow:
                          focused === 'email'
                            ? '0 0 15px rgba(139,92,246,0.3)'
                            : 'none',
                        transition: 'all 0.2s ease',
                      }}
                    />
                  </div>

                  {/* Message */}
                  <div style={{ marginBottom: 28 }}>
                    <label
                      style={{
                        display: 'block',
                        color: 'rgba(200,200,240,0.8)',
                        fontSize: 13,
                        marginBottom: 8,
                        fontWeight: 500,
                      }}
                    >
                      Your Message*
                    </label>
                    <textarea
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      onFocus={() => setFocused('message')}
                      onBlur={() => setFocused(null)}
                      placeholder="Hello there!"
                      required
                      rows={5}
                      style={{
                        width: '100%',
                        background: 'rgba(15,15,40,0.7)',
                        border: `1px solid ${focused === 'message' ? '#8b5cf6' : 'rgba(100,100,200,0.25)'}`,
                        borderRadius: 10,
                        padding: '12px 16px',
                        color: '#fff',
                        fontSize: 14,
                        outline: 'none',
                        resize: 'vertical',
                        boxShadow:
                          focused === 'message'
                            ? '0 0 15px rgba(139,92,246,0.3)'
                            : 'none',
                        transition: 'all 0.2s ease',
                        minHeight: 120,
                      }}
                    />
                  </div>

                  {/* Submit */}
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.03, boxShadow: '0 0 30px rgba(244,63,94,0.5)' }}
                    whileTap={{ scale: 0.97 }}
                    style={{
                      background: 'linear-gradient(135deg, #f43f5e, #e11d48)',
                      border: 'none',
                      color: '#fff',
                      padding: '14px 32px',
                      borderRadius: 10,
                      cursor: 'pointer',
                      fontSize: 14,
                      fontWeight: 700,
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                    }}
                  >
                    Send Message <Send size={16} />
                  </motion.button>
                </form>
              )}
            </div>

            {/* Social Links */}
            <div
              style={{
                display: 'flex',
                gap: 16,
                marginTop: 24,
                flexWrap: 'wrap',
              }}
            >
              {[
                { icon: <Github size={20} />, label: 'GitHub', href: '#' },
                { icon: <Linkedin size={20} />, label: 'LinkedIn', href: '#' },
                { icon: <Twitter size={20} />, label: 'Twitter', href: '#' },
                { icon: <Instagram size={20} />, label: 'Instagram', href: '#' },
                { icon: <Mail size={20} />, label: 'Email', href: 'mailto:surya@example.com' },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ scale: 1.15, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  style={{
                    width: 44,
                    height: 44,
                    background: 'rgba(15,15,40,0.8)',
                    border: '1px solid rgba(100,100,200,0.2)',
                    borderRadius: 10,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'rgba(190,190,230,0.7)',
                    textDecoration: 'none',
                    backdropFilter: 'blur(10px)',
                    transition: 'color 0.2s, border-color 0.2s',
                  }}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Right: Earth Globe */}
          <motion.div
            initial={{ opacity: 0, x: 40, scale: 0.9 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.8 }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 20,
            }}
          >
            <EarthGlobe />

            {/* Info cards below globe */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                width: '100%',
                maxWidth: 360,
              }}
            >
              {[
                {
                  icon: <MapPin size={16} color="#8b5cf6" />,
                  label: 'Location',
                  value: 'Bengaluru, India',
                },
                {
                  icon: <Mail size={16} color="#06b6d4" />,
                  label: 'Email',
                  value: 'surya@example.com',
                },
              ].map((info) => (
                <div
                  key={info.label}
                  style={{
                    background: 'rgba(8,8,25,0.7)',
                    border: '1px solid rgba(100,100,200,0.15)',
                    borderRadius: 12,
                    padding: '12px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    backdropFilter: 'blur(10px)',
                  }}
                >
                  {info.icon}
                  <div>
                    <div style={{ color: 'rgba(140,140,180,0.6)', fontSize: 11 }}>
                      {info.label}
                    </div>
                    <div style={{ color: 'rgba(210,210,240,0.9)', fontSize: 13 }}>
                      {info.value}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
