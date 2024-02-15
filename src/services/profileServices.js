const BASE_URL = `https://django-bump-it-8e545e507195.herokuapp.com`;
import { getUserFromToken } from "./tokenService";
export const getToken = () => {
  // Retrieve the token from local storage
  const token = localStorage.getItem('token');
  
  // Check if the token exists
  if (token) {
    // Decode the token by splitting it into three parts and decoding the second part (the payload)
    const decodedToken = JSON.parse(atob(token.split('.')[1])); 

    return decodedToken; // Return the decoded token
  }
  
  // Return null if no token is found
  return null;
};

export const getUser = async () => {
  const token = getUserFromToken();
  console.log(token)
  
  if (token) {
    const response = await fetch(`${BASE_URL}/users/profile/`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error('Error fetching user profile: ' + response.statusText);
    }

    console.log(response)

    return await response.json();
  }

};

export const displayAvatar = async () => {
  
}


