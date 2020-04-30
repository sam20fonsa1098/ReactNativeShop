import React from 'react'
import {FlatList, Text, StyleSheet, View} from 'react-native'
import {useSelector} from 'react-redux'

const ProductsOverviewScreen = (props) => {
    const currentProducts = useSelector(state => state.products.availableProducts)
    return (
        <FlatList 
            data         = {currentProducts}
            keyExtractor = {item => item.id}
            renderItem   = {itemData => <View style = {styles.screen}><Text style = {styles.text}>{itemData.item.title}</Text></View>}>
        </FlatList>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems    : 'center',
        justifyContent: 'center'
    },
    text: {
        fontSize: 22
    }
})

export default ProductsOverviewScreen;