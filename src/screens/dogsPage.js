import axios from 'axios';
import React, {useEffect, useState, useMemo} from 'react';
import {View, Image, FlatList, Dimensions} from 'react-native';
import PlainText from './components/PlainText';
import MemoizedRenderDogImage from './components/renderDogImage';

const DogPage = ({navigation,}) => {
  const [images, setImages] = useState([]);
  const [desc, setDesc] = useState();
  const {width, height} = Dimensions.get('window');


  useEffect(() => {
    const breed = navigation.getParam('breed')  

    axios.get(`https://dog.ceo/api/breed/${breed}/images`).then(({data}) => {
        setImages(data.message)
      })

    axios.get(`https://en.wikipedia.org/w/api.php?format=json&explaintext&prop=extracts&explaintext&exintro&action=query&list=search&srsearch=${breed}%20dog`)
      .then(({data}) => {
          setDesc(data.query.search[0].snippet)
      })
  }, []);

  return (
      <View style={{flex: 1}}>
    <View style={{flex: 1}}>
        <FlatList
        keyExtractor={(index) => {return 'image' + index}}
        snapToInterval={width}
        showsHorizontalScrollIndicator={true}
        horizontal={true}
        data={images}
        renderItem={({item}) => {
            return (
            <MemoizedRenderDogImage item={item} />
        )
        }}
        />
        <View style={{flex: 1,}}>
            <PlainText text={desc} />
        </View>
    </View>
    </View>
  );
};

DogPage.navigationOptions = ({navigation}) => ({
    title: navigation.getParam('breed')
})

export default DogPage;