import React from 'react'
import {FlatList, Button, Platform} from 'react-native'
import {useSelector} from 'react-redux'
import {HeaderButtons, Item} from 'react-navigation-header-buttons'

import ProductItem  from '../../components/shop/ProductItem'
import CustomHeaderButton from '../../components/UI/HeaderButton'

import Colors from '../../constants/Colors'

const UserProductsScreen = props => {

    const userProducts = useSelector(state => state.products.availableProducts)

    return (
        <FlatList data         = {userProducts}
                  keyExtractor = {item => item.id}
                  renderItem   = {itemData => <ProductItem image     = {itemData.item.imageUrl}
                                                            title    = {itemData.item.title}
                                                            price    = {itemData.item.price}
                                                            onSelect = {() => {}}>
                                                <Button title = "Edit"   onPress = {() => {}} color = {Colors.primary}/>
                                                <Button title = "Delete" onPress = {() => {}}  color = {Colors.primary}/>
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
            </HeaderButtons>
    }
}

export default UserProductsScreen;