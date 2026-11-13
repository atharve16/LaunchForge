'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

type RocketRig = {
  root: THREE.Group;
  tilt: THREE.Group;
  orbit: THREE.Group;
  flameOuter: THREE.Mesh;
  flameInner: THREE.Mesh;
  flameCore: THREE.Mesh;
  exhaustLight: THREE.PointLight;
};

const ORANGE = 0xff713d;
const WARM_WHITE = 0xf3f1ea;
const GRAPHITE = 0x171b22;
const GLASS = 0x263644;

function createRocket(): RocketRig {
  const root = new THREE.Group();
  const tilt = new THREE.Group();
  const orbit = new THREE.Group();
  root.add(tilt, orbit);

  const ceramic = new THREE.MeshPhysicalMaterial({
    color: WARM_WHITE,
    roughness: 0.28,
    metalness: 0.08,
    clearcoat: 0.55,
    clearcoatRoughness: 0.2,
  });
  const graphite = new THREE.MeshPhysicalMaterial({
    color: GRAPHITE,
    roughness: 0.26,
    metalness: 0.82,
    clearcoat: 0.4,
  });
  const orange = new THREE.MeshPhysicalMaterial({
    color: ORANGE,
    roughness: 0.24,
    metalness: 0.58,
    clearcoat: 0.7,
    clearcoatRoughness: 0.16,
  });
  const glass = new THREE.MeshPhysicalMaterial({
    color: GLASS,
    roughness: 0.08,
    metalness: 0.25,
    transmission: 0.2,
    transparent: true,
    opacity: 0.95,
    clearcoat: 1,
    clearcoatRoughness: 0.08,
  });

  const fuselageProfile = [
    new THREE.Vector2(0.08, -1.23),
    new THREE.Vector2(0.4, -1.2),
    new THREE.Vector2(0.55, -0.98),
    new THREE.Vector2(0.62, -0.68),
    new THREE.Vector2(0.64, 0.76),
    new THREE.Vector2(0.58, 1.02),
    new THREE.Vector2(0.46, 1.2),
    new THREE.Vector2(0.12, 1.42),
  ];
  const fuselage = new THREE.Mesh(new THREE.LatheGeometry(fuselageProfile, 64), ceramic);
  fuselage.castShadow = true;
  tilt.add(fuselage);

  const nose = new THREE.Mesh(new THREE.ConeGeometry(0.46, 0.76, 64, 12), ceramic);
  nose.position.y = 1.68;
  nose.castShadow = true;
  tilt.add(nose);

  const shoulderRing = new THREE.Mesh(new THREE.TorusGeometry(0.58, 0.027, 12, 80), orange);
  shoulderRing.rotation.x = Math.PI / 2;
  shoulderRing.position.y = 1.04;
  tilt.add(shoulderRing);

  const lowerAccent = new THREE.Mesh(new THREE.TorusGeometry(0.59, 0.045, 12, 80), orange);
  lowerAccent.rotation.x = Math.PI / 2;
  lowerAccent.position.y = -0.67;
  tilt.add(lowerAccent);

  const lowerSeam = new THREE.Mesh(new THREE.TorusGeometry(0.605, 0.016, 8, 80), graphite);
  lowerSeam.rotation.x = Math.PI / 2;
  lowerSeam.position.y = -0.83;
  tilt.add(lowerSeam);

  const cockpit = new THREE.Mesh(new THREE.SphereGeometry(0.31, 48, 28), glass);
  cockpit.position.set(0, 0.58, 0.52);
  cockpit.scale.set(1.05, 0.84, 0.42);
  tilt.add(cockpit);

  const cockpitFrame = new THREE.Mesh(new THREE.TorusGeometry(0.315, 0.025, 12, 64), orange);
  cockpitFrame.position.set(0, 0.58, 0.535);
  cockpitFrame.scale.set(1.05, 0.84, 1);
  tilt.add(cockpitFrame);

  const cockpitGlint = new THREE.Mesh(
    new THREE.SphereGeometry(0.045, 20, 12),
    new THREE.MeshBasicMaterial({ color: 0xffd2bd, transparent: true, opacity: 0.88 }),
  );
  cockpitGlint.position.set(-0.11, 0.69, 0.78);
  cockpitGlint.scale.set(1, 0.75, 0.25);
  tilt.add(cockpitGlint);

  const panelMaterial = new THREE.MeshPhysicalMaterial({
    color: 0x7d827f,
    roughness: 0.32,
    metalness: 0.62,
  });
  for (const side of [-1, 1]) {
    const panel = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.34, 0.018), panelMaterial);
    panel.position.set(side * 0.36, 0.03, 0.57);
    panel.rotation.z = side * -0.12;
    tilt.add(panel);
  }

  const finShape = new THREE.Shape();
  finShape.moveTo(0, -1.15);
  finShape.lineTo(0.74, -1.23);
  finShape.lineTo(0.61, -0.62);
  finShape.lineTo(0.17, -0.28);
  finShape.lineTo(0, -0.34);
  finShape.closePath();
  const finGeometry = new THREE.ExtrudeGeometry(finShape, {
    depth: 0.1,
    bevelEnabled: true,
    bevelSegments: 3,
    bevelSize: 0.025,
    bevelThickness: 0.02,
    curveSegments: 4,
  });
  finGeometry.translate(0, 0, -0.05);
  for (let index = 0; index < 4; index += 1) {
    const fin = new THREE.Mesh(finGeometry, graphite);
    fin.rotation.y = index * (Math.PI / 2);
    fin.castShadow = true;
    tilt.add(fin);
  }

  const finEdge = new THREE.LineBasicMaterial({ color: ORANGE, transparent: true, opacity: 0.7 });
  for (let index = 0; index < 4; index += 1) {
    const edge = new THREE.LineSegments(new THREE.EdgesGeometry(finGeometry), finEdge);
    edge.rotation.y = index * (Math.PI / 2);
    tilt.add(edge);
  }

  const nozzleHousing = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.51, 0.3, 48), graphite);
  nozzleHousing.position.y = -1.38;
  tilt.add(nozzleHousing);

  const nozzleLip = new THREE.Mesh(new THREE.TorusGeometry(0.46, 0.045, 12, 64), orange);
  nozzleLip.rotation.x = Math.PI / 2;
  nozzleLip.position.y = -1.52;
  tilt.add(nozzleLip);

  const nozzleInterior = new THREE.Mesh(
    new THREE.CylinderGeometry(0.29, 0.38, 0.17, 48),
    new THREE.MeshPhysicalMaterial({ color: 0x050608, roughness: 0.2, metalness: 0.9 }),
  );
  nozzleInterior.position.y = -1.53;
  tilt.add(nozzleInterior);

  const flameOuter = new THREE.Mesh(
    new THREE.ConeGeometry(0.36, 1.28, 40, 10, true),
    new THREE.MeshBasicMaterial({
      color: ORANGE,
      transparent: true,
      opacity: 0.78,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
  );
  flameOuter.rotation.x = Math.PI;
  flameOuter.position.y = -2.12;
  flameOuter.scale.set(1, 0.92, 1);
  tilt.add(flameOuter);

  const flameInner = new THREE.Mesh(
    new THREE.ConeGeometry(0.23, 0.92, 32, 8, true),
    new THREE.MeshBasicMaterial({
      color: 0xffb36f,
      transparent: true,
      opacity: 0.92,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
  );
  flameInner.rotation.x = Math.PI;
  flameInner.position.y = -1.98;
  tilt.add(flameInner);

  const flameCore = new THREE.Mesh(
    new THREE.ConeGeometry(0.11, 0.58, 24, 8, true),
    new THREE.MeshBasicMaterial({
      color: 0xfff4d2,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
  );
  flameCore.rotation.x = Math.PI;
  flameCore.position.y = -1.88;
  tilt.add(flameCore);

  const exhaustLight = new THREE.PointLight(ORANGE, 1.8, 5.5, 2);
  exhaustLight.position.y = -1.95;
  tilt.add(exhaustLight);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(2.1, 0.012, 8, 128),
    new THREE.MeshBasicMaterial({ color: ORANGE, transparent: true, opacity: 0.5 }),
  );
  ring.rotation.set(1.16, 0.18, -0.2);
  ring.scale.set(1, 0.42, 1);
  orbit.add(ring);

  const ringShadow = new THREE.Mesh(
    new THREE.TorusGeometry(2.48, 0.008, 8, 128),
    new THREE.MeshBasicMaterial({ color: WARM_WHITE, transparent: true, opacity: 0.17 }),
  );
  ringShadow.rotation.set(1.32, -0.25, 0.42);
  ringShadow.scale.set(1, 0.3, 1);
  orbit.add(ringShadow);

  return { root, tilt, orbit, flameOuter, flameInner, flameCore, exhaustLight };
}

function createStaticStars() {
  const positions = new Float32Array(72 * 3);
  for (let index = 0; index < 72; index += 1) {
    const seed = index + 1;
    positions[index * 3] = Math.sin(seed * 11.73) * 6.6;
    positions[index * 3 + 1] = Math.cos(seed * 7.31) * 4.6;
    positions[index * 3 + 2] = -2.6 + (seed % 5) * 0.5;
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const material = new THREE.PointsMaterial({
    color: WARM_WHITE,
    size: 0.025,
    transparent: true,
    opacity: 0.34,
    sizeAttenuation: true,
  });
  return new THREE.Points(geometry, material);
}

function disposeScene(scene: THREE.Scene) {
  scene.traverse((object) => {
    const mesh = object as THREE.Mesh;
    mesh.geometry?.dispose();
    if (Array.isArray(mesh.material)) mesh.material.forEach((material) => material.dispose());
    else mesh.material?.dispose();
  });
}

export function FixedForgeScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef.current;
    if (!canvas || !host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
      });
    } catch {
      host.dataset.webgl = 'unavailable';
      return;
    }

    host.dataset.webgl = 'ready';
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, window.innerWidth < 700 ? 1.25 : 1.65));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
    camera.position.z = 8;

    scene.add(new THREE.HemisphereLight(0xf3f1ea, 0x090b10, 1.25));
    const keyLight = new THREE.DirectionalLight(0xfff7ed, 3.2);
    keyLight.position.set(-3.5, 5, 6);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(ORANGE, 3.8, 13, 2);
    rimLight.position.set(-3.5, 0.4, 3.5);
    scene.add(rimLight);
    const fillLight = new THREE.PointLight(0x9baebe, 1.35, 12, 2);
    fillLight.position.set(4, 1.5, 2);
    scene.add(fillLight);

    scene.add(createStaticStars());
    const rocket = createRocket();
    scene.add(rocket.root);

    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let animationFrame = 0;
    let width = window.innerWidth;
    let height = window.innerHeight;

    const placeRocket = () => {
      const compact = width < 700;
      const tablet = width < 1024;
      rocket.root.position.set(compact ? 0 : tablet ? 0.98 : 1.42, compact ? 1.14 : tablet ? 0.2 : 0.02, 0);
      rocket.root.scale.setScalar(compact ? 0.58 : tablet ? 0.78 : 0.92);
    };

    const render = (elapsed: number) => {
      if (!reducedMotionQuery.matches) {
        rocket.tilt.rotation.z = -0.1 + Math.sin(elapsed * 0.00055) * 0.035;
        rocket.tilt.rotation.x = Math.sin(elapsed * 0.00042) * 0.018;
        rocket.tilt.rotation.y = elapsed * 0.00016;
        rocket.orbit.rotation.z = elapsed * 0.00022;
        const pulse = 1 + Math.sin(elapsed * 0.021) * 0.07;
        rocket.flameOuter.scale.set(1, pulse, 1);
        rocket.flameInner.scale.set(1, 0.93 + Math.sin(elapsed * 0.029) * 0.1, 1);
        rocket.flameCore.scale.set(1, 0.96 + Math.sin(elapsed * 0.037) * 0.13, 1);
        rocket.exhaustLight.intensity = 1.75 + Math.sin(elapsed * 0.025) * 0.24;
      } else {
        rocket.tilt.rotation.set(0, 0, -0.1);
        rocket.orbit.rotation.z = 0.12;
        rocket.flameOuter.scale.set(1, 1, 1);
        rocket.flameInner.scale.set(1, 0.93, 1);
        rocket.flameCore.scale.set(1, 0.96, 1);
      }
      renderer.render(scene, camera);
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
      placeRocket();
      render(0);
    };

    const animate = (time: number) => {
      render(time);
      if (!reducedMotionQuery.matches) animationFrame = window.requestAnimationFrame(animate);
    };

    const motionChanged = () => {
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      render(0);
      if (!reducedMotionQuery.matches) animationFrame = window.requestAnimationFrame(animate);
    };

    resize();
    if (!reducedMotionQuery.matches) animationFrame = window.requestAnimationFrame(animate);
    window.addEventListener('resize', resize, { passive: true });
    reducedMotionQuery.addEventListener('change', motionChanged);

    return () => {
      window.removeEventListener('resize', resize);
      reducedMotionQuery.removeEventListener('change', motionChanged);
      if (animationFrame) window.cancelAnimationFrame(animationFrame);
      disposeScene(scene);
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={hostRef} className="fixed-forge-scene" data-webgl="pending" aria-hidden="true">
      <canvas ref={canvasRef} className="fixed-forge-canvas" />
      <div className="fixed-forge-fallback">
        <span className="fixed-forge-fallback__ring fixed-forge-fallback__ring--one" />
        <span className="fixed-forge-fallback__ring fixed-forge-fallback__ring--two" />
        <span className="fixed-forge-fallback__core" />
      </div>
      <div className="fixed-forge-vignette" />
    </div>
  );
}
