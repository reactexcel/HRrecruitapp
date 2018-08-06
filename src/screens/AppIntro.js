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
import { getItem,setItem } from "../helper/storage";
import SplashScreen from 'react-native-splash-screen';
import branch from "react-native-branch";
import { connect } from "react-redux";
import {
    getCandidateJobDetails,
    getCandidateDetails
} from "../actions";
import { SUCCESS_STATUS } from "../helper/constant";

class AppIntro extends Component {
    constructor(props){
        super(props)
        this.state = {
            deepLink : false,
            sharing: false,
            fb_id:null
        }
    }
    static navigationOptions = {
        header: null
    };
    static getDerivedStateFromProps(nextProps) {
        const { error, success, msg, message } = nextProps.interviewSignUp;
        if (error !== undefined && error === 1 && message !== message) {
            alert(message);
        }
        if (success !== undefined && !success) {
            notify("Something went wrong");
        }
        if (msg !== undefined) {
            alert(msg);
        }
        return null;
    }
    componentDidMount = async () => {
        await this._checkDeepLink();
        const candidateJob = await getItem("mongo_id");
        if (candidateJob) {
            this.props.navigation.navigate("HomePage");
        } 
        SplashScreen.hide()
    }
    _checkDeepLink = () => {
        branch.subscribe(async ({ errors, params }) => {
            if (errors) {
                alert("Error from Branch: " + errors);
                return;
            }
            if (params.$deeplink_path !== undefined) {
                let fb_id = params.$deeplink_path;
                await this.props.getCandidateDetails(fb_id);
                const { status } = this.props.interviewSignUp;
                if (status == SUCCESS_STATUS) {
                    this.setState({deepLink:true, fb_id:fb_id})
                } else if (error == 1) {
                    this.setState({deepLink:false})
                }
            } else if (params.$share_data !== undefined){
                this.setState({sharing:true})
            }
        });
    }
    _onNext = (item,index) => {
        let items = AppDetails;
        let moveToIndex = items.length - 1 <= index
        if(!moveToIndex){
            let moveIndex = index + 1 ;
            this.flatListRef.scrollToIndex({ animated: true, index: moveIndex }); 
        }else{
            this._linkCheck();
        }
    }
    _onSkip = () => {
        this._linkCheck();
    }

    _linkCheck = ( ) => {
        const {
            deepLink, sharing, fb_id 
        } = this.state;
        if(deepLink){
        const { data, message, error, status } = this.props.interviewSignUp;
            setItem("mongo_id", JSON.stringify({ candidate: {data:data} }));
            this.props.navigation.navigate("Instructions", {
                fb_id: fb_id,
                profile_pic: `https://pikmail.herokuapp.com/${
                    data.sender_mail
                    }?size=60`,
                name: data.from,
                email: data.sender_mail
            });
        }else if (sharing){
            this.props.navigation.navigate("JobList", { title: 'Apply for Jobs' });
        }
        else {
            this.props.navigation.navigate("HomePage");
        }
    }
    _renderItem = ({item,index}) => {
        let iconName = index == 3 ? 'checkmark':'arrow-forward'
        return (
            <Grid>
                <Col size={9} style={[styles.container]} >
                <LinearGradient colors={['#5049b9','#5049b9','#a499dd']} style={[styles.container,{flex:1}]}>
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
                <Row style={[styles.bottomContainer,{backgroundColor:'#a499dd'}]}>
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

const mapStateToProps = state => ({ 
    appliedJob: state.appliedJob, 
    interviewSignUp: state.interviewSignUp
 })
export default connect(mapStateToProps, { getCandidateJobDetails, getCandidateDetails })(AppIntro);
