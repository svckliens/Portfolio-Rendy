import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../../context/ThemeContext';
import '../css/AIHeroVisual3D.css';

export default function AIHeroVisual3D({ children }) {
    const mountRef = useRef(null);
    const containerRef = useRef(null);
    const { theme } = useTheme();

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        // Dimensions
        const width = mount.clientWidth || 460;
        const height = mount.clientHeight || 460;

        // Scene, Camera, Renderer
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        camera.position.z = 120;

        const renderer = new THREE.WebGLRenderer({
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance',
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        mount.appendChild(renderer.domElement);

        // Group containing all 3D neural elements
        const neuralGroup = new THREE.Group();
        scene.add(neuralGroup);

        // Color setup matching design system
        const isDark = theme !== 'light';
        const primaryColor = new THREE.Color(0x7c6aef); // Violet #7c6aef
        const cyanColor = new THREE.Color(0x22d3ee);    // Cyan #22d3ee
        const pinkColor = new THREE.Color(0xf472b6);    // Pink #f472b6

        // 1. Create Neural Nodes (Points on a hollow sphere around the avatar)
        const nodeCount = 65;
        const radius = 48;
        const nodePositions = [];
        const nodeColors = [];
        const nodeVelocities = [];

        for (let i = 0; i < nodeCount; i++) {
            // Distribute on sphere using Fibonacci sphere algorithm
            const phi = Math.acos(1 - (2 * (i + 0.5)) / nodeCount);
            const theta = Math.PI * (1 + Math.sqrt(5)) * i;

            const x = radius * Math.sin(phi) * Math.cos(theta) + (Math.random() - 0.5) * 6;
            const y = radius * Math.sin(phi) * Math.sin(theta) + (Math.random() - 0.5) * 6;
            const z = radius * Math.cos(phi) * 0.75 + (Math.random() - 0.5) * 8; // Slight flatten z

            nodePositions.push(x, y, z);
            nodeVelocities.push(
                (Math.random() - 0.5) * 0.04,
                (Math.random() - 0.5) * 0.04,
                (Math.random() - 0.5) * 0.04
            );

            // Alternate colors between cyan, violet, and pink
            const c = i % 3 === 0 ? cyanColor : i % 3 === 1 ? primaryColor : pinkColor;
            nodeColors.push(c.r, c.g, c.b);
        }

        // Buffer Geometry for Nodes
        const nodesGeometry = new THREE.BufferGeometry();
        nodesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(nodePositions, 3));
        nodesGeometry.setAttribute('color', new THREE.Float32BufferAttribute(nodeColors, 3));

        // Create round glowing particle texture using canvas
        const createParticleTexture = () => {
            const canvas = document.createElement('canvas');
            canvas.width = 64;
            canvas.height = 64;
            const ctx = canvas.getContext('2d');
            const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 30);
            gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
            gradient.addColorStop(0.3, 'rgba(167, 139, 250, 0.8)');
            gradient.addColorStop(0.7, 'rgba(124, 106, 239, 0.3)');
            gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 64, 64);
            return new THREE.CanvasTexture(canvas);
        };

        const particleTexture = createParticleTexture();

        const nodesMaterial = new THREE.PointsMaterial({
            size: isDark ? 4.5 : 5.0,
            vertexColors: true,
            map: particleTexture,
            transparent: true,
            opacity: isDark ? 0.95 : 0.85,
            blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
            depthWrite: false,
        });

        const nodePoints = new THREE.Points(nodesGeometry, nodesMaterial);
        neuralGroup.add(nodePoints);

        // 2. Synaptic Edges (Interconnecting Lines)
        const maxConnections = 140;
        const linePositions = new Float32Array(maxConnections * 2 * 3);
        const lineColors = new Float32Array(maxConnections * 2 * 3);

        const linesGeometry = new THREE.BufferGeometry();
        linesGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
        linesGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

        const linesMaterial = new THREE.LineBasicMaterial({
            vertexColors: true,
            transparent: true,
            opacity: isDark ? 0.45 : 0.35,
            blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
            depthWrite: false,
        });

        const linesMesh = new THREE.LineSegments(linesGeometry, linesMaterial);
        neuralGroup.add(linesMesh);

        // 3. Holographic Orbit Rings
        const ringGeo1 = new THREE.TorusGeometry(38, 0.25, 16, 100);
        const ringMat1 = new THREE.MeshBasicMaterial({
            color: cyanColor,
            transparent: true,
            opacity: isDark ? 0.4 : 0.25,
            blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
        });
        const orbitRing1 = new THREE.Mesh(ringGeo1, ringMat1);
        orbitRing1.rotation.x = Math.PI / 3;
        neuralGroup.add(orbitRing1);

        const ringGeo2 = new THREE.TorusGeometry(43, 0.2, 16, 100);
        const ringMat2 = new THREE.MeshBasicMaterial({
            color: primaryColor,
            transparent: true,
            opacity: isDark ? 0.35 : 0.2,
            blending: isDark ? THREE.AdditiveBlending : THREE.NormalBlending,
        });
        const orbitRing2 = new THREE.Mesh(ringGeo2, ringMat2);
        orbitRing2.rotation.y = Math.PI / 4;
        neuralGroup.add(orbitRing2);

        // Interactive Mouse Tracking with smooth Lerp Damping
        let mouseX = 0;
        let mouseY = 0;
        let targetRotationX = 0;
        let targetRotationY = 0;

        const handleMouseMove = (e) => {
            const rect = mount.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / height - 0.5;

            targetRotationY = x * 0.8;
            targetRotationX = y * 0.8;
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        // Optimization: IntersectionObserver to pause rendering when off-screen
        let isVisible = true;
        const observer = new IntersectionObserver(
            ([entry]) => {
                isVisible = entry.isIntersecting;
            },
            { threshold: 0.05 }
        );
        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        // Animation Loop
        let animationFrameId;
        let clock = new THREE.Clock();

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);

            if (!isVisible) return; // Skip calculation when offscreen

            const elapsedTime = clock.getElapsedTime();

            // Smooth damping towards mouse position + gentle ambient spin
            neuralGroup.rotation.y += (targetRotationY - neuralGroup.rotation.y) * 0.05 + 0.002;
            neuralGroup.rotation.x += (targetRotationX - neuralGroup.rotation.x) * 0.05;

            // Wobble orbit rings
            orbitRing1.rotation.z = elapsedTime * 0.25;
            orbitRing2.rotation.z = -elapsedTime * 0.2;

            // Animate nodes and update connections
            const positions = nodesGeometry.attributes.position.array;
            let lineIdx = 0;
            const connectDistance = 24;

            for (let i = 0; i < nodeCount; i++) {
                const i3 = i * 3;
                // Add slight floating oscillation
                positions[i3 + 1] += Math.sin(elapsedTime * 1.5 + i) * 0.03;

                // Check connections to neighboring nodes
                for (let j = i + 1; j < nodeCount; j++) {
                    const j3 = j * 3;
                    const dx = positions[i3] - positions[j3];
                    const dy = positions[i3 + 1] - positions[j3 + 1];
                    const dz = positions[i3 + 2] - positions[j3 + 2];
                    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                    if (dist < connectDistance && lineIdx < maxConnections * 2 * 3) {
                        // Point 1
                        linePositions[lineIdx] = positions[i3];
                        linePositions[lineIdx + 1] = positions[i3 + 1];
                        linePositions[lineIdx + 2] = positions[i3 + 2];

                        // Point 2
                        linePositions[lineIdx + 3] = positions[j3];
                        linePositions[lineIdx + 4] = positions[j3 + 1];
                        linePositions[lineIdx + 5] = positions[j3 + 2];

                        // Alpha based on distance
                        const alpha = 1 - dist / connectDistance;
                        const c = i % 2 === 0 ? cyanColor : primaryColor;

                        lineColors[lineIdx] = c.r * alpha;
                        lineColors[lineIdx + 1] = c.g * alpha;
                        lineColors[lineIdx + 2] = c.b * alpha;

                        lineColors[lineIdx + 3] = c.r * alpha;
                        lineColors[lineIdx + 4] = c.g * alpha;
                        lineColors[lineIdx + 5] = c.b * alpha;

                        lineIdx += 6;
                    }
                }
            }

            // Zero out unused line segments
            for (let k = lineIdx; k < maxConnections * 2 * 3; k++) {
                linePositions[k] = 0;
                lineColors[k] = 0;
            }

            nodesGeometry.attributes.position.needsUpdate = true;
            linesGeometry.attributes.position.needsUpdate = true;
            linesGeometry.attributes.color.needsUpdate = true;

            renderer.render(scene, camera);
        };

        animate();

        // Responsive Resize
        const handleResize = () => {
            if (!mount) return;
            const newW = mount.clientWidth;
            const newH = mount.clientHeight;
            camera.aspect = newW / newH;
            camera.updateProjectionMatrix();
            renderer.setSize(newW, newH);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            observer.disconnect();
            cancelAnimationFrame(animationFrameId);

            if (mount && renderer.domElement) {
                mount.removeChild(renderer.domElement);
            }

            // Dispose 3D resources
            nodesGeometry.dispose();
            nodesMaterial.dispose();
            particleTexture.dispose();
            linesGeometry.dispose();
            linesMaterial.dispose();
            ringGeo1.dispose();
            ringMat1.dispose();
            ringGeo2.dispose();
            ringMat2.dispose();
            renderer.dispose();
        };
    }, [theme]);

    return (
        <div ref={containerRef} className="ai-hero-3d">
            {/* 3D WebGL Canvas Layer */}
            <div ref={mountRef} className="ai-hero-3d__canvas" aria-hidden="true" />

            {/* Inner Content (Avatar, rings, badge) perfectly centered */}
            <div className="ai-hero-3d__content">
                {children}
            </div>
        </div>
    );
}
