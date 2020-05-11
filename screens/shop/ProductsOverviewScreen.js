import React from 'react'
import {FlatList, Platform, Button} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'

import ProductItem from '../../components/shop/ProductItem'
import * as cartActions from '../../store/actions/cart'
import CustomHeaderButton from '../../components/UI/HeaderButton'

import Colors from '../../constants/Colors'

const ProductsOverviewScreen = (props) => {

    const currentProducts = useSelector(state => state.products.availableProducts)
    const dispatch = useDispatch();

    const selectItemHandler = (product) => {
        props.navigation.navigate(
            'ProductsDetail',
            {product: product}
        )
    }

    return (
        <FlatList 
            data         = {currentProducts}
            keyExtractor = {item => item.id}
            renderItem   = {itemData => <ProductItem 
                                            image        = {itemData.item.imageUrl} 
                                            title        = {itemData.item.title}
                                            price        = {itemData.item.price}
                                            onSelect = {() => selectItemHandler(itemData.item)}>
                                            <Button title = "View Details" onPress = {() => selectItemHandler(itemData.item)} color = {Colors.primary}/>
                                            <Button title = "To Cart"      onPress = {() => {
                                                dispatch(cartActions.addToCart(itemData.item))
                                            }}  color = {Colors.primary}/></ProductItem>}>
        </FlatList>
    );
}


ProductsOverviewScreen.navigationOptions = navData => {
    return {
    headerLeft: () =>
        <HeaderButtons HeaderButtonComponent = {CustomHeaderButton}>
            <Item 
                title = "Menu" 
                iconName = {Platform.OS === 'android' ? 'md-menu' : 'ios-menu'} 
                onPress = {() => {
                    navData.navigation.toggleDrawer();
                }}/>
        </HeaderButtons>,
    headerRight: () =>
        <HeaderButtons HeaderButtonComponent = {CustomHeaderButton}>
            <Item 
                title = "Cart" 
                iconName = {Platform.OS === 'android' ? 'md-cart' : 'ios-cart'} 
                onPress = {() => {
                    navData.navigation.navigate('Cart')
                }}/>
        </HeaderButtons>
    }
}

export default ProductsOverviewScreen;