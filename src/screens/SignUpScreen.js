import { ActivityIndicator, Alert, Dimensions, KeyboardAvoidingView, Platform, StatusBar, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import { Button, Text } from '@rneui/themed';
import React, { useContext, useState } from 'react';

import { AuthContext } from '../../App';
import { SafeAreaView } from 'react-native-safe-area-context';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const SignUp = () => {
    const navigation = useNavigation();
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [mobile, setMobile] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [otp, setOtp] = useState("");
    const [name, setName] = useState("");

    const { state, dispatch } = useContext(AuthContext);

    const baseUrl = 'https://guflu.in/Social_media/smedia_api.php';

    const handleSignup = async () => {
        setLoading(true);
        try {

            const response = await axios.post(baseUrl, {
                route: 'register',
                fullname: name,
                mobile: mobile,
                email: email,
                password: password,
                otp: otp
            });
            console.log("Response Status: ", response.status);

            if (response.status === 200) {
                setLoading(false);
                console.log(" Signup Response Data: ", response.data);

                if (response.data.result == 1) {
                    console.log("Signup Success");
                    dispatch({ type: "LOGIN", payload: response.data });
                    navigation.navigate("AnimTab1");
                } else if (response.data.result == 2) {
                    Alert.alert("Already Registered", response.data.message);
                }
                else {
                    Alert.alert("Unable to Signup");
                }
            } else {
                setLoading(false);
                Alert.alert("Unable to Signup");
            }
        } catch (error) {
            console.log("Error: ", error);
            setLoading(false);
        }
    }
    const getOtp = async () => {
        try {
            const response = await axios.post(baseUrl, {
                route: "send_otp",
                mobile: mobile,
            });
            console.log("RESPONSE STATUS ", response.status);
            if (response.status === 200) {
                console.log(response.data);
                const data = response.data;
                if (data.result == 1) {
                    Alert.alert("OTP sent successfully...");
                    setOtp(data.get_otp);
                } else if (data.result === 2) {
                    Alert.alert("Mobile no already registered...");
                } else {
                    Alert.alert("Something went wrong...");
                }
            } else {
                setLoading(false);
                throw new Error("An error has occurred");
            }
        } catch (error) { }
    };

    onLoginPress = () => {
        navigation.navigate('Login');
    }

    return (
        <SafeAreaView style={styles.container}>
            {!loading ? (
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : null}
                    style={styles.container}
                >
                    <StatusBar barStyle='dark-content' />
                    <View style={styles.formContainer}>
                        <View style={styles.inputContainer}>
                            <Text>Email</Text>
                            <TextInput
                                autoCapitalize="none"
                                autoCorrect={false}
                                style={styles.input}
                                onChangeText={(text) => setEmail(text)}
                                value={email}
                                placeholder="Enter your email"
                                placeholderTextColor="#7F27FF"
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text>Number</Text>
                            <TextInput
                                autoCapitalize="none"
                                autoCorrect={false}
                                style={styles.input}
                                onChangeText={(text) => setMobile(text)}
                                value={mobile}
                                placeholder="Enter your number"
                                placeholderTextColor="#7F27FF"
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text>Password</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <TextInput
                                    style={[styles.input, { flex: 1 }]}
                                    onChangeText={(text) => setPassword(text)}
                                    value={password}
                                    secureTextEntry={!isPasswordVisible}
                                    placeholder="Enter your password"
                                    placeholderTextColor="#7F27FF"
                                />

                            </View>
                        </View>
                        <Text style={{marginBottom: 10}}>Enter OTP</Text>
                        <View
                            style={

                                {
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    borderColor: "#7F27FF",
                                    backgroundColor: "white",
                                    borderWidth: 1,
                                    borderRadius: 10,
                                    padding: 10,
                                    marginBottom: 20

                                }
                            }
                        >

                            <TextInput
                                keyboardType='numeric'
                                autoCapitalize="none"
                                autoCorrect={false}
                                onChangeText={(text) => setOtp(text)}
                                value={otp}
                                placeholder="Enter your otp"
                                placeholderTextColor="#7F27FF"
                            />
                            <TouchableOpacity
                                onPress={() => getOtp()}
                            >
                                <Text style={{ color: "#7F27FF" }}>Get OTP</Text>
                            </TouchableOpacity>
                        </View>
                        <Button
                            title="Signup"
                            onPress={handleSignup}
                            style={styles.signupButton}
                            textStyle={styles.signupButtonText}
                            color="#7F27FF"
                        />
                        <TouchableOpacity onPress={() => { navigation.navigate('Login') }}>
                            <Text style={styles.loginText}>Already have an account? Login</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            ) : (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#8706d1" />
                    <Text style={styles.loadingText}>Signing up...</Text>
                </View>
            )}
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDF4F5',
        alignItems: 'center',
        justifyContent: 'center',
    },
    formContainer: {
        width: width / 1.2,
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
    },
    inputContainer: {
        marginBottom: 20,
    },
    loadingText: {
        marginTop: 20,
        color: '#7F27FF',
        fontSize: 16,
    },
    input: {
        borderWidth: 1,
        borderColor: '#7F27FF',
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
        color: '#7F27FF',
    },
    signupButton: {
        marginTop: 20,
        backgroundColor: '#7F27FF',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    signupButtonText: {
        color: 'white',
        fontSize: 16,
    },
    loginText: {
        marginTop: 20,
        color: '#7F27FF',
        fontSize: 16,
    }
});

export default SignUp;
