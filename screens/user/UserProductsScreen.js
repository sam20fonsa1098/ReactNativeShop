import React from 'react'
import {FlatList, Button, Platform, Alert} from 'react-native'
import {useSelector} from 'react-redux'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'

import ProductItem  from '../../components/shop/ProductItem'
import CustomHeaderButton from '../../components/UI/HeaderButton'

import Colors from '../../constants/Colors'
import { useDispatch } from 'react-redux'

import * as productsActions from '../../store/actions/products'

const UserProductsScreen = props => {

    const userProducts = useSelector(state => state.products.availableProducts)
    const dispatch = useDispatch();

    const editProductHandler = (product) => {
        props.navigation.navigate("EditProducts", {
            product: product
        })
    }

    const deleteHandler = (id) => {
        Alert.alert("Are you sure", "Do you want to delete this item?", [
            {
                text: "No", 
                style : "default"
            },
            {
                text: "Yes", 
                style: 'destructive',
                onPress: () => {
                    dispatch(productsActions.deleteProduct(id))
                }
            }
        ]);
    }

    return (
        <FlatList data         = {userProducts}
                  keyExtractor = {item => item.id}
                  renderItem   = {itemData => <ProductItem image     = {itemData.item.imageUrl}
                                                            title    = {itemData.item.title}
                                                            price    = {itemData.item.price}
                                                            onSelect = {() => {
                                                                editProductHandler(itemData.item)
                                                            }}>
                                                <Button title = "Edit"   onPress = {() => {
                                                    editProductHandler(itemData.item)
                                                }} color = {Colors.primary}/>
                                                <Button title = "Delete" onPress = {deleteHandler.bind(this, itemData.item.id)}  color = {Colors.primary}/>
                                              </ProductItem>}/>
    );
}

UserProductsScreen.navigationOptions = navData => {
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
                title = "Add" 
                iconName = {Platform.OS === 'android' ? 'md-create' : 'ios-create'} 
                onPress = {() => {
                    navData.navigation.navigate("EditProducts");
                }}/>
        </HeaderButtons>,
    }
}

export default UserProductsScreen;