export default function dateformat(date) {
  try {
    let formatted = '';
    if (date != undefined) {
      const aux = new Date(date);
      formatted =
            aux.getDate() +
            '/' + aux.getMonth() +
            '/' + aux.getFullYear() +
            ' ' + aux.getHours() +
            ':' + aux.getMinutes() +
            'hs.';
    }
    return formatted;
  } catch (err) {
    console.log('ERROR', err);
    return;
  }
}
