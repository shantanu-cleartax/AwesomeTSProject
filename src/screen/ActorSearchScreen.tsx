import * as React from 'react';
import { Text, View, Button } from 'react-native';
import { Searchbar } from 'react-native-paper';

const ActorSearchScreen = ({navigation}:any)=>{

    const [searchQuery, setSearchQuery] = React.useState('');

    const onChangeSearch = (query: React.SetStateAction<string>) => setSearchQuery(query);

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Actor Search</Text> 
          <Searchbar
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
          />
          <Button title="Go Back" onPress={() => navigation.goBack()} />
          <Button
            title="Go back to first screen in stack"
            onPress={() => navigation.popToTop()}
          />
        </View>
      );
}

export default ActorSearchScreen;