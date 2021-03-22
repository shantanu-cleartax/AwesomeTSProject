import {
    useQuery,
    useMutation,
    useQueryClient,
    QueryClient,
    QueryClientProvider,
  } from 'react-query';

import * as React from 'react';
import { Text, View, Button, FlatList, Touchable, StyleSheet} from 'react-native';
import { Searchbar } from 'react-native-paper';
import axios from "axios";
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';

const queryClient = new QueryClient()

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

const Example = ()=>{

    const options:req = {
        method: 'GET',
        url: 'https://imdb8.p.rapidapi.com/auto-complete',
        params: {q: 'game of thr'},
        headers: {
          'x-rapidapi-key': '4dfc4967f2msh228d586fed88c82p155ec6jsn6805b3f33b26',
          'x-rapidapi-host': 'imdb8.p.rapidapi.com'
        }
    };

    const [details, getDetails] = React.useState<{l:string, id:string}[]>([]);


    const { isLoading, error, data } = useQuery('repoData', () =>
    fetch("https://imdb8.p.rapidapi.com/auto-complete?q=game%20of%20thr", {
        "method": "GET",
        "headers": {
            "x-rapidapi-key": "4dfc4967f2msh228d586fed88c82p155ec6jsn6805b3f33b26",
            "x-rapidapi-host": "imdb8.p.rapidapi.com"
        }
    }
      ).then((res) => res.json())
    )

   if(isLoading) return(
       <Text>Loading...</Text>
   );
   if(error) return(
       <Text>An error has occurred: {error}</Text>
   );
   storeData(data);
   return(
       <Text>Hello!</Text>
   );
   
}


const Example2 = ()=>{
    const s: any = getData();

    console.log(s);
    return(
        <Text>Hllo</Text>
    )

}

const storeData = async (value:any) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('@storage_Key', jsonValue)
    } catch (e) {
      // saving error
    }
}

const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@storage_Key')
      if(jsonValue!=null) console.log(JSON.parse(jsonValue).d[0].l);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch(e) {
      // error reading value
    }
  }


const ReactQueryScreen = ()=>{

    
    return (
        <View>
            <Text>React Query Screen</Text>
            <QueryClientProvider client={queryClient}>
                <Example />
                <Example2 />
            </QueryClientProvider>
        </View>
        
    );
}

export default ReactQueryScreen;