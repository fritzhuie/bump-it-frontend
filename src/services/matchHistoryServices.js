const BASE_URL = `https://django-bump-it-8e545e507195.herokuapp.com`;

const getToken = () => {
  return localStorage.getItem('token');
};

// Fetch the user's match history
export const getMatchHistory = async () => {
  try {
    const token = getToken();
    const response = await fetch(`${BASE_URL}/game/result`, { // Assuming endpoint for match history is '/components/history'
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error;
  }
};
