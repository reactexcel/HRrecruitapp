import React, { Component } from "react";
import { View, FlatList, Dimensions, Image, TouchableOpacity} from "react-native";
import { Container, Text, Button, Icon} from "native-base";
import { Col, Row, Grid } from 'react-native-easy-grid';
import Logo from "../components/Logo";
import CustomButton from "../components/CustomButton";
import styles from "../styles/AppIntro";
import ProgressBar from '../components/ProgressBar';
import HomePage from "./HomePage";
var { height, width } = Dimensions.get('window');
import LinearGradient from 'react-native-linear-gradient';
import { AppDetails } from '../helper/json';

class AppIntro extends Component {
    static navigationOptions = {
        header: null
    };
    _onNext = (item,index) => {
        let items = AppDetails;
        console.log(items.length - 1 <= index,"items.length - 1")
        let moveToIndex = items.length - 1 <= index
        if(!moveToIndex){
            let moveIndex = index + 1 ;
            this.flatListRef.scrollToIndex({ animated: true, index: moveIndex }); 
        }else{
            this.props.navigation.navigate("HomePage");
        }
    }
    _onSkip = () => {
        this.props.navigation.navigate("HomePage");
    }
    _renderItem = ({item,index}) => {
        let iconName = index == 3 ? 'checkmark':'arrow-forward'
        return (
            //['#F09819', '#EDDE5D'],['#314755', '#26a0da'],['#02AAB0', '#00CDAC'],['#DA22FF', '#9733EE'],['#E55D87', '#5FC3E4'],['#24C6DC', '#514A9D'], ['#085078', '#85D8CE'],['#1D976C', '#93F9B9'],['#EB3349', '#F45C43'],['#DD5E89', '#F7BB97'] , ['#AA076B', '#61045F']
            //['#8A2387', '#E94057',"#F27121"],
            //'#DA4453', '#89216B',
            //['#23074d', '#cc5333',],
            //['#642B73', '#C6426E',]
            <Grid>
                <Col size={9} style={[styles.container]} >
                <LinearGradient colors={['#DA4453', '#89216B']} style={[styles.container,{flex:1}]}>
                   <Image
                        resizeMode='contain'
                        style={styles.images} 
                        source={item.image}
                    />
                    <View style={styles.margin}>
                        <Text style={[styles.text, {alignSelf: 'center'}]} >{item.headerText}</Text>
                        <Text style={[styles.text, {alignSelf: 'center'}]}>
                            {item.rawText} 
                            <Text style={[styles.text,{fontWeight:'900'}]}>
                                {item.boldText}
                            </Text>
                        </Text>
                    </View> 
                </LinearGradient>    
                </Col>
                <Row style={[styles.bottomContainer,{backgroundColor:'#89216B'}]}>
                    <Text style={styles.text} onPress={() => { this._onSkip() }} >{index == 3 ? "" :"Skip"}</Text>
                    <ProgressBar items={AppDetails} index={index}/>
                    <View onPress={()=>{this._onNext(item,index)}} style={{marginRight:7,marginTop:-10}}>
                        <TouchableOpacity  onPress={()=>{this._onNext(item,index)}} style={styles.btnBack}/>
                        <Icon onPress={()=>{this._onNext(item,index)}} style={{opacity: 1, color: 'white', marginTop:8}} name={iconName} />
                    </View>
                </Row>
            </Grid>
        )
    }
    render() {
        return (
            <Container >
                <FlatList
                    pagingEnabled
                    horizontal
                    scrollEnabled={false}
                    showsHorizontalScrollIndicator={false}
                    ref={(ref) => { this.flatListRef = ref; }}
                    data={AppDetails}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => item.bkGrndClr}
                />
            </Container>
        );
    }
}

export default AppIntro;
