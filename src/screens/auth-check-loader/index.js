import React, { useEffect } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { connect } from 'react-redux';
import { setNavigationProps } from '../../Store/Middlewares/middlewares';

const AuthCheckLoaderScreen = (props) => {
    const { navigation } = props
    useEffect(() => {
        props.setNavigationPropsAction(navigation)

        checkUser()
    }, []);
    const checkUser = async () => {
        try {
            const value = await AsyncStorage.getItem('store');

            if (value !== null) {
                // We have data!!
                let retrieveData = JSON.parse(value).data;

                if (retrieveData.isLoggedIn) {
                    navigation.navigate('home');
                } else {
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