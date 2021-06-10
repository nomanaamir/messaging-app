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
        dispatch({ type: ActionTypes.LATEST_MSG_SENT, payload: selectedUser });
        database.child(`msgs/${selectedUser.uid}/${currentUser.uid}/`).push(senderObject);
        database.child(`msgs/${currentUser.uid}/${selectedUser.uid}/`).push(senderObject);

    }
}

export function markMsgsToRead(selectedUser, currentUser, msgKey) {

    return dispatch => {
        database.child(`msgs/${selectedUser.uid}/${currentUser.uid}/${msgKey}`).update({ read: true });

    }
}

export function getMessages(currentUser) {
    return dispatch => {
        dispatch({ type: ActionTypes.GET_MESSAGES, payload: { messages: {}, loading: true } })

        database.child(`msgs/${currentUser.uid}`).on('value', ev => {

            if (ev.val()) {
                dispatch({ type: ActionTypes.GET_MESSAGES, payload: { messages: ev.val(), loading: false } })
            } else {
                dispatch({ type: ActionTypes.GET_MESSAGES, payload: { messages: {}, loading: false } })
            }

        })


    }
}

export function getSelectedUserMessages(selectedUser) {
    return dispatch => {
        dispatch({ type: ActionTypes.GET_SELECTED_USER_MESSAGES, payload: { messages: {}, loading: true } })

        database.child(`msgs/${selectedUser.uid}`).on('value', ev => {

            if (ev.val()) {
                dispatch({ type: ActionTypes.GET_SELECTED_USER_MESSAGES, payload: { messages: ev.val(), loading: false } })
            } else {
                dispatch({ type: ActionTypes.GET_SELECTED_USER_MESSAGES, payload: { messages: {}, loading: false } })
            }

        })


    }
}

export function blockUser(selectedUser, currentUser) {

    return dispatch => {
        const blockedUser = { blockBy: currentUser.fullName, blockByUID: currentUser.uid, blockedUser: selectedUser.uid }

        database.child(`blockedUsers/${selectedUser.uid}/${currentUser.uid}/`).set(blockedUser);
        database.child(`blockedUsers/${currentUser.uid}/${selectedUser.uid}/`).set(blockedUser);

    }
}

export function unBlockUser(selectedUser, currentUser) {

    return dispatch => {

        database.child(`blockedUsers/${selectedUser.uid}/${currentUser.uid}/`).remove();
        database.child(`blockedUsers/${currentUser.uid}/${selectedUser.uid}/`).remove();

    }
}

export function deleteMessage(selectedUser, currentUser, selectedUserMsgKey, currentUserMsgKey) {

    return dispatch => {

        database.child(`msgs/${selectedUser.uid}/${currentUser.uid}/${selectedUserMsgKey}`).remove();
        database.child(`msgs/${currentUser.uid}/${selectedUser.uid}/${currentUserMsgKey}`).remove();

    }
}


export function getBlockedUsers(currentUser) {

    return dispatch => {

        database.child(`blockedUsers/${currentUser.uid}`).on('value', ev => {

            if (ev.val()) {
                dispatch({ type: ActionTypes.GET_BLOCKED_USERS, payload: Object.values(ev.val()) })
            } else {
                dispatch({ type: ActionTypes.GET_BLOCKED_USERS, payload: [] })
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


export function deleteAccount(getUsers, currentUser) {

    return dispatch => {
        var user = auth().currentUser;
        user.delete().then(function () {
            getUsers.forEach(item => {
                dispatch(deleteCurrentUserMessagesNode(item, currentUser));
            });
            dispatch(deleteCurrentUserInfo(currentUser));
            AsyncStorage.clear().then(() => {
                dispatch(ResetStoredData())
                alert('Account Deleted!')
                redirect.navigate('phoneAuth')
            })

            // User deleted.
        }).catch(function (error) {
            alert(error)
        });

    }
}

export function deleteCurrentUserInfo(currentUser) {
    return dispatch => {

        database.child(`users/${currentUser?.uid}`).remove()

    }
}

export function deleteCurrentUserMessagesNode(selectedUser, currentUser) {

    return dispatch => {

        database.child(`msgs/${selectedUser.uid}/${currentUser.uid}/`).remove();
        database.child(`msgs/${currentUser.uid}/${selectedUser.uid}/`).remove();

    }
}