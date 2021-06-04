import React, { useEffect, useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    Modal,
    Pressable,
    TouchableOpacity
} from 'react-native';
const { height, fontScale, width } = Dimensions.get('window');
import Entypo from 'react-native-vector-icons/Entypo';
function Header(props) {
    const [modalVisible, setModalVisible] = useState(false);
    useEffect(() => {
    }, []);


    return (
        <>
           
            <View style={styles.header}>
                <Text style={styles.headerLogo}>
                    Chat App
                </Text>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Entypo name="dots-three-vertical" size={20} color="black" />
                </TouchableOpacity>
            </View>
            <View>
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
                            <TouchableOpacity style={styles.modalViewList} onPress={() => { props.signOutClick(); setModalVisible(!modalVisible) }}>
                                <Text style={styles.modalViewItem}>Logout</Text>
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.modalViewList} onPress={() => setModalVisible(!modalVisible)}>
                                <Text style={styles.deleteAcc}>Delete Account</Text>
                            </TouchableOpacity>

                        </View>
                    </Pressable>
                </Modal>
            </View>

        </>
    );
};

const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: height / 8,
        padding: 10,

    },
    headerLogo: {
        fontSize: fontScale * 16,
        color: '#ec8652',
        fontWeight: 'bold'
    },

    centeredView: {
        flex: 1,
        // justifyContent: "space-between",
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
        marginTop: height / 8 - 20,
        width: width / 2,
        marginBottom: 0,
        marginRight: 10,
        marginLeft: 'auto'
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


export default Header;