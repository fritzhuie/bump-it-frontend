import styles from "./Profile.module.css"
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  getUser,
  getToken,
  updateProfileImage,
} from "../../services/profileServices"; // Assume updateProfileImage is a new function to update the profile
import defaultImage from "../../img/portrait-0.png";
import image1 from "../../img/portrait-1.png";
import image2 from "../../img/portrait-2.png";
import image3 from "../../img/portrait-3.png";
import image4 from "../../img/portrait-4.png";
import image5 from "../../img/portrait-5.png";
import image6 from "../../img/portrait-6.png";
import image7 from "../../img/portrait-7.png";
import image8 from "../../img/portrait-8.png";
import image9 from "../../img/portrait-9.png";
import image10 from "../../img/portrait-10.png";
import image11 from "../../img/portrait-11.png";
import image12 from "../../img/portrait-12.png";
import image13 from "../../img/portrait-13.png";
import image14 from "../../img/portrait-14.png";
import image15 from "../../img/portrait-15.png";
import image16 from "../../img/portrait-16.png";
import image17 from "../../img/portrait-17.png";

const images = [
  { id: "img1", src: image1 },
  { id: "img2", src: image2 },
  { id: "img3", src: image3 },
  { id: "img4", src: image4 },
  { id: "img5", src: image5 },
  { id: "img6", src: image6 },
  { id: "img7", src: image7 },
  { id: "img8", src: image8 },
  { id: "img9", src: image9 },
  { id: "img10", src: image10 },
  { id: "img11", src: image11 },
  { id: "img12", src: image12 },
  { id: "img13", src: image13 },
  { id: "img14", src: image14 },
  { id: "img15", src: image15 },
  { id: "img16", src: image16 },
  { id: "img17", src: image17 },
  // Add more images here
];

const Profile = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = getToken();
        if (token) {
          const profileData = await getUser(token.user_id); // Adjusted for actual user ID retrieval
          setUserProfile(profileData);
        }
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    fetchUserProfile();
  }, []);

  // const handleImageChange = (e) => {
  //     setNewImageUrl(e.target.value);
  // };

  const handleImageUpdate = async (newImageSrc) => {
    try {
        // Directly pass newImageSrc as the argument to updateProfileImage
        await updateProfileImage(newImageSrc);
        
        // Re-fetch the updated user profile
        const token = getToken(); // Ensure you're retrieving the token correctly
        const updatedProfileData = await getUser(token.user_id);
        
        // Update state with the newly fetched profile
        // This assumes updatedProfileData contains the most current profile info, including the new image
        setUserProfile(updatedProfileData);
    } catch (error) {
        console.error("Error updating profile image:", error);
    }
};

  return (
    <>
    <h1 className={styles.header}> BUMP IT UP</h1>
      <h1>Profile</h1>
      {userProfile && (
        <div>
          <p>Username: {userProfile[0].name}</p>
          <img
            src={userProfile[0].profile_image || defaultImage}
            alt="Profile"
          />
          <div>
            {images.map((image) => (
              <button
                key={image.id}
                onClick={() => {
                  handleImageUpdate(image.src), console.log(image.src);
                }}
              >
                <img
                  src={image.src}
                  alt="Select"
                  style={{ width: 50, height: 50 }}
                />
              </button>
            ))}
          </div>
        </div>
      )}
      <button onClick={() => navigate("/game")}>Home</button>
    </>
  );
};

export default Profile;
