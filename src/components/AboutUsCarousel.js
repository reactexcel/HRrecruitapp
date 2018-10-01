import React, { Component } from "react";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { View, Dimensions, Image } from "react-native";
import { COLOR } from "../styles/color";
import { DEVICE_HEIGHT, DEVICE_WIDTH } from "../helper/constant";

export default class AboutUsCarousel extends Component {
  constructor() {
    super();
    this.state = {
      entries: [
        { title: require("../images/teamwork.png") },
        { title: require("../images/teamwork.png") },
        { title: require("../images/teamwork.png") },
        { title: require("../images/teamwork.png") },
        { title: require("../images/teamwork.png") }
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
          zIndex: 10,
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
          backgroundColor: "#d4d4d4"
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
      <View>
        <Image source={item.title} />
      </View>
    );
  }
  render() {
    const slideHeight = DEVICE_HEIGHT * 0.36;
    const slideWidth = this.wp(100);
    const itemHorizontalMargin = this.wp(2);

    const sliderWidth = DEVICE_WIDTH;
    const itemWidth = slideWidth + itemHorizontalMargin * 2;

    return (
      <View
        style={{
          position: "relative",
          zIndex: -10,
          bottom: 50,
          borderWidth: 5,
          borderColor: "#000",
        }}
      >
        <Carousel
          ref={c => {
            this._carousel = c;
          }}
          data={this.state.entries}
          renderItem={this._renderItem}
          sliderWidth={sliderWidth}
          // sliderHeight={100}
          itemWidth={itemWidth}
          // itemHeight={itemWidth}
          firstItem={0}
          inactiveSlideScale={0.94}
          inactiveSlideOpacity={0.7}
          onSnapToItem={index => this.setState({ activeSlide: index })}
        />
        {this.pagination()}
      </View>
    );
  }
}
