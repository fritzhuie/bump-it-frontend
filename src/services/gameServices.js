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

        const matchSample = await getMatch()
        console.log(matchSample)
        
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

