const threshold = 20; // You might need to adjust this value

// Event listener for device motion
window.addEventListener('devicemotion', (event) => {
    // Get acceleration including gravity in all three axes
    const acc = event.accelerationIncludingGravity;

    // Check for a significant change in any direction
    if (Math.abs(acc.x) > threshold || Math.abs(acc.y) > threshold || Math.abs(acc.z) > threshold) {
        console.log('Bump detected!');
    }
});