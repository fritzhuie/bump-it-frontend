const BASE_URL = `https://django-bump-it-8e545e507195.herokuapp.com`;

const getToken = () => {
  return localStorage.getItem('token'); //retrieve token from local storage, re-write
};

// Fetch the latest match result through Get request
export const getMatchResult = async () => {
  try {
    const token = getToken();
    const response = await fetch(`${BASE_URL}/components/MatchResult`, {
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

// Log a new match result - this might depend on how your backend expects to receive a new match result
export const logMatchResult = async (resultData) => {
  try {
    const token = getToken();
    const response = await fetch(`${BASE_URL}/components/MatchResult`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(resultData),
    });
    if (!response.ok) throw new Error('Network response was not ok');
    return await response.json();
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
    throw error;
  }
};
