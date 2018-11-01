import React from "react";
import { View, Text, Thumbnail, Icon, Item } from "native-base";
import styles from "../styles/components/ProfileView";
import PhotoUpload from "react-native-photo-upload";
import { Image } from "react-native";
import { COLOR } from "../styles/color";
import { Spinner } from "native-base";
import RNFetchBlob from "rn-fetch-blob";

const ProfileView = props => {
  console.log(props.uploading,'::::');

  const {
    profile_pic,
    userName,
    mobile_no,
    addToProfilePage,
  } = props.profileDetails;
  let url;
  let spinner;
  if(props.profile_picture ==undefined && props.imageSource ==null){
    url=profile_pic
  }else if(props.imageSource !==null && props.profile_picture ==undefined){
    url=props.imageSource
  }
  else{
    url= props.profile_picture
  }
  if(props.uploadStatus==undefined && props.uploading==true){
    spinner =true
  }
  else{
    spinner =false
  }
  return (
    <View style={styles.profileView}>
      <Thumbnail
        large
        source={{uri:url}}
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
    {spinner &&  <View style={{zIndex:1,position:'absolute',top:'12%'}}>
      <Spinner color={COLOR.MUSTARD} />
  </View> }
    </View>
  );
};

export default ProfileView;
