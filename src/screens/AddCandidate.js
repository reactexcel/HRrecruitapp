import React, { Component, Fragment } from "react";
import { Text, View, TextInput, Picker, ScrollView } from "react-native";
import { reduxForm, Field } from "redux-form";
import { isEmail, isMobilePhone, isLowercase } from "validator";
import Logo from "../components/Logo";
import CustomButton from "../components/CustomButton";
import styles from "../styles/AddCandidate";

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
      <View style={styles.inputTextView}>
        <TextInput
          style={styles.inputText}
          {...inputProps}
          onChangeText={input.onChange}
          onBlur={input.onBlur}
          onFocus={input.onFocus}
          value={input.value}
          placeholderTextColor="#c1c0c1"
          selectionColor="#c1c0c1"
          underlineColorAndroid="#c1c0c1"
        />
        {touched && error && <Text style={styles.errorText}>{error}</Text>}
      </View>
    );
  }
  renderpicker({
    input: { onChange, value, ...inputProps },
    children,
    ...pickerProps
  }) {
    const {
      meta: { touched, error }
    } = pickerProps;
    return (
      <Fragment>
        <View style={styles.picker}>
          <Picker
            selectedValue={value}
            onValueChange={value => onChange(value)}
            {...inputProps}
            {...pickerProps}
          >
            {children}
          </Picker>
        </View>
        <View style={styles.inputTextView}>
          {touched && error && <Text style={styles.errorText}>{error}</Text>}
        </View>
      </Fragment>
    );
  }
  onSubmit = values => {
    const data = new FormData();
    for (value in values) {
      data.append(value, values[value]);
    }
  };
  render() {
    const { handleSubmit } = this.props;
    return (
      <View style={styles.container}>
        <Logo />
        <View style={styles.formView}>
          <Text style={styles.headerText}>Add Candidate</Text>
          <View style={styles.horizontalLine} />
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
          <Field name="gender" component={this.renderpicker} mode="dropdown">
            <Picker.Item label="Select Gender" />
            <Picker.Item label="Female" value="female" />
            <Picker.Item label="Male" value="male" />
            <Picker.Item label="Others" value="others" />
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
          <CustomButton text="Add" onPress={handleSubmit(this.onSubmit)} />
        </View>
      </View>
    );
  }
}
validate = values => {
  const errors = {};
  if (!values.name) errors.name = "Cannot be Empty";
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
