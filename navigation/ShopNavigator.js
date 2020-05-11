import React from 'react'

import {createAppContainer} from 'react-navigation'
import {createDrawerNavigator} from 'react-navigation-drawer'
import {createStackNavigator} from 'react-navigation-stack'
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
import CartScreen from '../screens/shop/CartScreen'
import OrdersScreen from '../screens/shop/OrdersScreen'
import UserProductsScreen from '../screens/user/UserProductsScreen'
import {Platform} from 'react-native'
import {Ionicons} from '@expo/vector-icons'

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
    }
})

export default createAppContainer(ShopNavigator);