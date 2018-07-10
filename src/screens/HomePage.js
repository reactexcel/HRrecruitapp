import React, { Component, Fragment } from "react";
import { View, Alert, Image, Linking, Platform, TouchableOpacity } from "react-native";
import {
  Container,
  Text
} from "native-base";
import { connect } from "react-redux";
import styles from "../styles";
import { COLOR } from "../styles/color";
import CustomButton from "../components/CustomButton";
import Logo from "../components/Logo";

class HomePage extends Component {
    static navigationOptions = {
        header: null
      };
      

    handleApply = () => {
        this.props.navigation.navigate("AddCandidate");
    }
    handleInterview = () => {
        this.props.navigation.navigate("InterviewLogin");
    }
    handleLocate = () => {
        let url = '';
        if (Platform.OS === 'ios') {
            url = `http://maps.apple.com/maps?q=${28.5965789},${77.3287437}`;
        } else if (Platform.OS === 'android') {
            url = `geo:${28.5965789},${77.3287437}`;
        }
        Linking.openURL(url);
    }
      render(){
          return(
                <Container style={[styles.container,{flex:1,justifyContent:'center',flexDirection:'row'}]}>
                    <View style={{flex:1,justifyContent:'space-between',alignItems:'center'}} >
                    <View style={{justifyContent:'space-between',alignItems:'center',marginTop:70}} >
                        <Image style={{height:90,width:90,marginBottom:20}} source={require('../images/icon.png')} />
                        <Text style={{color:'white',fontSize:20,fontWeight:'600',textAlign:'center'}} >Welcome to</Text>
                        <Text style={{color:'white',fontSize:28,fontWeight:'600',textAlign:'center'}} >Excellence Technologies</Text>
                        <Text style={{color:'white',fontSize:25,fontWeight:'800',textAlign:'center'}} >Careers</Text>
                    </View>
                    <View style={{marginBottom:100,justifyContent:'space-between'}} >
                        <TouchableOpacity style={{margin:10}} onPress={this.handleApply} >
                            <View style={{borderWidth:1,borderColor:'white',width:250,borderRadius:10}} >
                                <Text style={{color:'white',fontSize:19,fontWeight:'500',textAlign:'center'}} >Apply For Job</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{margin:10}} onPress={this.handleInterview} >
                            <View style={{borderWidth:1,borderColor:'white',width:250,borderRadius:10}} >                        
                                <Text style={{color:'white',fontSize:19,fontWeight:'500',textAlign:'center'}} >Proceed To Interview</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{margin:10}} onPress={this.handleLocate} >
                            <View style={{borderWidth:1,borderColor:'white',width:250,borderRadius:10}} >
                                <Text style={{color:'white',fontSize:19,fontWeight:'500',textAlign:'center'}} >Locate Us</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                  </View>
                </Container>
          )
      }

}

const mapStateToProps = ({ candidate }) => ({ candidate });
export default connect(mapStateToProps)(HomePage);