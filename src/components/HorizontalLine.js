import React, { Component } from 'react'
import { Text, StyleSheet, View } from 'react-native'

export default class HorizontalLine extends Component {
  render() {
    return (
      <View style = {styles.horizontalLine} />
    )
  }
}

const styles = StyleSheet.create({
    horizontalLine : {
        borderBottomWidth: 1,
        borderBottomColor: "#eeeeef",
        width: "100%"
    }
})
