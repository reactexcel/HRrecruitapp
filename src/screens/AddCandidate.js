import React, { Component, Fragment } from "react";
import {
  View,
  Alert,
  CameraRoll,
  PermissionsAndroid,
  Image,
  TouchableOpacity
} from "react-native";
import {
  Container,
  Content,
  Body,
  Text,
  Card,
  CardItem,
  Item,
  Input,
  Picker,
  Spinner
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import { reduxForm, Field } from "redux-form";
import { isEmail, isMobilePhone, isLowercase } from "validator";
import Logo from "../components/Logo";
import CustomButton from "../components/CustomButton";
import HorizontalLine from "../components/HorizontalLine";
import styles from "../styles";
import _styles from "../styles/AddCandidate";
import { COLOR } from "../styles/color";
import { notify } from "../helper/notify";
import { connect } from "react-redux";
import { addCandidate } from "../actions";

class AddCandidate extends Component {
  state = {
    photos: []
  };
  static navigationOptions = {
    header: null
  };
  static getDerivedStateFromProps(nextProps) {
    const { msg } = nextProps.candidate;
    if (msg !== undefined) {
      alert(msg);
    }
    return null;
  }
  takePicture() {
    const options = {};
    //options.location = ...
    this.camera
      .capture({ metadata: options })
      .then(data => console.log(data))
      .catch(err => console.error(err));
  }

  componentDidUpdate() {
    const { candidate } = this.props;
    if (candidate.data !== undefined) {
      if (candidate.data.candidate_status === false) {
        Alert.alert(
          "Thank You",
          "Wait for the confirmation of your registration from HR.",
          [
            {
              text: "OK",
              onPress: () => this.props.navigation.popToTop()
            }
          ],
          { cancelable: false }
        );
      }
    }
    const { success } = this.props.candidate;
    if (success !== undefined) {
      if (success === false) {
        notify("Something went wrong");
      }
    }
  }
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
    this.props.addCandidate(values);
  };

  render() {
    console.log(this.state, "sadiufyh");
    const { handleSubmit } = this.props;
    const { adding } = this.props.candidate;
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
                  <Text style={styles.headerText}>Register Candidate</Text>
                </CardItem>
                <HorizontalLine />
                <Field
                  name="sender_mail"
                  placeholder="Email"
                  keyboardType="email-address"
                  component={this.renderField}
                  autoCapitalize="none"
                />
                <Field
                  name="from"
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
                </Field>

                <Field
                  name="source"
                  placeholder="Source"
                  component={this.renderField}
                />
                <Field
                  name="mobile_no"
                  placeholder="Mobile number"
                  component={this.renderField}
                  keyboardType="numeric"
                />
                <CustomButton
                  text="Photos Add"
                  onPress={async () => {
                    // var photo = {
                    //   uri: "file:///sdcard/img.png",
                    //   type: "image/jpeg",
                    //   name: "photo.jpg"
                    // };
                    try {
                      const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
                        {
                          title: "Cool Photo App Camera Permission",
                          message:
                            "Cool Photo App needs access to your camera " +
                            "so you can take awesome pictures."
                        }
                      );
                      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                        CameraRoll.getPhotos({
                          first: 20,
                          assetType: "Photos"
                        }).then(res => {
                          console.log(res, "Sade");
                          this.setState({ photos: res.edges });
                        });
                      } else {
                        console.log("Camera permission denied");
                      }
                    } catch (err) {
                      console.warn(err);
                    }
                  }}
                />
                {/* <Camera
                  ref={cam => {
                    this.camera = cam;
                  }}
                  style={{
                    flex: 1,
                    justifyContent: "flex-end",
                    alignItems: "center"
                  }}
                  aspect={Camera.constants.Aspect.fill}
                >
                  <CustomButton
                    onPress={this.takePicture}
                    text="Click Resume"
                  />
                </Camera> */}
                {this.state.photos.length === 0 ? null : (
                  <TouchableOpacity
                    onPress={() =>
                      console.log(this.state.photos[0].node.image.uri)
                    }
                  >
                    <Image
                      source={{ uri: this.state.photos[0].node.image.uri }}
                      style={{ width: 40, height: 40 }}
                    />
                  </TouchableOpacity>
                )}
                <CardItem />
                {adding ? (
                  <Spinner color={COLOR.Spinner} />
                ) : (
                  <CustomButton
                    text="Add"
                    onPress={handleSubmit(this.onSubmit)}
                  />
                )}
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
  if (!values.from) {
    errors.from = "Cannot be Empty";
  }

  if (!values.sender_mail) {
    errors.sender_mail = "Cannot be Empty";
  } else if (!isEmail(values.sender_mail) || !isLowercase(values.sender_mail)) {
    errors.sender_mail = "Enter a valid email and must be in lowercase";
  }
  if (!values.gender) errors.gender = "Select a gender";
  if (!values.source) errors.source = "Cannot be Empty";
  if (!values.mobile_no) {
    errors.mobile_no = "Cannot be Empty";
  } else if (!isMobilePhone(values.mobile_no, "en-IN")) {
    errors.mobile_no = "Enter valid phone number";
  }
  return errors;
};

const mapStateToProps = ({ candidate }) => ({ candidate });
export default reduxForm({
  form: "AddCandidate",
  validate
})(
  connect(
    mapStateToProps,
    { addCandidate }
  )(AddCandidate)
);
