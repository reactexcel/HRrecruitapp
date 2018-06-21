import React from "react";
import { Footer, Text } from "native-base";
import VersionNumber from "react-native-version-number";
import styles from "../styles";
console.log(VersionNumber.bundleIdentifier)
const AppFooter = () => {
  return (
    <Footer style={styles.footerView}>
      <Text style={styles.footerText}>
        App Version : {VersionNumber.CFBundleVersion}
      </Text>
    </Footer>
  );
};

export default AppFooter;
