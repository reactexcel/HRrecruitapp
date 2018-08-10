import React, { Fragment } from "react";
import { Text, View } from "react-native";
import { COLOR } from "../styles/color";
import styles from "../styles/components/ProfileBlock";
import PropTypes from "prop-types";

const ProfileBlock = props => {
  return (
    <Fragment>
      <View style={styles.profileBlockView}>
        <Text style={styles.titleStyle}>{props.title}</Text>
        {props.children}
      </View>
      {props.showBorder && <View style={styles.borderStyle} />}
    </Fragment>
  );
};

ProfileBlock.defaultProps = {
  showBorder: true
};

ProfileBlock.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.any.isRequired,
  showBorder: PropTypes.bool
};

export default ProfileBlock;
