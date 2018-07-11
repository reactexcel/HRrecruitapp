import React, { Component, Fragment } from "react";
import { View, Alert, Image, Linking, Platform, TouchableOpacity, FlatList } from "react-native";
import {
    Container,
    Text,
    Card,
    Content,
    Body,
    CardItem,
    Button,
    Icon,
    Spinner
} from "native-base";
import { connect } from "react-redux";
import styles from "../styles";
import { COLOR } from "../styles/color";
import { getJobLists } from "../actions";
import CustomButton from '../components/CustomButton';
import HorizontalLine from "../components/HorizontalLine";

class JobList extends Component {
    constructor(props){
        super(props)
        this.state = {
            jobList:[]
        }
    }
    async componentDidMount() {
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

    renderCardItem = ({item}) => (
            <Card padder>
                <CardItem style={{ justifyContent: 'space-between' }}>
                    <Text>{item.subject}</Text>
                    <Button style={{marginRight:-10}} transparent primary>
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
        const { joblist } = this.state;
        return (
            <Container>
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
            </Container>
        )
    }

}

const mapStateToProps = ({ joblist }) => ({ joblist });
export default connect(mapStateToProps,
    { getJobLists }
)(JobList);