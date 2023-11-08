import axios from 'axios'
const baseUrl = '/api/deposit'

const createAmount = newDeposit => {
  const request = axios.post(baseUrl, newDeposit)
  return request.then(response => response.data)
};

export default createAmount;