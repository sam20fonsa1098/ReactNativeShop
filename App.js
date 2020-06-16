import React, {useState} from 'react';
import {createStore, combineReducers, applyMiddleware} from 'redux'
import ReduxThunk from 'redux-thunk'
import {Provider} from 'react-redux'
import {AppLoading} from 'expo'
import * as Font from 'expo-font'

import cartReducer from './store/reducers/cart'
import ordersReducer from './store/reducers/orders'
import productsReducer from './store/reducers/products'
import authReducer from './store/reducers/auth'
import AppNavigator from './navigation/AppNavigator';

const rootReducers = combineReducers({
  products: productsReducer,
  cart    : cartReducer,
  orders  : ordersReducer,
  auth    : authReducer
})

const store = createStore(rootReducers, applyMiddleware(ReduxThunk));

const fetchFonts = () => {
  return Font.loadAsync({
    'open-sans-bold' : require("./assets/fonts/OpenSans-Bold.ttf"),
    'open-sans'      : require("./assets/fonts/OpenSans-Regular.ttf")
  })
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false)

  if(!fontLoaded) {
    return <AppLoading startAsync = {fetchFonts} onFinish = {() => setFontLoaded(true)}></AppLoading>
  }

  return (
    <Provider store = {store}>
      <AppNavigator/>
    </Provider>
  );
}