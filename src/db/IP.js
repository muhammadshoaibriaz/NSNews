<<<<<<< HEAD
// export const baseUrl = 'https://sb-news-api-production.up.railway.app';
export const baseUrl = 'http://192.168.100.4:3000';
=======
export const baseUrl = 'https://sb-news-api-production.up.railway.app';
// export const baseUrl = 'http://192.168.250.21:3000';
>>>>>>> dd5a9b754587640e9588837826846a27ae6b2a28
import axios from 'axios';
export const onFollowing = async (userId, token) => {
  try {
    const response = await axios.patch(
      `${baseUrl}/api/register/${userId}/follow-unfollow`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    console.log('Follow/Unfollow response:', response.data);
    return response.data; // Return the response
  } catch (error) {
    console.error('Error while following/unfollowing user:', error.message);
    throw error;
  }
};

export const fetchFollowStatus = async (userId, token) => {
  try {
    const response = await axios.get(`${baseUrl}/api/register`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const followingArray = response.data.following || [];
    return followingArray.includes(userId);
  } catch (error) {
    console.error('Error fetching user details:', error.message);
    throw error;
  }
};
