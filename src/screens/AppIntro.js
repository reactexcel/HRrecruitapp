import React, { Component } from "react";
import { View, FlatList, Dimensions, Image} from "react-native";
import { Container, Text, Button} from "native-base";
import { Col, Row, Grid } from 'react-native-easy-grid';
import Logo from "../components/Logo";
import CustomButton from "../components/CustomButton";
import styles from "../styles/AppIntro";
import ProgressBar from '../components/ProgressBar';
import HomePage from "./HomePage";
var { height, width } = Dimensions.get('window');
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
        return (
            <Grid>
                <Col size={9} style={[styles.container, { backgroundColor: item.bkGrndClr}]} >
                   <Image
                        resizeMode='contain'
                        style={styles.images} 
                        source={item.image}
                    />
                    <View style={styles.margin}>
                        <Text style={[styles.text, {alignSelf: 'center'}]} >{item.headerText}</Text>
                        <Text style={[styles.text, {alignSelf: 'center'}]}>{item.rawText} <Text style={[styles.text,{fontWeight:'900'}]}>{item.boldText}</Text></Text>
                    </View> 
                    <ProgressBar items={AppDetails} index={index}/>
                </Col>
                <Row style={[styles.bottomContainer, { backgroundColor: item.bkGrndClr}]}>
                    <Text style={styles.text} onPress={() => { this._onSkip() }} >{index == 3 ? "" :"Skip"}</Text>
                    <Text style={styles.text} onPress={()=>{this._onNext(item,index)}}>Next</Text>
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
