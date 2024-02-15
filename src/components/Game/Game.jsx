import React from "react"
import { useNavigate } from "react-router-dom"
import "../../services/gameServices"
import { sendBump, getMatch } from "../../services/gameServices"
import { useState } from "react"

const Game = () => {
    const navigate = useNavigate()

    const [choice, setChoice] = useState(null)
    const [status, setStatus] = useState("Waiting for bump")
    const [isBumpEnabled, setIsBumpEnabled] = useState(true)

    const handleHistoryNav = () => {
        navigate("/history")
    }

    const sendBumpEvent = async () => {
        const preBumpHistory = await getMatch()
        console.log("preBumpHistory: ", preBumpHistory)
        if (!preBumpHistory) {
            return
        }
        setStatus("preBumpHistory exists")

        const bumpResult = await sendBump(choice)
        console.log("bumpResult ", bumpResult)
        if (!bumpResult) {
            return
        }
        setStatus("bumpResult exists")

        setChoice(null)

        setTimeout(async () => {
            const resultHistoryResponse = await getMatch()
            console.log("resultHistoryResponse: ", resultHistoryResponse)
            if (!preBumpHistory) {
                return
            }
            setStatus("Bump completed")

            if (resultHistoryResponse != preBumpHistory) {
                // navigate("/matchresult")
            }
        }, 100)

        setTimeout(() => setIsBumpEnabled(true), 1)
    }

    const handleBump = () => {
        console.log("handleBump called *** ")
        if (!choice || !isBumpEnabled) {
            return
        }
        setStatus("Bump callback was called!")
        setIsBumpEnabled(false)
        sendBumpEvent()
    }

    const handleSelection = (choice) => {
        if (isBumpEnabled) {
            setChoice(choice)
        }
    }

    const threshold = 20

    const startDetection = () => {
        console.log("STARTED BUMP DETECTION")
        DeviceMotionEvent.requestPermission()
            .then((permissionState) => {
                if (permissionState === "granted") {
                    console.log("BUMP DETECTION GRANTED")
                    enableAccelerometer()
                }
            })
            .catch(console.error)
    }

    startDetection()

    const enableAccelerometer = () => {
        console.log("ENABLED ACCELEROMETER")
        window.addEventListener("devicemotion", handleMotionEvent, false)
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
            <h1>Game page 1.0</h1>
            <div>
                <button
                    className="rock-button"
                    style={{
                        borderRadius: "50%",
                        width: "100px",
                        height: "100px",
                        backgroundColor: choice === "Rock" ? "green" : "grey",
                    }}
                    onClick={() => handleSelection("Rock")}
                >
                    Rock
                </button>
                <button
                    className="paper-button"
                    style={{
                        borderRadius: "50%",
                        width: "100px",
                        height: "100px",
                        backgroundColor: choice === "Paper" ? "green" : "grey",
                    }}
                    onClick={() => handleSelection("Paper")}
                >
                    Paper
                </button>
                <button
                    className="scissors-button"
                    style={{
                        borderRadius: "50%",
                        width: "100px",
                        height: "100px",
                        backgroundColor:
                            choice === "Scissors" ? "green" : "grey",
                    }}
                    onClick={() => handleSelection("Scissors")}
                >
                    Scissor
                </button>
            </div>
            <button onClick={handleHistoryNav}>go to history page</button>
            <button onClick={handleBump}>TEST BUMP</button>
            <p>{status}</p>
        </>
    )
}

export default Game
