
import { ActivityIndicator, Alert, Dimensions, Image, KeyboardAvoidingView, Platform, StatusBar, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Button, Text, useThemeMode } from '@rneui/themed';
import React, { useContext, useEffect, useState } from 'react';

import { AuthContext } from '../../../App';
import Icon from 'react-native-vector-icons/Entypo';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import base64 from 'react-native-base64';
import socialApi from '../../api/socialApi';
import { useNavigation } from '@react-navigation/native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const LoginScreen = () => {
    const navigation = useNavigation();
    const { authState, authDispatch } = useContext(AuthContext);
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const { setMode, mode } = useThemeMode();
    const [mobile, setMobile] = useState("");
    const [loading, setLoading] = useState(false);
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const handleLogin = async () => {
        setLoading(true);
        try {
            const response = await socialApi.post('', {
                route: 'login',
                token: base64.encode(mobile + ":" + password)
            })

            console.log("Response Status: ", response.status);

            if (response.status === 200) {
                setLoading(false);
                console.log(" Login Response Data: ", response.data);

                const userData = response.data.data;
                if (response.data.result == 1) {
                    console.log("Login Success");
                    authDispatch({ type: "LOGIN", payload: userData });
                    navigation.navigate('Root', { screen: 'Search' });
                } else {
                    Alert.alert("Unable to Login", response.data.message);
                }
                return userData;
            } else {
                setLoading(false);
                Alert.alert("Login Failed", "Login Failed");
            }
        } catch (error) {
            console.log("Login Error: ", error);
            setLoading(false);
            Alert.alert(
                "Login Failed",
            )
        }
    };

    const onLoginPress = () => {
        if (mobile.length == 0) {
            Alert.alert("Enter mobile no.", "Mobile no is blank.", [
                { text: "OK", onPress: () => console.log("OK Pressed") },
            ]);
        } else if (mobile.length != 10) {
            Alert.alert("Invalid mobile no.", "Mobile no must be 10 characters.", [
                { text: "OK", onPress: () => console.log("OK Pressed") },
            ]);
        } else {
            if (password.length == 0) {
                Alert.alert("Enter password", "Password is blank.", [
                    { text: "OK", onPress: () => console.log("OK Pressed") },
                ]);
            } else if (password.length < 4) {
                Alert.alert("Invalid mpin", "Mpin must be atleast 4 digit.", [
                    { text: "OK", onPress: () => console.log("OK Pressed") },
                ]);
            }
            // FORM VALIDATED
            else {
                handleLogin();
            }
        }
    };

    const handleForgotPassword = () => {
        // Implement your forgot password logic here
    };

    const handleSignup = () => {
        // Implement navigation to signup screen
        navigation.navigate('SignUp')
    };

    const handleThemeChange = () => {
        setMode(mode === 'dark' ? 'light' : 'dark');
    };


    useEffect(() => {
    }, []);


    if (authState.isSignout === false) {
        return (
            navigation.navigate('LoginScreen')
            // navigation.navigate('LoginScreen', { screen: 'HomePage' })
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            {
                !loading ? (
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : null}
                        style={styles.container}
                    >
                        <StatusBar barStyle={mode === 'dark' ? 'light-content' : 'dark-content'} />
                        <View style={styles.formContainer}>
                            <View style={styles.iconContainer}>
                                <Image
                                    resizeMode='cover'
                                    source={require('../../../assets/icons/LogoAicicHD.jpg')}
                                    style={styles.appIcon}
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={{ color: "#7F27FF" }}>Mobile Number</Text>
                                <TextInput
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    keyboardType='numeric'
                                    style={styles.input}
                                    onChangeText={(text) => setMobile(text)}
                                    value={mobile}
                                    placeholder="Mobile Number"
                                    placeholderTextColor="#7F27FF"
                                />
                            </View>
                            <View style={styles.inputContainer}>
                                <Text style={{ color: "#7F27FF", marginBottom: 10 }}>Password </Text>

                                <View
                                    style={

                                        {
                                            flexDirection: "row",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            borderColor: "#7F27FF",
                                            borderWidth: 1,
                                            borderRadius: 10,
                                            padding: 5,
                                            marginBottom: 10

                                        }
                                    }
                                >
                                    <TextInput
                                        placeholder="Password"
                                        autoCapitalize='none'
                                        autoCorrect={false}
                                        onChangeText={(e) => setPassword(e)}
                                        value={password}
                                        selectionColor="#7F27FF"
                                        secureTextEntry={!isPasswordVisible}
                                        placeholderTextColor="#7F27FF"
                                        style={{ color: "black", flex: 1, height:40 }}
                                    ></TextInput>
                                    <TouchableOpacity
                                        onPress={() => setIsPasswordVisible(!isPasswordVisible)}
                                    >
                                        <Icon
                                            name={
                                            isPasswordVisible ? "eye" : "eye-with-line"}
                                            color='#7F27FF'
                                            size={18}
                                            style={{ marginRight: 10 }}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <Button
                                title="Login"
                                onPress={onLoginPress}
                                style={styles.loginButton}
                                textStyle={styles.loginButtonText}
                                color="#8153FD"
                            />
                            <TouchableOpacity onPress={handleForgotPassword}>
                                <Text style={styles.forgotPassword}>Forgot Password?</Text>
                            </TouchableOpacity>
                            {
                                authState.isSignout ? (<TouchableOpacity onPress={handleSignup}>
                                    <Text style={styles.signupText}>Don't have an account? Sign Up</Text>
                                </TouchableOpacity>) : null

                            }
                        </View>
                    </KeyboardAvoidingView>

                ) : (
                    <View
                        style={{
                            flex: 1,
                            justifyContent: "center",
                            flexDirection: "column",
                            padding: 10,
                        }}
                    >
                        <ActivityIndicator size="large" color="#8706d1" />
                        <Text style={{ textAlign: "center", padding: 20 }}>
                            Logging in...
                        </Text>
                    </View>
                )
            }
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
    formContainer: {
        width: width / 1.2,
        backgroundColor: '#FFF',
        borderRadius: 10,
        padding: 20,
    },
    iconContainer: {
        alignItems: 'center',
        marginBottom: 20,
        marginTop: -70
    },
    appIcon: {
        width: 204, 
        height: 200, 
        
    },
    inputContainer: {
        marginBottom: 20,
    },
    input: {
        borderWidth: 1,
        borderColor: '#7F27FF',
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
        color: '#000',
        height: 50,
    },
    loginButton: {
        marginTop: 20,
        backgroundColor: '#6E43F4',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    loginButtonText: {
        color: 'white',
        fontSize: 16,
    },
    forgotPassword: {
        textAlign: 'center',
        marginTop: 10,
        color: '#7F27FF',
    },
    signupText: {
        textAlign: 'center',
        marginTop: 20,
        color: '#7F27FF',
    },
});

export default LoginScreen;
