import React from "react";
import { Footer, Text } from "native-base";
import VersionNumber from "react-native-version-number";
import styles from "../styles";
const AppFooter = () => {
  return (
    <Footer style={styles.footerView}>
      <Text style={styles.footerText}>
        App Version : {VersionNumber.appVersion}
      </Text>
    </Footer>
  );
};

export default AppFooter;
