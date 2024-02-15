import { getUserFromToken } from "./tokenService";

const BASE_URL = `https://django-bump-it-8e545e507195.herokuapp.com`;

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
