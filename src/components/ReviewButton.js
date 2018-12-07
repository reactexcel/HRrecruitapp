import React, { Component, Animated } from "react";
import { View, Text, Linking } from "react-native";
import { Button } from "native-base";
import { COLOR } from "../styles/color";

class ReviewButton extends Component {
  constructor() {
    super();
    this.state = {
      isPressed: false,
      index: null
    };
  }
  _onPressIn = index => {
    this.setState({ isPressed: true, index: index });
    if (index == 0) {
      Linking.openURL(
        "https://www.google.co.in/search?q=excellencetechnologies&oq=excellencetechnologies&aqs=chrome..69i57j69i60l3j0j69i60.10599j0j9&sourceid=chrome&ie=UTF-8#lrd=0x390ce4fc8c75d9e5:0x4ea29a8e67042fb9,1"
      );
    } else if (index == 1) {
      Linking.openURL(
        "https://www.glassdoor.co.in/Reviews/Excellence-Technosoft-Noida-Reviews-EI_IE528792.0,21_IL.22,27_IC4477468.htm"
      );
    } else {
      Linking.openURL("https://www.facebook.com/ExcellenceTechnologies/");
    }
    setTimeout(() => {
      this.setState({ isPressed: false, index: index });
    }, 100);
  };
  // _onPressOut = () => this.setState({ isPressed: false });
  // ()=>{ Linking.openURL('https://google.com')}
  render() {
    const reviews = ["GOOGLE", "GLASSDOOR", "FACEBOOK"];
    const { isPressed, index } = this.state;
    return (
      <View style={{/* borderWidth:1, */ flexDirection: "row", }}>
        {reviews.map((btnText, id) => (
          <Button
            rounded
            onPress={() => this._onPressIn(id)}
            // onPressOut={this._onPressOut}
            style={{
              backgroundColor:
                isPressed && index === id ? COLOR.MUSTARD : "transparent",
              paddingHorizontal: '2%',
              borderColor: COLOR.BTNYELLOW,
              marginHorizontal: id === 1 ? 5 : 0,
              borderWidth: 3.2,
              borderColor:
                isPressed && index === id
                  ? COLOR.MUSTARD
                  :"rgba(28, 40, 79, 1)"/* "rgba(42, 54, 95, 1)" */ /* "rgba(28, 39, 84, 1) */,
              shadowOffset: { height: 0, width: 0 },
              shadowOpacity: 0,
              elevation: 0,
            }}
            key={id}
          >
            <Text
              style={{
                color: isPressed && index === id ? COLOR.LGTWO : "white",
                fontSize: 10,
                fontFamily: "Montserrat",
                // letterSpacing: 0.2
              }}
            >
              {btnText} REVIEWS
            </Text>
          </Button>
        ))}
      </View>
    );
  }
}

export default ReviewButton;
