import React, { useState, useEffect } from "react";
import { View, Text, Image} from 'react-native';
import 'react-native-gesture-handler';
//import navigators
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { Icon } from 'native-base';
//icons and fonts
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Ionicons } from "@expo/vector-icons";
import * as Font from 'expo-font';
//import de telas 
import HomeScreen from "../screens/Home";
import Loading from "../screens/Loading";
import ExplorerScreen from "../screens/Explorer";
import ProductDetails from "../screens/ProductDetails";
import CartScreen from "../screens/Cart";
import LoginScreen from "../screens/Login";
import SignUpScreen from "../screens/Signup";
import Profile from "../screens/Profile";
import Contact from "../screens/Contact";

import Badge from '../components/Badge';
//import styles
import { colors } from '../styles';

//instancing navigators
const AppTabs = createMaterialBottomTabNavigator();
const RootStack = createStackNavigator();
const HomeStack = createStackNavigator();
const Stack = createStackNavigator();

//stack navigator Home
const HomeStackScreen = () => (
  <HomeStack.Navigator
    screenOptions={{
      headerShown: true,
      animationEnabled: false
    }}>
    <HomeStack.Screen
      name="Kopenhagen"
      component={HomeScreen}

      options={{
        headerTitleAlign: "center",
        headerTintColor: colors.yellow,
        headerStyle: {
          backgroundColor: colors.black
        },
        headerTitle: () => (
          <Image
          style={{width: 120, height: '100%'}}
          source={require('../assets/kopenhagen.png')}
          />
      ),
      }}

    />

    <HomeStack.Screen
      name="Catálogo"
      component={ExplorerScreen}

      options={{
        headerTitle: 'Produtos',
        headerTitleAlign: "center",
        headerTintColor: colors.yellow,
        headerStyle: {
          backgroundColor: colors.black
        },


      }}

    />

    <HomeStack.Screen
      name="Detalhes"
      component={ProductDetails}

      options={{
        headerTitle: 'Detalhes',
        headerTitleAlign: "center",
        headerTintColor: colors.yellow,
        headerStyle: {
          backgroundColor: colors.black
        },

      }}

    />

  </HomeStack.Navigator>
);

//Tab Navigator

const AppTabsScreen = () => (

  <AppTabs.Navigator
    initialRouteName="Home"
    activeColor={colors.black}
    inactiveColor={colors.gray_black}
    barStyle={{ backgroundColor: colors.white }}>

    <AppTabs.Screen
      name="Tab1"
      component={HomeStackScreen}
      options={{
        tabBarLabel: 'Início',
        tabBarIcon: ({ color }) => (
          <Icon name="home-outline" type='Ionicons' style={{ color: color, fontSize: 26}} />
        ),
      }}
    />
    <AppTabs.Screen
      name="Cart"
      component={CartScreen}
      options={{
        tabBarLabel: 'Carrinho',
        tabBarIcon: ({ color }) => (
          <View>
            <Icon name="cart-outline" type='Ionicons' style={{ color: color, fontSize: 26}} />
            <Badge />
          </View>
        ),
      }}
    />
    <AppTabs.Screen
      name="Profile"
      component={StackScreen}
      options={{
        tabBarLabel: 'Perfil',
        tabBarIcon: ({ color }) => (
          <Icon name="person-circle-outline" type='Ionicons' style={{ color: color, fontSize: 26}} />
        ),
      }}
    />
    <AppTabs.Screen
      name="Contact"
      component={Contact}
      options={{
        tabBarLabel: 'Contato',
        tabBarIcon: ({ color }) => (
          <View>
            <Icon name="call-outline" type='Ionicons' style={{ color: color, fontSize: 26}} />
          </View>
        ),
      }}
    />

  </AppTabs.Navigator>
);

//Telas de autenticação e login

const StackScreen = () => (
  <Stack.Navigator
    screenOptions={{
      headerShown: false
    }}>
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="Login" component={LoginScreen} />
    <Stack.Screen name="SignUp" component={SignUpScreen} />
  </Stack.Navigator>
);

//Root Navigator
const RootStackScreen = () => {

  const [isLoading, setIsLoading] = useState(true);
  const [fontsLoaded, setfontsLoaded] = useState(false);

  const loadFonts = async () => {

    await Font.loadAsync({
      Roboto: require('native-base/Fonts/Roboto.ttf'),
      Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
      SFProDisplay_bold: require("../styles/fonts/SFProDisplay_Bold.ttf"),
      SFProDisplay_regular: require("../styles/fonts/SFProDisplay_Regular.ttf"),
      ...Ionicons.font,
      ...MaterialCommunityIcons.font,
    }).then(() => {
      setfontsLoaded(true);
    });

  }

  useEffect(() => {
    if (!fontsLoaded) {
      loadFonts();
    }

    setTimeout(() => {
      setIsLoading(!isLoading);
    }, 3000);

  }, []);

  return (
    <RootStack.Navigator
      headerMode="none"
      screenOptions={{
        animationEnabled: true
      }}
    >
      {isLoading ? (
        <RootStack.Screen name="Loading" component={Loading} />
      ) : (
          <RootStack.Screen name="AppTabsScreen" component={AppTabsScreen} />
        )}

    </RootStack.Navigator>
  );
};


export default () => {

  return (
    <NavigationContainer >
      <RootStackScreen />
    </NavigationContainer>
  );
};

