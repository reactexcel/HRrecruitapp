import React, { Component } from 'react'
import { Text, StyleSheet, View , Image} from 'react-native'

export default class Logo extends Component {
  render() {
    return (
      <View style = {styles.container}>
        <Image source = {require('../images/logo.png')} style = {styles.logo} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container : {
        alignItems : 'center',
    },
})
