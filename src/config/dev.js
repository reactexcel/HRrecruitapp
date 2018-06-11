import { GoogleAnalyticsTracker } from "react-native-google-analytics-bridge";
export const GOOGLE_ANALYTICS_TRACKER = new GoogleAnalyticsTracker("UA-119982957-1");
let __DEV__ = false;
let API_URL;
if (__DEV__) {
  API_URL = "http://api.recruit.excellencetechnologies.in/exams/";
} else {
  API_URL = "http://5.9.144.226:3000/exams/";
}

export default API_URL;
