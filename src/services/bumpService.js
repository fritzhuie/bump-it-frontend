import { useState, useEffect, useRef } from 'react';

function useBumpDetection(threshold = 20) {
  const [bumpDetected, setBumpDetected] = useState(false);
  const [accelerationData, setAccelerationData] = useState(null);
  const lastBumpRef = useRef(null);

  const handleDeviceMotion = (event) => {
    const acc = event.accelerationIncludingGravity;
    setAccelerationData({ x: acc.x.toFixed(2), y: acc.y.toFixed(2), z: acc.z.toFixed(2) });

    if (
      Math.abs(acc.x) > threshold ||
      Math.abs(acc.y) > threshold ||
      Math.abs(acc.z) > threshold
    ) {
      setBumpDetected(true);
      lastBumpRef.current = new Date(); 
    }
  };

  useEffect(() => {
    const requestPermission = async () => {
      if (typeof DeviceMotionEvent.requestPermission === 'function') {
        // iOS 13+ permission handling
        try {
          const state = await DeviceMotionEvent.requestPermission();
          if (state === 'granted') {
            window.addEventListener('devicemotion', handleDeviceMotion);
          } else {
            console.error('Permission denied');
          }
        } catch (error) {
          console.error(error);
        }
      } else {
        // Normal permission handling
        window.addEventListener('devicemotion', handleDeviceMotion);
      }
    };

    requestPermission();

    // Cleanup function
    return () => window.removeEventListener('devicemotion', handleDeviceMotion);
  }, []);

  return { bumpDetected, accelerationData, lastBump: lastBumpRef.current };
}

export default useBumpDetection;
