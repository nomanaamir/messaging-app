import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, StatusBar, Style, Dimensions, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import { setNavigationProps } from '../../Store/Middlewares/middlewares';

const { width, height, fontScale } = Dimensions.get('window')
const AuthCheckLoaderScreen = (props) => {
    const { navigation } = props
    useEffect(() => {
        props.setNavigationPropsAction(navigation)

        checkUser()
    }, []);
    const checkUser = async () => {
        try {
            const value = await AsyncStorage.getItem('store');
            console.log('retrieveData', value)
    
            if (value !== null) {
                // We have data!!
                let retrieveData = JSON.parse(value).data;

                if (retrieveData.isLoggedIn) {
                    console.log('home Init!')
                    navigation.navigate('home');
                } else {
                    console.log('phoneAuth Init!')
                    navigation.navigate('phoneAuth')
                }

            } else {
                navigation.navigate('phoneAuth')
            }
        } catch (error) {
            console.log('error', error)
            // Error retrieving data
        }
    }

    return (
        <View style={[styles.container, styles.horizontal]}>
            <ActivityIndicator size={200} color="#ec8652" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: 'white'
    },
    horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    }
});

function mapDispatchToProps(dispatch) {
    return ({
        setNavigationPropsAction: (navigation) => { dispatch(setNavigationProps(navigation)) }
    })
}
export default connect(null, mapDispatchToProps)(AuthCheckLoaderScreen);