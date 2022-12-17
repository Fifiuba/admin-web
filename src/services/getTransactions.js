import axios from 'axios';

export default async function getTransactions() {
  try {
    let token = localStorage.getItem('token');
    if (!token) token = sessionStorage.getItem('token');
    return axios
        .get('https://payment-service-solfonte.cloud.okteto.net/payment/transaction');
  } catch (e) {
    return false;
  }
}
