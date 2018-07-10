import React, { Component, Fragment } from "react";
import { View, Alert, Image, Linking, Platform, TouchableOpacity } from "react-native";
import {
    Container,
    Text,
    Card,
    Content,
    Body,
    CardItem
} from "native-base";
import { connect } from "react-redux";
import styles from "../styles";
import { COLOR } from "../styles/color";

class JobList extends Component {
    static navigationOptions = {
        title: "Apply For Jobs"
    };

    render() {
        return (
            <Container>
                <Content padder>
                    <Card padder>
                        <CardItem header>
                            <Text>Job Titles</Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text style={styles.text} >
                                    Job Deatils
                                </Text>
                            </Body>
                        </CardItem>
                        <CustomButton
                            text="Apply for Job"
                            onPress={()=>{}}
                        />
                    </Card>
                </Content>
            </Container>
        )
    }

}

const mapStateToProps = ({ candidate }) => ({ candidate });
export default connect(mapStateToProps)(JobList);