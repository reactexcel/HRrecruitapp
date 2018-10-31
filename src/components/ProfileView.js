import React from "react";
import { View, Text, Thumbnail, Icon, Item } from "native-base";
import styles from "../styles/components/ProfileView";
import PhotoUpload from "react-native-photo-upload";
import { Image } from "react-native";
import { COLOR } from "../styles/color";
import { Spinner } from "native-base";
import RNFetchBlob from "rn-fetch-blob";

const ProfileView = props => {
  console.log(props,'::::');

  const {
    profile_pic,
    userName,
    mobile_no,
  } = props.profileDetails;
  let url;
  if(props.profile_picture ==undefined && props.imageSource ==null){
    url=profile_pic
    console.log(url,'111');
    
  }else if(props.imageSource !==null && props.profile_picture ==undefined){
    url=props.imageSource
    console.log(url,'222');
  }
  else{
    url= props.profile_picture,
    console.log(url,'333');
    
  }
  return (
    <View style={styles.profileView}>
      {/* await props.candidateUploadImage(resumeData) */}

      <Thumbnail
        large
        // source={{
          // uri: 
        // }}
        source={{uri:url/* 'https://facebook.github.io/react-native/docs/assets/favicon.png' */ /* 'https://facebook.github.io/react-native/docs/assets/favicon.png' */}}
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
    {props.uploading &&  <View style={{zIndex:1,position:'absolute',top:'12%'}}>
      <Spinner color={COLOR.MUSTARD} />
  </View> }
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
    </View>
    <Icon name="squared-plus" type="Entypo" style={[styles.plusIcon,{marginLeft:100}]} />
      <Text style={styles.nameText}>{userName}</Text>
      <Text style={styles.number}>{mobile_no}</Text> */}
    </View>
  );
};

export default ProfileView;
