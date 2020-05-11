import {ADD_TO_CART, REMOVE_FROM_CART} from '../actions/cart'
import {ADD_ORDER, addOrder} from '../actions/orders'
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
                cartItem = new CartItem(state.items[addedProduct.id].quantity + 1, 
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
        case(REMOVE_FROM_CART):
            const currentCart = state.items[actions.pid]
            if(currentCart.quantity > 1) {
                const updateCartItems = new CartItem(currentCart.quantity - 1,
                        currentCart.productPrice,
                        currentCart.productTitle,
                        currentCart.sum - currentCart.productPrice
                    )
                return {
                    ...state,
                    items: {
                        ...state.items,
                        [actions.pid]: updateCartItems
                    },
                    totalAmount : state.totalAmount - updateCartItems.productPrice
                }
            }
            else{
                const updateCartItems = {...state.items};
                const price           = updateCartItems[actions.pid].productPrice
                delete updateCartItems[actions.pid];
                return {
                    ...state,
                    items: updateCartItems,
                    totalAmount : state.totalAmount - price
                }
            }
        case(ADD_ORDER):
            return initialState;
        default:
            return state
    }
}