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
const { height, fontScale, width } = Dimensions.get('window')
import { connect } from 'react-redux';
import { sendMessageToUser, getMessages } from '../../Store/Middlewares/middlewares';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';



function ChatRoom(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [msgAction, setMsgAction] = useState(false);

    const [typeMsg, setTypeMsg] = useState('');
    const [userMsgs, setUserMsgs] = useState([]);



    const { navigation, route } = props;
    const { currentUser, selectedUser } = route.params;

    const scrollViewRef = useRef();
    useEffect(() => {
        props.getMessagesAction(currentUser);
        // console.log('props.messages', props.messages)
        // console.log('  props.messages[selectedUser.uid]', props.messages[selectedUser.uid])

    }, [props.isLoading]);


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
        console.log('msgs', msgsArray);
    }, [props.messages]);
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
        console.log('TIME', formatAMPM(new Date));
        console.log('typeMsg', typeMsg)
        console.log('currentUser', currentUser)
        console.log('selectedUser', selectedUser)

        props.sendMessageToUserAction(selectedUser, currentUser, typeMsg, formatAMPM(new Date))
        setTypeMsg('')
    }
    const getMsgs = (item, index) => {
        if (item.sender === currentUser?.uid) {
            return <TouchableOpacity style={[styles.msg, styles.sender]} onPress={() => console.log(item)} key={index}>

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
                    <Ionicons style={{ marginLeft: 3 }} name="checkmark-done" size={18} color="white" />
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
    return (
        <SafeAreaView style={styles.container}>
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
                                <TouchableOpacity onPress={() => setMsgAction(false)}>
                                    <Feather name="trash" size={20} color="red" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setMsgAction(false)}>
                                    <Feather name="copy" size={20} color="black" />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => setMsgAction(false)}>
                                    <Feather name="corner-up-right" size={20} color="black" />
                                </TouchableOpacity>
                            </View>
                            :
                            <TouchableOpacity onPress={() => setModalVisible(true)}>
                                <Entypo name="dots-three-vertical" size={20} color="black" />
                            </TouchableOpacity>

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
                                <TouchableOpacity style={styles.modalViewList} onPress={() => setModalVisible(!modalVisible)}>
                                    <Text style={styles.deleteAcc}>Block</Text>
                                </TouchableOpacity>

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
                <View style={styles.fieldRow}>

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
            </View>
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
        // backgroundColor: 'grey',
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
        // backgroundColor: 'red',
        alignItems: 'center',
        height: height / 10

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
        // minHeight: 50,
        minWidth: 70,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        overflow: 'visible'
        // position: 'relative'
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
        marginTop: 0,
        marginBottom: 0,
        marginRight: 0,
        // alignItems: 'flex-end',
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
        // alignItems: "center",
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
    modalViewList: {
        height: 30,
        justifyContent: 'center'
    },
    modalViewItem: {
        color: '#454545',
    },
    deleteAcc: {
        color: '#e63c42'
    }
});


function mapStateToProps(state) {
    console.log('Redux State - Chat Room Screen', state.root.all_msgs)
    return {
        messages: state.root.all_msgs?.messages,
        isLoading: state.root.all_msgs?.loading,

    }
}
function mapDispatchToProps(dispatch) {
    return ({
        sendMessageToUserAction: (selectedUser, currentUser, newMessage, time) => { dispatch(sendMessageToUser(selectedUser, currentUser, newMessage, time)) },
        getMessagesAction: (currentUser) => { dispatch(getMessages(currentUser)) }
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(ChatRoom);