import React, { Component } from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  AppState,
  StatusBar,
  Alert,
  disableYellowBox,
  BackHandler,
} from 'react-native';
import FingerprintScanner from 'react-native-fingerprint-scanner';

import styles from './Application.container.styles';
import FingerprintPopup from './FingerprintPopup.component';

class Application extends Component {

  constructor(props) {
    super(props);
    this.state = {
      errorMessage: undefined,
      biometric: undefined,
      popupShowed: false
    };
    this.handleFingerprintShowed();
  }

  handleFingerprintShowed = () => {
    this.setState({ popupShowed: true });
  };

  handleFingerprintDismissed = () => {
    this.setState({ popupShowed: false });
  };
  OK = () => {
      // alert('yo')
        // Alert.alert(' successfully');

      this.props.navigation.navigate('Home')
    // this.setState({ popupShowed: false });
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress',this.handleBackButton);
    this.handleFingerprintShowed();

    AppState.addEventListener('change', this.handleAppStateChange);
    // Get initial fingerprint enrolled
    this.detectFingerprintAvailable();
  }
handleBackButton(){
  return true;
}
  componentWillUnmount() {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  detectFingerprintAvailable = () => {
    FingerprintScanner
      .isSensorAvailable()
      .catch(error => this.setState({ errorMessage: error.message, biometric: error.biometric }));
  }

  handleAppStateChange = (nextAppState) => {
    if (this.state.appState && this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
      FingerprintScanner.release();
      this.detectFingerprintAvailable();
    }
    this.setState({ appState: nextAppState });
  }

  render() {
    console.disableYellowBox=true;

    const { errorMessage, biometric, popupShowed } = this.state;

    return (
      <View style={styles.container}>
        <StatusBar backgroundColor='#00a4de' />
        <Text style={styles.heading}>
          Welcome to the MAKE YOUR TRIP
        </Text>
        {/* <Text style={styles.subheading}>
          Information or kuch bhze likh do yaha
        </Text> */}

        <TouchableOpacity
          style={styles.fingerprint}
          onPress={this.handleFingerprintShowed}
          // onPress={this.OK}
          disabled={!!errorMessage}
        >
          <Image source={require('./assets/finger_print.png')} />
        </TouchableOpacity>

        {errorMessage && (
          <Text style={styles.errorMessage}>
            {errorMessage} {biometric}
          </Text>
        )}

        {popupShowed && (
          <FingerprintPopup
            style={styles.popup}
            handlePopupDismissed={this.handleFingerprintDismissed}
            handlePopupJump={this.OK}
            // handlePopupDismissedJum={this.props.navigation.navigate('Home')}
          />
        )}

      </View>
    );
  }
}

export default Application;









// import React, { Component } from 'react';
// import {
//   Alert,
//   StyleSheet,
//   Text,
//   TouchableHighlight,
//   View,
//   NativeModules
// } from 'react-native';

// import TouchID from "react-native-touch-id";

// export default class App extends Component<{}> {
//   constructor() {
//     super()
    
//     this.state = {
//       biometryType: null
//     };
//   }
  

//   componentDidMount() {
//     TouchID.isSupported()
//   .then(biometryType => {
//     // Success code
//     if (biometryType === 'FaceID') {
//         alert('FaceID is supported.');
//     } else {
//         alert('TouchID is supported.');
//     }
//   })
//   .catch(error => {
//     // Failure code
//     console.log(error);
//   });
//   }

//   render() {
    
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           react-native-touch-id
//         </Text>

//         <Text style={styles.instructions}>
//           github.com/naoufal/react-native-touch-id
//         </Text>
//         <TouchableHighlight
//           style={styles.btn}
//           onPress={this._clickHandler}
//           underlayColor="#0380BE"
//           activeOpacity={1}
//         >
//           <Text style={{
//             color: '#fff',
//             fontWeight: '600'
//           }}>
//             {`Authenticate with ${this.state.biometryType}`}
//           </Text>
//         </TouchableHighlight>
//       </View>
//     );
//   }

//   _clickHandler() {
//           TouchID.authenticate('to demo this react-native component')
//         .then(success => {
//           Alert.alert('Authenticated Successfully');
//         })
//         .catch(error => {
//           Alert.alert('Authentication Failed');
//         });
    
//      }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF'
//   },
//   welcome: {
//     margin: 10,
//     fontSize: 20,
//     fontWeight: '600',
//     textAlign: 'center'
//   },
//   instructions: {
//     marginBottom: 5,
//     color: '#333333',
//     fontSize: 13,
//     textAlign: 'center'
//   },
//   btn: {
//     borderRadius: 3,
//     marginTop: 200,
//     paddingTop: 15,
//     paddingBottom: 15,
//     paddingLeft: 15,
//     paddingRight: 15,
//     backgroundColor: '#0391D7'
//   }
// });

// const errors = {
//   "LAErrorAuthenticationFailed": "Authentication was not successful because the user failed to provide valid credentials.",
//   "LAErrorUserCancel": "Authentication was canceled by the user—for example, the user tapped Cancel in the dialog.",
//   "LAErrorUserFallback": "Authentication was canceled because the user tapped the fallback button (Enter Password).",
//   "LAErrorSystemCancel": "Authentication was canceled by system—for example, if another application came to foreground while the authentication dialog was up.",
//   "LAErrorPasscodeNotSet": "Authentication could not start because the passcode is not set on the device.",
//   "LAErrorTouchIDNotAvailable": "Authentication could not start because Touch ID is not available on the device",
//   "LAErrorTouchIDNotEnrolled": "Authentication could not start because Touch ID has no enrolled fingers.",
//   "RCTTouchIDUnknownError": "Could not authenticate for an unknown reason.",
//   "RCTTouchIDNotSupported": "Device does not support Touch ID."
// };

// function authenticate() {
//   return TouchID.authenticate()
//     .then(success => {
//       AlertIOS.alert('Authenticated Successfully');
//     })
//     .catch(error => {
//       console.log(error)
//       AlertIOS.alert(error.message);
//     });
// }

// function passcodeAuth() {
//   return PasscodeAuth.isSupported()
//     .then(() => {
//       return PasscodeAuth.authenticate()
//     })
//     .then(success => {
//       AlertIOS.alert('Authenticated Successfully');
//     })
//     .catch(error => {
//       console.log(error)
//       AlertIOS.alert(error.message);
//     });
// }