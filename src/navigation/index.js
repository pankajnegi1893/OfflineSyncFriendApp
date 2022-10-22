import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import React, {memo} from 'react';
import {StyleSheet} from 'react-native';
import Friends from '../screen/Friends';
import Home from '../screen/Home';
import Settings from '../screen/Settings';
import * as NavigationConst from './navigationConst';
import {defaultTheme} from '../helpers/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FriendDetail from '../screen/FriendDetail';
import AddEditFriend from '../screen/AddEditFriend';
import {createNavigationContainerRef} from '@react-navigation/native';
export const navigationRef = createNavigationContainerRef();

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export const TAB_ICONS = Object.freeze([
  'home-outline',
  'person-outline',
  'settings-outline',
]);

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === NavigationConst.HOME) {
            iconName = TAB_ICONS[0];
          } else if (route.name === NavigationConst.FRIENDS) {
            iconName = TAB_ICONS[1];
          } else {
            iconName = TAB_ICONS[2];
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: defaultTheme.primary,
        tabBarInactiveTintColor: defaultTheme.text54,
        headerShown: false,
      })}
      initialRouteName={NavigationConst.HOME}>
      <Tab.Screen name={NavigationConst.HOME} component={Home} />
      <Tab.Screen name={NavigationConst.FRIENDS} component={Friends} />
      <Tab.Screen name={NavigationConst.SETTINGS} component={Settings} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {},
});

const RootNavigation = memo(props => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTransparent: true,
        title: '',
        // headerShown: false,
      }}>
      <Stack.Screen name={NavigationConst.HOME_TABS} component={TabNavigator} />
      <Stack.Screen
        name={NavigationConst.FRIEND_DETAIL}
        component={FriendDetail}
      />
      <Stack.Screen
        name={NavigationConst.ADD_FRIEND}
        component={AddEditFriend}
      />
    </Stack.Navigator>
  );
});

export default RootNavigation;
