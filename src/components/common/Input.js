import React from 'react';
import { View, Text, TextInput } from 'react-native';

const Input = ({ label, value, onChangeText, placeholder, secureTextEntry }) => {
    const { inputStyle, labelStyle, containerStyle } = styles;
    return (
      <View style={containerStyle}>
        <Text style={labelStyle}>{label}</Text>
        <TextInput
          secureTextEntry={secureTextEntry}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          style={inputStyle}
          underlineColorAndroid='transparent' //This is for android to supress underline
        />
      </View>
    );
  };
/******** Notes on flex property used for inputStyle and labelstyle ***********
  Label and input text are siblings of View. if it is observed flex value is
  given as 1 and 2 for label and input respectively. It indicates that if whole
  flex is divided into 3 parts then label occupies 1/3 and input occupies 2/3.
*/
const styles = {
  inputStyle: {
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#000',
    paddingLeft: 5,
    paddingRight: 5,
    lineHeight: 23,
    flex: 2
  },
  labelStyle: {
    fontSize: 18,
    paddingLeft: 20,
    flex: 1
  },
  containerStyle: {
    backgroundColor: '#EAE9EE',
    height: 40,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  }
};

export { Input };
