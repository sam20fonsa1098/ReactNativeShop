import React, {useState} from 'react';
import {createStore, combineReducers} from 'redux'
import {Provider} from 'react-redux'
import {AppLoading} from 'expo'
import * as Font from 'expo-font'
import {composeWithDevTools} from 'redux-devtools-extension'

import ShopNavigator from './navigation/ShopNavigator'
import cartReducer from './store/reducers/cart'
import ordersReducer from './store/reducers/orders'
import productsReducer from './store/reducers/products'


const rootReducers = combineReducers({
  products: productsReducer,
  cart    : cartReducer,
  orders  : ordersReducer
})

const store = createStore(rootReducers, composeWithDevTools());

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
      <ShopNavigator></ShopNavigator>
    </Provider>
  );
}