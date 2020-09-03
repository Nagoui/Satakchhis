import { WebView } from 'react-native-webview';
import Icon from 'react-native-vector-icons/FontAwesome'
import Icons from 'react-native-vector-icons/Feather'
import Icone from 'react-native-vector-icons/Entypo'
import RNWebView from './src/Component/RNWebView.js';
import SignIn from './src/Component/SignIn.js';
import GetStarted from './src/Component/GetStarted.js';
import FingureApp from './src/Component/FingureApp.js';
import BiometricPopup from './src/Component/FingerprintPopup.component.android.js';
// import User from './src/Component/User.js';
import * as React from 'react';
import {ToastAndroid, ImageBackground,View, Text,StyleSheet,Button,Image,TouchableOpacity,Dimensions,AsyncStorage,disableYellowBox,Alert, BackHandler } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';
import Animated from 'react-native-reanimated';
import { createStackNavigator } from '@react-navigation/stack';
import Route from './src/Component/Route.js';
import Firebase from './src/Component/Firebase.js';
// import Feather from "react-native-vector-icons/Feather";
const {width,height} =  Dimensions.get('window');

class Dashboard extends React.Component {
  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress',this.handleBackButton);
    // this.handleFingerprintShowed();

    // AppState.addEventListener('change', this.handleAppStateChange);
    // // Get initial fingerprint enrolled
    // this.detectFingerprintAvailable();
  }
handleBackButton(){
  return true;
}
  render(){
    
  console.disableYellowBox=true;

    return <WebView source={{ uri: 'https://reactnative.dev/' }} />
  }
}

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const Screens = ({ navigation, style }) => {
  return (
    // <Animated.View style={StyleSheet.flatten([styles.stack, style])}>
    <Animated.View style={[{flex:1,overflow:'hidden'},style]}>
      <Stack.Navigator
      initialRouteName='Route'
      >
<Stack.Screen 
                   options={{
                     headerLeft:null,
                     headerTitle:'Make Your Trip',
                     headerTintColor:'darkorange',
                    //  Swipe:false,
            headerRight: (props) => (
              <Icon.Button name='bars' onPress={()=>navigation.openDrawer()} backgroundColor='white' paddingRight={10} color='blue' size={28}/>
            ),
          }}
        name="Home">{props => <Dashboard {...props} />}</Stack.Screen>
      
        <Stack.Screen name="Route">{props => <Route {...props} />}</Stack.Screen>
        <Stack.Screen options={{headerShown:false}} name="SignIn">{props => <SignIn {...props} />}</Stack.Screen>
        <Stack.Screen options={{headerShown:false}} name="GetStarted">{props => <GetStarted {...props} />}</Stack.Screen>
      
        <Stack.Screen 
    options={{headerShown:false}}
        
        name="Fingure">{props => <FingureApp {...props} />}</Stack.Screen>
        <Stack.Screen name="App_Flutter">{props => <BiometricPopup {...props} />}</Stack.Screen>

      
         <Stack.Screen options={{headerShown:false}} name="SignUp">{props => <RNWebView {...props} />}</Stack.Screen>

        {/*<Stack.Screen name="App_Blog">{props => <App_Blog {...props} />}</Stack.Screen>
        <Stack.Screen name="Tinder">{props => <Tinder {...props} />}</Stack.Screen> */}
      </Stack.Navigator>
    </Animated.View>
  );
};
const CustomDrawerContent = props => {


  return (
 
    <DrawerContentScrollView {...props} scrollEnabled={false} >

    
     <Animated.View>

     <Image resizeMode="center" source={require('./src/Component/assets/IMG-20200719-WA0006.jpg')} style={{ height: 100, width: 100, borderRadius: 770, left: 50, top: 0 }}/>
     
        {/* <Image
            source={{
              uri: 'https://img1.ak.crunchyroll.com/i/spire2/4c140a2f461c56bfbef3894f7eab7c701361079581_full.jpg',
              height: 60,
              width: 60,
              scale: 0.5,
              // right:50,
            }}
            resizeMode="center"
            // style={styles.avatar}
          style={{ height: 100, width: 100, borderRadius: 770, left: 50, top: 0 }}

          /> */}
          <Text white title  style={{left:10,padding:5}}>
            Welcome to the Make Your Trip
          </Text>
          {/* <Text style={{color:'red',left:10}}>
            contact@react-ui-kit.com
          </Text> */}
          {/* <Text/> */}
          <DrawerItem
            label="Sign In"
            labelStyle={styles.drawerLabel}
            style={styles.drawerItem}
            onPress={() => props.navigation.navigate('SignIn')}
            // onPress={() =>ToastAndroid.show('Page is not ready Please wait for next update',ToastAndroid.SHORT)}
            
            icon={() => 
              <Icons.Button name='log-in' onPress={()=>navigation.openDrawer()} backgroundColor='transparent' paddingRight={1} color='lightgreen' size={28}/>

              //  <Image
              // style={{ height: 30, width: 30, borderRadius: 770 }}
              // source={{ uri: 'https://img1.ak.crunchyroll.com/i/spire2/4c140a2f461c56bfbef3894f7eab7c701361079581_full.jpg' }}
          
              // />
          }
          />
          
          {/* <Text/> */}
          {/* <Text/> */}
          <DrawerItem
            label="Sign Up"
            labelStyle={{ color: 'blue', marginLeft: -16 ,fontSize:18}}
            style={{ alignItems: 'flex-start', marginVertical: 0 }}
            onPress={() => props.navigation.navigate('SignUp')}
            
            icon={() =>  
          
              <Icone.Button name='add-user' onPress={()=>navigation.openDrawer()} backgroundColor='transparent' paddingRight={0} color='skyblue' size={28}/>
              // <Image
            //   style={{ height: 30, width: 30, borderRadius: 770 }}
            //   source={{ uri: 'https://img1.ak.crunchyroll.com/i/spire2/4c140a2f461c56bfbef3894f7eab7c701361079581_full.jpg' }}
            // />
          }
            // icon={() => <AntDesign name="message1" color="white" size={16} />}
          />
          {/* <Text/> */}
          {/* <Text/> */}
          <DrawerItem
            label="LogOut"
            labelStyle={{ color: 'red', marginLeft: -16,fontSize:18 }}
            style={{ alignItems: 'flex-start', marginVertical: 0 }}
            // onPress={() => AsyncStorage.clear()}
            onPress={()=>{
              Alert.alert(
                'Log out',
                'Are You Sure want to logout',[
                {text:'Yes',onPress:()=>{Firebase.auth().signOut(),BackHandler.exitApp()}},
                // {text:'Yes',onPress:()=>{AsyncStorage.clear(),BackHandler.exitApp()}},
                {text:'Cancel'},
                // text
              ]
              )
            }}
            icon={() =>
              <Icons.Button name='log-out' onPress={()=>navigation.openDrawer()} backgroundColor='transparent' paddingRight={1} color='orange' size={28}/>

            // <Image
            //   style={{ height: 30, width: 30, borderRadius: 770 }}
            //   source={{ uri: 'https://img1.ak.crunchyroll.com/i/spire2/4c140a2f461c56bfbef3894f7eab7c701361079581_full.jpg' }}
            // />
          }
            // icon={() => <AntDesign name="phone" color="white" size={16} />}
          />
         
      </Animated.View>
    </DrawerContentScrollView>
  );
}


function MyDrawer() {
  const [progress, setProgress] = React.useState(new Animated.Value(0));
  const scale = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [1, 0.8],
  });
  const borderRadius = Animated.interpolate(progress, {
    inputRange: [0, 1],
    outputRange: [0, 10],
  });
 

  const animatedStyle = { borderRadius, transform: [{ scale }] };
  return (
    // <Animated.View style={{flex:1,backgroundColor:'skyblue'}}>
      <ImageBackground
      blurRadius={0}
      style={{width:width,height:height,position:'absolute'}}
          // style={{ height: 100, width: 100, borderRadius: 770, left: 70, top: 0 }}
          source={{ uri: 'https://flashwallpapers.com/ws/1/51216.jpg' }}
        >
    <Drawer.Navigator
    drawerType='front'
    drawerPosition='right'
    overlayColor="transparent"
    drawerStyle={styles.drawerStyles}
    initialRouteName="Dashboard"
    drawerStyle={{width:'50%',height:height/2,backgroundColor:'gray',alignItems:'center',borderRadius:20}}
    contentContainerStyle={{ flex: 1 }}
    drawerContentOptions={{
      activeBackgroundColor: 'red',
      activeTintColor: 'green',
      inactiveTintColor: 'green',
    }}
    // drawerType={isLargeScreen ? 'slide' : 'back'}
              // drawerStyle={isLargeScreen ? null : { width: '570%',top:-5 }}
              sceneContainerStyle={{
                backgroundColor:"transparent",
                
              }}
              
// drawerPosition="right"
    // sceneContainerStyle={{ backgroundColor: 'yellow' }}

     drawerContent={props =>  {
      setProgress(props.progress);
      return    <CustomDrawerContent {...props} />}}>

      <Drawer.Screen name="Screens">
      {props => <Screens {...props} style={animatedStyle} />}
        </Drawer.Screen>
    </Drawer.Navigator>
     {/* </Animated.View> */}
     </ImageBackground>
  );
}

export default function SwipeAbleDrawer() {
  return (
    // <View style={{position:'absolute'}}>
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
    // </View>
  );
}


const styles = StyleSheet.create({
  stack: {
    flex: 1,
    overflow:'hidden',
    // width:300,
    
    shadowColor: '#FFF',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 5,
  },
  // drawerStyles: { top:-5,backgroundColor: 'transparent' },
  drawerItem: { alignItems: 'flex-start', marginVertical: 0 },
  drawerLabel: { color: 'green', marginLeft: -16,fontSize:18 },
  avatar: {
    borderRadius: 60,
    marginBottom: 16,
    borderColor: 'transparent',
    borderWidth: StyleSheet.hairlineWidth,
  },
});







