const BASE_URL = `https://django-bump-it-8e545e507195.herokuapp.com`

const getToken = () => {
    return localStorage.getItem('token')
  }
  

export const getProfile = async (user_id) => {
    try {
      const token = getToken();
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