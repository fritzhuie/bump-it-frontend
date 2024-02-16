import React from "react"
import { useNavigate } from "react-router-dom"
import "../../services/gameServices"
import { sendBump, getMatch } from "../../services/gameServices"
import { useState } from "react"
import { getProfile } from "../../services/profileServices"
import './Game.css'


const Game = () => {
    const navigate = useNavigate()

    const [choice, setChoice] = useState(null)
    const [status, setStatus] = useState("Waiting for bump")
    let isBumpEnabled = true

    const handleHistoryNav = () => {
        navigate("/history")
    }

    const handleProfileNav = () => {
        navigate("/profile")
    }

    const sendBumpEvent = async () => {
        const preBumpHistory = await getMatch()
        console.log("preBumpHistory: ", preBumpHistory)
        if (preBumpHistory === null) {
            return
        }
        setStatus("preBumpHistory exists")

        const bumpResult = await sendBump(choice)
        console.log("bumpResult ", bumpResult)
        if (bumpResult === null) {
            return
        }
        setStatus("bumpResult exists")

        setChoice(null)

        setTimeout(async () => {
            const resultHistoryResponse = await getMatch()
            console.log("resultHistoryResponse: ", resultHistoryResponse)
            if (preBumpHistory !== null) {
                return
            }
            setStatus("Bump completed")

            if (resultHistoryResponse != null && preBumpHistory !== null) {
                navigate("/matchresult")
            }
        }, 100)

        setTimeout(() => { isBumpEnabled = true }, 500)
    }

    const handleBump = () => {
        if (!choice || !isBumpEnabled) {
            return
        }
        isBumpEnabled = false
        console.log("handleBump called *** ")
        sendBumpEvent()
    }

    const handleSelection = (choice) => {
        if (isBumpEnabled) {
            setChoice(choice)
        }
    }

    const requestDeviceMotionPermission = () => {
        if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
            DeviceMotionEvent.requestPermission()
                .then(permissionState => {
                    if (permissionState === 'granted') {
                        console.log('DeviceMotion permission granted.')
                        try {
                            window.addEventListener("devicemotion", handleMotionEvent, false)
                        } catch (error) {
                            console.log("No accelerometer detected")
                        }
                    } else {
                        console.log('DeviceMotion permission not granted.')
                    }
                })
                .catch(console.error)
        } else {
            console.log('DeviceMotionEvent.requestPermission is not required or not supported by this browser.')
        }
    }

    const disableAccelerometer = () => {
        console.log("DISABLED ACCELEROMETER")
        window.removeEventListener("devicemotion", handleMotionEvent)
    }

    const handleMotionEvent = (event) => {
        if (!isBumpEnabled) {
            return
        }
        const acc = event.accelerationIncludingGravity

        const threshold = 15

        if (
            Math.abs(acc.x) > threshold ||
            Math.abs(acc.y) > threshold ||
            Math.abs(acc.z) > threshold
        ) {
            console.log("*** Bump Detected! ***")
            handleBump()
        }
    }

    return (
        <>
        <div className="top-bar">
            <img 
                className="profile-image" 
                src={`/img/portrait-3.png`} 
                alt="User Avatar" 
                onClick={handleProfileNav} 
            />
            <img 
                className="history-image" 
                src={`/img/history.png`} 
                alt="User Avatar" 
                onClick={handleHistoryNav} 
            />
        </div>
            
            <div className="choice-buttons">
                <button
                    className={`rock-button ${choice === "Rock" ? "selected" : ""}`}
                    onClick={() => handleSelection("Rock")}
                >
                    ✊
                </button>
                <div className="bottom-row">
                    <button
                        className={`paper-button ${choice === "Paper" ? "selected" : ""}`}
                        onClick={() => handleSelection("Paper")}
                    >
                        ✋
                    </button>
                    <button
                        className={`scissors-button ${choice === "Scissors" ? "selected" : ""}`}
                        onClick={() => handleSelection("Scissors")}
                    >
                        ✌️
                    </button>
                </div>
            </div>
            <div className="bottom-buttons">
                <button onClick={handleBump}>
                    Test bump
                </button>
                <button onClick={requestDeviceMotionPermission}>
                    Enable bump!
                </button>
            </div>
            <p className="status-label">{status}</p>
        </>
    )
}

export default Game
