'use client';

import React, { useEffect, useRef } from 'react';

export default function ThreeDAtom() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let angle = 0;

    // Canvas size
    const size = 320;
    canvas.width = size;
    canvas.height = size;

    const fov = 350; // Camera field of view
    const centerX = size / 2;
    const centerY = size / 2;

    // Define 3 electron orbits: radius, tilt in X, tilt in Y, speed, color
    const orbits = [
      { rx: 90, ry: 25, rotateY: Math.PI / 4, rotateX: Math.PI / 6, speed: 0.035, color: '#06b6d4', offset: 0 },
      { rx: 90, ry: 25, rotateY: -Math.PI / 4, rotateX: Math.PI / 6, speed: 0.045, color: '#f43f5e', offset: Math.PI / 3 },
      { rx: 90, ry: 25, rotateY: 0, rotateX: -Math.PI / 3, speed: 0.025, color: '#a855f7', offset: Math.PI * (2 / 3) }
    ];

    const draw = () => {
      ctx.clearRect(0, 0, size, size);

      // 1. Draw glowing central nucleus
      const grad = ctx.createRadialGradient(centerX, centerY, 2, centerX, centerY, 22);
      grad.addColorStop(0, '#ffffff');
      grad.addColorStop(0.2, '#6366f1');
      grad.addColorStop(0.6, 'rgba(6, 182, 212, 0.4)');
      grad.addColorStop(1, 'rgba(6, 182, 212, 0)');
      
      ctx.beginPath();
      ctx.arc(centerX, centerY, 22, 0, Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // 2. Draw orbits and orbiting electrons in 3D
      angle += 0.015;

      // Group elements to sort them by Z (depth) so electrons correctly go behind/in front of the nucleus
      const drawQueue = [];

      orbits.forEach((orbit, index) => {
        // Calculate orbit ellipse wireframe coordinates
        const segments = 100;
        const orbitPoints = [];
        for (let j = 0; j < segments; j++) {
          const theta = (j / segments) * Math.PI * 2;
          
          // 3D coordinates relative to center
          let x = orbit.rx * Math.cos(theta);
          let y = orbit.ry * Math.sin(theta);
          let z = 0;

          // Apply rotation transforms (Euler angles)
          // Rotate around X axis
          let y1 = y * Math.cos(orbit.rotateX) - z * Math.sin(orbit.rotateX);
          let z1 = y * Math.sin(orbit.rotateX) + z * Math.cos(orbit.rotateX);
          
          // Rotate around Y axis
          let x2 = x * Math.cos(orbit.rotateY) + z1 * Math.sin(orbit.rotateY);
          let z2 = -x * Math.sin(orbit.rotateY) + z1 * Math.cos(orbit.rotateY);

          // Project to 2D
          const scale = fov / (fov + z2);
          const screenX = x2 * scale + centerX;
          const screenY = y1 * scale + centerY;

          orbitPoints.push({ x: screenX, y: screenY, z: z2 });
        }

        // Draw orbit ring (drawn below electrons)
        ctx.beginPath();
        ctx.moveTo(orbitPoints[0].x, orbitPoints[0].y);
        for (let j = 1; j < orbitPoints.length; j++) {
          ctx.lineTo(orbitPoints[j].x, orbitPoints[j].y);
        }
        ctx.closePath();
        ctx.strokeStyle = `${orbit.color}25`; // Faint color
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Calculate electron position on this orbit
        const eTheta = angle * (orbit.speed * 60) + orbit.offset;
        let ex = orbit.rx * Math.cos(eTheta);
        let ey = orbit.ry * Math.sin(eTheta);
        let ez = 0;

        let ey1 = ey * Math.cos(orbit.rotateX) - ez * Math.sin(orbit.rotateX);
        let ez1 = ey * Math.sin(orbit.rotateX) + ez * Math.cos(orbit.rotateX);
        
        let ex2 = ex * Math.cos(orbit.rotateY) + ez1 * Math.sin(orbit.rotateY);
        let ez2 = -ex * Math.sin(orbit.rotateY) + ez1 * Math.cos(orbit.rotateY);

        const escale = fov / (fov + ez2);
        const escreenX = ex2 * escale + centerX;
        const escreenY = ey1 * escale + centerY;

        drawQueue.push({
          x: escreenX,
          y: escreenY,
          z: ez2,
          color: orbit.color,
          radius: escale * 4 // size changes based on depth (Z)
        });
      });

      // Sort by Z index (descending order, so larger Z [furthest] drawn first)
      drawQueue.sort((a, b) => b.z - a.z);

      // Draw electrons
      drawQueue.forEach((e) => {
        const radGrad = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.radius * 2);
        radGrad.addColorStop(0, '#ffffff');
        radGrad.addColorStop(0.3, e.color);
        radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.beginPath();
        ctx.arc(e.x, e.y, e.radius * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = radGrad;
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="relative flex items-center justify-center w-80 h-80">
      <canvas ref={canvasRef} className="z-10" />
      {/* Soft background blue glow */}
      <div className="absolute w-44 h-44 bg-indigo-500/10 rounded-full blur-3xl z-0"></div>
    </div>
  );
}
