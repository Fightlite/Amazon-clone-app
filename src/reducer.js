
export const initialState = {
    cart: [],
    user: null,
};

export const getCartTotal = ( cart ) => {
    return cart?.reduce(( amount, item) => amount + item.price, 0);
}

const reducer = ( state, action ) => {

    switch(action.type) {
        case 'ADD_TO_CART':
            return {
                ...state,
                cart: [...state.cart, action.item],
            };

        case 'REMOVE_ITEM':
            return {
                ...state,
                cart: state.cart.filter(item => item.id !== action.id)
            };

        case 'SET_USER':
            return {
                ...state,
                user: action.user,
            };

        case 'EMPTY_CART':
            return {
                ...state,
                cart: []
            }

        default:
    }
};

export default reducer;