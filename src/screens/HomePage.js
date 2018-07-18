import React, { Component, Fragment } from "react";
import { View, Alert, Image, Linking, Platform, TouchableOpacity, BackHandler } from "react-native";
import {
  Container,
  Text,
    ListItem,
    Thumbnail,
    Body,
    Right,
    Left,
    Icon,
    List,
    Spinner
} from "native-base";
import { connect } from "react-redux";
import styles from "../styles/HomePage";
import { COLOR } from "../styles/color";
import CustomButton from "../components/CustomButton";
import Logo from "../components/Logo";
import { pageDeatils } from '../helper/json';
import { setItem, getItem } from "../helper/storage";
import {
    getCandidateJobDetails,
    getCandidateDetails
} from "../actions";
import branch from "react-native-branch";
import { SUCCESS_STATUS } from "../helper/constant";



class HomePage extends Component {
    constructor(props){
        super(props)
        this.setCandidateProfile();
        this.state = {
            linkOpening:true,
            candidateJob:null,
            profile_pic:null,
            userName:null
        }
        this.handleViewClick = this.handleViewClick.bind(this)
    }
    static navigationOptions = {
        header: null,
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
    setCandidateProfile = async() => {
        const candidateJob = await getItem("mongo_id");
        if (candidateJob) {
            let email = candidateJob.candidate.data.sender_mail;
            let profile_pic = `https://pikmail.herokuapp.com/${email}?size=60`;
            let userName = candidateJob.candidate.data.from
            await this.props.getCandidateJobDetails(candidateJob.candidate.data._id);
            this.setState({ candidateJob, profile_pic, userName, linkOpening: false  })
        } else {
            this.setState({ linkOpening: false })
        }
    }
     async handleViewClick (data) {
        const {
            appliedJob
        } = this.props;
        if (data == 'JobList' && this.state.candidateJob) {
            this.props.navigation.navigate(data, { appliedJob:appliedJob,title:'Your Applied Jobs' });
        }else{
            this.props.navigation.navigate(data, { title: 'Apply for Jobs'});
        }
    }
    componentDidMount = async () => {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
        if (Platform.OS === 'ios') {
            this.setState({ linkOpening: false })
        }
        branch.subscribe(async ({ errors, params }) => {
            if (errors) {
                alert("Error from Branch: " + errors);
                return;
            }
            if (params.$deeplink_path !== undefined) {
                let fb_id = params.$deeplink_path;
                await this.props.getCandidateDetails(fb_id);
                const { data, message, error, status } = this.props.interviewSignUp;

                setItem("mongo_id", JSON.stringify({ candidate: {data:data} }));
                if (status == SUCCESS_STATUS) {
                    this.setState({ linkOpening: false });
                    this.props.navigation.navigate("Instructions", {
                        fb_id: fb_id,
                        profile_pic: `https://pikmail.herokuapp.com/${
                            data.sender_mail
                            }?size=60`,
                        name: data.from,
                        email: data.sender_mail
                    });
                } else if (error == 1) {
                    this.setState({ linkOpening: false  });
                }
            } else {
                await this.setCandidateProfile();
                this.setState({ linkOpening: false,  });
            }
        });
    }

    componentDidUpdate = async (prevProps, prevState) => {
        const setUser = this.props.navigation.getParam("setUser");
        if (setUser) {
            await this.setCandidateProfile();
            this.props.navigation.setParams({ setUser: false });
        }
    };

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }
    handleBackPress = () => {
        BackHandler.exitApp(); // works best when the goBack is async
    }
      render(){
          let { linkOpening, profile_pic, userName } = this.state;
          let profilepic = profile_pic ?  { uri: profile_pic } :require('../images/profilepic.png')
          let userNames = userName ? userName :"User Id"
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
                  {linkOpening ?
                      <View
                          style={{
                              flex: 1,
                              justifyContent: "center",
                              flexDirection: "column"
                          }}
                      >
                          <Spinner color={COLOR.Spinner} />
                      </View>
                      :
                <View>
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
                        source={profilepic}
                      />
                  </View>
                  <View style={styles.btnContainer}>
                      <Text>{userNames}</Text>
                  </View>
                  {renderCustomView}
                </View>}
                </Container>
          )
      }
}

const mapStateToProps = state => ({ 
    appliedJob: state.appliedJob, 
    interviewSignUp: state.interviewSignUp
 })
export default connect(mapStateToProps, { getCandidateJobDetails, getCandidateDetails })(HomePage);