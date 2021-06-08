import { ActionTypes } from '../Actions/actions';

const InitialState = {
    navigation_props: {},
    async_storage_data: {
        'data': {
            store: {},
            isLoggedIn: false
        }
    },
    signIn_success: false,

    users_list: {
        users: [],
        loading: false
    },
    all_msgs: {
        messages: {},
        loading: false
    },
    selected_user_all_msgs: {
        messages: {},
        loading: false
    },
    blocked_users: []
}

export default (state = InitialState, action) => {
    switch (action.type) {

        case ActionTypes.NAVIGATION_PROPS:
            return ({ ...state, navigation_props: action.payload }); // save navigation props in reducer state

        case ActionTypes.GET_DATA_FROM_ASYNCSTORAGE:
            return ({ ...state, async_storage_data: action.payload }); // save asyncstorage data in reducer state

        case ActionTypes.SIGN_IN_SUCCESS:
            return ({ ...state, signIn_success: action.payload });

        case ActionTypes.GET_ALL_USERS:
            return ({ ...state, users_list: action.payload });

        case ActionTypes.GET_MESSAGES:
            return ({ ...state, all_msgs: action.payload });

        case ActionTypes.GET_SELECTED_USER_MESSAGES:
            return ({ ...state, selected_user_all_msgs: action.payload });

        case ActionTypes.GET_BLOCKED_USERS:
            return ({ ...state, blocked_users: action.payload });


        default:
            return state;
    }
}