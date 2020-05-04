import {createAppContainer} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen'
import ProductDetailScreen from '../screens/shop/ProductDetailScreen'
import CartScreen from '../screens/shop/CartScreen'
import {Platform} from 'react-native'

import Colors from '../constants/Colors'

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
            headerTitle: "Cart"
        }
    }

}, {
    defaultNavigationOptions: {
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
});

export default createAppContainer(ProductsNavigator);