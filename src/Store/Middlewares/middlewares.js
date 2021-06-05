import { ActionTypes } from '../Actions/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firebase from 'firebase';
import auth from '@react-native-firebase/auth';
let redirect = {}; // declare navigation object
let database = firebase.database().ref();
let haha = firebase.auth();

// asyncstorage function for saving logged in user info
async function storeData(data) {
    try {
        await AsyncStorage.setItem('store',
            JSON.stringify({
                'data': {
                    store: data, // seller details
                    isLoggedIn: true, // user logged in boolean
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
                    isLoggedIn: false

                }
            }
        })


    }
}

export function getCurrentUser() {
    return new Promise((reslove, reject) => {
        haha.onAuthStateChanged((user) => {
            if (user) {
                reslove(user);
            }
        });
    })
}
// navigation props save function
export function setNavigationProps(navigation) {
    return dispatch => {
        redirect = navigation; // save props to 'redirect' object to navigate between screens here
        dispatch({ type: ActionTypes.NAVIGATION_PROPS, payload: navigation }) // save props in reducers in order to access it from anywhere


    }
}

export function setUserData(user) {
    return dispatch => {
        console.log('user MIDDLWARE', user)

        dispatch({ type: ActionTypes.SIGN_IN_SUCCESS, payload: true })
        database.child(`users/${user?.uid}`).set(user).then(() => {
            dispatch(getCurrentUserData(user?.uid))
        })
        // redirect.navigate('home')

    }
}
export function getCurrentUserData(uid) {
    return dispatch => {
        database.child(`users/${uid}`).on('value', ev => {
            console.log('current user data', ev.val())
            dispatch({ type: ActionTypes.SIGN_IN_SUCCESS, payload: false })
            storeData(ev.val());
            redirect.navigate('home');
        })


    }
}
export function getAllUsers() {
    return dispatch => {
        dispatch({ type: ActionTypes.GET_ALL_USERS, payload: { users: {}, loading: true } })

        database.child(`users`).on('value', ev => {
            console.log('all users', ev.val())

            if (ev.val()) {
                dispatch({ type: ActionTypes.GET_ALL_USERS, payload: { users: Object.values(ev.val()), loading: false } })
            } else {
                dispatch({ type: ActionTypes.GET_ALL_USERS, payload: { users: {}, loading: false } })
            }

        })


    }
}

export function sendMessageToUser(selectedUser, currentUser, newMessage, time) {

    return dispatch => {
        const senderObject = {
            sender: currentUser.uid,
            message: newMessage,
            read: false,
            time: time
        }
        console.log('senderObject', senderObject)
        database.child(`msgs/${selectedUser.uid}/${currentUser.uid}/`).push(senderObject);
        database.child(`msgs/${currentUser.uid}/${selectedUser.uid}/`).push(senderObject);

    }
}

export function markMsgsToRead(selectedUser, currentUser, msgKey) {

    return dispatch => {
        // database.child(`msgs/${selectedUser.uid}/${currentUser.uid}/${msgKey}`).update({ read: true });
        database.child(`msgs/${currentUser.uid}/${selectedUser.uid}/${msgKey}`).update({ read: true });

    }
}

export function getMessages(currentUser) {
    return dispatch => {
        dispatch({ type: ActionTypes.GET_MESSAGES, payload: { messages: {}, loading: true } })

        database.child(`msgs/${currentUser.uid}`).on('value', ev => {
            console.log('middleware all msgs', ev.val())

            if (ev.val()) {
                dispatch({ type: ActionTypes.GET_MESSAGES, payload: { messages: ev.val(), loading: false } })
            } else {
                dispatch({ type: ActionTypes.GET_MESSAGES, payload: { messages: {}, loading: false } })
            }

        })


    }
}

export function logOut() {
    return dispatch => {
        auth().signOut().then(() => {
            AsyncStorage.clear().then(() => {
                dispatch(ResetStoredData())
                redirect.navigate('phoneAuth')
            })
        })
    }
}