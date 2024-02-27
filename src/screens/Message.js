import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions, StatusBar, TextInput } from 'react-native';
import { AppBar } from '@react-native-material/core';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

const width = Dimensions.get('screen').width;
const height = Dimensions.get('screen').height;

export default function Message() {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#FFF' }}>
            <View style={{ flex: 1, marginTop: 10 }}>
                <AppBar
                    color='#FFF'
                    title='Inbox'
                    titleStyle={{ fontSize: 18, color: '#000', textAlign: 'center' }}
                    centerTitle={true}
                    elevation={0}
                    leading={<TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <Icon name="chevron-back" size={30} color="#000" />
                    </TouchableOpacity>}
                />
                <Text style={{ fontSize: 12, color: '#666', textAlign: 'center', marginTop: 10 }}>10/02/2020</Text>
                <View style={{ paddingTop: 20, flexDirection: 'row' }}>
                    <Avatar.Image source={require('../../assets/images/users/35.jpeg')} size={40} />
                    <View style={{ marginLeft: 15 }}>
                        <View style={{ paddingHorizontal: 15, paddingVertical: 15, backgroundColor: '#F2F2F2', borderRadius: 20, marginRight: 70 }}>
                            <Text style={{ fontSize: 12, color: '#000', lineHeight: 20 }}>I want to build a website for my business, where should i go.</Text>
                        </View>
                        <Text style={{ fontSize: 12, color: '#666', marginTop: 10 }}>09:30 AM</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', paddingTop: 20, justifyContent: 'flex-end' }}>
                    <View>
                        <View style={{ backgroundColor: '#F2F2F2', paddingHorizontal: 15, paddingVertical: 15, borderRadius: 20, marginLeft: 60 }}>
                            <Text style={{ fontSize: 12, color: '#00F', lineHeight: 20 }}>Simpact Online Services is a good firm for your solution.</Text>
                        </View>
                        <Text style={{ fontSize: 12, color: '#666', marginTop: 10, textAlign: 'right' }}>09:31 AM</Text>
                    </View>
                </View>
                <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around', borderRadius: 30, marginBottom: 20 }}>
                        <View style={{ backgroundColor: '#F2F2F2', borderRadius: 25, flex: 1 }}>
                            <TextInput placeholder='Search...'
                                style={{ fontSize: 14, color: '#00F', fontFamily: 'Poppins-Medium', paddingHorizontal: 10 }}
                            />
                            <Avatar.Icon icon='near-me' size={40} style={{ backgroundColor: '#FFF', position: 'absolute', right: 5, top: 5 }} />
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}
