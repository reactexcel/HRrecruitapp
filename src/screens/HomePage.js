import React, { Component, Fragment } from "react";
import { View, Alert, Image, Linking, Platform, TouchableOpacity } from "react-native";
import {
  Container,
  Text,
    ListItem,
    Thumbnail,
    Body,
    Right,
    Left,
    Icon,
    List
} from "native-base";
import { connect } from "react-redux";
import styles from "../styles/HomePage";
import { COLOR } from "../styles/color";
import CustomButton from "../components/CustomButton";
import Logo from "../components/Logo";
import { pageDeatils } from '../helper/json';

class HomePage extends Component {
    static navigationOptions = {
        header: null
      };
      
    handleViewClick = (data) => {
        if(data) {
            this.props.navigation.navigate(data);
        }
    }

      render(){
          let renderCustomView = pageDeatils.map((data,k)=>{
              return(
                  <View  key={k} style={styles.listContainer}>
                      <List>
                          <ListItem onPress={() => { this.handleViewClick(data.route) }} avatar>
                              <Left>
                                  <Thumbnail source={data.image} />
                              </Left>
                              <Body style={{ borderBottomWidth: 0 }}>
                                  <Text>{data.name}</Text>
                              </Body>
                              <Right style={{ borderBottomWidth: 0,marginTop:7 }}>
                                  <Icon active name={data.icon} />
                              </Right>
                          </ListItem>
                      </List>
                  </View>
              )
          })
          return(
                <Container style={styles.container}>
                  <Image
                    resizeMode='contain'
                    style={styles.bckgndImage} 
                    source={require('../images/navbg.png')} 
                    />
                  <View style={styles.logoCnt}>
                    <View style={styles.logoView}>
                          <Logo />
                    </View>
                  </View>
                  <View style={styles.avatar}>
                      <Image
                        style={styles.avatarImage}
                        source={require('../images/profilepic.png')}
                      />
                  </View>
                  <View style={styles.btnContainer}>
                        <Text >User ID</Text>
                  </View>
                  {renderCustomView}
                </Container>
          )
      }
}

const mapStateToProps = ({ candidate }) => ({ candidate });
export default connect(mapStateToProps)(HomePage);