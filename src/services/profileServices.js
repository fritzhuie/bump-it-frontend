const BASE_URL = `https://django-bump-it-8e545e507195.herokuapp.com`
import { getUserFromToken } from "./tokenService";
  

export const getProfile = async (user_id) => {
    try {
        const token = localStorage.getItem('token');
      const response = await fetch(`${BASE_URL}/users/profile/${user_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
      })
      if (!response.ok) throw new Error('Network response was not ok')
      return await response.json()
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error)
      throw error
    }
  }

  export const getProfiles = async (user_ids) => {
    try {
        const profiles = await Promise.all(user_ids.map(id => getProfile(id)))
        return profiles
    } catch (error) {
      console.error('There was a problem with the fetch all profiles operation:', error)
      throw error
    }
  }


export const getToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    const decodedToken = JSON.parse(atob(token.split('.')[1]));
    return decodedToken;
  }
  return null;
};

export const getUser = async () => {
  const token = getUserFromToken(); // Assuming this correctly fetches the actual token string
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
    return await response.json();
  }
};

export const updateProfileImage = async (newImage) => {
  const tokenForUserId = getToken(); 
  const tokenForBearer = getUserFromToken();
  if (tokenForUserId) {
    try {
      const response = await fetch(`${BASE_URL}/users/profile/${tokenForUserId.user_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${tokenForBearer}`,
        },
        body: JSON.stringify({ profile_image: newImage }),
      });
      if (!response.ok) throw new Error('Profile update failed: ' + response.statusText);
      const json = await response.json();
      console.log('Profile updated successfully', json);
      return json;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
};
