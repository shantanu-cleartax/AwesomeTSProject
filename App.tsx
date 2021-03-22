/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

 import React from 'react';
 import {
   StyleSheet,
   Text,
   useColorScheme,
   View,
   TouchableOpacity
 } from 'react-native';

 import {
   Colors
 } from 'react-native/Libraries/NewAppScreen';
 import AsyncStorage from '@react-native-async-storage/async-storage';
 import { NavigationContainer } from '@react-navigation/native';
 import 'react-native-gesture-handler';
 import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
 import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import HomeScreen from './src/screen/HomeScreen';
import DetailScreen from './src/screen/DetailScreen';
import ActorSearchScreen from './src/screen/ActorSearchScreen';
import TitleScreen from './src/screen/TitleScreen';
import TitleSearchScreen from './src/screen/TitleSearchScreen';
import ReactQueryScreen from './src/screen/ReactQueryScreen';


 const Section: React.FC<{
   title: string;
 }> = ({children, title}) => {
   const isDarkMode = useColorScheme() === 'dark';
   return (
     <View style={styles.sectionContainer}>
       <Text
         style={[
           styles.sectionTitle,
           {
             color: isDarkMode ? Colors.white : Colors.black,
           },
         ]}>
         {title}
       </Text>
       <Text
         style={[
           styles.sectionDescription,
           {
             color: isDarkMode ? Colors.light : Colors.dark,
           },
         ]}>
         {children}
       </Text>
     </View>
   );
 };

 const storeData = async (value:any) => {
  try {
    const jsonValue = JSON.stringify(value)
    await AsyncStorage.setItem('@storage_Key', jsonValue)
  } catch (e) {
    console.log(e);
  }
}

const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@storage_Key')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    console.log(e);
  }
}

const Stack = createStackNavigator();


 const App = () => {
   const isDarkMode = useColorScheme() === 'dark';

   const backgroundStyle = {
     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
   };

   const data = {name: 'Shantanu' , place: 'Mumbai', pincode: 400101}

   storeData(data);

   const s = getData();

   console.log("XYZ: "+JSON.stringify(s));
   return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
        <Stack.Screen 
          name="Details" 
          component={DetailScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen 
          name="Actors" 
          component={ActorSearchScreen}
          options={({ navigation})=>({
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Details')}>
                <MaterialIcons name='home' size={30} style={{marginRight: 15}}/>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen 
          name="Titles" 
          component={TitleSearchScreen}
          options={({ navigation})=>({
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Details')}>
                <MaterialIcons name='home' size={30} style={{marginRight: 15}}/>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen 
          name="Title" 
          component={TitleScreen} 
          options={({ navigation})=>({
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Details')}>
                <MaterialIcons name='home' size={30} style={{marginRight: 15}}/>
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen 
          name="ReactQuery" 
          component={ReactQueryScreen} 
          options={({ navigation})=>({
            headerRight: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Details')}>
                <MaterialIcons name='home' size={30} style={{marginRight: 15}}/>
              </TouchableOpacity>
            ),
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
 };

 const styles = StyleSheet.create({
   sectionContainer: {
     marginTop: 32,
     paddingHorizontal: 24,
   },
   sectionTitle: {
     fontSize: 24,
     fontWeight: '600',
   },
   sectionDescription: {
     marginTop: 8,
     fontSize: 18,
     fontWeight: '400',
   },
   highlight: {
     fontWeight: '700',
   },
 });

 export default App;
