import { StyleSheet } from "react-native";
import { COLOR } from "../color";

export default StyleSheet.create({
  container: { flex: 1 },
  jobDescriptionText: {
    textAlign: "auto"
  },
  fullDescriptionText: {
    fontFamily: "Montserrat-Bold",
    fontSize: 13
  },
  jobCardView: {
    padding: 10
  },
  appliedJobStyle: {
    justifyContent: "space-between"
  },
  spinnerView: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column"
  }
});
