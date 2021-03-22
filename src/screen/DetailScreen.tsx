import * as React from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import { Button } from 'react-native-paper';
import axios from "axios";
import { ScrollView } from 'react-native-gesture-handler';

interface get_top_rated_movies_interface {
    method: "GET" | "get" | "delete" | "DELETE" | "head" | "HEAD" | "options" | "OPTIONS" | "post" | "POST" | "put" | "PUT" | "patch" | "PATCH" | "purge" | "PURGE" | "link" | "LINK" | "unlink" | "UNLINK" | undefined;
    url: string;
    headers: {
        'x-rapidapi-key': string;
        'x-rapidapi-host': string;
    };
}

const DetailScreen = ({navigation}:any)=>{

    const get_top_rated_movies: get_top_rated_movies_interface = {
        method: 'GET',
        url: 'https://imdb8.p.rapidapi.com/title/get-top-rated-movies',
        headers: {
          'x-rapidapi-key': 'e57565f9a9msh087fb60aeef1c69p147406jsna214693281f9',
          'x-rapidapi-host': 'imdb8.p.rapidapi.com'
        }
      };
      
      const get_top_rated_movies_req = ()=>{
          axios.request(get_top_rated_movies).then(function (response) {
            // console.log(response.data);
              getTopMovies(response.data);
          }).catch(function (error) {
              console.error(error);
          });
      }

    React.useEffect(()=>{
        getTopMovies([{chartRating: '', id: ''}]);
        get_top_rated_movies_req();
        console.log("Render");
    },[]);

    const [topMovies, getTopMovies] = React.useState([{chartRating: '', id: ''}]);

    interface get_movies_images_interface {
        method: "GET" | "get" | "delete" | "DELETE" | "head" | "HEAD" | "options" | "OPTIONS" | "post" | "POST" | "put" | "PUT" | "patch" | "PATCH" | "purge" | "PURGE" | "link" | "LINK" | "unlink" | "UNLINK" | undefined;
        url: string;
        params : {
            tconst: string;
            limit: string;
        }
        headers: {
            'x-rapidapi-key': string;
            'x-rapidapi-host': string;
        };
    }
    
    let get_movie_images : get_movies_images_interface= {
        method: 'GET',
        url: 'https://imdb8.p.rapidapi.com/title/get-images',
        params: {tconst: 'asd', limit: '1'},
        headers: {
          'x-rapidapi-key': 'e57565f9a9msh087fb60aeef1c69p147406jsna214693281f9',
          'x-rapidapi-host': 'imdb8.p.rapidapi.com'
        }
      };

    const [movieImages, getMovieImages] = React.useState(['http://www.tiptoncommunications.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png']);
    const [sma, getSma] = React.useState('http://www.tiptoncommunications.com/components/com_easyblog/themes/wireframe/images/placeholder-image.png');
    const get_movie_images_req = ()=>{

        axios.request(get_movie_images).then(function (response) {
            // console.log(response.data);
            getSma(response.data.images[0].url);
            return response.data.images[0].url;
            
            // getMovieImages(movieImages => [...movieImages, response.data.images[0].url]);
        }).catch(function (error) {
            console.error(error);
            return error;
        });
        
    }
    // React.useEffect(()=>{
    //     getMovieImages(['']);
    //     get_movie_images_req();
    //     console.log("Render2");
    // },[]);


    

    return (
        <View style={styles.rootView}>
            <View style={styles.topView}>
                <Button mode="contained" onPress={() => navigation.navigate('Actors')} style={styles.button}>
                    <Text style ={styles.buttonText}>Actors</Text>
                </Button>
                <Button mode="contained" onPress={() => navigation.navigate('Titles')} style={styles.button}>
                    <Text style ={styles.buttonText}>Titles</Text>
                </Button>
                <Button mode="contained" onPress={() => navigation.navigate('ReactQuery')} style={styles.button}>
                    <Text style ={styles.buttonText}>ReactQuery</Text>
                </Button>
            </View>
            <View style={styles.topView_2}>
                <Text style={styles.topView_2_Text} onPress={()=>{
                        let x = topMovies[0].id;
                        x = x.substring(7);
                        x = x.substring(0,9);
                        get_movie_images.params.tconst = x;
                        get_movie_images_req();
                    }}>Top Rated Movies</Text>
                <View style={styles.topView_2_Scrollable}>
                    {/* <ScrollView horizontal={true}>
                        <FlatList
                            horizontal={true}
                            data={topMovies}
                            keyExtractor={(item:any) => item.id}
                            renderItem = {({item})=>{
                                let x = item.id;
                                x = x.substring(7);
                                x = x.substring(0,9);
                                get_movie_images.params.tconst = x;
                                const s = get_movie_images_req();
                                console.log(s);
                                return (
                                    
                                    <Image source={{uri: `${s}`}} style={{width: 80, height: 100, padding: 5, margin: 5}}></Image>
                                );
                            }}
                        >

                        </FlatList>
                    </ScrollView> */}
                    
                    <ScrollView horizontal={true}>
                        <Image source={{uri: `${sma}`}} style={{width: 80, height: 100, padding: 5, margin: 5}}></Image>
                        <Image source={{uri: `${sma}`}} style={{width: 80, height: 100, padding: 5, margin: 5}}></Image>
                        <Image source={{uri: `${sma}`}} style={{width: 80, height: 100, padding: 5, margin: 5}}></Image>
                        <Image source={{uri: `${sma}`}} style={{width: 80, height: 100, padding: 5, margin: 5}}></Image>
                        <Image source={{uri: `${sma}`}} style={{width: 80, height: 100, padding: 5, margin: 5}}></Image>
                        <Image source={{uri: `${sma}`}} style={{width: 80, height: 100, padding: 5, margin: 5}}></Image>
                    </ScrollView>
                    
                </View>
            </View>

        </View> 
      );
}

const styles = StyleSheet.create({
    rootView: {
        backgroundColor: '#222' ,
    },
    topView: { 
        alignItems: 'center', 
        justifyContent: 'space-evenly', 
        flexDirection: 'row',
    },
    topView_2: { 
        margin: 10,
        padding: 10,
    },
    topView_2_Text: {
        fontSize: 20,
        color: '#FFF'
    },
    topView_2_Scrollable: {
        borderColor: '#FFF',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        marginTop: 5,
    },
    detailsEach: {
        fontSize: 20,
        backgroundColor: '#ADD8E6',
        padding: 10,
        margin: 10,
    },
    button: {
        width: 150,
        margin: 10,
        padding: 2,
        backgroundColor:'#ADD8E6',
    },
    buttonText: {
        fontSize: 20,
        padding: 10,
        color: 'black',
    }
});


export default DetailScreen;