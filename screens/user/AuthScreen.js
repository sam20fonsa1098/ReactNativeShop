import React, {useReducer, useCallback, useState, useEffect} from 'react'
import {ScrollView, Button, StyleSheet, KeyboardAvoidingView, View, ActivityIndicator, Alert} from 'react-native';
import {LinearGradient} from 'expo-linear-gradient'
import {useDispatch} from 'react-redux'

import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card'
import Colors from '../../constants/Colors';
import * as authActions from '../../store/actions/auth'

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

const AuthScreen = props => {
    const dispath = useDispatch();
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(false);
    const [isSignup, setIsSignup] = useState(false);
    const [formState, dispatchFormState] = useReducer(formReducer, 
        {
            inputValue: {
                email: '',
                password: ''
            },
            inputValidities: {
                email: false,
                password: false
            },
            formIsValid: false,
        })

    useEffect(() => {
        if (error) {
            Alert.alert('An Error Occured!', error, [{text: 'Okay'}])
        }
    }, [error])

    const signUpHandler = async () => {
        let action;
        if (isSignup) {
            action = authActions.signup(formState.inputValue.email, formState.inputValue.password)
        } else {
            action = authActions.login(formState.inputValue.email, formState.inputValue.password)
        }
        setError(null);
        setIsLoading(true);
        try {
            await dispath(action);
            props.navigation.navigate('Shop');
        } catch (err) {
            setError(err.message);
            setIsLoading(false);
        }
    }

    const inputChangedHandler = useCallback((inputIdentifier, inputValue, inputValidity) => {
        dispatchFormState({
            type    : REDUCER_UPDATE,
            value   : inputValue,
            isValid : inputValidity,
            input   : inputIdentifier
        })
    }, [dispatchFormState]);
    return (
        <KeyboardAvoidingView behavior = "height" keyboardVerticalOffset = {20} style = {styles.screen}>
            <LinearGradient colors = {['#ffedff', '#ffe3ff']} style = {styles.gradient}>
                <Card style = {styles.authContainer}>
                    <ScrollView>
                        <Input 
                            id = "email" 
                            label = "E-Mail" 
                            keyboardType = "email-address"
                            required
                            email
                            autoCapitalize = "none"
                            errorText = "Please enter a valid email address"
                            onInputChange = {inputChangedHandler}
                            initialValue = ""/>
                        <Input 
                            id = "password" 
                            label = "Password" 
                            keyboardType = "default"
                            secureTextEntry
                            required
                            minLength = {5}
                            autoCapitalize = "none"
                            errorText = "Please enter a valid password"
                            onInputChange = {inputChangedHandler}
                            initialValue = ""/>
                    </ScrollView>
                    <View style = {styles.buttonContainer}>
                        {isLoading ? <ActivityIndicator size = "small" color = {Colors.primary}/> : <Button title = {isSignup ? 'Sign Up' : 'Login'} color = {Colors.primary} onPress = {signUpHandler}/>}
                    </View>
                    <View style = {styles.buttonContainer}>
                        <Button title = {`Switch to ${!isSignup ? 'Sign Up' : 'Login'}`} color = {Colors.accent} onPress = {() => setIsSignup(prevState => !prevState)}/>
                    </View>
                </Card>
            </LinearGradient>
        </KeyboardAvoidingView>
    );
}

AuthScreen.navigationOptions = navData => {
    return {
        headerTitle: "Authenticate"
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    authContainer: {
        width: '80%',
        maxWidth: 400,
        maxHeight: 400,
        padding: 20
    },
    gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonContainer: {
        marginTop: 10,
    }
})

export default AuthScreen;