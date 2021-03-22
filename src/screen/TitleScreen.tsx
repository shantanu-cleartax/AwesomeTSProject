import * as React from 'react';
import { Text, View, Button, FlatList, Touchable, StyleSheet, Image, ImagePropTypes, Dimensions } from 'react-native';
import { Searchbar } from 'react-native-paper';
import axios from "axios";
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

interface req {
    method: "GET" | "get" | "delete" | "DELETE" | "head" | "HEAD" | "options" | "OPTIONS" | "post" | "POST" | "put" | "PUT" | "patch" | "PATCH" | "purge" | "PURGE" | "link" | "LINK" | "unlink" | "UNLINK" | undefined;
    url: string;
    params: {
        tconst: string;
    };
    headers: {
        'x-rapidapi-key': string;
        'x-rapidapi-host': string;
    };
}


const TitleScreen = (props: any)=>{
    console.log(props);

    const [details, setDetails] = React.useState({title: '',titleType:'', image:{url:'http://www.tiptoncommunications.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png'}, year: 0});

    const options: req = {
        method: 'GET',
        url: 'https://imdb8.p.rapidapi.com/title/get-details',
        params: {tconst: props.route.params.itemID},
        headers: {
          'x-rapidapi-key': '41ba47cb85mshe7c30150d51d5eap114cf0jsnd71de1d6b8cf',
          'x-rapidapi-host': 'imdb8.p.rapidapi.com'
        }
      };



    const reqq = ()=>{
        axios.request(options).then(function (response) {
            setDetails(response.data);
            console.log(response.data);
        }).catch(function (error) {
            console.error(error);
        });
    }

    console.log(details.image.url)

    let st:string = details.image.url;
    let tT:string = (details.titleType == 'movie')? 'Movie': 'TV Show';

    return(
        <ScrollView>
            <View>
                <Text style = {styles.titleLook} onLayout={reqq}>{details.title} ({details.year})</Text>
                <Image source={{uri: st}} style={styles.imageStyle}></Image>
                <Text style = {styles.titleType}>{tT}</Text>
            </View>
        </ScrollView>
        

        
    );
}

const styles = StyleSheet.create({
    titleLook: {
        fontSize: 30,
        margin: 10,
        fontWeight: 'bold'
    },
    imageStyle: {
        width: Dimensions.get('window').width,
        height: 600
    },
    titleType: {
        margin: 10,
        fontSize: 20,
    }
});

export default TitleScreen;