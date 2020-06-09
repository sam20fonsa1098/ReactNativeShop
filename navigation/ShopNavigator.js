import React from 'react'
import {Platform, SafeAreaView, Button, View} from 'react-native'
import {useDispatch} from 'react-redux'

import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createDrawerNavigator, DrawerNavigatorItems} from 'react-navigation-drawer'
import {createStackNavigator} from 'react-navigation-stack'
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
import CartScreen from '../screens/shop/CartScreen'
import OrdersScreen from '../screens/shop/OrdersScreen'
import UserProductsScreen from '../screens/user/UserProductsScreen'
import EditProductsScreen from '../screens/user/EditProductScreen'
import AuthScreen from '../screens/user/AuthScreen'
import StartupScreen from '../screens/StartupScreen'

import {Ionicons} from '@expo/vector-icons'

import * as authActions from '../store/actions/auth'
import Colors from '../constants/Colors'

const defaultOptions = {
    headerStyle: {
        backgroundColor: Platform.OS === 'android' ? Colors.primary : ''
    },
    headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primary ,
    headerTitleStyle: {
        fontFamily : 'open-sans-bold'
    },
    headerBackTitleStyle: {
        fontFamily : 'open-sans'
    }
}

const ProductsNavigator = createStackNavigator({
    ProductsOverview: {
        screen: ProductsOverviewScreen,
        navigationOptions: {
            headerTitle: "All Products",
        }
    },
    ProductsDetail: {
        screen: ProductDetailScreen,
    },
    Cart: {
        screen: CartScreen,
        navigationOptions: {
            headerTitle: "Your Cart"
        }
    }

}, {
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons 
                                            name  = {Platform.OS === "android" ? 'md-cart' : 'ios-cart'}
                                            size  = {23}
                                            color = {drawerConfig.tintColor}/>
    },
    defaultNavigationOptions: defaultOptions
});

const OrdersNavigator = createStackNavigator({
    Orders: {
        screen: OrdersScreen,
        navigationOptions: {
            headerTitle: "Your Orders"
        }
    }
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons 
                                            name  = {Platform.OS === "android" ? 'md-list' : 'ios-list'}
                                            size  = {23}
                                            color = {drawerConfig.tintColor}/>
    },
    defaultNavigationOptions: defaultOptions
})

const AdminNavigator = createStackNavigator({
    UsersProducts: {
        screen: UserProductsScreen,
        navigationOptions: {
            ...defaultOptions,
            headerTitle: "Your Products"
        }
    },
    EditProducts: {
        screen: EditProductsScreen,
        navigationOptions: {
            ...defaultOptions,
            headerTitle: "Edit Products"
        }
    }
}, {
    navigationOptions: {
        drawerIcon: drawerConfig => <Ionicons 
                                            name  = {Platform.OS === "android" ? 'md-create' : 'ios-create'}
                                            size  = {23}
                                            color = {drawerConfig.tintColor}/>
    },
    defaultNavigationOptions: defaultOptions
})

const ShopNavigator = createDrawerNavigator({
    Products : ProductsNavigator,
    Orders   : OrdersNavigator,
    Admin    : AdminNavigator
}, {
    contentOptions: {
        activeTintColor: Colors.primary
    },
    contentComponent: props => {
        const dispatch = useDispatch()
        return (
            <View style = {{flex: 1, paddingTop: 20}}>
                <SafeAreaView forceInset = {{top: 'always', horizontal: 'never'}}>
                    <DrawerNavigatorItems {...props}/>
                    <Button title = "Logout" color = {Colors.primary} onPress = {() => {
                        dispatch(authActions.logout())
                    }}/>
                </SafeAreaView>
            </View>
        );
    }
})

const AuthNavigator = createStackNavigator({
    Auth: AuthScreen
}, { 
    defaultNavigationOptions: defaultOptions
})

const MainNavigator = createSwitchNavigator({
    Startup: StartupScreen,
    Auth: AuthNavigator,
    Shop: ShopNavigator
});

export default createAppContainer(MainNavigator);