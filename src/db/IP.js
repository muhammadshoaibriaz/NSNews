export const baseUrl = 'https://sb-news-api-production.up.railway.app';
import axios from 'axios';

// Function to toggle follow/unfollow
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
    return response.data; // Optional: Return the response if needed
  } catch (error) {
    console.error('Error while following/unfollowing user:', error.message);
    throw error;
  }
};

// Function to fetch follow status
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
