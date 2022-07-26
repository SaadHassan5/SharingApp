const initialState = {
    backgroundColor: 'red',
    Imgs: [],
    user: {},
    ln: 'gm',
};

export const reducer = (state = initialState, action: any) => {
    switch (action.type) {

        case 'CHANGE_BACKGROUND_COLOR':
            return {
                ...state,
                backgroundColor: action.payload
            }

        case 'Get_Imgs':
            return {
                ...state,
                Imgs: action.payload
            }

        case 'user':
            return {
                ...state,
                user: action.payload
            }

        case 'ln':
            return {
                ...state,
                ln: action.payload
            }
        // break;

        default:
            return state;
    }
}