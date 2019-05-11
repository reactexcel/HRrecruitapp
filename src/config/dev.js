import { GoogleAnalyticsTracker } from "react-native-google-analytics-bridge";
export const GOOGLE_ANALYTICS_TRACKER = new GoogleAnalyticsTracker(
  "UA-119982957-1"
);
export const SHAREURL = "https://hrrecruit.app.link/9gvVNNaqIN?$share_data=yes";
let API_URL;
if (__DEV__) {
  API_URL = "http://5.9.144.226:3000/";
} else {
  API_URL = "http://api.recruit.excellencetechnologies.in/";
}

export default API_URL; 
// http://5.9.144.226:3000/
// http://api.recruit.excellencetechnologies.in/