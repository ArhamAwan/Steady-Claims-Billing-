import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";

/**
 * Builds the Steady Claims 3D doctor (an original character made from primitives)
 * and returns a small controller for the hero animation.
 * Framing matches the design canvas render: a 1000x1060 virtual frame cropped to 710x915.
 */
export function createDoctorScene(canvas: HTMLCanvasElement) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "low-power" });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTex;
  scene.environmentIntensity = 0.55;

  const FULL_W = 1000, FULL_H = 1060;
  const camera = new THREE.PerspectiveCamera(26, FULL_W / FULL_H, 0.1, 100);
  camera.position.set(0.5, 0.75, 10.4);
  camera.lookAt(-0.35, 0.18, 0);
  camera.setViewOffset(FULL_W, FULL_H, 149, 93, 710, 915);

  // ---------- Materials ----------
  const M = {
    coat: new THREE.MeshPhysicalMaterial({ color: 0xf5f8fb, roughness: 0.58, clearcoat: 0.25, clearcoatRoughness: 0.5, sheen: 0.6, sheenColor: new THREE.Color(0xdfe9f2), side: THREE.DoubleSide }),
    scrubs: new THREE.MeshPhysicalMaterial({ color: 0x0b7e73, roughness: 0.72, sheen: 0.5, sheenColor: new THREE.Color(0x7ff0e0) }),
    skin: new THREE.MeshPhysicalMaterial({ color: 0xd8976b, roughness: 0.5, clearcoat: 0.12, clearcoatRoughness: 0.6, sheen: 0.4, sheenColor: new THREE.Color(0xffc9a8) }),
    skinDark: new THREE.MeshPhysicalMaterial({ color: 0xc9845a, roughness: 0.5 }),
    hair: new THREE.MeshPhysicalMaterial({ color: 0x2a211d, roughness: 0.45, clearcoat: 0.4, clearcoatRoughness: 0.35 }),
    eye: new THREE.MeshPhysicalMaterial({ color: 0x14100e, roughness: 0.08, clearcoat: 1 }),
    eyeHi: new THREE.MeshBasicMaterial({ color: 0xffffff }),
    mouth: new THREE.MeshStandardMaterial({ color: 0x5e2e24, roughness: 0.6 }),
    blush: new THREE.MeshStandardMaterial({ color: 0xf08f7c, roughness: 0.8, transparent: true, opacity: 0.45 }),
    tube: new THREE.MeshPhysicalMaterial({ color: 0x1d2a3b, roughness: 0.35, clearcoat: 0.6 }),
    metal: new THREE.MeshStandardMaterial({ color: 0xd9e2ea, roughness: 0.2, metalness: 1 }),
    board: new THREE.MeshPhysicalMaterial({ color: 0x0b1f3a, roughness: 0.4, clearcoat: 0.6 }),
    paper: new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9 }),
    line: new THREE.MeshStandardMaterial({ color: 0xc5d1de, roughness: 0.9 }),
    teal: new THREE.MeshPhysicalMaterial({ color: 0x37d3c1, roughness: 0.35, clearcoat: 0.5, emissive: 0x0e6f65, emissiveIntensity: 0.25 }),
    badge: new THREE.MeshPhysicalMaterial({ color: 0x1a5fb4, roughness: 0.35, clearcoat: 0.6 }),
  };

  const root = new THREE.Group();
  root.rotation.y = -0.28;
  scene.add(root);
  type V3 = [number, number, number];
    const add = (geo: THREE.BufferGeometry, mat: THREE.Material, pos: V3 = [0, 0, 0], rot: V3 = [0, 0, 0], scale: V3 = [1, 1, 1], parent: THREE.Object3D = root) => {
    const m = new THREE.Mesh(geo, mat);
    m.position.set(...pos); m.rotation.set(...rot); m.scale.set(...scale);
    m.castShadow = true; m.receiveShadow = true;
    parent.add(m); return m;
  };

  // ---------- Body (lathe) ----------
  const profile = (s = 1): THREE.Vector2[] => [
    [0.0, -1.75], [0.9, -1.75], [0.97, -1.45], [1.0, -0.9], [1.03, -0.4], [1.02, -0.05], [0.95, 0.2],
    [0.78, 0.38], [0.52, 0.5], [0.3, 0.56], [0.0, 0.58],
  ].map(([r, y]) => new THREE.Vector2(r * s, y));

  // scrubs underneath (full lathe)
  add(new THREE.LatheGeometry(profile(0.965), 96), M.scrubs);
  // open lab coat: leave a V-ish gap at the front (+z). Build as two halves with a gap that widens at the top.
  const coatGeo = new THREE.LatheGeometry(profile(1.0), 128, 0, Math.PI * 2);
  {
    // carve the opening by collapsing front vertices outward-sideways is complex; instead drop faces in a wedge.
    const pos = coatGeo.attributes.position;
    const idx: number[] = [];
    const keep = (i: number) => {
      const x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
      if (z <= 0) return true;
      const ang = Math.abs(Math.atan2(x, z)); // 0 at front
      const t = THREE.MathUtils.clamp((y + 1.75) / 2.3, 0, 1); // 0 bottom .. 1 top
      const half = THREE.MathUtils.lerp(0.13, 0.62, Math.pow(t, 2.2)); // gap half-angle
      return ang > half;
    };
    const src = coatGeo.index ? coatGeo.index.array : [...Array(pos.count).keys()];
    for (let i = 0; i < src.length; i += 3) {
      const a = src[i], b = src[i + 1], c = src[i + 2];
      if (keep(a) && keep(b) && keep(c)) idx.push(a, b, c);
    }
    coatGeo.setIndex(idx);
    coatGeo.computeVertexNormals();
  }
  add(coatGeo, M.coat);

  // lapel rolls along the opening edges (tubes following the gap boundary)
  for (const side of [-1, 1]) {
    const pts: THREE.Vector3[] = [];
    for (let k = 0; k <= 24; k++) {
      const t = k / 24;
      const y = THREE.MathUtils.lerp(-1.72, 0.52, t);
      const tt = THREE.MathUtils.clamp((y + 1.75) / 2.3, 0, 1);
      const half = THREE.MathUtils.lerp(0.13, 0.62, Math.pow(tt, 2.2));
      // radius at y from profile (approx by sampling)
      const pr = profile(1.0);
      let r = 0.3;
      for (let j = 0; j < pr.length - 1; j++) {
        const p0 = pr[j], p1 = pr[j + 1];
        if (y >= p0.y && y <= p1.y) { r = THREE.MathUtils.lerp(p0.x, p1.x, (y - p0.y) / (p1.y - p0.y)); break; }
      }
      const ang = side * (half + 0.02);
      pts.push(new THREE.Vector3(Math.sin(ang) * (r + 0.012), y, Math.cos(ang) * (r + 0.012)));
    }
    const curve = new THREE.CatmullRomCurve3(pts);
    add(new THREE.TubeGeometry(curve, 80, 0.035, 12, false), M.coat);
  }

  // ---------- Neck & head ----------
  add(new THREE.CylinderGeometry(0.22, 0.25, 0.42, 32), M.skin, [0, 0.66, 0.02]);
  const head = new THREE.Group();
  head.position.set(0, 1.26, 0.04);
  head.rotation.set(-0.04, 0.08, 0.03);
  root.add(head);
  add(new THREE.SphereGeometry(0.64, 64, 64), M.skin, [0, 0, 0], [0, 0, 0], [1, 1.06, 0.98], head);
  // ears
  for (const s of [-1, 1]) {
    add(new THREE.SphereGeometry(0.14, 32, 32), M.skin, [s * 0.62, -0.02, -0.02], [0, 0, 0], [0.55, 1, 0.8], head);
    add(new THREE.SphereGeometry(0.07, 24, 24), M.skinDark, [s * 0.66, -0.02, 0.0], [0, 0, 0], [0.4, 0.8, 0.6], head);
  }
  // hair cap (covers top/back), tilted back
  add(new THREE.SphereGeometry(0.672, 64, 64, 0, Math.PI * 2, 0, 1.18), M.hair, [0, 0.04, -0.02], [-0.18, 0, 0], [1.03, 1.06, 1.03], head);
  // sideburns
  for (const s of [-1, 1]) add(new THREE.SphereGeometry(0.16, 24, 24), M.hair, [s * 0.58, 0.17, 0.1], [0, 0, s * 0.2], [0.35, 0.9, 0.7], head);
  // back of hair
  add(new THREE.SphereGeometry(0.66, 48, 48, 0, Math.PI * 2, 0, Math.PI * 0.62), M.hair, [0, -0.02, -0.07], [-1.55, 0, 0], [1.0, 1.0, 1.0], head);
  // front quiff
  add(new THREE.SphereGeometry(0.34, 48, 48), M.hair, [0.14, 0.52, 0.28], [0.45, 0.15, -0.3], [1.45, 0.6, 1.0], head);
  add(new THREE.SphereGeometry(0.3, 48, 48), M.hair, [-0.22, 0.5, 0.26], [0.4, -0.15, 0.35], [1.35, 0.55, 0.95], head);
  add(new THREE.SphereGeometry(0.3, 48, 48), M.hair, [0.0, 0.6, 0.05], [0.2, 0, 0], [1.6, 0.6, 1.3], head);
  // eyes
  const eyeGroups: THREE.Group[] = [];
  for (const s of [-1, 1]) {
    const eg = new THREE.Group(); eg.position.set(s * 0.21, 0.04, 0.575); head.add(eg); eyeGroups.push(eg);
    add(new THREE.SphereGeometry(0.078, 32, 32), M.eye, [0, 0, 0], [0, 0, 0], [1, 1.18, 0.7], eg);
    add(new THREE.SphereGeometry(0.022, 16, 16), M.eyeHi, [0.025, 0.035, 0.05], [0, 0, 0], [1, 1, 1], eg);
    // brows
    add(new THREE.CapsuleGeometry(0.026, 0.13, 8, 16), M.hair, [s * 0.22, 0.21, 0.575], [0, 0, Math.PI / 2 - s * 0.14], [1, 1, 0.8], head);
    // blush
    add(new THREE.SphereGeometry(0.1, 24, 24), M.blush, [s * 0.34, -0.12, 0.5], [0, s * 0.5, 0], [1, 0.6, 0.35], head);
  }
  // nose
  add(new THREE.SphereGeometry(0.072, 32, 32), M.skinDark, [0, -0.07, 0.64], [0, 0, 0], [1, 0.9, 0.9], head);
  // smile
  add(new THREE.TorusGeometry(0.13, 0.024, 16, 48, Math.PI * 0.9), M.mouth, [0, -0.2, 0.575], [0.25, 0, Math.PI + Math.PI * 0.05], [1, 0.85, 1], head);

  // ---------- Stethoscope ----------
  {
    const c = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.3, -0.05, 0.86),
      new THREE.Vector3(-0.36, 0.2, 0.74),
      new THREE.Vector3(-0.36, 0.48, 0.42),
      new THREE.Vector3(-0.2, 0.6, 0.02),
      new THREE.Vector3(0.0, 0.62, -0.24),
      new THREE.Vector3(0.2, 0.6, 0.02),
      new THREE.Vector3(0.36, 0.48, 0.42),
      new THREE.Vector3(0.4, 0.2, 0.78),
      new THREE.Vector3(0.46, -0.02, 0.9),
    ]);
    add(new THREE.TubeGeometry(c, 160, 0.034, 16, false), M.tube);
    add(new THREE.SphereGeometry(0.045, 16, 16), M.metal, [-0.3, -0.05, 0.86]);
    // chest piece
    const cp = add(new THREE.CylinderGeometry(0.13, 0.13, 0.06, 40), M.metal, [0.47, -0.1, 0.93], [Math.PI / 2 - 0.3, 0, 0.35]);
    add(new THREE.CylinderGeometry(0.1, 0.1, 0.065, 40), M.teal, [0, 0.005, 0], [0, 0, 0], [1, 1, 1], cp);
  }

  // ---------- Name badge (character's right chest = viewer's left) ----------
  {
    const g = new THREE.Group();
    const ang = -0.5, r = 1.035, y = -0.2;
    g.position.set(Math.sin(ang) * r, y, Math.cos(ang) * r);
    g.rotation.y = ang;
    root.add(g);
    add(new RoundedBoxGeometry(0.34, 0.2, 0.03, 4, 0.03), M.paper, [0, 0, 0], [0, 0, 0], [1, 1, 1], g);
    add(new RoundedBoxGeometry(0.34, 0.06, 0.035, 4, 0.02), M.badge, [0, 0.07, 0.002], [0, 0, 0], [1, 1, 1], g);
    add(new THREE.BoxGeometry(0.2, 0.022, 0.01), M.line, [-0.03, -0.01, 0.018], [0, 0, 0], [1, 1, 1], g);
    add(new THREE.BoxGeometry(0.13, 0.022, 0.01), M.line, [-0.065, -0.055, 0.018], [0, 0, 0], [1, 1, 1], g);
  }

  // ---------- Arms ----------
  const limb = (a: V3, b: V3, rad: number, mat: THREE.Material) => {
    const A = new THREE.Vector3(...a), B = new THREE.Vector3(...b);
    const len = A.distanceTo(B);
    const m = add(new THREE.CapsuleGeometry(rad, len, 12, 32), mat);
    m.position.copy(A).add(B).multiplyScalar(0.5);
    m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), B.clone().sub(A).normalize());
    return m;
  };
  // viewer-left arm: rigged for a friendly wave
  const shoulder = new THREE.Group(); shoulder.position.set(-0.86, 0.16, 0.04); root.add(shoulder);
  add(new THREE.SphereGeometry(0.22, 32, 32), M.coat, [0, 0, 0], [0, 0, 0], [1, 1, 1], shoulder);
  add(new THREE.CapsuleGeometry(0.2, 0.62, 12, 32), M.coat, [0, -0.42, 0], [0, 0, 0], [1, 1, 1], shoulder);
  const elbow = new THREE.Group(); elbow.position.set(0, -0.82, 0); shoulder.add(elbow);
  add(new THREE.CapsuleGeometry(0.18, 0.5, 12, 32), M.coat, [0, -0.32, 0], [0, 0, 0], [1, 1, 1], elbow);
  add(new THREE.CylinderGeometry(0.175, 0.175, 0.07, 32), M.scrubs, [0, -0.66, 0], [0, 0, 0], [1, 1, 1], elbow);
  const hand = new THREE.Group(); hand.position.set(0, -0.8, 0); elbow.add(hand);
  add(new THREE.SphereGeometry(0.15, 32, 32), M.skin, [0, -0.08, 0], [0, 0, 0], [1, 1.1, 0.6], hand);
  for (let i = 0; i < 4; i++) {
    const x = -0.085 + i * 0.057;
    add(new THREE.CapsuleGeometry(0.036, 0.12 + (i === 1 || i === 2 ? 0.03 : 0), 8, 16), M.skin, [x, -0.25 - (i === 1 || i === 2 ? 0.015 : 0), 0.0], [0, 0, (x) * 0.9], [1, 1, 0.9], hand);
  }
  add(new THREE.CapsuleGeometry(0.04, 0.1, 8, 16), M.skin, [-0.15, -0.08, 0.02], [0, 0, 0.9], [1, 1, 0.9], hand);
  // viewer-right arm holding the clipboard
  limb([0.92, 0.12, 0.0], [1.08, -0.72, 0.18], 0.2, M.coat);
  limb([1.08, -0.72, 0.18], [0.62, -0.78, 0.95], 0.18, M.coat);
  add(new THREE.CylinderGeometry(0.19, 0.19, 0.08, 32), M.scrubs, [0.58, -0.78, 1.0], [0.1, 0.9, Math.PI / 2]);

  // ---------- Clipboard ----------
  {
    const g = new THREE.Group();
    g.position.set(0.28, -0.72, 1.14);
    g.rotation.set(-0.22, -0.28, 0.1);
    root.add(g);
    add(new RoundedBoxGeometry(0.86, 1.1, 0.05, 6, 0.05), M.board, [0, 0, 0], [0, 0, 0], [1, 1, 1], g);
    add(new RoundedBoxGeometry(0.74, 0.92, 0.02, 4, 0.02), M.paper, [0, -0.05, 0.03], [0, 0, 0], [1, 1, 1], g);
    add(new RoundedBoxGeometry(0.3, 0.1, 0.06, 4, 0.03), M.metal, [0, 0.53, 0.04], [0, 0, 0], [1, 1, 1], g);
    // check badge
    const disc = add(new THREE.CylinderGeometry(0.17, 0.17, 0.03, 48), M.teal, [-0.16, 0.18, 0.05], [Math.PI / 2, 0, 0], [1, 1, 1], g);
    const ck = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.075, 0.0, 0), new THREE.Vector3(-0.02, -0.055, 0), new THREE.Vector3(0.085, 0.06, 0),
    ], false, 'catmullrom', 0);
    add(new THREE.TubeGeometry(ck, 24, 0.022, 10, false), M.paper, [-0.16, 0.18, 0.075], [0, 0, 0], [1, 1, 1], g);
    // lines
    add(new THREE.BoxGeometry(0.26, 0.035, 0.01), M.line, [0.17, 0.22, 0.045], [0, 0, 0], [1, 1, 1], g);
    add(new THREE.BoxGeometry(0.18, 0.035, 0.01), M.line, [0.13, 0.14, 0.045], [0, 0, 0], [1, 1, 1], g);
    for (let i = 0; i < 4; i++) add(new THREE.BoxGeometry(0.56 - (i % 2) * 0.14, 0.03, 0.01), M.line, [-0.02 - (i % 2) * 0.07, -0.08 - i * 0.12, 0.045], [0, 0, 0], [1, 1, 1], g);
    // thumb over the board edge
    add(new THREE.SphereGeometry(0.1, 24, 24), M.skin, [0.4, -0.12, 0.06], [0, 0, 0.4], [0.8, 1.2, 0.7], g);
    add(new THREE.SphereGeometry(0.16, 32, 32), M.skin, [0.46, -0.08, -0.08], [0, 0, 0], [0.9, 1.05, 0.8], g);
  }

  // ---------- Lights ----------
  scene.add(new THREE.HemisphereLight(0xeaf4ff, 0x1a2a40, 0.55));
  const key = new THREE.DirectionalLight(0xfff4ea, 2.4);
  key.position.set(-3.5, 4.5, 6);
  key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  key.shadow.camera.left = -3; key.shadow.camera.right = 3; key.shadow.camera.top = 3; key.shadow.camera.bottom = -3;
  key.shadow.bias = -0.0004; key.shadow.normalBias = 0.02; key.shadow.radius = 6;
  scene.add(key);
  const fill = new THREE.DirectionalLight(0xcfe3ff, 0.7);
  fill.position.set(5, 1, 4);
  scene.add(fill);
  const rim = new THREE.DirectionalLight(0x37d3c1, 3.2);
  rim.position.set(4, 3, -5);
  scene.add(rim);
  const rim2 = new THREE.DirectionalLight(0x7fb3ff, 1.6);
  rim2.position.set(-5, 2, -4);
  scene.add(rim2);


  const TAU = Math.PI * 2;
  const look = { x: 0, y: 0 };
  const lookTarget = { x: 0, y: 0 };

  function pose(t: number) {
    const w = Math.sin(TAU * 2 * t);
    shoulder.rotation.set(-0.25, 0.1, -2.3 + 0.05 * Math.sin(TAU * t));
    elbow.rotation.set(0, 0, -0.7 + 0.38 * w);
    hand.rotation.set(0, 0, 0.15 * w);
    look.x += (lookTarget.x - look.x) * 0.06;
    look.y += (lookTarget.y - look.y) * 0.06;
    head.rotation.set(
      -0.04 + 0.025 * Math.sin(TAU * 2 * t + 1) - look.y * 0.18,
      0.1 + 0.06 * Math.sin(TAU * t) + look.x * 0.35,
      0.07 + 0.04 * Math.sin(TAU * t + 0.6)
    );
    root.position.y = 0.02 * Math.sin(TAU * t);
    root.scale.set(1, 1 + 0.006 * Math.sin(TAU * t * 2), 1);
    const d = Math.abs(t - 0.62);
    const blink = d < 0.035 ? Math.max(0.08, d / 0.035) : 1;
    eyeGroups.forEach((g) => g.scale.set(1, blink, 1));
    renderer.render(scene, camera);
  }

  return {
    pose,
    /** -1..1 pointer position relative to the doctor; the head eases toward it. */
    setLook(x: number, y: number) {
      lookTarget.x = Math.max(-1, Math.min(1, x));
      lookTarget.y = Math.max(-1, Math.min(1, y));
    },
    setSize(width: number, height: number) {
      renderer.setSize(width, height, false);
    },
    dispose() {
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.geometry) m.geometry.dispose();
      });
      Object.values(M).forEach((mat) => mat.dispose());
      envTex.dispose();
      pmrem.dispose();
      renderer.dispose();
    },
  };
}

export type DoctorScene = ReturnType<typeof createDoctorScene>;
