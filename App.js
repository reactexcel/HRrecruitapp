import React from 'react';
import { Platform, StatusBar, StyleSheet, View } from 'react-native';
import { AppLoading, Asset, Font, Icon } from 'expo';
import AppNavigator from './navigation/AppNavigator';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from './src/reducers'

const store = createStore(rootReducer, applyMiddleware(thunk));
export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };
  render() {
    if (!this.state.isLoadingComplete && !this.props.skipLoadingScreen) {
      return (
        <AppLoading
          startAsync={this._loadResourcesAsync}
          onError={this._handleLoadingError}
          onFinish={this._handleFinishLoading}
        />
      );
    } else {
      return (
        <Provider store={store}>
         {/* <View style={styles.container}>
        
          {Platform.OS === 'ios' && <StatusBar barStyle="default" />} */}
          <AppNavigator />
         {/* </View> */}
        </Provider>

      );
    }
  }

  _loadResourcesAsync = async () => {
    return Promise.all([
      Asset.loadAsync([
        require('./assets/images/robot-dev.png'),
        require('./assets/images/robot-prod.png'),
      ]),
      Font.loadAsync({
        // This is the font that we are using for our tab bar
        ...Icon.Ionicons.font,
        // We include SpaceMono because we use it in HomeScreen.js. Feel free
        // to remove this if you are not using it in your app
        'space-mono': require('./assets/fonts/SpaceMono-Regular.ttf'),
        // "Montserrat" :require( './assets/fonts/Montserrat.ttf'),
        "Montserrat-Regular" :require( './assets/fonts/Montserrat-Regular.ttf'),
        "Montserrat-Medium":require('./assets/fonts/Montserrat-Medium.ttf'),
        "Montserrat-Bold":require('./assets/fonts/Montserrat-Bold.ttf'),
        "Montserrat-SemiBold":require('./assets/fonts/Montserrat-SemiBold.ttf'),
        "Entypo":require('./assets/fonts/Entypo.ttf'),
        "EvilIcons":require('./assets/fonts/EvilIcons.ttf'),
        "Feather":require('./assets/fonts/Feather.ttf'),
        "FontAwesome":require('./assets/fonts/FontAwesome.ttf'),
        "Foundation":require('./assets/fonts/Foundation.ttf'),
        "Ionicons":require('./assets/fonts/Ionicons.ttf'),
        "MaterialCommunityIcons":require('./assets/fonts/MaterialCommunityIcons.ttf'),
        "MaterialIcons":require('./assets/fonts/MaterialIcons.ttf'),
        "Octicons":require('./assets/fonts/Octicons.ttf'),
        "Roboto":require('./assets/fonts/Roboto.ttf'),
        "Roboto_medium":require('./assets/fonts/Roboto_medium.ttf'),
        "rubicon-icon-font":require('./assets/fonts/rubicon-icon-font.ttf'),
        "SimpleLineIcons":require('./assets/fonts/SimpleLineIcons.ttf'),
        "SpaceMono-Regular":require('./assets/fonts/SpaceMono-Regular.ttf'),
        "Zocial":require('./assets/fonts/Zocial.ttf'),
      }),
    ]);
  };

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
