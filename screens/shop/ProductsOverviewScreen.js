import React from 'react'
import {FlatList, Platform} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'

import ProductItem from '../../components/shop/ProductItem'
import * as cartActions from '../../store/actions/cart'
import CustomHeaderButton from '../../components/UI/HeaderButton'

const ProductsOverviewScreen = (props) => {

    const currentProducts = useSelector(state => state.products.availableProducts)
    const dispatch = useDispatch();

    return (
        <FlatList 
            data         = {currentProducts}
            keyExtractor = {item => item.id}
            renderItem   = {itemData => <ProductItem 
                                            image        = {itemData.item.imageUrl} 
                                            title        = {itemData.item.title}
                                            price        = {itemData.item.price}
                                            onViewDetail = {() => props.navigation.navigate(
                                                'ProductsDetail',
                                                {product: itemData.item}
                                            )}
                                            onAddToCart  = {() => {
                                                dispatch(cartActions.addToCart(itemData.item))
                                            }}/>}>
        </FlatList>
    );
}


ProductsOverviewScreen.navigationOptions = navData => {
    return {
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