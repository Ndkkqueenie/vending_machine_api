import axios from 'axios';

const baseUrl = '/api/buy';

const createPurchase = async (newPurchase) => {
  try {
    const response = await axios.post(baseUrl, newPurchase);
    return response.data;
  } catch (error) {
    // Handle any errors here
    console.error('Error making a purchase:', error);
    throw error;
  }
};

export default createPurchase;
