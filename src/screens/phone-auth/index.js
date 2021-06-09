import React, { useEffect, useState } from 'react';
// import firebase from 'firebase';
import auth from '@react-native-firebase/auth';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Dimensions,
    ActivityIndicator,
    Image,
    TouchableOpacity,
    TextInput,
    Button
} from 'react-native';
import { connect } from 'react-redux';
import { setNavigationProps, setUserData } from '../../Store/Middlewares/middlewares';
const { height, fontScale, width } = Dimensions.get('window')
import CountryPicker from 'react-native-country-picker-modal'

function PhoneAuth(props) {
    const [countryCode, setCountryCode] = useState('AF')
    const [callingCode, setCallingCode] = useState('+93')
    const [emoji, setEmoji] = useState('')


    const [country, setCountry] = useState(null);

    const [isOTP, setIsOTP] = useState(false);
    const [isLoading, setIsLoading] = useState(false);


    const [confirm, setConfirm] = useState(null);

    const [code, setCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [fullName, setFullName] = useState('');



    const [initializing, setInitializing] = useState(true);
    // const [user, setUser] = useState();

    const { navigation } = props;

    const onSelect = (country) => {

        setCountryCode(country.cca2)
        setCallingCode('+' + country.callingCode[0])

        setCountry(country)
    }
    // Handle the button press
    async function signInWithPhoneNumber() {
        if (
            phoneNumber === '' ||
            fullName === ''
        ) {
            alert('All fields required!')
        } else {
            setIsLoading(true)
            console.log('number', callingCode + phoneNumber)
            try {
                const confirmation = await auth().signInWithPhoneNumber(callingCode + phoneNumber);
                console.log('confirmation', confirmation);
                setConfirm(confirmation);
                setIsLoading(false)
                setIsOTP(true);
            } catch (error) {
                setIsLoading(false)

                alert(error.message)
            }
        }
        setPhoneNumber('');
        setFullName('');
    }
    async function confirmCode() {
        try {
            await confirm.confirm(code)
            const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
            return subscriber; // unsubscribe on unmount
        } catch (error) {
            alert('Invalid code.');
        }
        
        setCode('');
    }

    //   if (!confirm) {
    //     return (
    //       <Button
    //         title="Phone Number Sign In"
    //         onPress={() => signInWithPhoneNumber('+923233277884')}
    //       />
    //     );
    //   }
    function onAuthStateChanged(user) {
        if (user !== null) {
            console.log('inside', user?.uid)
            const authUser = {
                uid: user?.uid,
                fullName: fullName,
            }

            props.setUserDataAction(authUser);
            setIsOTP(false);
        }
        // console.log('outside', user !== null ? user?.uid: 'hello')
        if (initializing) setInitializing(false);
    }
    useEffect(() => {
        // auth().signOut()
        props.setNavigationPropsAction(navigation);

    }, []);


    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
            >

                {
                    isOTP === true ?
                        <View style={styles.phoneAuth}>

                            <View style={styles.phoneAuthBody}>
                                <View style={styles.countryPicker}>
                                    <Text style={styles.countryPickerHeading}>
                                        Enter OTP
                           </Text>
                                </View>

                                <View style={styles.fieldRow}>

                                    <TextInput
                                        style={[styles.textField, styles.OTPnumber]}
                                        keyboardType='numeric'
                                        placeholder='Enter OTP'
                                        onChangeText={(text) => setCode(text)}
                                        value={code}
                                        placeholderTextColor="#b8babd"
                                    />
                                </View>

                            </View>

                            <View style={styles.phoneAuthFooter}>
                                <View style={styles.phoneAuthFooterBtn}>


                                    {
                                        props.authLoading === true ?
                                            <ActivityIndicator size={40} color="#ec8652" />
                                            :
                                            <Button
                                                title='Submit'
                                                color='#ec8652'
                                                onPress={() => confirmCode()}
                                            />
                                    }


                                </View>
                            </View>
                        </View>
                        :
                        <View style={styles.phoneAuth}>

                            <View style={styles.phoneAuthBody}>
                                <View style={styles.countryPicker}>
                                    <Text style={styles.countryPickerHeading}>
                                        Enter your Phone Number
                                    </Text>
                                    <CountryPicker
                                        {...{
                                            countryCode,
                                            withFilter: true,
                                            withFlag: true,
                                            withCountryNameButton: true,
                                            withAlphaFilter: true,
                                            withCallingCode: true,
                                            withEmoji: true,
                                            onSelect,
                                        }}
                                        false
                                    />
                                </View>
                                <View style={styles.fieldRow}>

                                    <TextInput
                                        style={[styles.textField, styles.fullName]}
                                        placeholder='Full Name'
                                        onChangeText={(text) => setFullName(text)}
                                        placeholderTextColor="#b8babd"
                                        value={fullName}
                                    />

                                </View>

                                <View style={styles.fieldRow}>
                                    <TextInput
                                        style={[styles.textField, styles.CNcode]}
                                        keyboardType='numeric'
                                        value={callingCode}
                                        editable={false}
                                    />

                                    <TextInput
                                        style={[styles.textField, styles.PHnumber]}
                                        keyboardType='numeric'
                                        onChangeText={(text) => setPhoneNumber(text)}
                                        value={phoneNumber}
                                        placeholder='Phone number'
                                        placeholderTextColor="#b8babd"

                                    />
                                    {/* <Text>{emoji}</Text> */}
                                </View>

                            </View>

                            <View style={styles.phoneAuthFooter}>
                                <View style={styles.phoneAuthFooterBtn}>

                                    {
                                        isLoading === false ?
                                            <Button
                                                title='Next'
                                                color='#ec8652'
                                                onPress={() => { signInWithPhoneNumber() }}
                                            />
                                            :
                                            <ActivityIndicator size={40} color="#ec8652" />
                                    }


                                </View>
                            </View>
                        </View>

                }
            </ScrollView>
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    phoneAuth: {
        height: height / 2,
        // backgroundColor: 'black'
    },
    phoneAuthBody: {
        flex: 3,
        // backgroundColor: 'red',
        justifyContent: 'space-around'
    },
    phoneAuthFooter: {
        flex: 1,
        // backgroundColor: 'orange',
        justifyContent: 'center',
        alignItems: 'center'
    },
    phoneAuthFooterBtn: {
        width: width / 2
    },
    fieldRow: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '80%',
        marginTop: 0,
        marginBottom: 0,
        marginRight: 'auto',
        marginLeft: 'auto'


    },
    textField: {
        borderBottomColor: '#ec8652',
        borderBottomWidth: 1,
        borderStyle: 'solid',
        color: 'black',
        padding: 4
    },
    fullName: {
        width: '90%'
    },
    CNcode: {
        width: '15%',
        // borderBottomColor: 'black',

    },
    PHnumber: {
        width: '70%'
    },
    OTPnumber: {
        width: '100%'

    },
    countryPicker: {
        alignItems: 'center'
    },
    countryPickerHeading: {
        color: '#ec8652',
        fontSize: fontScale * 16,
        marginBottom: 10
    }
});
function mapStateToProps(state) {
    console.log('Redux State - SignIn Screen', state.root.signIn_success)
    return {
        authLoading: state.root.signIn_success
    }
}
function mapDispatchToProps(dispatch) {
    return ({
        setNavigationPropsAction: (navigation) => { dispatch(setNavigationProps(navigation)) },
        setUserDataAction: (authUser) => { dispatch(setUserData(authUser)) }
    })
}
export default connect(mapStateToProps, mapDispatchToProps)(PhoneAuth);