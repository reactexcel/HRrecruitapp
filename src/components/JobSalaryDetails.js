import React from "react";
import { View, Text } from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import styles from "../styles";
import { COLOR } from "../styles/color";
import PropTypes from "prop-types";

const JobSalaryDetails = props => {
  return (
    <View style={styles.viewDesign}>
      {props.children}
      <View style={styles.iconView}>
        <View style={styles.viewRow}>
          <FontAwesome
            name="briefcase"
            color={COLOR.Red}
            style={styles.viewIcon}
          />
          <Text style={styles.rowText}>0 - 1 years</Text>
        </View>
        <View style={styles.viewRow}>
          <FontAwesome
            name="map-pin"
            color={COLOR.Red}
            style={styles.viewIcon}
          />
          <Text style={styles.rowText}>Noida</Text>
        </View>
        <View style={styles.viewRow}>
          <FontAwesome
            name="map-pin"
            color={COLOR.Red}
            style={styles.viewIcon}
          />
          <Text style={styles.rowText}>1,25,000 - 2,00,000 PA</Text>
        </View>
      </View>
    </View>
  );
};

JobSalaryDetails.propTypes = {
  children: PropTypes.any
};
export default JobSalaryDetails;
