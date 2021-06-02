import { ActionTypes } from '../Actions/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
let redirect = {}; // declare navigation object

// asyncstorage function for saving logged in user info
async function storeData(data, admin) {
    try {
        await AsyncStorage.setItem('store',
            JSON.stringify({
                'data': {
                    store: data, // seller details
                    isLoggedIn: true, // user logged in boolean
                    isAdmin: admin // admin logged in boolean
                }
            })
        );
    } catch (error) {
        // Error saving data
        console.log('Cant store data in AsyncStorage: ', error)
    }
};

// get data from asyncstorage
export const RetrieveDataAssyncStorage = () => async dispatch => {
    const response = await AsyncStorage.getItem('store');
    if (response !== null) {

        setTimeout(() => {
            dispatch({ type: ActionTypes.GET_DATA_FROM_ASYNCSTORAGE, payload: JSON.parse(response) }) // pass data to reducer
        });

    }
}

// reset function of asyncstorage save data in reducer
export function ResetStoredData() {
    return dispatch => {

        dispatch({
            type: ActionTypes.GET_DATA_FROM_ASYNCSTORAGE, payload: {
                'data': {
                    store: {},
                    isLoggedIn: false,
                    isAdmin: false

                }
            }
        })


    }
}


// navigation props save function
export function setNavigationProps(navigation) {
    return dispatch => {
        redirect = navigation; // save props to 'redirect' object to navigate between screens here
        dispatch({ type: ActionTypes.NAVIGATION_PROPS, payload: navigation }) // save props in reducers in order to access it from anywhere


    }
}