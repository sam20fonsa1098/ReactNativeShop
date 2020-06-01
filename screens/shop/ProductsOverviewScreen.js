import React, {useEffect, useState, useCallback} from 'react'
import {FlatList, Platform, Button, ActivityIndicator, View, StyleSheet, Text} from 'react-native'
import {useSelector, useDispatch} from 'react-redux'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'

import ProductItem from '../../components/shop/ProductItem'
import * as cartActions from '../../store/actions/cart'
import * as productsActions from '../../store/actions/products'
import CustomHeaderButton from '../../components/UI/HeaderButton'

import Colors from '../../constants/Colors'
import products from '../../store/reducers/products'

const ProductsOverviewScreen = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [error, setError] = useState();
    const currentProducts = useSelector(state => state.products.availableProducts)
    const dispatch = useDispatch();

    const loadedProducts = useCallback(async () => {
        setError(null);
        setIsRefreshing(true);
        try {
            await dispatch(productsActions.fecthProducts()).then();
        } catch (error) {
            setError(error.message);
        }
        setIsRefreshing(false);
    }, [dispatch, setIsLoading, setError]);

    useEffect(() => {
        const willFocusSuc = props.navigation.addListener('willFocus', loadedProducts)
        return () => {
            willFocusSuc.remove();
        }
    }, [loadedProducts])

    useEffect(() => {
        setIsLoading(true);
        loadedProducts().then(() => {
            setIsLoading(false);
        });
    }, [dispatch, loadedProducts])

    const selectItemHandler = (product) => {
        props.navigation.navigate(
            'ProductsDetail',
            {product: product}
        )
    }
    if (error) {
        return (
            <View style = {styles.centered}>
                <Text>An error ocurred!</Text>
                <Button title = "Try Again" onPress = {loadedProducts} color = {Colors.primary}/>
            </View>
        );
    }

    else if (isLoading) {
        return (
            <View style = {styles.centered}>
                <ActivityIndicator size = "large" color = {Colors.primary}/>
            </View>
        );
    }
    else if (!isLoading && currentProducts.length === 0) {
        return (
            <View style = {styles.centered}>
                <Text>No products found. Maybe start adding some!</Text>
            </View>
        );
    }

    return (
        <FlatList 
            onRefresh    = {loadedProducts}
            refreshing   = {isRefreshing}
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

const styles = StyleSheet.create({
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default ProductsOverviewScreen;