import { ActionTypes } from '../Actions/actions';

const InitialState = {
    navigation_props: {},
    async_storage_data: {
        'data': {
            store: {},
            isLoggedIn: false
        }
    }

}

export default (state = InitialState, action) => {
    switch (action.type) {
      
        case ActionTypes.NAVIGATION_PROPS:
            return ({ ...state, navigation_props: action.payload }); // save navigation props in reducer state

        case ActionTypes.GET_DATA_FROM_ASYNCSTORAGE:
            return ({ ...state, async_storage_data: action.payload }) // save asyncstorage data in reducer state

        default:
            return state;
    }
}