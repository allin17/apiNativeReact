import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  FlatList,
  Text,
} from 'react-native';
import axios from 'axios';

const HomePage = ({navigation}) => {
  const [breeds, setBreeds] = useState({});

  axios.get('https://dog.ceo/api/breeds/list/all')
  .then(({data}) => {
      const breedsObject = data.message;
      const breedKeys = Object.keys(breedsObject)
      const assembledBreedsObject = {}
      breedKeys.map(key => {
          if(breedsObject[key].length > 0) {
              breedsObject[key].forEach(subBreed => {
                  assembledBreedsObject[key + '_' + subBreed] = key + '/' + subBreed
                })
          } else {
              assembledBreedsObject[key] = key
          }
      })
      setBreeds(assembledBreedsObject)
  })

  return (
    <SafeAreaView
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
          <View style={{
              flex: 4,
              flexDirection: 'row'
          }}>
              <FlatList
              keyExtractor={item => item}
              style={{
                  flex: 1,
              }}
              data={Object.keys(breeds)}
              renderItem={({item}) => {
                  return (
                      <TouchableOpacity
                      style={{
                          flex: 1,
                          padding: 10,
                      }}
                      onPress={() => {
                          navigation.navigate('DogPage', {breed: breeds[item]});
                      }}>
                          <Text style={{
                              fontSize: 24,
                          }}>{breeds[item]}</Text>
                          </TouchableOpacity>
                  )
              }}
              />
          </View>
    </SafeAreaView>
  );
};

HomePage.navigationOptions = {
    headerShown: false
}

export default HomePage;