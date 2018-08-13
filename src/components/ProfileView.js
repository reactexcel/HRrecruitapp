import React from "react";
import { View, Text, Thumbnail, Icon, Item } from "native-base";
import styles from "../styles/components/ProfileView";

const ProfileView = props => {
  console.log(props,'props viewprofile')
  const { profile_pic, userName, mobile_no } = props.profileDetails;
  return (
    <View style={styles.profileView}>
      <Thumbnail large source={{ uri: profile_pic }} style={styles.thumbnail} />
      <Icon name="squared-plus" type="Entypo" style={styles.plusIcon} />
      <Text style={styles.nameText}>{userName}</Text>
      <Text style={styles.number}>{mobile_no}</Text>
    </View>
  );
};

export default ProfileView;
