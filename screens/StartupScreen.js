import React, {useEffect} from 'react'
import {View, ActivityIndicator, StyleSheet, AsyncStorage} from 'react-native'
import Colors from '../constants/Colors';
import {useDispatch} from 'react-redux'
import * as authActions from '../store/actions/auth'

const StartupScreen = props => {
    const dispatch = useDispatch();
    useEffect(() => {
        const tryLogin = async () => {
            const userData = await AsyncStorage.getItem('userData');
            if (!userData) {
                props.navigation.navigate('Auth')
                return;
            }
            const transformedData = JSON.parse(userData);
            const {token, userId, expirationDate} = transformedData;
            const expiration = new Date(expirationDate);
            if (expiration <= new Date() || !token || !userId) {
                props.navigation.navigate('Auth')
                return;
            }
            const expirationTime = expiration.getTime() - new Date().getTime();
            props.navigation.navigate('Shop')
            dispatch(authActions.authenticate(userId, token, expirationTime))
        }

        tryLogin();
    }, [dispatch])
    return (
        <View style = {styles.screen}>
            <ActivityIndicator size = "large" color = {Colors.primary}/>
        </View>
    );
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default StartupScreen;