import React, { useEffect, useState, useRef } from 'react';
import { io } from 'socket.io-client';
import { getAllPositions, savePosition } from '../services/api';
import * as THREE from 'three';
import './BAllTracker.css';

const BallTracker = () => {
  const [positions, setPositions] = useState([]);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [z, setZ] = useState(0);
  const [error, setError] = useState(null);
  const mountRef = useRef(null);
  const ballRef = useRef(null);
  const socketRef = useRef(null); 

  useEffect(() => {
   
    const socket = io('http://localhost:5000');
    socketRef.current = socket; 

    socket.on('position', (position) => {
      setPositions((prevPositions) => [...prevPositions, position]);
      const { x, y, z } = position;
      setX(x);
      setY(y);
      setZ(z);
    });

    socket.on('initialPositions', (initialPositions) => {
      setPositions(initialPositions);
      if (initialPositions.length > 0) {
        const latestPosition = initialPositions[initialPositions.length - 1];
        setX(latestPosition.x);
        setY(latestPosition.y);
        setZ(latestPosition.z);
      }
    });

    const fetchData = async () => {
      try {
        const response = await getAllPositions();
        if (response.length > 0) {
          const latestPosition = response[response.length - 1];
          setPositions(response);
          setX(latestPosition.x);
          setY(latestPosition.y);
          setZ(latestPosition.z);
        }
      } catch (error) {
        console.error('Error fetching positions:', error);
        setError('Error fetching positions');
      }
    };

    fetchData();

    return () => socket.disconnect();
  }, []);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(new THREE.Color('rgb(12, 24, 68)')); 
    mountRef.current.appendChild(renderer.domElement);

    const geometry = new THREE.SphereGeometry(0.25, 32, 32); 
    const material = new THREE.MeshBasicMaterial({ color: 0xFFF5E1 });
    const ball = new THREE.Mesh(geometry, material);
    ballRef.current = ball;
    scene.add(ball);

    camera.position.z = 10;

    const light = new THREE.AmbientLight(0x404040);
    scene.add(light);

    const animate = () => {
      requestAnimationFrame(animate);
      ball.position.set(x, y, z);
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, [x, y, z]);

  const handleUpdatePosition = async () => {
    try {
      await savePosition(x, y, z);
      if (socketRef.current) {
        socketRef.current.emit('newPosition', { x, y, z });
      }
    } catch (error) {
      console.error('Error saving position:', error);
    }
  };

  return (
    <div>
      <div className="container">
        <input
          type="number"
          placeholder="X-axis"
          value={x}
          onChange={(e) => setX(Number(e.target.value))}
          className="input-field"
        />
        <input
          type="number"
          placeholder="Y-axis"
          value={y}
          onChange={(e) => setY(Number(e.target.value))}
          className="input-field"
        />
        <input
          type="number"
          placeholder="Z-axis"
          value={z}
          onChange={(e) => setZ(Number(e.target.value))}
          className="input-field"
        />
        <button 
          onClick={handleUpdatePosition}
          className="update-button"
        >
          Update Position
        </button>
        {error && <p className="error-message">{error}</p>}
      </div>
      <div ref={mountRef} className="threejs-container" />
    </div>
  );
};

export default BallTracker;
