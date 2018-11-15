import React, { Component } from "react";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { View, Dimensions, Image, StyleSheet,Async } from "react-native";
import { COLOR } from "../styles/color";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../helper/constant";
import { Icon } from "native-base";

export default class AboutUsCarousel extends Component {
  constructor() {
    super();
    this.state = {
      entries: [
        { title: require("../images/image_5.png")  },
        { title: require("../images/image_2.png") },
        { title: require("../images/image_3.png") },
        { title: require("../images/image_4.png") },
        { title: require("../images/image_1.png") },
        { title: require("../images/image_6.png") }
      ],
      activeSlide: 0
    };
  }
  pagination() {
    const { entries, activeSlide } = this.state;
    return (
      <Pagination
        dotsLength={entries.length}
        activeDotIndex={activeSlide}
        containerStyle={{
          backgroundColor: "transparent",
          position: "relative",
          bottom: 60,
          zIndex: 10
          // borderWidth: 5,
          // borderColor: "#000"
        }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: COLOR.MUSTARD
        }}
        inactiveDotStyle={{
          backgroundColor: COLOR.INACTIVEDOT
        }}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
        inactiveDotOpacity={0.4}
        carouselRef={this._carousel}
        tappableDots={!!this._carousel}
      />
    );
  }
  wp(percentage) {
    const value = (percentage * DEVICE_WIDTH) / 100;
    return Math.round(value);
  }

  _renderItem({ item, index }) {
    return (
      <View style={{height:400,width:'100%'}}>
        <Image style={{flex:1,width:'100%',height:'100%'}} resizeMode='cover'
         source={item.title}
        
        />
      </View>
    );
  }
  _onPressNext = () => {
    if (this.state.activeSlide == 5) {
      this.setState({ activeSlide: 5 });
    } else {
      this.setState({ activeSlide: this.state.activeSlide + 1 });
    }
  };
  _onPressPrev = () => {
    if (this.state.activeSlide == 0) {
      this.setState({ activeSlide: 0 });
    } else {
      this.setState({ activeSlide: this.state.activeSlide - 1 });
    }
  };
  render() {
    const slideHeight = DEVICE_HEIGHT * 0.36;
    const slideWidth = this.wp(100);
    const itemHorizontalMargin = this.wp(2);

    const sliderWidth = DEVICE_WIDTH;
    const itemWidth = slideWidth + itemHorizontalMargin * 2;

    return (
      <View>
        <View style={styles.parentView}>
          <Carousel
            ref={c => {
              this._carousel = c;
            }}
            data={this.state.entries}
            renderItem={this._renderItem}
            sliderWidth={sliderWidth}
            sliderHeight={100}
            itemWidth={itemWidth}
            itemHeight={100}
            firstItem={this.state.activeSlide}
            inactiveSlideScale={0.94}
            inactiveSlideOpacity={0.7}
            onSnapToItem={index => this.setState({ activeSlide: index })}
          />
          {this.pagination()}
        </View>
        {this.state.activeSlide !== 0 && (
          <View style={styles.leftarrow}>
            <Icon
              onPress={() => this._onPressPrev()}
              type="FontAwesome"
              name="arrow-circle-left"
              style={styles.icon}
            />
          </View>
        )}
        {this.state.activeSlide !== 5 && (
          <View style={styles.rightarrow}>
            <Icon
              onPress={() => this._onPressNext()}
              type="FontAwesome"
              name="arrow-circle-right"
              style={styles.icon}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parentView: {
    position: "relative",
    zIndex: -10,
    bottom: 50,
    borderWidth: 5,
    borderColor: COLOR.PARENTVIEW
  },
  leftarrow: {
    zIndex: 1,
    position: "absolute",
    left: 15,
    top: "25%"
  },
  rightarrow: {
    zIndex: 1,
    position: "absolute",
    right: 15,
    top: "25%"
  },
  icon: {
    fontSize: 40,
    color: "white"
  }
});
