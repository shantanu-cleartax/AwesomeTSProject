import * as React from 'react';
import { Text, View, Button, StyleSheet, StatusBar } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { CommonActions } from '@react-navigation/native';


const HomeScreen = ({navigation}:any)=>{

  const timeFun = ()=>{
    setTimeout(() => {
      navigation.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [ 
              { name: 'Details' },
            ],
          })
        );
      }, 2000)
    }

    React.useEffect(()=>{
      timeFun();
    }, []);

    return (
        <View style={styles.container}>
        {/* <SplashScreen >

        </SplashScreen> */}
            <MaterialIcons name='movie' size={100} color='#1F51FF'/>
            <Text style={{color: '#222'}}>
            </Text>
                        
            <Text style={styles.welcomeText}>IMDb

            </Text>

        </View>
      );
}

const styles = StyleSheet.create({
    welcomeText: {
      fontSize: 30,
      fontWeight: 'bold',
      color: '#FFF'
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#222'
    },
  });

export default HomeScreen;