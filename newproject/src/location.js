import React, { useEffect, useLayoutEffect, useRef,useCallback } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet, Dimensions
} from "react-native";
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Geocoder from 'react-native-geocoding';
import Geolocation from 'react-native-geolocation-service';
import MapViewDirections from "react-native-maps-directions";
import Locations from "react-native-vector-icons/Entypo"
import Truck from "react-native-vector-icons/MaterialCommunityIcons"
import Loader from './Loader';

import database from '@react-native-firebase/database';
// import { Time } from 'react-native-gifted-chat';
// import SimpleToast from 'react-native-simple-toast';
import LinearGradient from 'react-native-linear-gradient';
import moment from 'moment';

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
if (!firebase.apps.length) {
    app = firebase.initializeApp(firebaseConfig);
}

const screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE_DELTA = 0.04;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const OrderDelivery = ({ route, navigation }) => {
    const { width, height } = Dimensions.get("screen")
    const mapRef = useRef()
    const markerRef = useRef()
    // mapRef.current.animateToRegion({
    //     latitude: curLoc.latitude,
    //     longitude: curLoc.longitude,
    //     latitudeDelta: LATITUDE_DELTA,
    //     longitudeDelta: LONGITUDE_DELTA
    // })
    const [from, setFrom] = React.useState("")
    const [toadd, seTodd] = React.useState("")
    const [loading, setLoading] = React.useState(false);
    let coutn = 1
    const [restaurant, setRestaurant] = React.useState(null)
    const [streetName, setStreetName] = React.useState("")
    const [fromLocations, setFromLocations] = React.useState(null)
    const [toLocation, setToLocation] = React.useState(null)
    const [region, setRegion] = React.useState(null)
    const [duration, setDuration] = React.useState(0)
    const [isReady, setIsReady] = React.useState(false)
    const [angle, setAngle] = React.useState(0)
    const [stop, setStop] = React.useState(true)
    const [count, setCount] = React.useState(1);



    // forceUpdate
    const [, updateState] = React.useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    // this is for forceupdate code end

    // let { tolocation, fromloacation } = route.params;
    let tolocation = "puducherry"
    let fromloacation = "chennai"
    useLayoutEffect(() => {
        loacationto()
        // currentloca()
        // location_direction()
    }, [])
    useEffect(() => {
        if (from != undefined && toadd != undefined) {
            location_direction()
            // setTimeout(() => location_direction(), 6000)
        }
    }, [from, toadd])
    // useEffect(() => {
    //     setInterval(() => {
    //         sendMsg()
    //         setCount(count + 1)
    //     }, 10000);
    // }, [count])

    const sendMsg = useCallback(() => {
        const times = moment().format('')
        console.log("data", fromLocations);

        let msgData = {
            latitude: fromLocations.latitude,
            longitude: fromLocations.longitude,
            msgType: 'number',
        };

        const newReference = database()
            .ref('/users/123')
            .push();
        msgData.msgType = newReference.key;
        newReference.set(msgData).then(() => {
            let chatListupdate = {
                latitude: fromLocations.latitude,
                longitude: fromLocations.longitude,
                sendTime: msgData.sendTime,
            };
            // database()
            //     .ref('/users/123')
            //     .update(chatListupdate)
            //     .then(() => console.log('Data updated.', chatListupdate));
            // console.log("'/chatlist/' + userData?.id + '/' + data?.id",)
        });

    }, [fromLocations]);

    // const sendMsg = () => {
    //     const times = moment().format('')
    //     console.log("data", fromLocations);

    //     let msgData = {

    //         msgType: 'number',
    //     };

    //     const newReference = database()
    //         .ref('/users/123')
    //         .push();
    //     msgData.msgType = newReference.key;
    //     newReference.set(msgData).then(() => {
    //         let chatListupdate = {
    //             latitude: fromLocations.latitude,
    //             longitude: fromLocations.longitude,
    //             sendTime: msgData.sendTime,
    //         };
    //         database()
    //             .ref('/users/123')
    //             .update(chatListupdate)
    //             .then(() => console.log('Data updated.', chatListupdate));
    //         console.log("'/chatlist/' + userData?.id + '/' + data?.id",)
    //     });
    // };

    //  setInterval(() => {
    //     sendMsg()

    //       }, 10000);
    const submit = () => {

        setInterval(() => {
                    sendMsg()
                    setCount(count + 1)
                }, 10000);

    }
    const submitstop = () => {
        navigation.navigate("database")
        // console.log("stop");
        setStop(!stop)
    }

    const location_direction = async () => {

        setLoading(true);
        let fromLoc = from
        let toLoc = toadd
        console.log("lati", fromLoc.lng);
        let goodlocation = {
            latitude: toadd.lat,
            longitude: toadd.lng,
        }
        let fromgot = {
            latitude: from.lat,
            longitude: from.lng,
        }
        // console.log("goooodddd", goodlocation);
        // console.log("fromgot", fromgot);

        let mapRegion = {
            latitude: (fromLoc.lat + toLoc.lat) / 2,
            longitude: (fromLoc.lng + toLoc.lng) / 2,
            latitudeDelta: Math.abs(fromLoc.lat - toLoc.lat) * 2,
            longitudeDelta: Math.abs(fromLoc.lng - toLoc.lng) * 2
        }
        // console.log("region", mapRegion);
        // console.log("toaddtoLoctoLoc", toLoc.lat);
        await setRestaurant(restaurant)
        // setStreetName(street)
        await setFromLocations(fromgot)
        await setToLocation(goodlocation)
        await setRegion(mapRegion)
        forceUpdate()
        // setLoading(false)
        setTimeout(() => setLoading(false), 3000)
    }
    Geocoder.init("AIzaSyCt08HcMYX8balI6hj5BXtMJKQ1G_eVcFs")
    // Geocoder.init("AIzaSyA1h1LUhTujG8F1fz0WLXAYrYPsXzKSP4M")


    //  

    const loacationto = () => {
        // Geolocation.watchPosition(data)

        Geocoder.from(tolocation)
            .then(json => {
                var location = json.results[0].geometry.location;
                console.log("lag", location);
                seTodd(location)
                forceUpdate()
            })
            .catch(error => console.warn(error));
        Geocoder.from(fromloacation)
            .then(json => {
                var location = json.results[0].geometry.location;
                console.log("lag2", location);
                setFrom(location)
                forceUpdate()
            })
            .catch(error => console.warn(error));
    }

    const destinationMarker = () => (
        <Marker
            coordinate={toLocation}
        >
            <View
                style={{
                    height: 40,
                    width: 40,
                    borderRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                    // backgroundColor: "red"
                }}            >
                <View
                    style={{
                        height: 30,
                        width: 30,
                        borderRadius: 15,
                        alignItems: 'center',
                        justifyContent: 'center',
                        // backgroundColor: "white"
                    }}                >
                    <Locations name="location" size={25} color={"#ff0000"} style={{}} />
                </View>
            </View>
        </Marker>
    )
    const carIcon = () => (
        <Marker
            coordinate={fromLocations}
            anchor={{ x: 0.5, y: 0.5 }}
            flat={true}
            rotation={angle}
        >
            <Truck name="truck-delivery" size={30} color={"#ff0000"} style={{ top: 10 }} />


        </Marker>
    )
    return (
        <View style={{ flex: 1 }}>
            {from ? <MapView
                ref={mapRef}
                region={region}
                // initialRegion={region}
                provider={PROVIDER_GOOGLE} // remove if not using Google Maps
                style={styles.map}
            >

                {destinationMarker()}
                {/* {carIcon()} */}
            </MapView> : <Loader loading={loading} />}
            <View style={{ flexDirection: "row", justifyContent: "space-around", top: 10 }}>
                <TouchableOpacity style={{ backgroundColor: "green", width: "45%", height: 50, alignItems: "center", justifyContent: "center" }}
                    onPress={submit}
                >
                    <Text style={{ color: "white", fontSize: 25, fontWeight: "bold" }}>START</Text>
                </TouchableOpacity>
                <TouchableOpacity style={{ backgroundColor: "orange", width: "45%", height: 50, alignItems: "center", justifyContent: "center" }}
                    onPress={submitstop}
                >
                    <Text style={{ color: "white", fontSize: 25, fontWeight: "bold" }}>DETAILS</Text>
                </TouchableOpacity>
            </View>
            {stop ? <View style={{ marginTop: 20, width: "95%", alignItems: "center" }}>
                <Text>loading</Text>
            </View> : null}
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        height: 400,
        width: 400,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
});
export default OrderDelivery;
