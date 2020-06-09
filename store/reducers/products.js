import PRODUCTS from '../../data/dummy-data'
import {DELETE_PRODUCT, CREATE_PRODUCT, UDPATE_PRODUCT, SET_PRODUCTS} from '../actions/products'
import Product from '../../models/product';

const initialState = {
    availableProducts: [],
    userProducts     : []
}

const products = (state = initialState, actions) => {
    switch(actions.type) {
        case SET_PRODUCTS:
            return {
                availableProducts: actions.products,
                userProducts: actions.userProducts
            };
        case DELETE_PRODUCT:
            return {
                ...state,
                userProducts: state.userProducts.filter(product => product.id !== actions.pid),
                availableProducts: state.availableProducts.filter(product => product.id !== actions.pid)
            };
        case CREATE_PRODUCT:
            const newProduct = new Product(actions.productData.id,
                                           actions.productData.ownerId,
                                           actions.productData.title,
                                           actions.productData.imageUrl,
                                           actions.productData.description,
                                           actions.productData.price);

            return {
                ...state,
                availableProducts: state.availableProducts.concat(newProduct),
                userProducts: state.userProducts.concat(newProduct)
            }
        case UDPATE_PRODUCT:
            const productIndex = state.userProducts.findIndex(prod => prod.id === actions.pid);
            const updateProduct = new Product(actions.pid,
                                              state.userProducts[productIndex].ownerId,
                                              actions.productData.title,
                                              actions.productData.imageUrl,
                                              actions.productData.description,
                                              state.userProducts[productIndex].price)
                            
            const updateUserProducts = [...state.userProducts];
            updateUserProducts[productIndex] = updateProduct;
            const updatedAvailableProductIndex = state.availableProducts.findIndex(prod => prod.id === actions.pid);
            const updatedAvailableProducts = [...state.availableProducts];
            updatedAvailableProducts[updatedAvailableProductIndex] = updateProduct;
            return {
                ...state,
                userProducts: updateUserProducts,
                availableProducts: updatedAvailableProducts
            }
        default:
            return state

    }
}

export default products;