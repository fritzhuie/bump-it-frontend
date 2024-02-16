//import tokenservice
import * as tokenService from './tokenService'

//set the base url to the env variable

// console.log(process.env.REACT_APP_BACK_END_SERVER_URL)
const BASE_URL = `https://django-bump-it-8e545e507195.herokuapp.com`
// retrive user data from token 
function getUser() {
  return tokenService.getUserFromToken()
}
// signup function 
async function signup(user) {
  
  try {

    //set response to awiat the fetch for signup 

    const res = await fetch(`${BASE_URL}/users/register/`, {
      //set request method 
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    })
    const json = await res.json()
    if (json) {
      console.log("setting token", json.access)
      tokenService.setToken(json.access)
      return json.access
    }
    if (json.err) {
      throw new Error(json.err)
    }


  } catch (err) {
    console.log(err)
    throw err
  }
}

async function login(credentials) {
  console.log("LOGGING IN")
  try {
    const res = await fetch(`${BASE_URL}/users/login/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(credentials),
    })

    const json = await res.json()
    console.log("LOGIN RESPONSE:", json)
    if (json.access) {
      console.log("setting token: ", json.access)
      tokenService.setToken(json.access)
    }
    if (json.err) {
      throw new Error(json.err)
    }
  } catch (err) {
    console.log(err)
    throw err
  }
}

function logout() {
  tokenService.removeToken()
}

export { signup, getUser, logout, login }

