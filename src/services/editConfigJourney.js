import axios from 'axios';

export default async function editConfigJourney(basePrice, radialDistance) {
  try {
    const res = await editConfig(basePrice, radialDistance);
    if (res.status == 200 || res.status == 202) return true;
    return false;
  } catch (e) {
    return false;
  }
}

function editConfig(basePrice, radialDistance) {
  let token = localStorage.getItem('token');
  if (!token) token = sessionStorage.getItem('token');
  const config = {
    headers: {Authorization: `Bearer ${token}`},
  };

  return axios
      .patch('https://journey-service-solfonte.cloud.okteto.net/journey/config',
          {'base_price': basePrice,
            'radial_distance': radialDistance}
          , config);
}
