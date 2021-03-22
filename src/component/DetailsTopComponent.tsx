import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const DetailsTopComponent = (props:any)=>{
    console.log(props);
    return(

          <TouchableOpacity onPress={() => props.navigation.navigate(`${props.goto}`)}>
            <Text>{props.goto}</Text>
          </TouchableOpacity>
    );
}
const styles = StyleSheet.create({});

export default DetailsTopComponent;
