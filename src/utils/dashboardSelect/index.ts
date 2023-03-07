export const intervals = ['seconds', 'minute', 'hour'];
export const number = ['1', '5', '10', '15', '30'];

export const getPollingInterval = () => {
  const timeFrame = localStorage.getItem('dashboard_intervals');
  const number = localStorage.getItem('dashboard_intervals_number');
  let totalNumberofSeconds;

  switch (timeFrame) {
    case 'seconds':
      totalNumberofSeconds = 1 * Number(number);
      break;
    case 'minute':
      totalNumberofSeconds = 60 * Number(number);
      break;
    case 'hour':
      totalNumberofSeconds = 60 * 60 * Number(number);
      break;
    default:
      totalNumberofSeconds = 0;
  }
  // to return in milliseconds
  return totalNumberofSeconds * 1000;
};
