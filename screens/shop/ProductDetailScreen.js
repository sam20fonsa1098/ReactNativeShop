import React from 'react'
import {View, Text, Image, Button, StyleSheet, ScrollView} from 'react-native'
import {useDispatch} from 'react-redux'

import Colors from '../../constants/Colors'
import * as actionsCart from '../../store/actions/cart'

const ProductDetailScreen = (props) => {
    
    const product  = props.navigation.getParam("product")
    const dispatch = useDispatch(); 

    return (
        <ScrollView>
            <Image  style = {styles.image} source = {{uri : product.imageUrl}}/>
            <View   style = {styles.actions}>
                <Button color = {Colors.primary}title = "Add to Cart" onPress = {() => {
                    dispatch(actionsCart.addToCart(product))
                }}/>
            </View>
            <Text   style = {styles.price}>${product.price.toFixed(2)}</Text>
            <Text   style = {styles.description}>{product.description}</Text>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    image: {
        width  : '100%',
        height : 300,
    },
    price: {
        fontSize       : 20,
        color          : '#888',
        textAlign      : 'center',
        marginVertical : 20,
        fontFamily     : 'open-sans-bold'
    },
    description: {
        fontSize         : 14,
        textAlign        : 'center',
        marginHorizontal : 10,
        fontFamily       : 'open-sans'
    },
    actions: { 
        marginVertical : 10,
        alignItems     : 'center'
    }
})

ProductDetailScreen.navigationOptions = navData => {
    const title = navData.navigation.getParam("product").title
    return {
        headerTitle: title
    }
}

export default ProductDetailScreen;