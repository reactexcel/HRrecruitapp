import React from "react";
import { View, Text, Thumbnail, Icon, Item } from "native-base";
import styles from "../styles/components/ProfileView";

const ProfileView = props => {
  return (
    <View style={styles.profileView}>
      <Thumbnail
        large
        source={require("../images/solidgrey.png")}
        style={styles.thumbnail}
      />
      <Icon name="squared-plus" type="Entypo" style={styles.plusIcon} />
      <Text style={styles.nameText}>John Doe</Text>
      <Text style={styles.number}>12345660909</Text>
    </View>
  );
};

export default ProfileView;
