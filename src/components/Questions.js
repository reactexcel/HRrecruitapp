import React, { Component } from "react";
import { Content, Card, CardItem, Text, Radio } from "native-base";
import { View } from "react-native";
import { Col, Row } from "react-native-easy-grid";
import map from "lodash/map";
import findIndex from "lodash/findIndex";
import styles from "../styles";
import _styles from "../styles/TestPage";
import Accordion from "react-native-collapsible/Accordion";

class Questions extends Component {
  render() {
    const { question, solution, handleSubmit } = this.props;
    return (
      <Content style={{ backgroundColor: "white" }}>
        <CardItem>
          <Content>
            <Accordion
              sections={question.data}
              renderHeader={questionObj => (
                <Card style={styles.blockView}>
                  <CardItem>
                    <Text style={styles.headerText}>
                      {questionObj.group_name}
                    </Text>
                  </CardItem>
                </Card>
              )}
              renderContent={questionObj =>
                map(questionObj.questions, (ques, index) => {
                  return (
                    <Content key={index} padder>
                      <Text style={{ fontSize: 16 }}>
                        {index + 1}. {ques.question}
                      </Text>
                      {ques.description ? (
                        <View style={_styles.descriptionView}>
                          <Text style={{ opacity: 0.8 }}>
                            {ques.description}
                          </Text>
                        </View>
                      ) : null}
                      {map(ques.options, (values, index) => {
                        let isSolution =
                          solution[0] != undefined
                            ? findIndex(solution, value => {
                                return value.Q_id == ques._id;
                              })
                            : null;
                        let selected =
                          isSolution != null && isSolution != -1
                            ? solution[isSolution].ans_id == values.opt_id
                              ? true
                              : false
                            : false;
                        return (
                          <Content key={index} padder>
                            <Row>
                              <Col style={{ width: "10%" }}>
                                <Radio
                                  onPress={() => {
                                    handleSubmit(ques._id, values.opt_id);
                                  }}
                                  selected={selected}
                                />
                              </Col>
                              <Col>
                                <Text>{values.option}</Text>
                              </Col>
                            </Row>
                          </Content>
                        );
                      })}
                    </Content>
                  );
                })
              }
            />
          </Content>
        </CardItem>
      </Content>
    );
  }
}

export default Questions;
