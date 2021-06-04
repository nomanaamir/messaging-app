import React, { useEffect, useState } from 'react';
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
import auth from '@react-native-firebase/auth';
import { logOut, getAllUsers, RetrieveDataAssyncStorage } from '../../Store/Middlewares/middlewares';
const { height, fontScale, width } = Dimensions.get('window')
import { connect } from 'react-redux';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

// components
import Header from '../../components/header/index';
function Home(props) {
    const { navigation } = props;

    useEffect(() => {
        props.getAllUsersAction();
        props.RetrieveDataAssyncStorageAction();
    }, [props.isLoading]);

    const signOut = () => {
        props.logOutAction();
    }
    const chatRoom = (selectedUser, currentUser) => {
        console.log('currentUser', currentUser)
        console.log('selectedUser', selectedUser)

        navigation.navigate('chatRoom', {
            currentUser: currentUser,
            selectedUser: selectedUser,

        })
    }
    return (
        <SafeAreaView style={styles.container}>
            <Header signOutClick={signOut} />
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
            >

                <View>
                    {
                        props.isLoading === true ?
                            <ActivityIndicator size={100} color="#ec8652" />
                            :
                            props.usersList.map((item, index) => {
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
                                                        Hi, how are you?
                                                    {/* {props.currentUser?.uid} */}
                                                    </Text>
                                                </View>
                                            </View>
                                            <Text style={styles.time}>7:00 PM</Text>
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
        // backgroundColor: 'grey',
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
    console.log('Redux State - home Screen', state.root.users_list)
    return {
        usersList: state.root.users_list?.users,
        isLoading: state.root.users_list?.loading,
        currentUser: state.root.async_storage_data.data?.store,

    }
}
function mapDispatchToProps(dispatch) {
    return ({
        logOutAction: () => { dispatch(logOut()) },
        getAllUsersAction: () => { dispatch(getAllUsers()) },
        RetrieveDataAssyncStorageAction: () => { dispatch(RetrieveDataAssyncStorage()) }
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);