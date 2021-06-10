import React, { useEffect } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native';
import { logOut, getAllUsers, RetrieveDataAssyncStorage, getMessages, deleteCurrentUserMessagesNode, deleteCurrentUserInfo, deleteAccount } from '../../Store/Middlewares/middlewares';
const { height, fontScale } = Dimensions.get('window')
import { connect } from 'react-redux';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

// components
import Header from '../../components/header/index';
function Home(props) {
    const { navigation } = props;
    useEffect(() => {
        props.getAllUsersAction();
        props.RetrieveDataAssyncStorageAction();
        props.getMessagesAction(props.currentUser);
    }, [props.isLoading]);

    const signOut = () => {
        props.logOutAction();
    }
    const deleteUserAccount = () => {
        const getUsers = props.usersList.filter(item => {
            return item.uid !== props.currentUser?.uid
        });

        // getUsers.forEach(item => {
        //     props.deleteCurrentUserMessagesNodeAction(getUsers, props.currentUser)
        // });
        // props.deleteCurrentUserInfoAction(props.currentUser);
        props.deleteAccountAction(getUsers, props.currentUser);

    }
    const chatRoom = (selectedUser, currentUser) => {
        navigation.navigate('chatRoom', {
            currentUser: currentUser,
            selectedUser: selectedUser,

        })
    }
    const getLastMsg = (uid) => {
        let msgsArray = Object.values(props.messages[uid] || {});
        let lastIndex = msgsArray.length - 1;
        return msgsArray[lastIndex]?.message || "chat";
    }

    const getLastMsgTime = (uid) => {
        let msgsArray = Object.values(props.messages[uid] || {});
        let lastIndex = msgsArray.length - 1;
        return msgsArray[lastIndex]?.time || "";
    }
    const getSortedUsers = () => {
        let data = props.usersList;
        data = data.filter(item => item.uid !== props.selectedRoomUser.uid);
        if (props.selectedRoomUser?.fullName) {
            data.unshift(props.selectedRoomUser);
        }
        return data
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header signOutClick={signOut} deleteUserAccountClick={deleteUserAccount} />
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
            >

                <View>
                    {
                        props.isLoading === true ?
                            <ActivityIndicator size={100} color="#ec8652" />
                            :
                            getSortedUsers().map((item, index) => {
                                return (
                                    props.currentUser?.uid !== item.uid ?
                                        <TouchableOpacity style={styles.userRow} onPress={() => chatRoom(item, props.currentUser)} key={index}>
                                            <View style={styles.userFrame}>
                                                <EvilIcons name="user" size={60} color="black" />
                                            </View>

                                            <View style={{ width: '80%' }}>
                                                <Text style={styles.userName}>
                                                    {item.fullName}
                                                </Text>

                                                <View style={{ width: '80%' }}>
                                                    <Text style={styles.lastMsg} numberOfLines={1}>
                                                        {getLastMsg(item.uid)}
                                                    </Text>
                                                </View>
                                            </View>
                                            <Text style={styles.time}>{getLastMsgTime(item.uid)}</Text>
                                        </TouchableOpacity>
                                        :
                                        null

                                )
                            })
                    }

                </View>


            </ScrollView>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    userRow: {
        flexDirection: 'row',
        height: height / 10,
        alignItems: 'center',
        borderBottomColor: '#ec8652',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        position: 'relative',
    },
    userName: {
        fontSize: fontScale * 14,
        color: 'black',
        fontWeight: 'bold'
    },
    lastMsg: {
        fontSize: fontScale * 12,
        color: '#ec8652',

    },
    time: {
        color: 'red',
        position: 'absolute',
        top: 14,
        right: 10,
        color: '#ec8652',
        fontSize: fontScale * 12,

    }
});

function mapStateToProps(state) {
    return {
        usersList: state.root.users_list?.users,
        isLoading: state.root.users_list?.loading,
        currentUser: state.root.async_storage_data.data?.store,
        messages: state.root.all_msgs?.messages,
        selectedRoomUser: state.root.msg_sent
    }
}
function mapDispatchToProps(dispatch) {
    return ({
        logOutAction: () => { dispatch(logOut()) },
        getAllUsersAction: () => { dispatch(getAllUsers()) },
        RetrieveDataAssyncStorageAction: () => { dispatch(RetrieveDataAssyncStorage()) },
        getMessagesAction: (currentUser) => { dispatch(getMessages(currentUser)) },
        deleteCurrentUserMessagesNodeAction: (selectedUser, currentUser) => { dispatch(deleteCurrentUserMessagesNode(selectedUser, currentUser)) },
        deleteCurrentUserInfoAction: (currentUser) => { dispatch(deleteCurrentUserInfo(currentUser)) },
        deleteAccountAction: (getUsers, currentUser) => { dispatch(deleteAccount(getUsers, currentUser)) },




    })
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);