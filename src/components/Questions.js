import React, { Component } from "react";
import {
  Content,
  Card,
  CardItem,
  Text,
  Radio,
  Accordion,
  Icon
} from "native-base";
import { View, TouchableOpacity, StyleSheet, Platform } from "react-native";
import { Col, Row } from "react-native-easy-grid";
import map from "lodash/map";
import findIndex from "lodash/findIndex";
import styles from "../styles";
import _styles from "../styles/TestPage";
import { COLOR } from "../styles/color";
import PropTypes from "prop-types";
import HTMLView from "react-native-htmlview";

const Questions = props => {
  const { question, solution, handleSubmit } = props;
  return (
    <Content padder>
      <Accordion
        style={_styles.accordionStyle}
        dataArray={question.data}
        renderHeader={(questionObj, expanded) => (
          <View
            style={[
              {
                backgroundColor: expanded ? "#e3e5e9" : COLOR.MUSTARD
              },
              _styles.accordionHeader
            ]}
          >
            <View style={{ flex: 1 }}>
              <Text style={_styles.accordionHeaderText}>
                {questionObj.group_name}
              </Text>
            </View>
            {expanded ? (
              <Icon type="Entypo" style={_styles.accordionIcon} name="minus" />
            ) : (
              <Icon type="Entypo" style={_styles.accordionIcon} name="plus" />
            )}
          </View>
        )}
        renderContent={questionObj =>
          map(questionObj.questions, (ques, index) => {
            return (
              <Content key={index}>
                <View style={_styles.questionOptionView}>
                  <View style={_styles.questionView}>
                    <Text style={_styles.questionTextStyle}>
                      {index + 1}. {ques.question}
                    </Text>
                    {ques.description ? (
                      <View style={_styles.descriptionView}>
                        <HTMLView
                          value={`<p>${ques.description}</p>`}
                          stylesheet={styles_p}
                        />
                      </View>
                    ) : null}
                  </View>

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
                      <TouchableOpacity
                        onPress={() => {
                          handleSubmit(ques._id, values.opt_id);
                        }}
                        activeOpacity={1}
                        key={index}
                      >
                        <Row
                          style={{
                            backgroundColor: selected ? "#e3e5e9" : null
                          }}
                        >
                          <View style={_styles.optionsView}>
                            <Col style={{ width: "10%" }}>
                              <Radio
                                style={
                                  Platform.OS === "ios"
                                    ? _styles.radio_ios
                                    : _styles.radio
                                }
                                onPress={() => {
                                  handleSubmit(ques._id, values.opt_id);
                                }}
                                activeOpacity={1}
                                selected={selected}
                                selectedColor={COLOR.TEXTCOLOR}
                              />
                            </Col>
                            <Col>
                              <Text style={_styles.optionText}>
                                {values.option}
                              </Text>
                            </Col>
                          </View>
                        </Row>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </Content>
            );
          })
        }
      />
    </Content>
  );
};
const styles_p = StyleSheet.create({
  p: {
    fontSize: 16,
    color: "black",
    opacity: 0.8,
    fontFamily: "Montserrat-Regular"
  }
});
Questions.propTypes = {
  question: PropTypes.object,
  solution: PropTypes.array,
  handleSubmit: PropTypes.func.isRequired
};
export default Questions;
