
//this is the geofence for the current location







//the below is the normal map code 




// // import React, {useEffect, useState, useRef} from 'react';
// // import {
// //   StyleSheet,
// //   View,
// //   Platform,
// //   PermissionsAndroid,
// //   Alert,
// //   ActivityIndicator,
// //   Text,
// //   TouchableOpacity,
// // } from 'react-native';
// // import MapView, {Marker, Polyline} from 'react-native-maps';
// // import Geolocation from '@react-native-community/geolocation';
// // import {getDistance} from 'geolib';

// // // Custom MapButton component for consistent styling and accessibility
// // const MapButton = ({title, onPress, disabled, active}) => (
// //   <TouchableOpacity
// //     onPress={onPress}
// //     disabled={disabled}
// //     accessibilityLabel={title}
// //     accessibilityHint={"Tap to " + title.toLowerCase()}
// //     style={[
// //       styles.button,
// //       active && styles.buttonActive,
// //       disabled && styles.buttonDisabled,
// //     ]}
// //   >
// //     <Text style={styles.buttonText}>{title}</Text>
// //   </TouchableOpacity>
// // );

// // export default function App() {
// //   const [location, setLocation] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [source, setSource] = useState(null);
// //   const [destination, setDestination] = useState(null);
// //   const [isChoosingSource, setIsChoosingSource] = useState(false);
// //   const [isChoosingDestination, setIsChoosingDestination] = useState(false);
// //   const [permissionDenied, setPermissionDenied] = useState(false);
// //   const mapRef = useRef(null);

// //   const defaultLocation = {
// //     latitude: 37.78825,
// //     longitude: -122.4324,
// //     latitudeDelta: 0.0922,
// //     longitudeDelta: 0.0421,
// //   };

// //   const getCurrentLocation = () => {
// //     Geolocation.getCurrentPosition(
// //       position => {
// //         setLocation({
// //           latitude: position.coords.latitude,
// //           longitude: position.coords.longitude,
// //           latitudeDelta: 0.01,
// //           longitudeDelta: 0.01,
// //         });
// //         setLoading(false);
// //       },
// //       error => {
// //         Alert.alert(
// //           'Error',
// //           `Failed to get your location: ${error.message}.` +
// //             ' Showing default map region.'
// //         );
// //         setLocation(defaultLocation);
// //         setLoading(false);
// //       }
// //     );
// //   };

// //   useEffect(() => {
// //     const requestLocationPermission = async () => {
// //       if (Platform.OS === 'android') {
// //         try {
// //           const granted = await PermissionsAndroid.request(
// //             PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
// //           );
// //           if (granted === PermissionsAndroid.RESULTS.GRANTED) {
// //             getCurrentLocation();
// //           } else {
// //             Alert.alert(
// //               'Permission Denied',
// //               'Location permission is required to show your current location. Showing default map.'
// //             );
// //             setPermissionDenied(true);  // flag for banner
// //             setLocation(defaultLocation);
// //             setLoading(false);
// //           }
// //         } catch (err) {
// //           console.warn(err);
// //           setPermissionDenied(true);
// //           setLocation(defaultLocation);
// //           setLoading(false);
// //         }
// //       } else {
// //         getCurrentLocation();
// //       }
// //     };

// //     requestLocationPermission();
// //   }, []);

// //   const handleMapPress = e => {
// //     const coordinate = e.nativeEvent.coordinate;
// //     if (isChoosingSource) {
// //       setSource(coordinate);
// //       setIsChoosingSource(false);
// //     } else if (isChoosingDestination) {
// //       setDestination(coordinate);
// //       setIsChoosingDestination(false);
// //     }
// //   };

// //   const showCoordinates = () => {
// //     if (source && destination) {
// //       const distance =
// //         getDistance(
// //           {latitude: source.latitude, longitude: source.longitude},
// //           {latitude: destination.latitude, longitude: destination.longitude},
// //         ) / 1000;
// //       Alert.alert(
// //         'Coordinates and Distance',
// //         `Source: Lat ${source.latitude}, Lon ${source.longitude}\n` +
// //         `Destination: Lat ${destination.latitude}, Lon ${destination.longitude}\n` +
// //         `Distance: ${distance.toFixed(2)} km`
// //       );
// //     } else {
// //       Alert.alert(
// //         'Error',
// //         'Please select both source and destination coordinates.'
// //       );
// //     }
// //   };

// //   const removeSource = () => setSource(null);
// //   const removeDestination = () => setDestination(null);

// //   const zoomToMarker = marker => {
// //     if (mapRef.current && marker) {
// //       mapRef.current.animateToRegion({
// //         latitude: marker.latitude,
// //         longitude: marker.longitude,
// //         latitudeDelta: 0.05,
// //         longitudeDelta: 0.05,
// //       });
// //     }
// //   };

// //   return (
// //     <View style={styles.container}>
// //       {loading ? (
// //         <ActivityIndicator size="large" color="#0000ff" />
// //       ) : (
// //         <>
// //           {permissionDenied && (
// //             <View style={styles.banner}>
// //               <Text style={styles.bannerText}>
// //                 Showing default map because location permission was denied.
// //               </Text>
// //             </View>
// //           )}
// //           <MapView
// //             ref={mapRef}
// //             style={styles.map}
// //             showsUserLocation
// //             region={location}
// //             onPress={handleMapPress}
// //           >
// //             <Marker coordinate={location} />
// //             {source && (
// //               <Marker
// //                 coordinate={source}
// //                 title="Source"
// //                 description="Your source location"
// //                 pinColor="green"
// //                 onPress={() => zoomToMarker(source)}
// //               />
// //             )}
// //             {destination && (
// //               <Marker
// //                 coordinate={destination}
// //                 title="Destination"
// //                 description="Your destination location"
// //                 pinColor="blue"
// //                 onPress={() => zoomToMarker(destination)}
// //               />
// //             )}
// //             {source && destination && (
// //               <Polyline
// //                 coordinates={[source, destination]}
// //                 strokeColor="#000"
// //                 strokeWidth={2}
// //               />
// //             )}
// //           </MapView>

// //           {/* Floating Action Buttons (FABs) */}
// //           <View style={styles.fabContainer}>
// //             <MapButton
// //               title={isChoosingSource ? 'Selecting Source' : (source ? 'Remove Source' : 'Choose Source')}
// //               onPress={source ? removeSource : () => setIsChoosingSource(true)}
// //               active={isChoosingSource}
// //               disabled={isChoosingDestination}
// //             />
// //             <MapButton
// //               title={isChoosingDestination ? 'Selecting Dest' : (destination ? 'Remove Dest' : 'Choose Dest')}
// //               onPress={destination ? removeDestination : () => setIsChoosingDestination(true)}
// //               active={isChoosingDestination}
// //               disabled={isChoosingSource}
// //             />
// //             <MapButton
// //               title="Show Coords"
// //               onPress={showCoordinates}
// //               disabled={!source || !destination}
// //             />
// //           </View>
// //         </>
// //       )}
// //     </View>
// //   );
// // }

// // const styles = StyleSheet.create({
// //   container: {
// //     ...StyleSheet.absoluteFillObject,
// //   },
// //   map: {
// //     ...StyleSheet.absoluteFillObject,
// //   },

// //   // Banner for permission denial
// //   banner: {
// //     position: 'absolute',
// //     top: Platform.OS === 'ios' ? 50 : 20,
// //     left: 20,
// //     right: 20,
// //     backgroundColor: 'rgba(255,0,0,0.8)',
// //     padding: 8,
// //     borderRadius: 8,
// //     zIndex: 1000,
// //   },
// //   bannerText: {
// //     color: '#fff',
// //     textAlign: 'center',
// //   },

// //   fabContainer: {
// //     position: 'absolute',
// //     bottom: 15,
// //     left: 20,
// //     alignItems: 'center',
// //     gap: 10, // consistent spacing
// //   },

// //   button: {
// //     backgroundColor: '#fff',
// //     paddingVertical: 10,
// //     paddingHorizontal: 14,
// //     borderRadius: 20,
// //     elevation: 4,
// //     minWidth: 140,
// //     alignItems: 'center',
// //   },
// //   buttonActive: {
// //     borderWidth: 2,
// //     borderColor: '#000',
// //   },
// //   buttonDisabled: {
// //     opacity: 0.5,
// //   },
// //   buttonText: {
// //     fontSize: 14,
// //     color: 'blue',
// //     fontWeight: '600',
// //   },
// // });








// import React, { useEffect, useState, useRef } from 'react';
// import {
//   StyleSheet,
//   View,
//   Platform,
//   PermissionsAndroid,
//   Alert,
//   ActivityIndicator,
//   Text,
//   TouchableOpacity,
// } from 'react-native';
// import MapView, { Marker, Polyline, Circle } from 'react-native-maps'; // ← ADDED Circle
// import Geolocation from '@react-native-community/geolocation';
// import { getDistance } from 'geolib';

// // Custom MapButton component for consistent styling and accessibility
// const MapButton = ({ title, onPress, disabled, active }) => (
//   <TouchableOpacity
//     onPress={onPress}
//     disabled={disabled}
//     accessibilityLabel={title}
//     accessibilityHint={"Tap to " + title.toLowerCase()}
//     style={[
//       styles.button,
//       active && styles.buttonActive,
//       disabled && styles.buttonDisabled,
//     ]}
//   >
//     <Text style={styles.buttonText}>{title}</Text>
//   </TouchableOpacity>
// );

// export default function App() {
//   // ← REPLACED: single location state  
//   // const [location, setLocation] = useState(null);
//   const [geofenceCenter, setGeofenceCenter] = useState(null);   // fixed circle center
//   const [userLoc, setUserLoc] = useState(null);                 // live GPS updates

//   const [loading, setLoading] = useState(true);
//   const [source, setSource] = useState(null);
//   const [destination, setDestination] = useState(null);
//   const [isChoosingSource, setIsChoosingSource] = useState(false);
//   const [isChoosingDestination, setIsChoosingDestination] = useState(false);
//   const [permissionDenied, setPermissionDenied] = useState(false);
//   const [insideGeofence, setInsideGeofence] = useState(false);

//   const mapRef = useRef(null);

//   const defaultLocation = {
//     latitude: 37.78825,
//     longitude: -122.4324,
//     latitudeDelta: 0.0922,
//     longitudeDelta: 0.0421,
//   };

//   // Get initial fix, set both geofence center and userLoc
//   const getCurrentLocation = () => {
//     Geolocation.getCurrentPosition(
//       position => {
//         const { latitude, longitude } = position.coords;
//         const initial = {
//           latitude,
//           longitude,
//           latitudeDelta: 0.01,
//           longitudeDelta: 0.01,
//         };
//         setGeofenceCenter(initial);  // ← fixed circle center
//         setUserLoc(initial);         // ← initial user location
//         setLoading(false);
//       },
//       error => {
//         Alert.alert(
//           'Error',
//           `Failed to get your location: ${error.message}.` +
//             ' Showing default map region.'
//         );
//         setGeofenceCenter(defaultLocation);
//         setUserLoc(defaultLocation);
//         setLoading(false);
//       }
//     );
//   };

//   // Request permission on mount
//   useEffect(() => {
//     const requestLocationPermission = async () => {
//       if (Platform.OS === 'android') {
//         try {
//           const granted = await PermissionsAndroid.request(
//             PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//           );
//           if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//             getCurrentLocation();
//           } else {
//             Alert.alert(
//               'Permission Denied',
//               'Location permission is required. Showing default map.'
//             );
//             setPermissionDenied(true);
//             setGeofenceCenter(defaultLocation);
//             setUserLoc(defaultLocation);
//             setLoading(false);
//           }
//         } catch (err) {
//           console.warn(err);
//           setPermissionDenied(true);
//           setGeofenceCenter(defaultLocation);
//           setUserLoc(defaultLocation);
//           setLoading(false);
//         }
//       } else {
//         getCurrentLocation();
//       }
//     };

//     requestLocationPermission();
//   }, []);

//   // Watch for live updates to compute entry/exit
//   useEffect(() => {
//     let watchId;
//     if (!loading && !permissionDenied && geofenceCenter) {
//       watchId = Geolocation.watchPosition(
//         ({ coords }) => {
//           const { latitude, longitude } = coords;
//           setUserLoc({ latitude, longitude });  // ← live update

//           // distance from fixed center to live position
//           const dist = getDistance(
//             { latitude, longitude },
//             {
//               latitude: geofenceCenter.latitude,
//               longitude: geofenceCenter.longitude,
//             }
//           );
//           console.log('Dist to center:', dist, 'm');

//           const nowInside = dist <= 150;  // 150 m radius
//           if (nowInside && !insideGeofence) {
//             setInsideGeofence(true);
//             Alert.alert('Geofence', 'You have ENTERED the hostel area.');
//           } else if (!nowInside && insideGeofence) {
//             setInsideGeofence(false);
//             Alert.alert('Geofence', 'You have EXITED the hostel area.');
//           }
//         },
//         err => console.warn(err),
//         { enableHighAccuracy: true, distanceFilter: 1, interval: 3000 }
//       );
//     }
//     return () => {
//       if (watchId != null) Geolocation.clearWatch(watchId);
//     };
//   }, [loading, permissionDenied, insideGeofence, geofenceCenter]);

//   // Map taps for source/dest selection
//   const handleMapPress = e => {
//     const coordinate = e.nativeEvent.coordinate;
//     if (isChoosingSource) {
//       setSource(coordinate);
//       setIsChoosingSource(false);
//     } else if (isChoosingDestination) {
//       setDestination(coordinate);
//       setIsChoosingDestination(false);
//     }
//   };

//   // Show source→dest distance
//   const showCoordinates = () => {
//     if (source && destination) {
//       const distance =
//         getDistance(
//           { latitude: source.latitude, longitude: source.longitude },
//           { latitude: destination.latitude, longitude: destination.longitude },
//         ) / 1000;
//       Alert.alert(
//         'Coordinates and Distance',
//         `Source: Lat ${source.latitude}, Lon ${source.longitude}\n` +
//           `Destination: Lat ${destination.latitude}, Lon ${destination.longitude}\n` +
//           `Distance: ${distance.toFixed(2)} km`
//       );
//     } else {
//       Alert.alert('Error', 'Please select both source and destination.');
//     }
//   };

//   const removeSource = () => setSource(null);
//   const removeDestination = () => setDestination(null);

//   const zoomToMarker = marker => {
//     if (mapRef.current && marker) {
//       mapRef.current.animateToRegion({
//         latitude: marker.latitude,
//         longitude: marker.longitude,
//         latitudeDelta: 0.05,
//         longitudeDelta: 0.05,
//       });
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {loading ? (
//         <ActivityIndicator size="large" color="#0000ff" />
//       ) : (
//         <>
//           {permissionDenied && (
//             <View style={styles.banner}>
//               <Text style={styles.bannerText}>
//                 Location permission denied — showing default map.
//               </Text>
//             </View>
//           )}

//           {/* Status banner */}
//           {geofenceCenter && (
//             <View style={styles.geofenceStatus}>
//               <Text style={{ color: insideGeofence ? 'green' : 'red' }}>
//                 {insideGeofence
//                   ? 'INSIDE HOSTEL AREA'
//                   : 'OUTSIDE HOSTEL AREA'}
//               </Text>
//             </View>
//           )}

//           <MapView
//             ref={mapRef}
//             style={styles.map}
//             showsUserLocation={false}          // ← hide built-in dot
//             initialRegion={geofenceCenter}     // ← center map on circle
//             onPress={handleMapPress}
//           >
//             {/* Geofence circle */}
//             {geofenceCenter && (
//               <Circle
//                 center={geofenceCenter}
//                 radius={150}                    // 150 m
//                 strokeWidth={2}
//                 strokeColor="rgba(255,0,0,0.8)"
//                 fillColor="rgba(255,0,0,0.3)"
//               />
//             )}

//             {/* Blue, movable user dot */}
//             {userLoc && (
//               <Marker
//                 coordinate={userLoc}
//                 pinColor="blue"
//               />
//             )}

//             {/* Source & Destination markers */}
//             {source && (
//               <Marker
//                 coordinate={source}
//                 title="Source"
//                 description="Your source location"
//                 pinColor="green"
//                 onPress={() => zoomToMarker(source)}
//               />
//             )}
//             {destination && (
//               <Marker
//                 coordinate={destination}
//                 title="Destination"
//                 description="Your destination location"
//                 pinColor="blue"
//                 onPress={() => zoomToMarker(destination)}
//               />
//             )}

//             {/* Polyline if both chosen */}
//             {source && destination && (
//               <Polyline
//                 coordinates={[source, destination]}
//                 strokeColor="#000"
//                 strokeWidth={2}
//               />
//             )}
//           </MapView>

//           {/* Floating Action Buttons */}
//           <View style={styles.fabContainer}>
//             <MapButton
//               title={
//                 isChoosingSource
//                   ? 'Selecting Source'
//                   : source
//                   ? 'Remove Source'
//                   : 'Choose Source'
//               }
//               onPress={source ? removeSource : () => setIsChoosingSource(true)}
//               active={isChoosingSource}
//               disabled={isChoosingDestination}
//             />
//             <MapButton
//               title={
//                 isChoosingDestination
//                   ? 'Selecting Dest'
//                   : destination
//                   ? 'Remove Dest'
//                   : 'Choose Dest'
//               }
//               onPress={
//                 destination
//                   ? removeDestination
//                   : () => setIsChoosingDestination(true)
//               }
//               active={isChoosingDestination}
//               disabled={isChoosingSource}
//             />
//             <MapButton
//               title="Show Coords"
//               onPress={showCoordinates}
//               disabled={!source || !destination}
//             />
//           </View>
//         </>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   banner: {
//     position: 'absolute',
//     top: Platform.OS === 'ios' ? 50 : 20,
//     left: 20,
//     right: 20,
//     backgroundColor: 'rgba(255,0,0,0.8)',
//     padding: 8,
//     borderRadius: 8,
//     zIndex: 1000,
//   },
//   bannerText: {
//     color: '#fff',
//     textAlign: 'center',
//   },
//   geofenceStatus: {
//     position: 'absolute',
//     top: Platform.OS === 'ios' ? 100 : 70,
//     left: 20,
//     padding: 6,
//     backgroundColor: 'rgba(255,255,255,0.9)',
//     borderRadius: 4,
//     zIndex: 1000,
//   },
//   fabContainer: {
//     position: 'absolute',
//     bottom: 15,
//     left: 20,
//     alignItems: 'center',
//     gap: 10,
//   },
//   button: {
//     backgroundColor: '#fff',
//     paddingVertical: 10,
//     paddingHorizontal: 14,
//     borderRadius: 20,
//     elevation: 4,
//     minWidth: 140,
//     alignItems: 'center',
//   },
//   buttonActive: {
//     borderWidth: 2,
//     borderColor: '#000',
//   },
//   buttonDisabled: {
//     opacity: 0.5,
//   },
//   buttonText: {
//     fontSize: 14,
//     color: 'blue',
//     fontWeight: '600',
//   },
// });





















import React, { useEffect, useState } from 'react';
import {
  View, Text, Platform, PermissionsAndroid,
  Alert, ActivityIndicator, StyleSheet,
} from 'react-native';
import MapView, { Circle } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import { getDistance } from 'geolib';
import axios from 'axios';

export default function AttendancePage() {
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [insideGeofence, setInsideGeofence] = useState(false);
  const [distToCenter, setDistToCenter] = useState(null);

  const HOSTEL_CENTER = { latitude: 12.6615160, longitude: 77.4505830 };
  const RADIUS = 150;

  useEffect(() => {
    const requestLocation = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          Alert.alert('Permission denied');
          setLocation({ ...HOSTEL_CENTER, latitudeDelta: .01, longitudeDelta: .01 });
          setLoading(false);
          return;
        }
      }
      Geolocation.getCurrentPosition(({ coords }) => {
        const loc = { ...coords, latitudeDelta: .01, longitudeDelta: .01 };
        setLocation(loc);
        const d = getDistance(coords, HOSTEL_CENTER);
        setDistToCenter(d);
        setInsideGeofence(d <= RADIUS);
        setLoading(false);
      }, err => Alert.alert(err.message));
    };
    requestLocation();
  }, []);

  useEffect(() => {
    let id;
    if (!loading && location) {
      id = Geolocation.watchPosition(({ coords }) => {
        const d = getDistance(coords, HOSTEL_CENTER);
        setDistToCenter(d);
        const nowIn = d <= RADIUS;
        if (nowIn && !insideGeofence) {
          setInsideGeofence(true);
          axios.post('http://10.0.2.2:5000/api/attendance/checkin', {
            studentId: 'STUDENT_ID_123',
          }).catch(console.warn);
          Alert.alert('Checked in!');
        } else if (!nowIn && insideGeofence) {
          setInsideGeofence(false);
        }
      }, console.warn, { enableHighAccuracy: true, interval: 3000, distanceFilter: 1 });
    }
    return () => id && Geolocation.clearWatch(id);
  }, [loading, insideGeofence, location]);

  if (loading || !location) return <ActivityIndicator style={{flex:1}} />;

  return (
    <View style={{flex:1}}>
      <MapView style={{flex:1}} region={location} showsUserLocation>
        <Circle center={HOSTEL_CENTER} radius={RADIUS}
          strokeColor="rgba(0, 200, 0, 0.85)" fillColor="rgba(0, 200, 0, 0.3)" />
      </MapView>
      <View style={styles.status}>
        <Text style={{color: insideGeofence?'green':'red'}}>
          {insideGeofence?'INSIDE HOSTEL AREA':'OUTSIDE HOSTEL AREA'}
        </Text>
        <Text>Distance: {distToCenter} m</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  status: {
    position: 'absolute', top: 40, left: 20,
    backgroundColor: 'rgba(255,255,255,0.9)', padding: 8, borderRadius: 6
  }
});








// // AttendancePage.jsx
// import React, { useEffect, useState, useRef } from 'react';
// import {
//   View, Text, Platform, PermissionsAndroid,
//   Alert, ActivityIndicator, StyleSheet,
// } from 'react-native';
// import MapView, { Circle } from 'react-native-maps';
// import Geolocation from '@react-native-community/geolocation';
// import { getDistance } from 'geolib';
// import axios from 'axios';

// // 👇 Choose the right host for emulator vs. device
// const BASE_URL =
//   Platform.OS === 'android'
//     ? 'http://10.0.2.2:5000'
//     : 'http://localhost:5000';

// export default function AttendancePage() {
//   const [location, setLocation] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [insideGeofence, setInsideGeofence] = useState(false);
//   const insideRef = useRef(false);
//   const [distToCenter, setDistToCenter] = useState(null);

//   // Hostel location + radius
//   const HOSTEL_CENTER = { latitude: 12.6615160, longitude: 77.4505830 };
//   const RADIUS = 150; // meters

//   // 1️⃣ Get initial location & permission
//   useEffect(() => {
//     const requestLocation = async () => {
//       if (Platform.OS === 'android') {
//         const granted = await PermissionsAndroid.request(
//           PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
//         );
//         if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
//           Alert.alert('Permission denied');
//           setLocation({ ...HOSTEL_CENTER, latitudeDelta: 0.01, longitudeDelta: 0.01 });
//           setLoading(false); // make sure we exit loading
//           return;
//         }
//       }

//       Geolocation.getCurrentPosition(
//         ({ coords }) => {
//           console.log('[GEO] initial coords:', coords);
//           const loc = { ...coords, latitudeDelta: 0.01, longitudeDelta: 0.01 };
//           setLocation(loc);

//           const d = getDistance(coords, HOSTEL_CENTER);
//           console.log('[GEO] dist to center:', d);
//           setDistToCenter(d);
//           setInsideGeofence(d <= RADIUS);
//           insideRef.current = d <= RADIUS;
//           setLoading(false);
//         },
//         err => {
//           Alert.alert(err.message);
//           setLoading(false);
//         },
//         { enableHighAccuracy: true }
//       );
//     };

//     requestLocation();
//   }, []);

//   // 2️⃣ Watch for geofence transitions
//   useEffect(() => {
//     let watchId;
//     if (!loading && location) {
//       watchId = Geolocation.watchPosition(
//         ({ coords }) => {
//           console.log('[GEO] watch coords:', coords);
//           const d = getDistance(coords, HOSTEL_CENTER);
//           console.log('[GEO] watched dist:', d, 'inside?', d <= RADIUS);
//           setDistToCenter(d);

//           const nowIn = d <= RADIUS;
//           // ENTER transition
//           if (nowIn && !insideRef.current) {
//             insideRef.current = true;
//             setInsideGeofence(true);
//             console.log('[API] Posting check-in…');
//             axios
//               .post(`${BASE_URL}/api/attendance/checkin`, {
//                 studentId: 'STUDENT_ID_123',
//               })
//               .then(res => console.log('[API] checkin response:', res.data))
//               .catch(err => console.warn('[API] checkin error:', err.message));
//             Alert.alert('Checked in!');
//           }
//           // EXIT transition
//           else if (!nowIn && insideRef.current) {
//             insideRef.current = false;
//             setInsideGeofence(false);
//           }
//         },
//         err => console.warn('[GEO] watch error:', err.message),
//         { enableHighAccuracy: true, interval: 3000, distanceFilter: 1 }
//       );
//     }

//     return () => {
//       if (watchId != null) Geolocation.clearWatch(watchId);
//     };
//   }, [loading, location]);

//   if (loading || !location) {
//     return <ActivityIndicator style={{ flex: 1 }} size="large" />;
//   }

//   return (
//     <View style={{ flex: 1 }}>
//       <MapView style={{ flex: 1 }} region={location} showsUserLocation>
//         <Circle
//           center={HOSTEL_CENTER}
//           radius={RADIUS}
//           strokeColor="rgba(0,200,0,0.85)"
//           fillColor="rgba(0,200,0,0.3)"
//         />
//       </MapView>
//       <View style={styles.status}>
//         <Text style={{ color: insideGeofence ? 'green' : 'red' }}>
//           {insideGeofence ? 'INSIDE HOSTEL AREA' : 'OUTSIDE HOSTEL AREA'}
//         </Text>
//         <Text>Distance: {distToCenter} m</Text>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   status: {
//     position: 'absolute',
//     top: 40,
//     left: 20,
//     backgroundColor: 'rgba(255,255,255,0.9)',
//     padding: 8,
//     borderRadius: 6,
//   },
// });
