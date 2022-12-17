import axios from 'axios';
import dateformat from '../utils/date';

export default async function getAddress(journeys) {
  journeys.map((journey) => {
    journey.startOn = dateformat(journey.startOn);
    journey.finishOn = dateformat(journey.finishOn);
    journey.price = '$' + journey.price;
  });

  const requests = journeys.map((journey, idx) => {
    return getAddressFromJourney(journey, 'from');
  });

  journeys.map((journey) => {
    requests.push(getAddressFromJourney(journey, 'to'));
  });

  return Promise.all(requests).then((results) => {
    return journeys;
  });
}

async function getAddressFromJourney(journey, key) {
  try {
    const lat = journey[key][0];
    const long = journey[key][1];
    const response = await axios.get(
        '//www.mapquestapi.com/geocoding/v1/reverse', {
          params: {
            'key': 'Plqx1ppoa0ARGH2Oo2uU5olizfNPb0Fo',
            'location': `${lat}, ${long}`,
            'thumbMaps': false,
          },
        });
    if (response.data.results[0].locations.length == 0) {
      journey[key] = 'Desconocido';
    }
    journey[key] = response.data.results[0].locations[0].street;
    return journey;
  } catch (err) {
    console.error('ERROR', err);
  }
}
