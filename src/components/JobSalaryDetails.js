import React from "react";
import { View, Text } from "native-base";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons"
import styles from "../styles";
import { COLOR } from "../styles/color";
import PropTypes from "prop-types";

const JobSalaryDetails = props => {
  // console.log(props);
  let salary;
  if(props.jobid == 40) {
    salary ='400000 - 6.50000 PA'
  }else{
    salary ='125000 - 200000 PA'
  }
  
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
          <MaterialCommunityIcons
            name="currency-inr"
            color={COLOR.Red}
            style={styles.viewIcon}
          />
          <Text style={styles.rowText}>{salary}</Text>
        </View>
      </View>
    </View>
  );
};

JobSalaryDetails.propTypes = {
  children: PropTypes.any
};
export default JobSalaryDetails;
