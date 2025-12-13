import { getSwedishRedDays } from '../utils/holidays';

export const skipInterceptStatusCodes = [404];
export const apiCalls = [];

/*
this function store api calls that did not meet requirements 
so we can send failed tests and notify failed endpoints to slack
*/
export const monitorApiCalls = (request) => {
  
  request.on('response', (response) => {

    setTimeout(() => {

      if (response.statusCode.toString().startsWith(5)) {

        apiCalls.push({ 
          url: request.url, 
          status: response.statusCode
        });
      }
    }, 0);
  });
};

/*
if we have different service names for routes that used in 
afterEach hook then we map it correctly based on endpoint path. 
Placeholder for now.
*/
export const baseUrlToServiceMap = (basePath) => {

  const services = {
    service: 'service'
  };

  return services[basePath];
};

const adjustForHoliday = (date) => {

  const newDate = new Date(date);
  const formatDate = (day) => day.toISOString().split('T')[0];

  for (let i = 0; i < 365; i++) {

    const redDays = getSwedishRedDays(newDate.getFullYear());
    const formattedDate = formatDate(newDate);

    if (!redDays.includes(formattedDate)) {
      break;
    }

    newDate.setDate(newDate.getDate() + 1);
  }

  return newDate;
};

export const getDate = ({ changeDay = 0, dateFormat, 
  checkHoliday = false } = {}) => {

  let date = new Date(new Date().setDate(new Date().getDate() + changeDay));

  if (checkHoliday) {

    date = adjustForHoliday(date);
  }
  
  if (dateFormat === 'yyyy-mm-dd') {
    return date.toLocaleDateString('sv-SE');
  }

  if (dateFormat === 'toLocaleString') {
    return date.toLocaleString('sv-SE', { timeZone: 'Europe/Stockholm' });
  }

  return date.toISOString();
};

export const commonState = {
  testsFailed: false,
  unavailableServices: {},
  failedServices: [],
  failedApiCalls: {},
  skipRemainingTests: false,
  startTime: getDate({ dateFormat: 'toLocaleString' })
};