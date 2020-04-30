import PRODUCTS from '../../data/dummy-data'

const initialState = {
    availableProducts: PRODUCTS,
    userProducts     : PRODUCTS.filter(prod => prod.ownerId === 'u1')
}

const products = (state = initialState, actions) => {
    return state;
}

export default products;