/*This component uses downloaded spinner */
import React, { Component } from 'react';
import { View } from 'react-native';
/*Below is downloaded Spinner*/
import Spinner from 'react-native-loading-spinner-overlay';
import firebase from 'firebase';
import { Header, Button, CardSection } from './src/components/common';
import LoginForm from './src/components/LoginForm';

class App extends Component {
  state = { loggedIn: null, visible: true }
  componentWillMount() {
    //Connecting to firebase
    firebase.initializeApp({
        apiKey: 'AIzaSyDrfwgXjugxw1E_Hd72OI3XbA-4nXZO7-w',
        authDomain: 'authenticate-25022.firebaseapp.com',
        databaseURL: 'https://authenticate-25022.firebaseio.com',
        projectId: 'authenticate-25022',
        storageBucket: 'authenticate-25022.appspot.com',
        messagingSenderId: '468295647682'
    });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ loggedIn: true });
      } else {
        this.setState({ loggedIn: false });
      }
    });
  }

  renderContent() {
    switch (this.state.loggedIn) {
      case true:
        return (
          <CardSection>
            <Button onPress={() => firebase.auth().signOut()}>
              Log Out
            </Button>
          </CardSection>
         );
      case false:
        return <LoginForm />;
      default:
        return (
          <Spinner visible={this.state.visible} />
        );
    }
  }

  render() {
    return (
      <View>
        <Header headerText="Authenticate" />
        {this.renderContent()}
      </ View>
    );
  }
}


export default App;
