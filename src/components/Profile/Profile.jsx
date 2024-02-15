import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getUser, getToken } from '../../services/profileServices.js'; // Import getToken

const Profile = () => {
    const navigate = useNavigate();
    const [userProfile, setUserProfile] = useState(null);

useEffect(() => {
    const fetchUserProfile = async () => {
        try {
            const token = getToken();
            if (token) {
            const profileData = await getUser(token.user_id); // Assuming user_id is available in the token payload
            setUserProfile(profileData);
            
            }
        } catch (error) {
            console.error('Error fetching user profile:', error);
        }
    };
    fetchUserProfile();
}, []); // No dependencies needed since we are not relying on any prop or state changes
console.log(userProfile)
    return (
        <>
            <h1>Profile</h1>
            {userProfile && (
                <div>
                    <p>Username: {userProfile[0].name}</p>
                    {/* Display more user profile data as needed */}
                </div>
            )}
            <button onClick={() => navigate('/game')}>Home</button>
        </>
    );
};

export default Profile;
