import React, { Component, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ImageBackground,
    TextInput,
    SectionList,
    TouchableOpacity,
    FlatList,
} from 'react-native';
import moment from 'moment';
import MsgComponents from './MsgComponents';
import { COLORS } from './COLORS';
// import ChatHeader from '../../Component/Header/ChatHeader';
// import {useSelector} from 'react-redux';
import database from '@react-native-firebase/database';
// import { Time } from 'react-native-gifted-chat';
// import SimpleToast from 'react-native-simple-toast';
import LinearGradient from 'react-native-linear-gradient';
import TimeDelivery from './TimeDelevirey';


import firebase from '@react-native-firebase/app'

const firebaseConfig = {
  apiKey: "AIzaSyABUWs1V9dV1DTye0DQk8uolfwwz1gvvVA",
  authDomain: "map-c01e5.firebaseapp.com",
  databaseURL: "https://map-c01e5-default-rtdb.firebaseio.com",
  projectId: "map-c01e5",
  storageBucket: "map-c01e5.appspot.com",
  messagingSenderId: "342719822878",
  appId: "1:342719822878:web:b6b9aa0005d6a9669b020f",
  measurementId: "G-YCWDWSXE6J"
};
let app;
if (!firebase.apps.length ) {
  app = firebase.initializeApp(firebaseConfig);
}


const Databaseshow = ({ props, route }) => {

    const [msg, setMsg] = React.useState('');
    const [disabled, setdisabled] = React.useState(false);
    const [allChat, setallChat] = React.useState([]);
    const [count, setCount] = React.useState(1);



    useEffect(() => {
        const onChildAdd = database()
        .ref('/users/123')
        .on('child_added', snapshot => {
            // console.log('A new node has been added', snapshot.val());
            setallChat((state) => [snapshot.val(), ...state]);
        });
        // Stop listening for updates when no longer required
        return () => database().ref('/users/123').off('child_added', onChildAdd);
    }, [count]);
    
    const msgvalid = txt => txt && txt.replace(/\s/g, '').length;
    console.log("red",allChat);
    
    // setInterval(() => {
    //     // console.log("got",allChat);
    //        setCount(count+1)
    //       }, 2000);  
    return (
        <View style={styles.container}>
            <ImageBackground
                // source={require('../../Assets/Background.jpg')}
                style={{  }}>
                <LinearGradient
                    colors={['black', '#7ddaf9']}
                    // style={{ flex: 1 }}
                    start={{ x: 0.4, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                    locations={[0, 0.7]}
                    style={{height:40}}
                >
                    <View style={{top:-28, left:10  }} >
                        <Text style={{ top:40, color:"white", fontSize:20 }} >DETAILS
                        </Text>
                    </View>
                </LinearGradient>
                <FlatList
                    style={{ }}
                    data={allChat}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(item, index) => index}
                    inverted
                    renderItem={({ item }) => {
                        // console.log("itme", item.msgType);
                        return (
                            <View style={{padding:10, backgroundColor:"grey",marginVertical:10, alignItems:"center", width:"80%", justifyContent:"center", alignSelf:"center"}}>
                                <Text>{item.msgType}</Text>
                                

                            </View>
                          
                        );
                    }}
                />
            </ImageBackground>
          
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});

//make this component available to the app
export default Databaseshow;