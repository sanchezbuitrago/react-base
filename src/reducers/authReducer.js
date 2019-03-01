const INIT_STATE = {
    auth : "",
    initURL: "/"
};


export default (state = INIT_STATE, action) => {
    switch (action.type) {
        case "init_url": {
            return {
                ...state,
                initURL: action.payload
            }
        }
        default:
            return state;
    }
}
