'use client';

import { useEffect, useRef } from 'react';

type Vec3 = { x: number; y: number; z: number };
type ScreenPoint = { x: number; y: number; depth: number };

const TAU = Math.PI * 2;
const ORANGE = '#FF713D';
const WARM_WHITE = '#F3F1EA';

const moduleSeeds = [
  { x: -1.55, y: -0.54, z: 0.18, w: 0.72, h: 0.72, d: 0.72, accent: false },
  { x: -0.78, y: 0.44, z: 0.12, w: 0.92, h: 0.58, d: 0.78, accent: true },
  { x: 0.12, y: -0.26, z: 0.22, w: 1.24, h: 0.9, d: 0.86, accent: true },
  { x: 1.22, y: 0.56, z: -0.2, w: 0.58, h: 0.58, d: 0.58, accent: false },
  { x: 1.62, y: -0.58, z: 0.1, w: 0.78, h: 0.78, d: 0.78, accent: false },
];

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function rotate(point: Vec3, rx: number, ry: number, rz: number): Vec3 {
  const cosX = Math.cos(rx);
  const sinX = Math.sin(rx);
  const cosY = Math.cos(ry);
  const sinY = Math.sin(ry);
  const cosZ = Math.cos(rz);
  const sinZ = Math.sin(rz);

  const x1 = point.x;
  const y1 = point.y * cosX - point.z * sinX;
  const z1 = point.y * sinX + point.z * cosX;
  const x2 = x1 * cosY + z1 * sinY;
  const y2 = y1;
  const z2 = -x1 * sinY + z1 * cosY;

  return {
    x: x2 * cosZ - y2 * sinZ,
    y: x2 * sinZ + y2 * cosZ,
    z: z2,
  };
}

function project(point: Vec3, width: number, height: number, scale: number, offsetX: number, offsetY: number): ScreenPoint {
  const camera = 6.4;
  const perspective = camera / (camera - point.z);
  return {
    x: width / 2 + offsetX + point.x * scale * perspective,
    y: height / 2 + offsetY + point.y * scale * perspective,
    depth: perspective,
  };
}

function cubeVertices(center: Vec3, width: number, height: number, depth: number): Vec3[] {
  const x = width / 2;
  const y = height / 2;
  const z = depth / 2;
  return [
    { x: center.x - x, y: center.y - y, z: center.z - z },
    { x: center.x + x, y: center.y - y, z: center.z - z },
    { x: center.x + x, y: center.y + y, z: center.z - z },
    { x: center.x - x, y: center.y + y, z: center.z - z },
    { x: center.x - x, y: center.y - y, z: center.z + z },
    { x: center.x + x, y: center.y - y, z: center.z + z },
    { x: center.x + x, y: center.y + y, z: center.z + z },
    { x: center.x - x, y: center.y + y, z: center.z + z },
  ];
}

function drawPoly(ctx: CanvasRenderingContext2D, points: ScreenPoint[], fill: string, stroke: string) {
  ctx.beginPath();
  points.forEach((point, index) => {
    if (index === 0) ctx.moveTo(point.x, point.y);
    else ctx.lineTo(point.x, point.y);
  });
  ctx.closePath();
  ctx.fillStyle = fill;
  ctx.fill();
  ctx.strokeStyle = stroke;
  ctx.lineWidth = 1;
  ctx.stroke();
}

function drawCube(
  ctx: CanvasRenderingContext2D,
  center: Vec3,
  size: { w: number; h: number; d: number },
  rotation: { x: number; y: number; z: number },
  dimensions: { width: number; height: number },
  scale: number,
  offsetX: number,
  offsetY: number,
  alpha: number,
  accent: boolean,
) {
  const points = cubeVertices(center, size.w, size.h, size.d).map((point) =>
    project(rotate(point, rotation.x, rotation.y, rotation.z), dimensions.width, dimensions.height, scale, offsetX, offsetY),
  );
  const faces = [
    { indexes: [0, 1, 2, 3], shade: 0.12 },
    { indexes: [4, 5, 6, 7], shade: 0.18 },
    { indexes: [0, 4, 7, 3], shade: 0.08 },
    { indexes: [1, 5, 6, 2], shade: accent ? 0.42 : 0.16 },
    { indexes: [3, 2, 6, 7], shade: accent ? 0.28 : 0.12 },
    { indexes: [0, 1, 5, 4], shade: 0.06 },
  ];

  faces
    .map((face) => ({ ...face, depth: face.indexes.reduce((sum, index) => sum + (points[index]?.depth ?? 0), 0) }))
    .sort((a, b) => a.depth - b.depth)
    .forEach((face) => {
      const facePoints = face.indexes
        .map((index) => points[index])
        .filter((point): point is ScreenPoint => Boolean(point));
      const fill = accent
        ? `rgba(255, 113, 61, ${alpha * face.shade})`
        : `rgba(243, 241, 234, ${alpha * face.shade})`;
      const stroke = accent ? `rgba(255, 113, 61, ${alpha * 0.88})` : `rgba(243, 241, 234, ${alpha * 0.36})`;
      drawPoly(ctx, facePoints, fill, stroke);
    });
}

function drawConnector(
  ctx: CanvasRenderingContext2D,
  from: Vec3,
  to: Vec3,
  rotation: { x: number; y: number; z: number },
  dimensions: { width: number; height: number },
  scale: number,
  offsetX: number,
  offsetY: number,
  alpha: number,
) {
  const a = project(rotate(from, rotation.x, rotation.y, rotation.z), dimensions.width, dimensions.height, scale, offsetX, offsetY);
  const b = project(rotate(to, rotation.x, rotation.y, rotation.z), dimensions.width, dimensions.height, scale, offsetX, offsetY);
  ctx.beginPath();
  ctx.moveTo(a.x, a.y);
  ctx.lineTo(b.x, b.y);
  ctx.strokeStyle = `rgba(255, 113, 61, ${alpha})`;
  ctx.lineWidth = 1.5;
  ctx.stroke();
  ctx.beginPath();
  ctx.arc(b.x, b.y, 3, 0, TAU);
  ctx.fillStyle = `rgba(255, 173, 142, ${alpha})`;
  ctx.fill();
}

function drawScene(ctx: CanvasRenderingContext2D, width: number, height: number, progress: number, reducedMotion: boolean) {
  ctx.clearRect(0, 0, width, height);

  const compact = width < 700;
  const scale = Math.min(width, height) * (compact ? 0.19 : 0.23) * (1 + Math.sin(progress * Math.PI) * 0.08);
  const offsetX = compact ? width * (0.2 - progress * 0.34) : width * (0.23 - progress * 0.42);
  const offsetY = compact ? height * (0.05 + progress * 0.14) : height * (-0.02 + Math.sin(progress * Math.PI * 1.5) * 0.11);
  const rotation = {
    x: -0.32 + progress * 0.54,
    y: -0.7 + progress * Math.PI * 1.62,
    z: reducedMotion ? 0.16 : -0.18 + progress * 0.98,
  };
  const assembly = clamp(progress * 2.3, 0, 1);
  const alpha = compact ? 0.75 : 0.92;

  const glow = ctx.createRadialGradient(width / 2 + offsetX, height / 2 + offsetY, 0, width / 2 + offsetX, height / 2 + offsetY, scale * 3.3);
  glow.addColorStop(0, 'rgba(255, 113, 61, 0.18)');
  glow.addColorStop(0.42, 'rgba(255, 113, 61, 0.05)');
  glow.addColorStop(1, 'rgba(255, 113, 61, 0)');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, width, height);

  ctx.save();
  ctx.globalAlpha = reducedMotion ? 0.18 : 0.28;
  ctx.strokeStyle = ORANGE;
  ctx.lineWidth = 1;
  for (let ring = 0; ring < 4; ring += 1) {
    ctx.beginPath();
    ctx.ellipse(width / 2 + offsetX, height / 2 + offsetY, scale * (1.25 + ring * 0.42), scale * (0.35 + ring * 0.13), rotation.y * 0.2 + ring * 0.18, 0, TAU);
    ctx.stroke();
  }
  ctx.restore();

  const activeModules = reducedMotion ? moduleSeeds.slice(1, 4) : moduleSeeds;
  activeModules.forEach((seed, index) => {
    const spread = 1 + (1 - assembly) * (0.7 + index * 0.05);
    const center = {
      x: seed.x * spread,
      y: seed.y * spread,
      z: seed.z + Math.sin(progress * TAU + index) * (reducedMotion ? 0 : 0.06),
    };
    const leftNeighbor = activeModules[index - 1];
    if (leftNeighbor) {
      drawConnector(ctx, { x: leftNeighbor.x * spread, y: leftNeighbor.y * spread, z: leftNeighbor.z }, center, rotation, { width, height }, scale, offsetX, offsetY, alpha * 0.78);
    }
    drawCube(ctx, center, { w: seed.w, h: seed.h, d: seed.d }, rotation, { width, height }, scale, offsetX, offsetY, alpha, seed.accent);
  });

  const core = project(rotate({ x: 0.1, y: 0.04, z: 0.9 }, rotation.x, rotation.y, rotation.z), width, height, scale, offsetX, offsetY);
  ctx.beginPath();
  ctx.arc(core.x, core.y, Math.max(3, scale * 0.035), 0, TAU);
  ctx.fillStyle = WARM_WHITE;
  ctx.shadowColor = ORANGE;
  ctx.shadowBlur = 24;
  ctx.fill();
  ctx.shadowBlur = 0;
}

export function FixedForgeScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d', { alpha: true });
    if (!context) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    let frame = 0;
    let progress = 0;
    let targetProgress = 0;
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const readScroll = () => {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      targetProgress = clamp(window.scrollY / maxScroll, 0, 1);
      if (!frame) frame = window.requestAnimationFrame(render);
    };

    const render = () => {
      frame = 0;
      progress = reducedMotionQuery.matches ? targetProgress : progress + (targetProgress - progress) * 0.14;
      drawScene(context, width, height, progress, reducedMotionQuery.matches);
      if (Math.abs(targetProgress - progress) > 0.0005) frame = window.requestAnimationFrame(render);
    };

    resize();
    readScroll();
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('scroll', readScroll, { passive: true });
    reducedMotionQuery.addEventListener('change', render);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', readScroll);
      reducedMotionQuery.removeEventListener('change', render);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="fixed-forge-scene" aria-hidden="true">
      <canvas ref={canvasRef} className="fixed-forge-canvas" />
      <div className="fixed-forge-vignette" />
    </div>
  );
}
