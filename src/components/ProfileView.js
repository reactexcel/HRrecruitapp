import React from "react";
import { View, Text, Thumbnail, Icon, Item } from "native-base";
import styles from "../styles/components/ProfileView";
import PhotoUpload from "react-native-photo-upload";
import { Image } from "react-native";
import { COLOR } from "../styles/color";
import { Spinner } from "native-base";
import RNFetchBlob from "rn-fetch-blob";

const ProfileView = props => {
  console.log(props);

  const {
    profile_pic,
    userName,
    mobile_no,
    profile_picture
  } = props.profileDetails;
  console.log(profile_picture);
  let url = profile_picture !== "" ? profile_picture : profile_pic
  let Spinnerr = false;
  return (
    <View style={styles.profileView}>
      {/* await props.candidateUploadImage(resumeData) */}

      <Thumbnail
        large
        // source={{
          // uri: 
        // }}
        source={{uri:'https://facebook.github.io/react-native/docs/assets/favicon.png' /* 'https://facebook.github.io/react-native/docs/assets/favicon.png' */}}
        style={styles.thumbnail}
      />
      <Icon
        onPress={() => props.onPress()}
        name="squared-plus"
        type="Entypo"
        style={styles.plusIcon}
      />
      <Text style={styles.nameText}>{userName}</Text>
      <Text style={styles.number}>{mobile_no}</Text>
      {/* <Image
              style={
              styles.thumbnail}
              resizeMode='cover'
              source={{
                uri: 'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg'
              }}
            />
    </PhotoUpload> */}
      {/* <View style={{zIndex:1,position:'absolute',alignItems:'center',justifyContent:'center'}}>
    <Spinner color={COLOR.MUSTARD} />
    </View>
    <Icon name="squared-plus" type="Entypo" style={[styles.plusIcon,{marginLeft:100}]} />
      <Text style={styles.nameText}>{userName}</Text>
      <Text style={styles.number}>{mobile_no}</Text> */}
    </View>
  );
};

export default ProfileView;
