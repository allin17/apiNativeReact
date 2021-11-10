import React from 'react';
import {View, Image, Dimensions} from 'react-native'

const RenderDogImage = ({item}) => {
    const {width, height} = Dimensions.get('window');
  
    return (
        <View style={{margin: 10, textColor: 'red'}}>
          <Image
            source={{uri: item}}
            style={{
              width: width - 20,
              height: height * 0.3,
              resizeMode: 'contain',
            }}
          />
        </View>
      );
}

const MemoizedRenderDogImage = React.memo(RenderDogImage)

export default MemoizedRenderDogImage;