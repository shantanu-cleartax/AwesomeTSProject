import * as React from 'react';
import { Text, View, Button, FlatList, Touchable, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';
import axios from "axios";
import { TouchableOpacity } from 'react-native-gesture-handler';


interface req {
    method: "GET" | "get" | "delete" | "DELETE" | "head" | "HEAD" | "options" | "OPTIONS" | "post" | "POST" | "put" | "PUT" | "patch" | "PATCH" | "purge" | "PURGE" | "link" | "LINK" | "unlink" | "UNLINK" | undefined;
    url: string;
    params: {
        q: string;
    };
    headers: {
        'x-rapidapi-key': string;
        'x-rapidapi-host': string;
    };
}


const TitleSearchScreen = (props:any)=>{

    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = (query: React.SetStateAction<string>) => setSearchQuery(query);

    const options: req = {
        method: 'GET',
        url: 'https://imdb8.p.rapidapi.com/title/auto-complete',
        params: {q: searchQuery},
        headers: {
          'x-rapidapi-key': '41ba47cb85mshe7c30150d51d5eap114cf0jsnd71de1d6b8cf',
          'x-rapidapi-host': 'imdb8.p.rapidapi.com'
        }
      };

    const [name, setName] = React.useState<{l:string, id:string}[]>([]);

    React.useEffect(()=>{
        setName([]);
        reqq();
        console.log("Render");
    },[searchQuery]);

    const reqq = ()=>{
        if(options.params.q == ' '){
            return;
        }
        axios.request(options).then(function (response) {
            console.log(response.data.d[0]);
            setName(response.data.d);
        }).catch(function (error) {
            console.error(error);
        });
    }


    return (
        <View style={styles.autocompleteContainer}>
          <Searchbar style={styles.searchBar}
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
            onSubmitEditing={reqq}
            
          />
          {/* <AutoComplete style={{width: 300}}
            data={name}
            defaultValue={searchQuery}
            onChangeText={onChangeSearch}
            renderItem = {({ item }) => {
                <TouchableOpacity>
                    <Text>{item.l}</Text>
                </TouchableOpacity>;
            }}
          ></AutoComplete> */}
          {/* <Button title="Search" onPress={() =>{
            reqq();   
          } } /> */}
            <FlatList
                data={name}
                keyExtractor={(item, index) => item.l}
                renderItem = {({item})=>{
                    return (
                        <TouchableOpacity onPress={() => {
                            props.navigation.navigate('Title', {itemID: item.id})
                        }}>
                            <Text style={styles.flatlist} >{item.l}</Text>
                        </TouchableOpacity>
                    );
                }}
            >
            </FlatList>
        </View>
      );
}

const styles = StyleSheet.create({
    touchable: {
        margin: 10,
        padding: 10,
        fontSize: 20
    },
    searchBar:{
        margin: 15,
        padding: 3,
        fontSize: 20
    },
    autocompleteContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start'
    },
    flatlist: {
        fontSize: 18,
        borderColor: 'black',
        marginHorizontal: 70,
        padding: 5,
        marginTop: 0,
    }
});

export default TitleSearchScreen;