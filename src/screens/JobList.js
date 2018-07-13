import React, { Component, Fragment } from "react";
import { View, Alert, Image, Linking, Platform, TouchableOpacity, FlatList, Clipboard, ToastAndroid, AlertIOS, } from "react-native";
import {
    Container,
    Text,
    Card,
    Content,
    Body,
    CardItem,
    Icon,
    Spinner,
} from "native-base";
import { connect } from "react-redux";
import styles from "../styles";
import { COLOR } from "../styles/color";
import { getJobLists } from "../actions";
import CustomButton from '../components/CustomButton';
import HorizontalLine from "../components/HorizontalLine";
import Share, { ShareSheet, Button } from 'react-native-share';
import { SHAREURL } from '../config/dev';

class JobList extends Component {
    constructor(props){
        super(props)
        this.state = {
            jobList:[],
            visible: false,
            shareOptions:{}
        }
    }
    componentDidMount = async() =>{
        await this.props.getJobLists();
        const { data, error } = this.props.joblist;
        if(data){
            this.setState({joblist:data})
        }
    }
    static navigationOptions = {
        title: "Apply For Jobs"
    };

    onApplyJob = (item) => {
        this.props.navigation.navigate("AddCandidate",{
            jobDetail: item
        });
    }
    onCancel() {
        console.log("CANCEL")
        this.setState({ visible: false });
    }
    
    onShareClick = (item) => {
        let shareDetails = {};
        console.log(item, "item", shareDetails)
        shareDetails["title"] = item.title;
        shareDetails["subject"] = item.subject;
        shareDetails["message"] = item.job_description;
        shareDetails["url"] = SHAREURL;
        this.setState({ visible: true, shareOptions: shareDetails});
    }
    renderCardItem = ({item}) => (
            <Card padder>
                <CardItem style={{ justifyContent: 'space-between' }}>
                    <Text>{item.subject}</Text>
                    <Button
                    onPress={()=>{this.onShareClick(item)}} 
                        style={{marginRight:-10}} transparent primary>
                        <Icon name='share' />
                    </Button>
                </CardItem>
                <HorizontalLine />
                <CardItem>
                    <Body>
                    <Text style={[styles.text, { textAlign:'auto'}]} >
                            {item.job_description?item.job_description:''}
                    </Text>
                    </Body>
                </CardItem>
                <CustomButton
                    btnStyle={styles.buttonPadder}
                    text="Apply for Job"
                    onPress={() => {this.onApplyJob(item)}}
                />
            </Card>
    )
    render() {
        const { joblist, shareOptions } = this.state;
        return (
            <Container >
                <Content padder>
                    {joblist && joblist.length >=1 ?<FlatList
                        data={joblist}
                        keyExtractor ={(item, index) => item.id.toString()}
                        renderItem={this.renderCardItem}
                    /> : <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            flexDirection: "column"
                        }}
                    >
                            <Spinner color={COLOR.Spinner} />
                        </View>}
                </Content>
                <ShareSheet visible={this.state.visible} onCancel={this.onCancel.bind(this)}>
                    <Button iconSrc={require('../images/twitter.png')}
                        onPress={() => {
                            this.onCancel();
                            setTimeout(() => {
                                Share.shareSingle(Object.assign(shareOptions, {
                                    "social": "twitter"
                                }));
                            }, 300);
                        }}>Twitter</Button>
                    <Button iconSrc={require('../images/facebook.png')}
                        onPress={() => {
                            this.onCancel();
                            setTimeout(() => {
                                Share.shareSingle(Object.assign(shareOptions, {
                                    "social": "facebook"
                                }));
                            }, 300);
                        }}>Facebook</Button>
                    <Button iconSrc={require('../images/whatapp.png')}
                        onPress={() => {
                            this.onCancel();
                            setTimeout(() => {
                                Share.shareSingle(Object.assign(shareOptions, {
                                    "social": "whatsapp"
                                }));
                            }, 300);
                        }}>Whatsapp</Button>
                    <Button iconSrc={require('../images/googleplus.png')}
                        onPress={() => {
                            this.onCancel();
                            setTimeout(() => {
                                Share.shareSingle(Object.assign(shareOptions, {
                                    "social": "googleplus"
                                }));
                            }, 300);
                        }}>Google +</Button>
                    <Button iconSrc={require('../images/mail.png')}
                        onPress={() => {
                            this.onCancel();
                            setTimeout(() => {
                                Share.shareSingle(Object.assign(shareOptions, {
                                    "social": "email"
                                }));
                            }, 300);
                        }}>Email</Button>
                    <Button
                        iconSrc={require('../images/link.png')}
                        onPress={() => {
                            this.onCancel();
                            setTimeout(() => {
                                if (typeof shareOptions["url"] !== undefined) {
                                    Clipboard.setString(shareOptions["url"]);
                                    if (Platform.OS === "android") {
                                        ToastAndroid.show('Link Copied', ToastAndroid.SHORT);
                                    } else if (Platform.OS === "ios") {
                                        AlertIOS.alert('Link Copied');
                                    }
                                }
                            }, 300);
                        }}>Copy Link</Button>
                    <Button iconSrc={require('../images/more.png')}
                        onPress={() => {
                            this.onCancel();
                            setTimeout(() => {
                                Share.open(shareOptions)
                            }, 300);
                        }}>More</Button>
                </ShareSheet>
            </Container>
        )
    }

}

const mapStateToProps = ({ joblist }) => ({ joblist });
export default connect(mapStateToProps,
    { getJobLists }
)(JobList);