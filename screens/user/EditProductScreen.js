import React, {useState, useEffect, useCallback} from 'react'
import {View, Text, StyleSheet, TextInput, ScrollView, Platform} from 'react-native'

import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/HeaderButton'

import {useDispatch} from 'react-redux'
import * as productActions from '../../store/actions/products'

const EditProductScreen = props => {

    const product = props.navigation.getParam("product");

    const [title, setTitle] = useState(product ? product.title : "");
    const [imageUrl, setImageUrl] = useState(product ? product.imageUrl : "");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState(product ? product.description : "");

    const dispatch = useDispatch();

    const submitHandler = useCallback(() => {
        if (product) {
            dispatch(productActions.updateProduct(product.id, title, description, imageUrl))
        }
        else {
            dispatch(productActions.createProduct(title, description, imageUrl, +price))
        }
        props.navigation.goBack();
    }, [dispatch, title, description, imageUrl, price, product])

    useEffect(() => {
        props.navigation.setParams({
            submit: submitHandler
        })
    }, [submitHandler])

    return (
        <ScrollView>
            <View style = {styles.form}>
                <View style = {styles.formControl}>
                    <Text style = {styles.label}>Title</Text>
                    <TextInput style = {styles.input} value = {title} onChangeText = {text => setTitle(text)}/>
                </View>

                <View style = {styles.formControl}>
                    <Text style = {styles.label}>Image Url</Text>
                    <TextInput style = {styles.input} value = {imageUrl} onChangeText = {text => setImageUrl(text)}/>
                </View>

                {product ? null : <View style = {styles.formControl}>
                    <Text style = {styles.label}>Price</Text>
                    <TextInput style = {styles.input} value = {price} onChangeText = {text => setPrice(text)}/>
                </View>}

                <View style = {styles.formControl}>
                    <Text style = {styles.label}>Description</Text>
                    <TextInput style = {styles.input} value = {description} onChangeText = {text => setDescription(text)}/>
                </View>
            </View>
        </ScrollView>
    );
}

EditProductScreen.navigationOptions = navData => {
    const submitFunction = navData.navigation.getParam("submit");
    return {
        headerTitle: navData.navigation.getParam("product") ? "Edit Product" : "Add Product",
        headerRight: () =>
        <HeaderButtons HeaderButtonComponent = {CustomHeaderButton}>
            <Item 
                title = "Save" 
                iconName = {Platform.OS === 'android' ? 'md-checkmark' : 'ios-checkmark'} 
                onPress = {submitFunction}/>
        </HeaderButtons>,
    }
}

const styles = StyleSheet.create({
    form: {
        margin : 20
    },
    formControl : {
        width   : '100%'
    },
    label: {
        fontFamily     : 'open-sans-bold',
        marginVertical : 8
    },
    input: {
        paddingHorizontal : 2,
        paddingVertical   : 5,
        borderBottomColor : '#ccc',
        borderBottomWidth : 1
    }
})

export default EditProductScreen;
