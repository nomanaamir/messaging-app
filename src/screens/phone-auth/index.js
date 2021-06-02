import React, { useEffect, useState } from 'react';
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
import { setNavigationProps } from '../../Store/Middlewares/middlewares';
const { height, fontScale, width } = Dimensions.get('window')
import CountryPicker from 'react-native-country-picker-modal'

function PhoneAuth(props) {
    const [countryCode, setCountryCode] = useState('AF')
    const [callingCode, setCallingCode] = useState('+93')
    const [emoji, setEmoji] = useState('')


    const [country, setCountry] = useState(null)

    const [isOTP, setIsOTP] = useState(false)


    const { navigation } = props;

    const onSelect = (country) => {
        console.log('country', country.callingCode[0])
        setCountryCode(country.cca2)
        setCallingCode('+' + country.callingCode[0])

        setCountry(country)
    }
    useEffect(() => {
        console.log('window', window)
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
                                    />
                                </View>

                            </View>

                            <View style={styles.phoneAuthFooter}>
                                <View style={styles.phoneAuthFooterBtn}>
                                    <Button
                                        title='Submit'
                                        color='#ec8652'
                                        onPress={() => navigation.navigate('home')}
                                    />
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
                                        // onChangeText={(text)=> setEmoji(text)}
                                        placeholder='Full Name'
                                    />
                                    {/* <Text>{emoji}</Text> */}
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
                                        // onChangeText={(text)=> setEmoji(text)}
                                        placeholder='Phone number'
                                    />
                                    {/* <Text>{emoji}</Text> */}
                                </View>

                            </View>

                            <View style={styles.phoneAuthFooter}>
                                <View style={styles.phoneAuthFooterBtn}>
                                    <Button
                                        title='Next'
                                        color='#ec8652'
                                        onPress={() => setIsOTP(!isOTP)}
                                    />
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
    fullName:{
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

    return {
    }
}
function mapDispatchToProps(dispatch) {
    return ({
        setNavigationPropsAction: (navigation) => { dispatch(setNavigationProps(navigation)) },
    })
}
export default connect(null, mapDispatchToProps)(PhoneAuth);