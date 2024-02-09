// Threshold for detecting a bump
const threshold = 20; // Adjust based on needed sensitivity

// Function to request permission for accessing accelerometer data
function requestPermission() {
    // Feature detection
    if (typeof DeviceMotionEvent.requestPermission === 'function') {
        DeviceMotionEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === 'granted') {
                    // Permission granted
                    window.addEventListener('devicemotion', handleDeviceMotion);
                } else {
                    // Permission denied
                    alert('Permission to access accelerometer was denied.');
                }
            })
            .catch(console.error); // Handle errors
    } else {
        // Handle regular non-iOS 13+ devices
        window.addEventListener('devicemotion', handleDeviceMotion);
    }
}

// Function to handle device motion event
function handleDeviceMotion(event) {
    const acc = event.accelerationIncludingGravity;
    document.getElementById('accelerometer-data').textContent = `Accelerometer data - X: ${acc.x.toFixed(2)}, Y: ${acc.y.toFixed(2)}, Z: ${acc.z.toFixed(2)}`;

    if (Math.abs(acc.x) > threshold || Math.abs(acc.y) > threshold || Math.abs(acc.z) > threshold) {
        try {
            const now = new Date();
            const formattedDate = now.toLocaleString('default', { hour12: true }) + '.' + now.getMilliseconds().toString().padStart(3, '0');
            document.getElementById('timestamp').textContent = `Timestamp: ${formattedDate}`;
            console.log("shit worked")
        } catch (error) {
            console.log("shit broke", error)
        }
    }
}

document.getElementById('show-timestamp').addEventListener('click', function() {
    try {
        const now = new Date();
        const formattedDate = now.toLocaleString('default', { hour12: true }) + '.' + now.getMilliseconds().toString().padStart(3, '0');
        document.getElementById('timestamp').textContent = `Timestamp: ${formattedDate}`;
        console.log("shit worked")
    } catch (error) {
        console.log("shit broke", error)
    }
    
});

// Add event listener to the request permission button
document.getElementById('request-permission').addEventListener('click', requestPermission);


// const now = new Date();
// const formattedDate = now.toLocaleString('default', { hour12: true }) + '.' + ;
// document.getElementById('bump-detected').textContent = `Bump detected at: ${formattedDate}`;

