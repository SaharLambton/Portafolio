/* ==========================================================
   ATLAS · Orbe holográfico en WebGL (Three.js r149)
   API pública: window.AuraOrb.setState(state) · .pulse(amount) · .poke()
   Estados: 'idle' | 'thinking' | 'speaking' | 'listening'
   ========================================================== */
(function () {
    const canvas = document.getElementById('auraCanvas');
    const hero = document.getElementById('inicio');
    const stage = document.getElementById('auraStage');

    // API de respaldo para que el asistente funcione aunque no haya WebGL
    const api = { ready: false, setState() {}, pulse() {}, poke() {} };
    window.AuraOrb = api;

    function hasWebGL() {
        try {
            const c = document.createElement('canvas');
            return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
        } catch (e) { return false; }
    }

    if (!canvas || !window.THREE || !hasWebGL()) {
        document.documentElement.classList.add('aura-no-webgl');
        return;
    }

    const THREE = window.THREE;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isSmall = window.innerWidth < 768;

    const COLORS = {
        emerald: new THREE.Color('#2bf5b0'),
        emeraldDeep: new THREE.Color('#0a8f68'),
        violet: new THREE.Color('#8b5cf6'),
        magenta: new THREE.Color('#e048ff'),
        white: new THREE.Color('#eafff7')
    };

    /* ---------- Ruido simplex 3D (Ashima Arts, MIT) ---------- */
    const NOISE = `
        vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
        vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
        vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
        vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
        float snoise(vec3 v){
            const vec2 C=vec2(1.0/6.0,1.0/3.0);
            const vec4 D=vec4(0.0,0.5,1.0,2.0);
            vec3 i=floor(v+dot(v,C.yyy));
            vec3 x0=v-i+dot(i,C.xxx);
            vec3 g=step(x0.yzx,x0.xyz);
            vec3 l=1.0-g;
            vec3 i1=min(g.xyz,l.zxy);
            vec3 i2=max(g.xyz,l.zxy);
            vec3 x1=x0-i1+C.xxx;
            vec3 x2=x0-i2+C.yyy;
            vec3 x3=x0-D.yyy;
            i=mod289(i);
            vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
            float n_=0.142857142857;
            vec3 ns=n_*D.wyz-D.xzx;
            vec4 j=p-49.0*floor(p*ns.z*ns.z);
            vec4 x_=floor(j*ns.z);
            vec4 y_=floor(j-7.0*x_);
            vec4 x=x_*ns.x+ns.yyyy;
            vec4 y=y_*ns.x+ns.yyyy;
            vec4 h=1.0-abs(x)-abs(y);
            vec4 b0=vec4(x.xy,y.xy);
            vec4 b1=vec4(x.zw,y.zw);
            vec4 s0=floor(b0)*2.0+1.0;
            vec4 s1=floor(b1)*2.0+1.0;
            vec4 sh=-step(h,vec4(0.0));
            vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
            vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
            vec3 p0=vec3(a0.xy,h.x);
            vec3 p1=vec3(a0.zw,h.y);
            vec3 p2=vec3(a1.xy,h.z);
            vec3 p3=vec3(a1.zw,h.w);
            vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
            p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
            vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
            m=m*m;
            return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
        }`;

    /* ---------- Renderer, escena y cámara ---------- */
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isSmall ? 1.5 : 1.75));
    renderer.setClearColor('#020406', 1);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 200);
    const CAM_DIR = new THREE.Vector3(0, 0.16, 1).normalize();

    const uniforms = {
        uTime: { value: 0 },
        uAmp: { value: 0 },      // energía de voz
        uThink: { value: 0 },    // estado pensando
        uListen: { value: 0 },   // estado escuchando
        uForm: { value: reducedMotion ? 1 : 0 }, // animación de formación inicial
        uRipple: { value: 10 },  // tiempo desde el último toque
        uPR: { value: renderer.getPixelRatio() },
        uEmerald: { value: COLORS.emerald },
        uViolet: { value: COLORS.violet },
        uMagenta: { value: COLORS.magenta }
    };

    /* ---------- Fondo: nebulosa ---------- */
    const bg = new THREE.Mesh(
        new THREE.PlaneGeometry(2, 2),
        new THREE.ShaderMaterial({
            uniforms: Object.assign({ uRes: { value: new THREE.Vector2(1, 1) }, uCenter: { value: new THREE.Vector2(0.5, 0.6) } }, uniforms),
            depthTest: false,
            depthWrite: false,
            vertexShader: `varying vec2 vUv; void main(){ vUv=uv; gl_Position=vec4(position.xy,0.0,1.0); }`,
            fragmentShader: NOISE + `
                varying vec2 vUv;
                uniform float uTime, uThink;
                uniform vec2 uRes, uCenter;
                uniform vec3 uEmerald, uViolet, uMagenta;
                float fbm(vec3 p){ float f=0.0, a=0.5; for(int i=0;i<4;i++){ f+=a*snoise(p); p*=2.02; a*=0.5; } return f; }
                void main(){
                    vec2 asp = vec2(uRes.x/uRes.y, 1.0);
                    vec2 p = (vUv - uCenter) * asp;
                    float d = length(p);
                    vec3 col = vec3(0.008, 0.016, 0.024);
                    float n = fbm(vec3(vUv*asp*1.6, uTime*0.03));
                    // halo central
                    col += uEmerald * 0.10 * smoothstep(0.75, 0.0, d);
                    col += uViolet * 0.10 * smoothstep(1.1, 0.1, d) * (0.6 + 0.4*n);
                    // nubes laterales
                    col += uViolet * 0.11 * smoothstep(0.2, 0.9, n) * smoothstep(0.2, 1.0, vUv.x);
                    col += uEmerald * 0.06 * smoothstep(0.25, 0.95, -n) * smoothstep(0.8, 0.0, vUv.x);
                    col += uMagenta * 0.05 * smoothstep(0.9, 0.0, length(vUv - vec2(0.92, 0.05))) ;
                    col += uMagenta * 0.04 * uThink * smoothstep(0.8, 0.0, d);
                    // viñeta
                    col *= smoothstep(1.55, 0.35, length((vUv-0.5)*asp));
                    gl_FragColor = vec4(col, 1.0);
                }`
        })
    );
    bg.frustumCulled = false;
    bg.renderOrder = -10;
    scene.add(bg);

    /* ---------- Grupos ---------- */
    const root = new THREE.Group();     // sigue al puntero
    const orb = new THREE.Group();      // flota
    scene.add(root);
    root.add(orb);

    /* ---------- Texturas de brillo ---------- */
    function glowTexture(stops) {
        const c = document.createElement('canvas');
        c.width = c.height = 256;
        const g = c.getContext('2d');
        const grd = g.createRadialGradient(128, 128, 0, 128, 128, 128);
        stops.forEach(([o, col]) => grd.addColorStop(o, col));
        g.fillStyle = grd;
        g.fillRect(0, 0, 256, 256);
        const tex = new THREE.CanvasTexture(c);
        tex.needsUpdate = true;
        return tex;
    }
    const softGlow = glowTexture([[0, 'rgba(255,255,255,1)'], [0.2, 'rgba(255,255,255,0.55)'], [0.5, 'rgba(255,255,255,0.12)'], [1, 'rgba(255,255,255,0)']]);

    function sprite(color, scale, opacity) {
        const s = new THREE.Sprite(new THREE.SpriteMaterial({
            map: softGlow, color, transparent: true, opacity,
            blending: THREE.AdditiveBlending, depthWrite: false
        }));
        s.scale.setScalar(scale);
        return s;
    }

    /* ---------- Núcleo de energía ---------- */
    const halo = sprite(COLORS.violet, 7.5, 0.3);
    const halo2 = sprite(COLORS.emerald, 4.6, 0.25);
    const core = sprite(COLORS.white, 1.5, 0.95);
    const coreTint = sprite(COLORS.emerald, 2.6, 0.7);
    orb.add(halo, halo2, coreTint, core);

    /* ---------- Esfera de plasma (fresnel + ruido) ---------- */
    const shellMat = new THREE.ShaderMaterial({
        uniforms,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexShader: NOISE + `
            uniform float uTime, uAmp, uForm, uRipple;
            varying vec3 vN; varying vec3 vView; varying float vNoise; varying vec3 vObj;
            void main(){
                float n = snoise(normal*1.5 + vec3(uTime*0.28));
                float n2 = snoise(normal*4.2 - vec3(uTime*0.55)) * 0.25;
                vNoise = n + n2;
                float ripple = sin(uRipple*14.0 - length(position.xy)*10.0) * exp(-uRipple*2.5) * 0.08;
                vec3 p = position + normal * (vNoise*0.035*(1.0 + uAmp*1.4) + ripple);
                p *= mix(0.2, 1.0, uForm);
                vObj = position;
                vec4 mv = modelViewMatrix * vec4(p, 1.0);
                vN = normalize(normalMatrix * normal);
                vView = normalize(-mv.xyz);
                gl_Position = projectionMatrix * mv;
            }`,
        fragmentShader: `
            uniform float uTime, uAmp, uThink, uListen, uForm;
            uniform vec3 uEmerald, uViolet, uMagenta;
            varying vec3 vN; varying vec3 vView; varying float vNoise; varying vec3 vObj;
            void main(){
                float fres = pow(1.0 - abs(dot(normalize(vN), vView)), 2.2);
                float veins = smoothstep(0.12, 0.0, abs(sin(vNoise*5.0 + uTime*0.8))) ;
                float lat = smoothstep(0.035, 0.0, abs(fract(vObj.y*6.0 + uTime*0.15) - 0.5) - 0.46);
                vec3 col = mix(uEmerald, uViolet, clamp(smoothstep(0.2, 0.85, fres)*0.85 + smoothstep(0.2, 1.2, vObj.y + vNoise*0.4)*0.35, 0.0, 1.0));
                col = mix(col, uMagenta, clamp(smoothstep(0.35, 1.0, vNoise)*0.55 + uThink*0.45*fres, 0.0, 1.0));
                col = mix(col, uEmerald, uListen*0.5);
                float a = fres*0.85 + veins*(0.16 + uAmp*0.4) + lat*0.05 + 0.025;
                gl_FragColor = vec4(col * (0.55 + fres*1.5 + uAmp*0.9), a * uForm);
            }`
    });
    const shell = new THREE.Mesh(new THREE.IcosahedronGeometry(1, isSmall ? 24 : 40), shellMat);
    orb.add(shell);

    // Red geodésica fina
    const wire = new THREE.LineSegments(
        new THREE.WireframeGeometry(new THREE.IcosahedronGeometry(1.08, 3)),
        new THREE.LineBasicMaterial({ color: COLORS.emerald, transparent: true, opacity: 0.07, blending: THREE.AdditiveBlending, depthWrite: false })
    );
    orb.add(wire);

    /* ---------- Nube de partículas ---------- */
    const P_COUNT = isSmall ? 2600 : 5200;
    const pPos = new Float32Array(P_COUNT * 3);
    const pScatter = new Float32Array(P_COUNT * 3);
    const pRand = new Float32Array(P_COUNT);
    const golden = Math.PI * (3 - Math.sqrt(5));
    for (let i = 0; i < P_COUNT; i++) {
        const y = 1 - (i / (P_COUNT - 1)) * 2;
        const r = Math.sqrt(1 - y * y);
        const th = golden * i;
        pPos[i * 3] = Math.cos(th) * r;
        pPos[i * 3 + 1] = y;
        pPos[i * 3 + 2] = Math.sin(th) * r;
        const sr = 4 + Math.random() * 8;
        const sa = Math.random() * Math.PI * 2;
        const sb = Math.acos(2 * Math.random() - 1);
        pScatter[i * 3] = sr * Math.sin(sb) * Math.cos(sa);
        pScatter[i * 3 + 1] = sr * Math.cos(sb);
        pScatter[i * 3 + 2] = sr * Math.sin(sb) * Math.sin(sa);
        pRand[i] = Math.random();
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute('aScatter', new THREE.BufferAttribute(pScatter, 3));
    pGeo.setAttribute('aRand', new THREE.BufferAttribute(pRand, 1));
    const particles = new THREE.Points(pGeo, new THREE.ShaderMaterial({
        uniforms,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexShader: NOISE + `
            attribute vec3 aScatter; attribute float aRand;
            uniform float uTime, uAmp, uThink, uForm, uPR, uRipple;
            varying float vMix; varying float vAlpha;
            void main(){
                vec3 dir = normalize(position);
                float speed = (0.06 + 0.14*aRand) * (1.0 + uThink*2.5);
                float ang = uTime*speed*(dir.y > 0.0 ? 1.0 : -1.0);
                float c = cos(ang), s = sin(ang);
                dir = vec3(c*dir.x - s*dir.z, dir.y, s*dir.x + c*dir.z);
                float n = snoise(dir*2.0 + vec3(uTime*0.22));
                float burst = uAmp * 0.28 * (0.5 + 0.5*snoise(dir*6.0 + vec3(uTime*3.0)));
                float wave = sin(uRipple*9.0 - aRand*3.0) * exp(-uRipple*2.0) * 0.35;
                float r = 1.3 + n*0.13 + burst + wave + aRand*0.08;
                vec3 p = mix(aScatter, dir*r, smoothstep(0.0, 1.0, clamp(uForm*1.3 - aRand*0.3, 0.0, 1.0)));
                vec4 mv = modelViewMatrix * vec4(p, 1.0);
                gl_PointSize = (2.0 + aRand*3.6) * uPR * (8.0 / -mv.z) * (1.0 + uAmp*0.6);
                vMix = clamp(dir.y*0.5 + 0.5 + n*0.35, 0.0, 1.0);
                vAlpha = (0.25 + 0.75*smoothstep(-0.3, 0.7, n)) * (0.55 + 0.45*aRand);
                gl_Position = projectionMatrix * mv;
            }`,
        fragmentShader: `
            uniform vec3 uEmerald, uViolet, uMagenta;
            uniform float uThink;
            varying float vMix; varying float vAlpha;
            void main(){
                float d = length(gl_PointCoord - 0.5);
                float a = smoothstep(0.5, 0.0, d);
                vec3 col = mix(uViolet, uEmerald, vMix);
                col = mix(col, uMagenta, smoothstep(0.75, 1.0, vMix)*0.6 + uThink*0.35);
                gl_FragColor = vec4(col * 1.4, a * a * vAlpha);
            }`
    }));
    orb.add(particles);

    /* ---------- Anillos HUD ---------- */
    const ringVert = `varying vec2 vP; void main(){ vP = position.xy; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`;
    const ringFrag = `
        uniform float uTime, uForm, uAmp;
        uniform vec3 uColor; uniform float uDash, uFill, uSpeed, uOpacity, uInner, uOuter;
        varying vec2 vP;
        void main(){
            float a = atan(vP.y, vP.x) / 6.2831853 + 0.5;
            float seg = step(fract(a*uDash + uTime*uSpeed), uFill);
            float r = (length(vP) - uInner) / (uOuter - uInner);
            float edge = smoothstep(0.0, 0.25, r) * smoothstep(1.0, 0.75, r);
            float reveal = step(a, uForm * 1.02);
            gl_FragColor = vec4(uColor * (1.2 + uAmp), seg * edge * uOpacity * reveal);
        }`;
    const rings = [];
    function addRing(inner, outer, opts) {
        const mat = new THREE.ShaderMaterial({
            uniforms: Object.assign({
                uColor: { value: opts.color },
                uDash: { value: opts.dash },
                uFill: { value: opts.fill },
                uSpeed: { value: opts.speed || 0 },
                uOpacity: { value: opts.opacity },
                uInner: { value: inner },
                uOuter: { value: outer }
            }, { uTime: uniforms.uTime, uForm: uniforms.uForm, uAmp: uniforms.uAmp }),
            vertexShader: ringVert,
            fragmentShader: ringFrag,
            transparent: true,
            depthWrite: false,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending
        });
        const mesh = new THREE.Mesh(new THREE.RingGeometry(inner, outer, 256, 1), mat);
        const pivot = new THREE.Group();
        pivot.rotation.set(opts.tilt[0], opts.tilt[1], opts.tilt[2]);
        pivot.add(mesh);
        orb.add(pivot);
        rings.push({ mesh, pivot, spin: opts.spin });
        return mesh;
    }
    addRing(1.62, 1.645, { color: COLORS.emerald, dash: 3, fill: 0.82, opacity: 0.85, tilt: [1.35, 0, 0.18], spin: 0.12 });
    addRing(1.70, 1.78, { color: COLORS.emerald, dash: 180, fill: 0.28, opacity: 0.5, tilt: [1.35, 0, 0.18], spin: -0.05 });
    addRing(1.86, 1.875, { color: COLORS.violet, dash: 7, fill: 0.6, opacity: 0.8, tilt: [0.25, 0.9, 0.0], spin: 0.18 });
    addRing(1.48, 1.49, { color: COLORS.magenta, dash: 1, fill: 0.35, opacity: 0.9, tilt: [-0.55, -0.6, 0.3], spin: -0.32 });
    addRing(2.05, 2.06, { color: COLORS.violet, dash: 40, fill: 0.5, opacity: 0.35, tilt: [1.5, 0, 0], spin: 0.03 });

    /* ---------- Satélites ---------- */
    const satellites = [];
    [[1.62, 0.9, COLORS.emerald, [1.35, 0, 0.18]], [1.86, -0.6, COLORS.magenta, [0.25, 0.9, 0]], [1.48, 1.3, COLORS.violet, [-0.55, -0.6, 0.3]]]
        .forEach(([r, speed, color, tilt]) => {
            const pivot = new THREE.Group();
            pivot.rotation.set(tilt[0], tilt[1], tilt[2]);
            const s = sprite(color, 0.32, 0.95);
            const s2 = sprite(COLORS.white, 0.1, 1);
            pivot.add(s, s2);
            orb.add(pivot);
            satellites.push({ pivot, s, s2, r, speed, phase: Math.random() * 6.28 });
        });

    /* ---------- Plataforma y haz de luz ---------- */
    const platform = new THREE.Group();
    platform.position.y = -2.15;
    root.add(platform);
    const platMat = new THREE.ShaderMaterial({
        uniforms,
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
        vertexShader: `varying vec2 vP; void main(){ vP = position.xy; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
        fragmentShader: `
            uniform float uTime, uAmp, uForm;
            uniform vec3 uEmerald, uViolet, uMagenta;
            varying vec2 vP;
            void main(){
                float r = length(vP);
                float a = atan(vP.y, vP.x);
                float waves = smoothstep(0.08, 0.0, abs(fract(r*2.4 - uTime*0.35) - 0.5) - 0.42);
                float rim1 = smoothstep(0.03, 0.0, abs(r - 1.25));
                float rim2 = smoothstep(0.02, 0.0, abs(r - 1.55)) * step(0.5, fract(a*12.0/6.2831853 + uTime*0.05));
                float rim3 = smoothstep(0.05, 0.0, abs(r - 2.3)) * 0.5;
                float disc = smoothstep(1.25, 0.0, r) * 0.25;
                float fade = smoothstep(3.4, 0.4, r);
                vec3 col = mix(uEmerald, uViolet, smoothstep(0.8, 2.6, r));
                float alpha = (waves*0.22 + rim1*0.9 + rim2*0.6 + rim3 + disc) * fade * (0.8 + uAmp*0.6);
                gl_FragColor = vec4(col*1.3, alpha * uForm);
            }`
    });
    const plat = new THREE.Mesh(new THREE.CircleGeometry(3.4, 128), platMat);
    plat.rotation.x = -Math.PI / 2;
    platform.add(plat);

    const beam = new THREE.Mesh(
        new THREE.CylinderGeometry(0.55, 1.2, 2.2, 64, 1, true),
        new THREE.ShaderMaterial({
            uniforms,
            transparent: true,
            depthWrite: false,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending,
            vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
            fragmentShader: `
                uniform float uTime, uAmp, uForm; uniform vec3 uEmerald;
                varying vec2 vUv;
                void main(){
                    float lines = 0.6 + 0.4*sin(vUv.x*80.0 + uTime*1.5);
                    float a = pow(1.0 - vUv.y, 2.0) * 0.16 * lines * (1.0 + uAmp);
                    gl_FragColor = vec4(uEmerald, a * uForm);
                }`
        })
    );
    beam.position.y = 1.1;
    platform.add(beam);

    /* ---------- Rejilla del suelo ---------- */
    const grid = new THREE.Mesh(
        new THREE.PlaneGeometry(60, 60),
        new THREE.ShaderMaterial({
            uniforms,
            transparent: true,
            depthWrite: false,
            vertexShader: `varying vec2 vP; void main(){ vP = position.xy; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
            fragmentShader: `
                uniform float uTime, uForm; uniform vec3 uEmerald, uViolet;
                varying vec2 vP;
                void main(){
                    vec2 g = abs(fract(vP*0.8 + vec2(0.0, uTime*0.04)) - 0.5);
                    float line = smoothstep(0.03, 0.0, min(g.x, g.y) - 0.0);
                    float d = length(vP);
                    float fade = smoothstep(16.0, 2.5, d) * smoothstep(1.5, 4.0, d);
                    vec3 col = mix(uEmerald, uViolet, smoothstep(3.0, 12.0, d));
                    gl_FragColor = vec4(col, line * fade * 0.16 * uForm);
                }`
        })
    );
    grid.rotation.x = -Math.PI / 2;
    grid.position.y = -2.16;
    root.add(grid);

    /* ---------- Polvo ambiental ---------- */
    const D_COUNT = isSmall ? 500 : 1100;
    const dPos = new Float32Array(D_COUNT * 3);
    const dRand = new Float32Array(D_COUNT);
    for (let i = 0; i < D_COUNT; i++) {
        dPos[i * 3] = (Math.random() - 0.5) * 26;
        dPos[i * 3 + 1] = (Math.random() - 0.5) * 14;
        dPos[i * 3 + 2] = (Math.random() - 0.5) * 16 - 4;
        dRand[i] = Math.random();
    }
    const dGeo = new THREE.BufferGeometry();
    dGeo.setAttribute('position', new THREE.BufferAttribute(dPos, 3));
    dGeo.setAttribute('aRand', new THREE.BufferAttribute(dRand, 1));
    const dust = new THREE.Points(dGeo, new THREE.ShaderMaterial({
        uniforms,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexShader: `
            attribute float aRand; uniform float uTime, uPR;
            varying float vA; varying float vR;
            void main(){
                vec3 p = position;
                p.y = mod(p.y + uTime*(0.08 + aRand*0.2) + 7.0, 14.0) - 7.0;
                p.x += sin(uTime*0.2 + aRand*20.0)*0.3;
                vec4 mv = modelViewMatrix * vec4(p, 1.0);
                gl_PointSize = (1.0 + aRand*2.2) * uPR * (10.0 / -mv.z);
                vA = (0.25 + 0.75*abs(sin(uTime*(0.5+aRand) + aRand*30.0))) * smoothstep(7.0, 4.0, abs(p.y));
                vR = aRand;
                gl_Position = projectionMatrix * mv;
            }`,
        fragmentShader: `
            uniform vec3 uEmerald, uViolet, uMagenta;
            varying float vA; varying float vR;
            void main(){
                float d = length(gl_PointCoord - 0.5);
                vec3 col = vR < 0.5 ? uEmerald : (vR < 0.85 ? uViolet : uMagenta);
                gl_FragColor = vec4(col, smoothstep(0.5, 0.0, d) * vA * 0.55);
            }`
    }));
    scene.add(dust);

    /* ---------- Layout: centrar el orbe en el escenario HTML ---------- */
    let W = 1, H = 1, unitPx = 100, cx = 0.5, cy = 0.5;
    function layout() {
        const hr = hero.getBoundingClientRect();
        W = Math.max(1, Math.round(hr.width));
        H = Math.max(1, Math.round(canvas.clientHeight || hr.height));
        renderer.setSize(W, H, false);
        const sr = stage.getBoundingClientRect();
        const sx = sr.left - hr.left + sr.width / 2;
        const sy = sr.top - hr.top + sr.height * 0.47;
        cx = sx / W; cy = sy / H;
        // los anillos miden ~4 unidades; la plataforma puede quedar detrás de la consola
        unitPx = Math.max(40, Math.min(sr.height / 3.7, sr.width / 4.3));
        const dist = H / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)) * unitPx);
        camera.aspect = W / H;
        camera.position.copy(CAM_DIR).multiplyScalar(dist);
        camera.lookAt(0, 0, 0);
        camera.setViewOffset(W, H, W / 2 - sx, H / 2 - sy, W, H);
        camera.updateProjectionMatrix();
        bg.material.uniforms.uRes.value.set(W, H);
        bg.material.uniforms.uCenter.value.set(cx, 1 - cy);
        uniforms.uPR.value = renderer.getPixelRatio() * (unitPx / 110);
    }
    layout();
    // solo se recalcula al cambiar la ventana, para que el orbe no salte cuando crece el chat
    window.addEventListener('resize', layout);
    window.addEventListener('load', layout);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(layout);

    /* ---------- Interacción ---------- */
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    window.addEventListener('pointermove', (e) => {
        pointer.tx = (e.clientX / window.innerWidth - cx) * 2;
        pointer.ty = (e.clientY / window.innerHeight - cy) * 2;
    }, { passive: true });

    const raycaster = new THREE.Raycaster();
    const hitSphere = new THREE.Sphere(new THREE.Vector3(), 1.5);
    function orbHit(clientX, clientY) {
        const r = canvas.getBoundingClientRect();
        const v = new THREE.Vector2(((clientX - r.left) / r.width) * 2 - 1, -((clientY - r.top) / r.height) * 2 + 1);
        raycaster.setFromCamera(v, camera);
        hitSphere.center.setFromMatrixPosition(orb.matrixWorld);
        return raycaster.ray.intersectsSphere(hitSphere);
    }
    hero.addEventListener('click', (e) => {
        if (e.target.closest('a, button, input, form, .aura-console, .aura-topbar')) return;
        if (orbHit(e.clientX, e.clientY)) {
            api.poke();
            window.dispatchEvent(new CustomEvent('aura:poke'));
        }
    });
    hero.addEventListener('pointermove', (e) => {
        if (e.target === canvas || e.target.closest('.aura-stage')) {
            hero.classList.toggle('aura-orb-hover', orbHit(e.clientX, e.clientY));
        }
    }, { passive: true });

    /* ---------- Estados ---------- */
    let state = 'idle';
    let amp = 0;
    api.setState = (s) => { state = s; };
    api.pulse = (v) => { amp = Math.min(1.2, amp + (v == null ? 0.35 : v)); };
    api.poke = () => { uniforms.uRipple.value = 0; api.pulse(0.8); };
    api.ready = true;

    /* ---------- Bucle de animación ---------- */
    let visible = true;
    let running = true;
    if ('IntersectionObserver' in window) {
        new IntersectionObserver((entries) => { visible = entries[0].isIntersecting; }, { threshold: 0.01 }).observe(hero);
    }
    document.addEventListener('visibilitychange', () => { running = !document.hidden; });

    const clock = new THREE.Clock();
    let t = 0;
    const speedK = reducedMotion ? 0.35 : 1;
    function lerp(a, b, k) { return a + (b - a) * k; }

    function frame() {
        requestAnimationFrame(frame);
        if (!visible || !running) { clock.getDelta(); return; }
        const dt = Math.min(clock.getDelta(), 0.05);
        t += dt * speedK;
        uniforms.uTime.value = t;
        uniforms.uRipple.value += dt;

        // formación inicial
        if (uniforms.uForm.value < 1) uniforms.uForm.value = Math.min(1, uniforms.uForm.value + dt * 0.45);

        // energía de voz: decae, y en modo hablando hay un "murmullo" de base
        const base = state === 'speaking' ? 0.18 + 0.12 * Math.sin(t * 11) * Math.sin(t * 3.7) : 0;
        amp = Math.max(base, amp - dt * 1.6);
        uniforms.uAmp.value = lerp(uniforms.uAmp.value, amp, 0.25);
        uniforms.uThink.value = lerp(uniforms.uThink.value, state === 'thinking' ? 1 : 0, 0.06);
        uniforms.uListen.value = lerp(uniforms.uListen.value, state === 'listening' ? 1 : 0, 0.08);

        // seguimiento del puntero
        pointer.x = lerp(pointer.x, pointer.tx, 0.04);
        pointer.y = lerp(pointer.y, pointer.ty, 0.04);
        root.rotation.y = pointer.x * 0.28;
        root.rotation.x = pointer.y * 0.12;

        // flotación y rotación
        orb.position.y = Math.sin(t * 0.9) * 0.06;
        const spinK = 1 + uniforms.uThink.value * 2.5;
        shell.rotation.y += dt * 0.12 * spinK * speedK;
        wire.rotation.y -= dt * 0.05 * spinK * speedK;
        wire.rotation.x += dt * 0.02 * speedK;
        particles.rotation.y += dt * 0.03 * speedK;
        rings.forEach((r) => { r.mesh.rotation.z += dt * r.spin * spinK * speedK; });
        satellites.forEach((s) => {
            const a = s.phase + t * s.speed * spinK;
            s.s.position.set(Math.cos(a) * s.r, Math.sin(a) * s.r, 0);
            s.s2.position.copy(s.s.position);
        });

        const breathe = 1 + Math.sin(t * 1.6) * 0.04 + uniforms.uAmp.value * 0.25;
        core.scale.setScalar(1.35 * breathe * uniforms.uForm.value);
        coreTint.scale.setScalar(2.5 * breathe * uniforms.uForm.value);
        halo2.material.opacity = 0.22 + uniforms.uAmp.value * 0.25;
        halo.material.opacity = 0.26 + uniforms.uThink.value * 0.14;
        coreTint.material.color.copy(COLORS.emerald).lerp(COLORS.magenta, uniforms.uThink.value * 0.6);
        platform.position.y = -2.15 + orb.position.y * 0.15;

        renderer.render(scene, camera);
    }
    frame();
    document.documentElement.classList.add('aura-webgl');
})();
