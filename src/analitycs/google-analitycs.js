import ReactGA4 from 'react-ga4';
ReactGA4.initialize('G-YT9H495F1T');

export function trackEvent(category, action, params = {}) {
  ReactGA4.event({ category, action, ...params });
}
