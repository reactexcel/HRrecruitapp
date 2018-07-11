import { GoogleAnalyticsTracker } from "react-native-google-analytics-bridge";
export const GOOGLE_ANALYTICS_TRACKER = new GoogleAnalyticsTracker(
  "UA-119982957-1"
);
let API_URL;
if (__DEV__) {
  API_URL = "http://5.9.144.226:3000/";
} else {
  API_URL = "http://api.recruit.excellencetechnologies.in/";
}

export default API_URL;
