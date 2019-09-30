import React, { Component, Fragment } from "react";
import { View,Button,TextInput,Form, Alert, Platform, PermissionsAndroid ,ScrollView,Animated} from "react-native";
import {
  Container,
  Content,
  Body,
  Text,
  Card,
  CardItem,
  Item,
  Input,
  Picker,
  Spinner,
//   Button,
  Icon,
  Label,
//   Form
} from "native-base";
import { connect } from "react-redux";
import { candidateValidationapi} from "../actions";
class candidateValidation extends Component{
    constructor(){
        super();
        this.state={
            value:'mddd@gmail.com'
        }
    }
onPress=(value)=>{
    // console.log(value);
        this.props.candidateValidationapi(value)
}
    render(){
        return(

            <View>
                <Text>DVSDVSD</Text>
                <Button
  onPress={()=>this.onPress(this.state.value)}
  title="Learn More"
  color="#841584"
/>
            </View>
        )
    }
}
const mapStateToProps = state => {
    console.log(state,'llllllllllllllllllllllllll');
    return {
    state_data: state,
    }};
  
  export default connect(
    mapStateToProps,
    { candidateValidationapi}
  )(candidateValidation);