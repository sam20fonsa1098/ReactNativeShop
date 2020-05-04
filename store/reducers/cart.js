import {ADD_TO_CART} from '../actions/cart'
import CartItem from '../../models/cart-item'

const initialState = {
    items       : {},
    totalAmount : 0
}

export default (state = initialState, actions) => {
    switch(actions.type) {
        case (ADD_TO_CART):
            const addedProduct = actions.product
            const prodPrice    = addedProduct.price;
            const prodTitle    = addedProduct.title;
            let cartItem
            if(state.items[addedProduct.id]) {
                cartItem = new CartItem(state.items[addedProduct.id] + 1, 
                                        prodPrice, 
                                        prodTitle, 
                                        prodPrice + state.items[addedProduct.id].sum)
            }
            else{
                cartItem = new CartItem(1, prodPrice, prodTitle, prodPrice)
            }
            return {
                ...state,
                items: {
                    ...state.items,
                    [addedProduct.id]: cartItem
                },
                totalAmount : state.totalAmount + prodPrice
            }
        default:
            return state
    }
}