const userReducer = (currentState, action) => {
    switch(action.type) {
        case ' SET_CURRENT-USER':
        return {
            ...currentState,
            currentUser: action.payload
        };
        default:
            return currentState;
    }
}; // => { currentUser: { ... } }