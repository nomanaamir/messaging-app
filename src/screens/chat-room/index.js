import React, { useEffect, useState } from 'react';
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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';


function ChatRoom(props) {
    const [modalVisible, setModalVisible] = useState(false);
    const [msgAction, setMsgAction] = useState(false);

    const { navigation } = props;
    useEffect(() => {
    }, []);


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.roomHeader}>
                <TouchableOpacity style={styles.roomHeaderCol1} onPress={() => navigation.goBack()}>
                    <MaterialIcons name="arrow-back" size={30} color="#ec8652" />
                    <Text style={styles.userName}>
                        Noman Aamir
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

                    <View style={[styles.msg, styles.reciever]}>
                        <Text style={styles.msgText}>
                            Hello Sir, how are you?
                        </Text>
                        <Text style={styles.msgTime}>7:00 PM</Text>
                    </View>

                    <TouchableOpacity style={[styles.msg, styles.sender]} onPress={() => setMsgAction(true)}>

                        <Text style={[styles.msgText, styles.senderMsgText]}>
                            I'm good, Thanks. How about you?
                            </Text>
                        <Text style={[styles.msgTime, styles.senderMsgTime]}>7:00 PM</Text>

                    </TouchableOpacity>

                </View>

            </ScrollView>

            <View style={styles.roomForm}>
                <View style={styles.fieldRow}>

                    <TextInput
                        style={styles.textField}
                        placeholder='Type a msg'
                    />

                    <TouchableOpacity style={styles.msgSendBtn}>
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
        // minWidth: 120,
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
        marginLeft: 'auto'
    },
    msgText: {
        fontSize: fontScale * 11,
        color: '#ec8652',
        marginBottom: 5

    },
    senderMsgText: {
        color: 'white',

    },
    msgTime: {
        color: 'black',
        fontSize: fontScale * 7,
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

    return {
    }
}
function mapDispatchToProps(dispatch) {
    return ({
    })
}
export default connect(null, null)(ChatRoom);