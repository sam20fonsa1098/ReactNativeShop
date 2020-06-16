import React from 'react'
import {Platform, SafeAreaView, Button, View} from 'react-native'
import {useDispatch} from 'react-redux'
import {createStackNavigator} from '@react-navigation/stack'
import {createDrawerNavigator, DrawerItemList} from '@react-navigation/drawer'

import ProductsOverviewScreen, {screenOptions} from '../screens/shop/ProductsOverviewScreen'
import ProductDetailScreen, {screenOptions as screenOptionsDetails} from '../screens/shop/ProductDetailScreen'
import CartScreen, {screenOptions as screenOptionsCart} from '../screens/shop/CartScreen'
import OrdersScreen, {screenOptions as screenOptionsOrders} from '../screens/shop/OrdersScreen'
import UserProductsScreen, {screenOptions as screenOptionsUsers} from '../screens/user/UserProductsScreen'
import EditProductsScreen, {screenOptions as screenOptionsEdit} from '../screens/user/EditProductScreen'
import AuthScreen, {screenOptions as screenOptionsAuth} from '../screens/user/AuthScreen'

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

const ProductsStackNavigator = createStackNavigator()
const ProductsNavigator = () => {
    return (
        <ProductsStackNavigator.Navigator screenOptions = {defaultOptions}>
            <ProductsStackNavigator.Screen 
                name = "ProductsOverview" 
                component = {ProductsOverviewScreen}
                options = {screenOptions}/>
            <ProductsStackNavigator.Screen 
                name = "ProductsDetail" 
                component = {ProductDetailScreen}
                options = {screenOptionsDetails}/>
            <ProductsStackNavigator.Screen 
                name = "Cart" 
                component = {CartScreen}
                options = {screenOptionsCart}/>
        </ProductsStackNavigator.Navigator>
    );
}

// const ProductsNavigator = createStackNavigator({
//     ProductsOverview: {
//         screen: ProductsOverviewScreen,
//         navigationOptions: {
//             headerTitle: "All Products",
//         }
//     },
//     ProductsDetail: {
//         screen: ProductDetailScreen,
//     },
//     Cart: {
//         screen: CartScreen,
//         navigationOptions: {
//             headerTitle: "Your Cart"
//         }
//     }

// }, {
//     navigationOptions: {
//         drawerIcon: drawerConfig => <Ionicons 
//                                             name  = {Platform.OS === "android" ? 'md-cart' : 'ios-cart'}
//                                             size  = {23}
//                                             color = {drawerConfig.tintColor}/>
//     },
//     defaultNavigationOptions: defaultOptions
// });

const OrdersStackNavigator = createStackNavigator();

const OrdersNavigator = () => {
    return (
        <OrdersStackNavigator.Navigator screenOptions = {defaultOptions}>
            <OrdersStackNavigator.Screen 
                name = "Orders"
                component = {OrdersScreen}
                options = {screenOptionsOrders}/>
        </OrdersStackNavigator.Navigator>
    );
}

// const OrdersNavigator = createStackNavigator({
//     Orders: {
//         screen: OrdersScreen,
//         navigationOptions: {
//             headerTitle: "Your Orders"
//         }
//     }
// }, {
//     navigationOptions: {
//         drawerIcon: drawerConfig => <Ionicons 
//                                             name  = {Platform.OS === "android" ? 'md-list' : 'ios-list'}
//                                             size  = {23}
//                                             color = {drawerConfig.tintColor}/>
//     },
//     defaultNavigationOptions: defaultOptions
// })

const AdminStackNavigator = createStackNavigator();

const AdminNavigator = () => {
    return (
        <AdminStackNavigator.Navigator screenOptions = {defaultOptions}>
            <AdminStackNavigator.Screen 
                name = "UsersProducts"
                component = {UserProductsScreen}
                options = {screenOptionsUsers}/>
            <AdminStackNavigator.Screen 
                name = "EditProducts"
                component = {EditProductsScreen}
                options = {screenOptionsEdit}/>
        </AdminStackNavigator.Navigator>
    );
}

// const AdminNavigator = createStackNavigator({
//     UsersProducts: {
//         screen: UserProductsScreen,
//         navigationOptions: {
//             ...defaultOptions,
//             headerTitle: "Your Products"
//         }
//     },
//     EditProducts: {
//         screen: EditProductsScreen,
//         navigationOptions: {
//             ...defaultOptions,
//             headerTitle: "Edit Products"
//         }
//     }
// }, {
//     navigationOptions: {
//         drawerIcon: drawerConfig => <Ionicons 
//                                             name  = {Platform.OS === "android" ? 'md-create' : 'ios-create'}
//                                             size  = {23}
//                                             color = {drawerConfig.tintColor}/>
//     },
//     defaultNavigationOptions: defaultOptions
// })

const ShopDrawerNavigator = createDrawerNavigator();

export const ShopNavigator = () => {
    const dispatch = useDispatch()
    return (
        <ShopDrawerNavigator.Navigator
            drawerContent = {props => {
                return (
                    <View style = {{flex: 1, paddingTop: 20}}>
                        <SafeAreaView forceInset = {{top: 'always', horizontal: 'never'}}>
                            <DrawerItemList {...props}/>
                            <Button title = "Logout" color = {Colors.primary} onPress = {() => {
                                dispatch(authActions.logout())
                            }}/>
                        </SafeAreaView>
                    </View>
                );
            }}
            drawerContentOptions = {{
                activeTintColor: Colors.primary
            }}>
            <ShopDrawerNavigator.Screen
                name = "Products"
                component = {ProductsNavigator}
                options = {{
                    drawerIcon: props => <Ionicons 
                                                    name  = {Platform.OS === "android" ? 'md-cart' : 'ios-cart'}
                                                    size  = {23}
                                                    color = {props.color}/>
                }}/>
            <ShopDrawerNavigator.Screen
                name = "Orders"
                component = {OrdersNavigator}
                options = {{
                    drawerIcon: props => <Ionicons 
                                                    name  = {Platform.OS === "android" ? 'md-list' : 'ios-list'}
                                                    size  = {23}
                                                    color = {props.color}/>
                }}/>
            <ShopDrawerNavigator.Screen
                    name = "Admin"
                    component = {AdminNavigator}
                    options = {{
                        drawerIcon: props => <Ionicons 
                                                        name  = {Platform.OS === "android" ? 'md-create' : 'ios-create'}
                                                        size  = {23}
                                                        color = {props.color}/>
                    }}/>
        </ShopDrawerNavigator.Navigator>
    );
}

// const ShopNavigator = createDrawerNavigator({
//     Products : ProductsNavigator,
//     Orders   : OrdersNavigator,
//     Admin    : AdminNavigator
// }, {
//     contentOptions: {
//         activeTintColor: Colors.primary
//     },
//     contentComponent: props => {
//         const dispatch = useDispatch()
//         return (
//             <View style = {{flex: 1, paddingTop: 20}}>
//                 <SafeAreaView forceInset = {{top: 'always', horizontal: 'never'}}>
//                     <DrawerNavigatorItems {...props}/>
//                     <Button title = "Logout" color = {Colors.primary} onPress = {() => {
//                         dispatch(authActions.logout())
//                     }}/>
//                 </SafeAreaView>
//             </View>
//         );
//     }
// })

const AuthStackNavigator = createStackNavigator();

export const AuthNavigator = () => {
    return (
        <AuthStackNavigator.Navigator screenOptions = {defaultOptions}>
            <AuthStackNavigator.Screen 
                name = "Auth"
                component = {AuthScreen}
                options = {screenOptionsAuth}/>
        </AuthStackNavigator.Navigator>
    );
}

// const AuthNavigator = createStackNavigator({
//     Auth: AuthScreen
// }, { 
//     defaultNavigationOptions: defaultOptions
// })

// const MainNavigator = createSwitchNavigator({
//     Startup: StartupScreen,
//     Auth: AuthNavigator,
//     Shop: ShopNavigator
// });

// export default createAppContainer(MainNavigator);