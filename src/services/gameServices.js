const BASE_URL = `https://django-bump-it-8e545e507195.herokuapp.com`

const getToken = () => {
    return localStorage.getItem('token')
  }

export const getMatch = async () => {
    try {

        const token = getToken()

        if (!token) { throw "token is undefined" }

        const response = await fetch(`${BASE_URL}/game/result`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        if (!response.ok) throw new Error("Network response was not ok")
        const jsonData = await response.json()
        return jsonData;
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error)
        throw error
    }
}

export const sendBump = async (choice) => {
    try {

        const token = getToken()

        if (!token) {
            throw "token is undefined"
        }

        if (choice != "Rock" && choice != "Paper" && choice != "Scissors"){
            throw "must choose Rock Paper or Scissor (capitolized)"
        }
        
        const payload = JSON.stringify({phone_time_stamp: new Date().toISOString(), choice: choice})
        console.log("PAYLOAD:", payload )
        console.log("TOKEN: ", token)
        const response = await fetch(`${BASE_URL}/game/bump`, {
            method: "POST",
            body: payload,
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        console.log(response)
        if (!response.ok) throw new Error("Network response was not ok")
        return response.body
    } catch (error) {
        console.error("There was a problem with the fetch operation:", error)
        throw error
    }
}

export class BumpDetector {
    constructor(bumpCallback) {
      this.bumpCallback = bumpCallback
      this.threshold = 20
      this.lastBumpTimestamp = null
      this.isEnabled = false
    }
  
    startDetection() {
      if (typeof DeviceMotionEvent.requestPermission === 'function') {
        // Support iOS 13+ permission handling
        DeviceMotionEvent.requestPermission()
          .then((permissionState) => {
            if (permissionState === 'granted') {
              this.enableAccelerometer(); // Start capturing
            }
          })
          .catch(console.error);
      } else {
        // Standard permission handling
        this.enableAccelerometer();
      }
    }
  
    enableAccelerometer() {
      window.addEventListener('devicemotion', this.handleMotionEvent, false);
      this.isEnabled = true; 
    }
  
    disableAccelerometer() {
      window.removeEventListener('devicemotion', this.handleMotionEvent);
      this.isEnabled = false; 
    }
  
    handleMotionEvent = (event) => {
      const acc = event.accelerationIncludingGravity; 
  
      if (this.isEnabled) {
        if (Math.abs(acc.x) > this.threshold || 
            Math.abs(acc.y) > this.threshold || 
            Math.abs(acc.z) > this.threshold) {
          this.bumpDetected();
        }
      }
    };
  
    bumpDetected() {
      // Check for recent bumps to avoid double-triggers
      const now = Date.now();
      if (!this.lastBumpTimestamp || (now - this.lastBumpTimestamp) > 500) {
        console.log('Bump Detected!');
        if (this.bumpCallback) {
            this.bumpCallback()
        }
        this.lastBumpTimestamp = now;  
      }
    }
}