import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import HomePage from './src/screens/homePage';
import DogPage from './src/screens/dogsPage';

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomePage,
  },
  DogPage: {
    screen: DogPage,
  },
});

export default createAppContainer(AppNavigator);