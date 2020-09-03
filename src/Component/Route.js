import React from 'react'
import { View, TextInput, StyleSheet, TouchableOpacity, Text, Button,AsyncStorage,ActivityIndicator } from 'react-native'
// import Firebase from './DrawerNavigations/Firebase.js';
// import firebase from 'react-native-firebase';
import Firebase from './Firebase.js';

// import User from './User.js';

class Route extends React.Component {
    state = {
        email: '',
        password: '',
        phone: '',
        name: '',
        username: '',
        password: '',
        loginuser: '',
        loginpass: '',
    }
    // componentDidMount = async () => {
    //     User.loginuser = await AsyncStorage.getItem('username')
    //     // User.loginuser = await AsyncStorage.getItem('loginuser')
    //     this.props.navigation.navigate(User.loginuser ?  'Fingure':'Home' );

    // }
    componentDidMount () {
        Firebase.auth().onAuthStateChanged((user)=>{
            if(user){
                // this.setState({isLoading:true})
                // this.setState({isSignout:false})
                this.props.navigation.navigate('Fingure')
    
            }
            else{
              // this.setState({isLoading:false})
              // this.setState({isSignout:true})
              this.props.navigation.navigate('GetStarted')
            //   this.props.navigation.navigate('Home')
    
            }
        })
      }
    
    // handleLogin = async () => {
    //     // alert('login')
    //     const { email, password } = this.state
    //     await AsyncStorage.setItem('loginuser', this.state.email)
        
    //     User.username5 = this.state.email;
    //     // alert('2')
    //     // Firebase.auth()
    //     //     .signInWithEmailAndPassword(email, password)
    //     //     // alert('3')
    //     //     .then(this.LoginCorrect)

    //     //     .then(() => this.props.navigation.navigate('Home'))
    //     //     .catch(error => console.warn(error))
    //     //     // .catch(error => console.warn(error))
            
    //     //     .catch(this.LoginError)

    // }
    // LoginCorrect= async () =>{
    //     await AsyncStorage.setItem('loginuser', this.state.email)
    //     alert('hi')
    // }
    // LoginError(){
    //     // alert('Enter Correct username')
    //     {this.props.navigation.navigate('Home')}
    // }
    render() {
        return (
            // <View></View>
        // );
            <View style={styles.container}>
            <ActivityIndicator/>

    {/* //             <TextInput
    //                 style={styles.inputBox}
    //                 value={this.state.email}
    //                 onChangeText={email => this.setState({ email })}
    //                 placeholder='Email'
    //                 autoCapitalize='none'
    //                 keyboardType='email-address'
    //             />
    //             <TextInput
    //                 style={styles.inputBox}
    //                 value={this.state.password}
    //                 onChangeText={password => this.setState({ password })}
    //                 placeholder='Password'
    //                 secureTextEntry={true}
    //             />
    //             <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
    //                 <Text style={styles.buttonText}>Login</Text>
    //             </TouchableOpacity>
    //             <View style={{width:'70%',
    //     flexDirection: 'row',
    //     alignItems:'center'
    //     // justifyContent: 'space-between',
    //    }}>
    //                 <Text>Don't have an account yet? </Text>
    //             <TouchableOpacity onPress={() => this.props.navigation.navigate('Registration')}>

    //                 <Text style={{borderBottomWidth:2,color:'blue',fontFamily:'bold'}}>Sign up</Text>
    //             </TouchableOpacity>
                
    //           
    //             </View>
            
    //         {/* <TouchableOpacity
    //             onPress={() => this.props.navigation.navigate('Home')}
    //             // style={styles.ryegister}
    //         >
    //             <Text style={{fontSize:20}}>Click here</Text>
    //         </TouchableOpacity>  */}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputBox: {
        width: '85%',
        margin: 10,
        padding: 15,
        fontSize: 16,
        borderColor: '#d3d3d3',
        borderBottomWidth: 1,
        textAlign: 'center'
    },
    button: {
        marginTop: 30,
        marginBottom: 20,
        paddingVertical: 5,
        alignItems: 'center',
        backgroundColor: '#F6820D',
        borderColor: '#F6820D',
        borderWidth: 1,
        borderRadius: 5,
        width: 200
    },
    buttonText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#fff'
    },
    buttonSignup: {
        fontSize: 12
    }
})

export default Route;
