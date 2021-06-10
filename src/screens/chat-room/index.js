import React, { useEffect, useState, useRef } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
    TextInput,
    Modal,
    Pressable,
} from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
const { height, fontScale, width } = Dimensions.get('window')
import { connect } from 'react-redux';
import { sendMessageToUser, getMessages, markMsgsToRead, getSelectedUserMessages, blockUser, getBlockedUsers, unBlockUser, deleteMessage } from '../../Store/Middlewares/middlewares';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import EvilIcons from 'react-native-vector-icons/EvilIcons';




function ChatRoom(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [forwardModal, setForwardModal] = useState(false);

    const [msgAction, setMsgAction] = useState(false);

    const [typeMsg, setTypeMsg] = useState('');
    const [userMsgs, setUserMsgs] = useState([]);
    const [selectedUserMsgs, setSelectedUserMsgs] = useState([]);
    const [currentUserMsg, setCurrentUserMsg] = useState({});
    const [selectedUserMsg, setSelectedUserMsg] = useState({});
    const [forwardUser, setForwardUser] = useState({});


    const [isCopy, setIsCopy] = useState(false);





    const { navigation, route } = props;
    const { currentUser, selectedUser } = route.params;

    const scrollViewRef = useRef();
    useEffect(() => {
        props.getMessagesAction(currentUser);
        props.getBlockedUsersAction(currentUser)

    }, [props.isLoading]);
    useEffect(() => {

        props.getSelectedUserMessagesAction(selectedUser);

    }, [props.selectedUserMessagesLoading]);

    useEffect(() => {

        let obj = {};
        let msgsArray = []
        for (let key in props.messages[selectedUser.uid]) {
            if (props.messages[selectedUser.uid].hasOwnProperty(key)) {
                obj = Object.assign({}, props.messages[selectedUser.uid][key], { msgKey: key })
                msgsArray.push(obj)
            }
        }
        setUserMsgs(msgsArray)
    }, [props.messages]);

    useEffect(() => {
        let obj = {};
        let msgsArray = []
        for (let key in props.selectedUserMessages[currentUser.uid]) {
            if (props.selectedUserMessages[currentUser.uid].hasOwnProperty(key)) {
                obj = Object.assign({}, props.selectedUserMessages[currentUser.uid][key], { msgKey: key })
                msgsArray.push(obj)
            }
        }
        setSelectedUserMsgs(msgsArray)
        markMsgsRead()
    }, [props.selectedUserMessages]);
    const copyToClipboard = () => {
        Clipboard.setString(currentUserMsg.message);
        setMsgAction(false)
        setIsCopy(true);
        setTimeout(() => {
            setIsCopy(false);

        }, 800);
    };
    const formatAMPM = (date) => {
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    }
    const sendMsg = () => {
        props.sendMessageToUserAction(selectedUser, currentUser, typeMsg, formatAMPM(new Date))
        setTypeMsg('')
    }
    const deleteMsg = () => {
        props.deleteMessageAction(selectedUser, currentUser, selectedUserMsg.msgKey, currentUserMsg.msgKey)
        setMsgAction(false)
    }
    const getMsgs = (item, index) => {
        if (item.sender === currentUser?.uid) {
            return <TouchableOpacity style={[styles.msg, styles.sender]} onPress={() => { setMsgAction(!msgAction); setSelectedUserMsg(selectedUserMsgs[index]); setCurrentUserMsg(item) }} key={index}>

                <Text style={[styles.msgText, styles.senderMsgText]}>
                    {item.message}
                </Text>
                <View style={{
                    position: 'absolute',
                    bottom: 0,
                    right: 6,
                    flexDirection: 'row',
                    alignItems: 'center'
                }}>
                    <Text style={[styles.msgTime, styles.senderMsgTime]}>{item.time}</Text>
                    {
                        item.read === true ?
                            <Ionicons style={{ marginLeft: 3 }} name="checkmark-done" size={18} color="#32CD32" />
                            :
                            <Ionicons style={{ marginLeft: 3 }} name="checkmark-done" size={18} color="white" />

                    }
                </View>

            </TouchableOpacity>
        } else {
            return <View style={[styles.msg, styles.reciever]} key={index}>
                <Text style={styles.msgText}>
                    {item.message}
                </Text>
                <Text style={[styles.msgTime, styles.msgTimeAlign]}>{item.time}</Text>
            </View>
        }



    }
    const markMsgsRead = () => {
        const getSelectedUsersMsgs = selectedUserMsgs.filter(a => {
            return a.sender === selectedUser?.uid
        })
        if (getSelectedUsersMsgs.length > 0) {
            getSelectedUsersMsgs.forEach((i => {
                props.markMsgsToReadAction(selectedUser, currentUser, i.msgKey)
            }))
        }
    }

    const getFooter = () => {
        if (props.blockedUsers.some((a) => (a.blockedUser === selectedUser?.uid) || (a.blockByUID === selectedUser?.uid))) {
            return <View style={styles.fieldRow}>
                <Text style={styles.blockText}>Blocked!</Text>
            </View>
        } else {
            return <View style={styles.fieldRow}>

                <TextInput
                    style={styles.textField}
                    placeholder='Type a msg'
                    onChangeText={(text) => setTypeMsg(text)}
                    onPressIn={() => scrollViewRef.current.scrollToEnd({ animated: true })}
                    onPressOut={() => scrollViewRef.current.scrollToEnd({ animated: true })}
                    value={typeMsg}
                />

                <TouchableOpacity style={styles.msgSendBtn} onPress={() => sendMsg()}>
                    <MaterialIcons name="send" size={24} color="white" />
                </TouchableOpacity>
            </View>

        }
    }

    const blockStateBtns = () => {
        if (props.blockedUsers.some((a) => a.blockedUser === selectedUser?.uid)) {
            return <TouchableOpacity style={styles.modalViewList} onPress={() => { props.unBlockUserAction(selectedUser, currentUser); setModalVisible(!modalVisible) }}>
                <Text style={styles.deleteAcc}>Un Block</Text>
            </TouchableOpacity>
        } else {
            return <TouchableOpacity style={styles.modalViewList} onPress={() => { props.blockUserAction(selectedUser, currentUser); setModalVisible(!modalVisible) }}>
                <Text style={styles.deleteAcc}>Block</Text>
            </TouchableOpacity>
        }
    }
    const getThreeDotsBlockIcon = () => {
        if (props.blockedUsers.some((a) => (a.blockedUser === currentUser?.uid) && (a.blockByUID === selectedUser?.uid))) {
            return null
        } else {
            return <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Entypo name="dots-three-vertical" size={20} color="black" />
            </TouchableOpacity>
        }
    }
    const forwardMsg = () => {
        if (forwardUser?.fullName) {
            props.sendMessageToUserAction(forwardUser, currentUser, currentUserMsg.message, formatAMPM(new Date));
            setForwardUser({});
            setForwardModal(false);
            navigation.navigate('home')
        }else{
            alert('Please select a user')
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            {
                isCopy ?
                    <Text style={styles.copiedText}>Copied</Text>
                    : null
            }
            <View style={styles.roomHeader}>
                <TouchableOpacity style={styles.roomHeaderCol1} onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={30} color="#ec8652" />
                    <Text style={styles.userName}>
                        {selectedUser?.fullName}
                    </Text>
                </TouchableOpacity>

                <View style={styles.roomHeaderCol2}>
                    {
                        msgAction ?
                            <View style={{ flexDirection: 'row', alignItems: 'center', width: 100, justifyContent: 'space-between' }}>
                                <TouchableOpacity onPress={() => deleteMsg()}>
                                    <Feather name="trash" size={20} color="red" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => copyToClipboard()}>
                                    <Feather name="copy" size={20} color="black" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { setForwardModal(true); setMsgAction(false) }}>
                                    <Feather name="corner-up-right" size={20} color="black" />
                                </TouchableOpacity>
                            </View>
                            :
                            getThreeDotsBlockIcon()


                    }
                </View>

            </View>

            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                ref={scrollViewRef}
                onContentSizeChange={() => scrollViewRef.current.scrollToEnd({ animated: true })}
            >
                <View style={styles.centeredView}>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => {
                            setModalVisible(!modalVisible);
                        }}
                    >
                        <Pressable style={styles.centeredView} onPress={() => setModalVisible(!modalVisible)}>
                            <View style={styles.modalView}>
                                {blockStateBtns()}

                            </View>
                        </Pressable>

                    </Modal>

                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={forwardModal}
                        onRequestClose={() => {
                            setForwardModal(!forwardModal);
                        }}
                    >
                        <Pressable style={styles.centeredView}>
                            <View style={styles.forwardModalView}>

                                <View style={styles.roomHeader}>
                                    <TouchableOpacity style={styles.roomHeaderCol1} onPress={() => setForwardModal(false)}>
                                        <MaterialIcons name="arrow-back" size={30} color="#ec8652" />
                                        <Text style={styles.userName}>
                                            Forward to
                                        </Text>
                                    </TouchableOpacity>

                                </View>

                                <ScrollView
                                    contentInsetAdjustmentBehavior="automatic"
                                >

                                    <View>
                                        {

                                            props.usersList.map((item, index) => {
                                                return (
                                                    currentUser?.uid !== item.uid ?
                                                        <TouchableOpacity style={styles.userListRow} onPress={() => setForwardUser(item)} key={index}>
                                                            <View style={styles.userFrame}>
                                                                <EvilIcons name="user" size={60} color="black" />
                                                            </View>

                                                            <View style={{ width: '80%' }}>
                                                                <Text style={[styles.userListName, forwardUser.uid === item.uid ? styles.forwardUserActive : null]}>
                                                                    {item.fullName}
                                                                </Text>

                                                            </View>
                                                        </TouchableOpacity>
                                                        :
                                                        null

                                                )
                                            })
                                        }

                                    </View>


                                </ScrollView>

                                <View style={styles.roomForm}>

                                    <View style={styles.forwardFieldRow}>

                                        <TouchableOpacity style={styles.msgSendBtn} onPress={() => forwardMsg()}>
                                            <MaterialIcons name="send" size={24} color="white" />
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </View>
                        </Pressable>

                    </Modal>
                </View>



                <View style={styles.messages}>


                    {
                        userMsgs.map((item, index) => {
                            return (
                                getMsgs(item, index)

                            )
                        })
                    }

                </View>

            </ScrollView>

            <View style={styles.roomForm}>

                {getFooter()}

            </View>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    copiedText: {
        position: 'absolute',
        color: 'white',
        backgroundColor: '#353935',
        padding: 6,
        opacity: 0.8,
        left: width / 2 - 30,
        bottom: height / 6 - 20,
        fontSize: fontScale * 12,
        zIndex: 99
    },
    userRow: {
        flexDirection: 'row',
        height: height / 10,
        alignItems: 'center',
        borderBottomColor: '#ec8652',
        borderBottomWidth: 1,
        borderStyle: 'solid',
    },
    userName: {
        fontSize: fontScale * 14,
        color: '#ec8652'
    },
    roomHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: height / 12,
        alignItems: 'center',
        padding: 10
    },
    roomHeaderCol1: {
        flexDirection: 'row',
        alignItems: 'center'

    },
    userName: {
        color: '#ec8652',
        fontWeight: 'bold',
        fontSize: fontScale * 14,
        marginLeft: 5
    },

    fieldRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: height / 10

    },
    forwardFieldRow: {
        flexDirection: 'row',
        height: height / 7,
        justifyContent: 'flex-end',
        paddingRight: 10
    },
    blockText: {
        fontSize: fontScale * 15,
        fontStyle: 'italic',
        color: '#DC3A16'
    },
    textField: {
        borderColor: '#ec8652',
        borderWidth: 1,
        borderStyle: 'solid',
        color: 'black',
        padding: 10,
        borderRadius: 20,
        width: '75%',
        height: height / 16
    },

    msgSendBtn: {
        backgroundColor: '#ec8652',
        width: '15%',
        borderRadius: 100,
        height: height / 13,
        alignItems: 'center',
        justifyContent: 'center'

    },
    messages: {
        padding: 10
    },

    msg: {
        alignSelf: 'flex-start',
        padding: 8,
        marginBottom: 10,
        minWidth: 70,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        overflow: 'visible'
    },
    reciever: {
        borderColor: '#ec8652',
        borderWidth: 1,
        borderStyle: 'solid',
        borderTopLeftRadius: 0,
    },
    sender: {
        borderColor: 'transparent',
        backgroundColor: '#ec8652',
        borderWidth: 1,
        borderStyle: 'solid',
        borderTopRightRadius: 0,
        marginRight: 0,
        marginLeft: 'auto'
    },
    msgText: {
        fontSize: fontScale * 11,
        color: '#ec8652',
        marginBottom: 6

    },
    senderMsgText: {
        color: 'white',

    },
    msgTime: {
        color: 'black',
        fontSize: fontScale * 7,

    },
    msgTimeAlign: {
        position: 'absolute',
        bottom: 2,
        right: 8
    },
    senderMsgTime: {
        color: 'white',

    },

    centeredView: {
        flex: 1
    },
    modalView: {
        backgroundColor: "white",
        padding: 10,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        marginTop: height / 12 - 10,
        width: width / 2,
        marginBottom: 0,
        marginRight: 10,
        marginLeft: 'auto',
    },
    forwardModalView: {
        backgroundColor: "white",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '100%',
        height: height
    },

    modalViewList: {
        height: 30,
        justifyContent: 'center'
    },
    modalViewItem: {
        color: '#454545',
    },
    deleteAcc: {
        color: '#e63c42'
    },

    userListRow: {
        flexDirection: 'row',
        height: height / 10,
        alignItems: 'center',
        borderBottomColor: '#ec8652',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        position: 'relative',
    },
    userListName: {
        fontSize: fontScale * 14,
        color: 'black',
        fontWeight: 'bold'
    },
    forwardUserActive: {
        color: '#ec8652'
    }
});


function mapStateToProps(state) {
    return {
        messages: state.root.all_msgs?.messages,
        isLoading: state.root.all_msgs?.loading,
        selectedUserMessages: state.root.selected_user_all_msgs?.messages,
        selectedUserMessagesLoading: state.root.selected_user_all_msgs?.loading,
        blockedUsers: state.root.blocked_users,
        usersList: state.root.users_list?.users,

    }
}
function mapDispatchToProps(dispatch) {
    return ({
        sendMessageToUserAction: (selectedUser, currentUser, newMessage, time) => { dispatch(sendMessageToUser(selectedUser, currentUser, newMessage, time)) },
        getMessagesAction: (currentUser) => { dispatch(getMessages(currentUser)) },
        getSelectedUserMessagesAction: (selectedUser) => { dispatch(getSelectedUserMessages(selectedUser)) },
        markMsgsToReadAction: (selectedUser, currentUser, msgKey) => { dispatch(markMsgsToRead(selectedUser, currentUser, msgKey)) },
        blockUserAction: (selectedUser, currentUser) => { dispatch(blockUser(selectedUser, currentUser)) },
        getBlockedUsersAction: (currentUser) => { dispatch(getBlockedUsers(currentUser)) },
        unBlockUserAction: (selectedUser, currentUser) => { dispatch(unBlockUser(selectedUser, currentUser)) },
        deleteMessageAction: (selectedUser, currentUser, selectedUserMsgKey, currentUserMsgKey) => { dispatch(deleteMessage(selectedUser, currentUser, selectedUserMsgKey, currentUserMsgKey)) }

    })
}
export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);