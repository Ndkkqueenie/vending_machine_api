import axios from 'axios'
const baseUrl = '/api/seller'

const sellerLoginService = {
  loginSeller: async (credentials) => {
    const response = await axios.post(baseUrl, credentials);
    return response.data;
  },
};

export default sellerLoginService;