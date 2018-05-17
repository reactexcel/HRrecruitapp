import React, { Component, Fragment } from "react";
import { View } from "react-native";
import {
  Container,
  Content,
  Body,
  Text,
  Card,
  CardItem,
  Item,
  Input,
  Picker
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import { reduxForm, Field } from "redux-form";
import { isEmail, isMobilePhone, isLowercase } from "validator";
import Logo from "../components/Logo";
import CustomButton from "../components/CustomButton";
import styles from "../styles";
import _styles from "../styles/AddCandidate";
import { COLOR } from "../styles/color";

class AddCandidate extends Component {
  static navigationOptions = {
    header: null
  };
  renderField(props) {
    const { input, ...inputProps } = props;
    const {
      meta: { touched, error }
    } = props;
    return (
      <Fragment>
        <Item style={_styles.inputTextView}>
          <Input
            style={styles.inputText}
            {...inputProps}
            onChangeText={input.onChange}
            onBlur={input.onBlur}
            onFocus={input.onFocus}
            value={input.value}
            placeholderTextColor={COLOR.Grey}
            selectionColor={COLOR.Grey}
            underlineColorAndroid={COLOR.Grey}
          />
        </Item>
        <View style={_styles.errorTextView}>
          {touched && error && <Text style={_styles.errorText}>{error}</Text>}
        </View>
      </Fragment>
    );
  }
  renderPicker({
    input: { onChange, value, ...inputProps },
    children,
    ...pickerProps
  }) {
    const {
      meta: { touched, error }
    } = pickerProps;
    console.log(value);
    return (
      <Fragment>
        <View style={_styles.picker}>
          <Picker
            selectedValue={value}
            onValueChange={value => {
              requestAnimationFrame(() => {
                onChange(value);
              });
            }}
            {...inputProps}
            {...pickerProps}
          >
            {children}
          </Picker>
        </View>
        <View style={_styles.errorTextView}>
          {touched && error && <Text style={_styles.errorText}>{error}</Text>}
        </View>
      </Fragment>
    );
  }

  onSubmit = values => {
    console.log(values);
  };

  render() {
    const { handleSubmit } = this.props;
    return (
      <Container style={styles.container}>
        <Content padder>
          <Grid>
            <Row style={styles.logoView}>
              <Logo />
            </Row>
            <Row>
              <Card style={styles.blockView}>
                <CardItem>
                  <Text style={styles.headerText}>Add Candidate</Text>
                </CardItem>
                <Content style={_styles.horizontalLine} />
                <Field
                  name="email"
                  placeholder="Email"
                  keyboardType="email-address"
                  component={this.renderField}
                  autoCapitalize="none"
                />
                <Field
                  name="name"
                  placeholder="Full Name"
                  component={this.renderField}
                />
                <Field
                  name="gender"
                  component={this.renderPicker}
                  mode="dropdown"
                >
                  <Item label="Select gender" value="" />
                  <Item label="Female" value="female" />
                  <Item label="Male" value="male" />
                  <Item label="Others" value="others" />
                </Field>

                <Field
                  name="source"
                  placeholder="Source"
                  component={this.renderField}
                />
                <Field
                  name="phone"
                  placeholder="Mobile number"
                  component={this.renderField}
                  keyboardType="numeric"
                />
                <CardItem />
                <CustomButton
                  text="Add"
                  onPress={handleSubmit(this.onSubmit)}
                />
              </Card>
            </Row>
          </Grid>
        </Content>
      </Container>
    );
  }
}
validate = values => {
  const errors = {};
  if (!values.name) {errors.name = "Cannot be Empty"}

  if (!values.email) {
    errors.email = "Cannot be Empty";
  } else if (!isEmail(values.email) || !isLowercase(values.email)) {
    errors.email = "Enter a valid email and must be in lowercase";
  }
  if (!values.gender) errors.gender = "Select a gender";
  if (!values.source) errors.source = "Cannot be Empty";
  if (!values.phone) {
    errors.phone = "Cannot be Empty";
  } else if (!isMobilePhone(values.phone, "en-IN")) {
    errors.phone = "Enter valid phone number";
  }
  return errors;
};
export default reduxForm({
  form: "AddCandidate",
  validate
})(AddCandidate);
