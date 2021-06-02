import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Dimensions,
    TouchableOpacity,
} from 'react-native';
const { height, fontScale, width } = Dimensions.get('window')
import { connect } from 'react-redux';
import EvilIcons from 'react-native-vector-icons/EvilIcons';

// components
import Header from '../../components/header/index';
function Home(props) {
    const { navigation } = props;

    useEffect(() => {
    }, []);


    return (
        <SafeAreaView style={styles.container}>
            <Header />
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
            >

                <View>

                    <TouchableOpacity style={styles.userRow} onPress={() => navigation.navigate('chatRoom')}>
                        <View style={styles.userFrame}>
                            <EvilIcons name="user" size={60} color="black" />
                        </View>

                        <View style={{ width: '80%' }}>
                            <Text style={styles.userName}>
                                Noman Aamir
                            </Text>

                            <View style={{ width: '80%' }}>
                                <Text style={styles.lastMsg} numberOfLines={1}>
                                    Hi, how are you?
                                </Text>
                            </View>
                        </View>
                        <Text style={styles.time}>7:00 PM</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.userRow} onPress={() => navigation.navigate('chatRoom')}>
                        <View style={styles.userFrame}>
                            <EvilIcons name="user" size={60} color="black" />
                        </View>

                        <View style={{ width: '80%' }}>
                            <Text style={styles.userName}>
                                Noman Aamir
                            </Text>

                            <View style={{ width: '80%' }}>
                                <Text style={styles.lastMsg} numberOfLines={1}>
                                    Hi, how are you?
                                </Text>
                            </View>
                        </View>
                        <Text style={styles.time}>7:00 PM</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.userRow} onPress={() => navigation.navigate('chatRoom')}>
                        <View style={styles.userFrame}>
                            <EvilIcons name="user" size={60} color="black" />
                        </View>

                        <View style={{ width: '80%' }}>
                            <Text style={styles.userName}>
                                Noman Aamir
                            </Text>

                            <View style={{ width: '80%' }}>
                                <Text style={styles.lastMsg} numberOfLines={1}>
                                    Hi, how are you?
                                </Text>
                            </View>
                        </View>
                        <Text style={styles.time}>7:00 PM</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.userRow} onPress={() => navigation.navigate('chatRoom')}>
                        <View style={styles.userFrame}>
                            <EvilIcons name="user" size={60} color="black" />
                        </View>

                        <View style={{ width: '80%' }}>
                            <Text style={styles.userName}>
                                Noman Aamir
                            </Text>

                            <View style={{ width: '80%' }}>
                                <Text style={styles.lastMsg} numberOfLines={1}>
                                    Hi, how are you?
                                </Text>
                            </View>
                        </View>
                        <Text style={styles.time}>7:00 PM</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.userRow} onPress={() => navigation.navigate('chatRoom')}>
                        <View style={styles.userFrame}>
                            <EvilIcons name="user" size={60} color="black" />
                        </View>

                        <View style={{ width: '80%' }}>
                            <Text style={styles.userName}>
                                Noman Aamir
                            </Text>

                            <View style={{ width: '80%' }}>
                                <Text style={styles.lastMsg} numberOfLines={1}>
                                    Hi, how are you?
                                </Text>
                            </View>
                        </View>
                        <Text style={styles.time}>7:00 PM</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.userRow} onPress={() => navigation.navigate('chatRoom')}>
                        <View style={styles.userFrame}>
                            <EvilIcons name="user" size={60} color="black" />
                        </View>

                        <View style={{ width: '80%' }}>
                            <Text style={styles.userName}>
                                Noman Aamir
                            </Text>

                            <View style={{ width: '80%' }}>
                                <Text style={styles.lastMsg} numberOfLines={1}>
                                    Hi, how are you?
                                </Text>
                            </View>
                        </View>
                        <Text style={styles.time}>7:00 PM</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.userRow} onPress={() => navigation.navigate('chatRoom')}>
                        <View style={styles.userFrame}>
                            <EvilIcons name="user" size={60} color="black" />
                        </View>

                        <View style={{ width: '80%' }}>
                            <Text style={styles.userName}>
                                Noman Aamir
                            </Text>

                            <View style={{ width: '80%' }}>
                                <Text style={styles.lastMsg} numberOfLines={1}>
                                    Hi, how are you?
                                </Text>
                            </View>
                        </View>
                        <Text style={styles.time}>7:00 PM</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.userRow} onPress={() => navigation.navigate('chatRoom')}>
                        <View style={styles.userFrame}>
                            <EvilIcons name="user" size={60} color="black" />
                        </View>

                        <View style={{ width: '80%' }}>
                            <Text style={styles.userName}>
                                Noman Aamir
                            </Text>

                            <View style={{ width: '80%' }}>
                                <Text style={styles.lastMsg} numberOfLines={1}>
                                    Hi, how are you?
                                </Text>
                            </View>
                        </View>
                        <Text style={styles.time}>7:00 PM</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.userRow} onPress={() => navigation.navigate('chatRoom')}>
                        <View style={styles.userFrame}>
                            <EvilIcons name="user" size={60} color="black" />
                        </View>

                        <View style={{ width: '80%' }}>
                            <Text style={styles.userName}>
                                Noman Aamir
                            </Text>

                            <View style={{ width: '80%' }}>
                                <Text style={styles.lastMsg} numberOfLines={1}>
                                    Hi, how are you?
                                </Text>
                            </View>
                        </View>

                        <Text style={styles.time}>7:00 PM</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.userRow} onPress={() => navigation.navigate('chatRoom')}>
                        <View style={styles.userFrame}>
                            <EvilIcons name="user" size={60} color="black" />
                        </View>

                        <View style={{ width: '80%' }}>
                            <Text style={styles.userName}>
                                Noman Aamir
                            </Text>

                            <View style={{ width: '80%' }}>
                                <Text style={styles.lastMsg} numberOfLines={1}>
                                    Hi, how are you?
                                </Text>
                            </View>
                        </View>
                        <Text style={styles.time}>7:00 PM</Text>
                    </TouchableOpacity>


                    <TouchableOpacity style={styles.userRow} onPress={() => navigation.navigate('chatRoom')}>
                        <View style={styles.userFrame}>
                            <EvilIcons name="user" size={60} color="black" />
                        </View>

                        <View style={{ width: '80%' }}>
                            <Text style={styles.userName}>
                                Noman Aamir
                            </Text>

                            <View style={{ width: '80%' }}>
                                <Text style={styles.lastMsg} numberOfLines={1}>
                                    Hi, how are you?
                                </Text>
                            </View>
                        </View>
                        <Text style={styles.time}>7:00 PM</Text>
                    </TouchableOpacity>


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
    time:{
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
    }
}
function mapDispatchToProps(dispatch) {
    return ({
    })
}
export default connect(null, null)(Home);