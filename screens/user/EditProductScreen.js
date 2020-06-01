import React, {useEffect, useCallback, useReducer, useState} from 'react'
import {View, StyleSheet, ScrollView, Platform, Alert, KeyboardAvoidingView, ActivityIndicator, ColorPropType} from 'react-native'

import {HeaderButtons, Item} from 'react-navigation-header-buttons'
import CustomHeaderButton from '../../components/UI/HeaderButton'

import {useDispatch} from 'react-redux'
import * as productActions from '../../store/actions/products'

import Input from '../../components/UI/Input'
import Colors from '../../constants/Colors'

const REDUCER_UPDATE = "REDUCER_UPDATE"

const formReducer = (state, actions) => {
    switch(actions.type) {
        case (REDUCER_UPDATE):
            const updatedValues = {
                ...state.inputValue,
                [actions.input]: actions.value
            };
            const udpateValidities = {
                ...state.inputIdentifier,
                [actions.input]: actions.isValid
            }
            let updatedFormIsValid = true;
            for (const key in udpateValidities) {
                updatedFormIsValid = updatedFormIsValid && udpateValidities[key];
            }
            return {
                ...state, 
                inputValidities: udpateValidities,
                inputValue: updatedValues,
                formIsValid: updatedFormIsValid
            };
        default:
            return state;
    }
}

const EditProductScreen = props => {

    const product = props.navigation.getParam("product");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();
    const dispatch = useDispatch();

    const [formState, dispatchFormState] = useReducer(formReducer, 
        {
            inputValue: {
                title: product ? product.title : "",
                imageUrl: product ? product.imageUrl : "",
                description: product ? product.description : "",
                price: ""
            },
            inputValidities: {
                title: product ? true : false,
                imageUrl: product ? true : false,
                description: product ? true : false,
                price: product ? true : false
            },
            formIsValid: product ? true : false,
        })

    useEffect(() => {
        if (error) {
            Alert.alert("An error occured!", error, [{text: "Okay"}]);
        }
    }, [error])

    const submitHandler = useCallback(async () => {
        if(!formState.formIsValid) {
            Alert.alert("Wrong input!", "Please check the errors in the form.",[
                {
                    text: "Okay"
                }
            ])
            return;
        }
        setIsLoading(true);
        setError(null);
        try {
            if (product) {
                await dispatch(productActions.updateProduct(product.id, 
                                                      formState.inputValue.title, 
                                                      formState.inputValue.description, 
                                                      formState.inputValue.imageUrl))
            }
            else {
                await dispatch(productActions.createProduct(formState.inputValue.title, 
                                                      formState.inputValue.description, 
                                                      formState.inputValue.imageUrl,
                                                      +formState.inputValue.price))
            }
            props.navigation.goBack();
        } catch (error) {
            setError(error.message);
        }
        setIsLoading(false);
    }, [dispatch, formState])

    useEffect(() => {
        props.navigation.setParams({
            submit: submitHandler
        })
    }, [submitHandler])

    const inputChangedHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
            type    : REDUCER_UPDATE,
            value   : inputValue,
            isValid : inputValidity,
            input   : inputIdentifier
        })
    }, [dispatchFormState]);

    if (isLoading) {
        return (
            <View style = {styles.centered}>
                <ActivityIndicator size = "large" color = {Colors.primary}/>
            </View>
        );
    }

    return (
        <KeyboardAvoidingView   style = {{flex: 1}}
                                behavior = "padding" 
                                keyboardVerticalOffset = {100}>
            <ScrollView>
                <View style = {styles.form}>
                    <Input
                        id              = "title"
                        label           = "Title"
                        errorText       = "Please enter a valid title!"
                        keyboardType    = "default"
                        autoCapitalize  = "sentences"
                        autoCorrect
                        returnKeyType   = "next"
                        onInputChange   = {inputChangedHandler}
                        initialValue    = {product ? product.title : ""}
                        initialValid    = {!!product}
                        required>
                    </Input>

                    <Input
                        id              = "imageUrl"
                        label           = "Image Url"
                        errorText       = "Please enter a valid image url!"
                        keyboardType    = "default"
                        returnKeyType   = "next"
                        onInputChange   = {inputChangedHandler}
                        initialValue    = {product ? product.imageUrl : ""}
                        initialValid    = {!!product}
                        required>
                    </Input>

                    {product ? null : 
                        <Input
                            id              = "price"
                            label           = "Price"
                            errorText       = "Please enter a valid price!"
                            keyboardType    = "decimal-pad"
                            returnKeyType   = "next"
                            onInputChange   = {inputChangedHandler}
                            required
                            min = {0.1}>
                        </Input>
                    }

                    <Input
                        id              = "description"
                        label           = "Description"
                        errorText       = "Please enter a valid description!"
                        keyboardType    = "default"
                        autoCapitalize  = "sentences"
                        autoCorrect
                        multiline
                        numberOfLines   = {3}
                        onInputChange   = {inputChangedHandler}
                        initialValue    = {product ? product.description : ""}
                        initialValid    = {!!product}
                        required
                        minLength = {5}>
                    </Input>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>

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
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default EditProductScreen;
