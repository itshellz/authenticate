/*This component uses custom spinner */
import React, { Component } from 'react';
import { Text } from 'react-native';
import firebase from 'firebase';
import { Card, CardSection, Button, Input, Spinner } from './common';
                                          /* ^ This is Custom Spinner not the
                                             downloaded one.                 */
class LoginForm extends Component {
  state = { email: '', password: '', error: '', loading: false };
// Using firebase pre-defined method auth() to implement the sign in functionality.
/* If User already exists and authentication passed, then sig-n success.
   If User already exixts and authentication fails, then sign-in fails with error error message.
   If New User, then create a new account ans sign-in automatic and success.
   Note:- No seperate forms for sign-in and sign-up.
*/
  onButtonPress() {
    const { email, password } = this.state;

    //LoginForm re-renders with updated values
    this.setState({ error: '', loading: true });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(this.onLoginSuccess.bind(this))
      .catch(() => {
        firebase.auth().createUserWithEmailAndPassword(email, password)
          .then(this.onLoginSuccess.bind(this))
          .catch(this.onLoginFail.bind(this));
      });
  }

//LoginForm re-renders with updated values. Clears off the spinner as well
  onLoginSuccess() {
    this.setState({
      email: '',
      password: '',
      loading: false,
      error: ''
    });
  }

//LoginForm re-renders with error message.
  onLoginFail() {
      this.setState({ error: 'Authentication failed.', loading: false });
  }

  renderButton() {
    if (this.state.loading) {
      return <Spinner size="small" />;
    }

    return (
      <Button onPress={this.onButtonPress.bind(this)}>
        Log in
      </Button>
    );
  }
  render() {
//    console.log(this.state.textin);
    return (
      <Card>

        <CardSection>
          <Input
            placeholder="user@gmail.com"
            label="Email"
            value={this.state.email}
            /*
              Upon change in text onChangeText takes current value of text
              i.e. email in this case and gives it as input to fat arrow
              function and that particular text will be updated with latest
              value.
              { email } is the simple form of { email: email}
            */
            onChangeText={email => this.setState({ email })}
          />
        </CardSection>

        <CardSection>
          <Input
            secureTextEntry
            placeholder="password"
            label="Password"
            value={this.state.password}
            /*
              Upon change in text onChangeText takes current value of text
              i.e. password in this case and gives it as input to fat arrow
              function and that particular text will be updated with latest
              value.
              { password } is the simple form of { password: password}
            */
            onChangeText={password => this.setState({ password })}
          />
        </CardSection>

        <Text style={styles.errorText} >
          {this.state.error}
        </ Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>

      </Card>
    );
  }
}

const styles = {
  errorText: {
      fontSize: 20,
      alignSelf: 'center',
      color: 'red'
  }
};

export default LoginForm;
