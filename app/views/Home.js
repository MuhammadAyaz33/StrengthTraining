import React, { Component } from 'react';
import { Button, Header, Left, Body, Right, Title, Subtitle, Icon} from 'native-base';
import { View ,Text,Image,TouchableOpacity} from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';

export default class Home extends Component {
    static navigationOptions = () => ({
        title: 'Strength Training',
        headerTintColor: '#fff',
        headerTitleStyle: { 
            textAlign:"center", 
            flex:1 
        },
        headerStyle: {
          backgroundColor: 'red'
        },
    });
    // showMsg() {
    //   this.setState({showMsg: true}, () => timer.setTimeout(
    //     this, 'hideMsg', () => this.setState({showMsg: false}), 2000
    //   ));
    // }
  render() {
    const {
      containerStyle,
      circle,
      boltTxt,
      textStyle,
      makeCenter,
    } = myStyle
    return (
        <View style={containerStyle}>
          <View style={circle}>
            <View style={makeCenter}>
                <Image source={require('../assets/icons/heart.png')} style={{width:50,height:40}}/>
                <Text style={boltTxt}>120</Text>
                <Text style={{borderBottomWidth:1,borderColor:'blue',width:250}}></Text>
            </View>
            <Grid>
              <Row>
                <Col style={[{height: 100},makeCenter ]}>
                  <Text style={{textStyle}}>Elapsed</Text>
                  <Text style={boltTxt}>19:23</Text>
                </Col>
                <Text style={{borderRightWidth:1,borderColor:'blue',marginTop:10}}></Text>
                <Col style={[{height: 140} ,makeCenter]}>
                  <Text style={{textStyle}}>Set 7</Text>
                  <Text style={boltTxt}>19:23</Text>
                  <TouchableOpacity>
                    <Text style={[textStyle,{marginTop:20}]}>Next Set</Text>
                  </TouchableOpacity>
                </Col>
              </Row>
             
              <View style={makeCenter}>
                <TouchableOpacity>
                  <Text style={[textStyle,{marginTop:10,marginBottom:10}]}>End Workout</Text>
                </TouchableOpacity>
              </View>
            </Grid>
          </View>
        </View>
    );
  }
}
const myStyle = {
  containerStyle:{
      flex:1,
      justifyContent:'center',
      alignItems:'center'
  },
  circle:{
      borderColor:'red',
      borderRadius:150,
      borderWidth:3,
      height:300,
      paddingHorizontal:25,
      paddingVertical:10
  },
  boltTxt:{
    fontWeight:'bold',
    fontSize:22,
    marginTop:10
  },
  textStyle:{
    fontWeight:'100' ,
    fontSize:14
  },
  makeCenter:{
    justifyContent:'center',
    alignItems:'center'
  }
}