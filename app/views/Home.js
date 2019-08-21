import React, { Component } from 'react';
import { View ,Text,Image,TouchableOpacity} from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import moment from 'moment';
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
    constructor() {
      super()
      this.state = {setCount: 1, elapsedTime: "00:00", setTime: "00:00", Workout: true, workoutData: {setTime: []}}
    }
    nextSet = () => {
      console.log(this.state.setTime, this.state.elapsedTime)
      if(!this.state.Workout) {
        this.setState((state) => {
          return  {
            setCount: state.setCount + 1, 
            workoutData: {setCount: state.setCount, setTime: [...state.workoutData.setTime, state.setTime], elapsedTime: state.elapsedTime},
            setTime: "00:00"
          }
        })
        this.stopTimer(this.state.setTimeInterval)
        // this.startSetTimer()
        this.countDown()
      }
      console.log(this.state.workoutData)
    }
    startTimer = () => {
      var startTimestamp = moment().startOf("day");
      var interval = setInterval(() => { 
        this.setState(() => {
          return {elapsedTime: this.countUp(startTimestamp)}
        })
      }, 1000)
      this.setState(() => {return {elapsedTimeInterval: interval}})
    }

    countDown = () => {
      console.log("CAlled")
      var time = 78;
      var duration = moment.duration(time * 1000, 'milliseconds');

      var interval = setInterval(() => {
        duration = moment.duration(duration.asMilliseconds() - 1000, 'milliseconds');
        console.log(moment(duration.asMilliseconds()).format('mm:ss'))
        this.setState(() => {
          return {setTime: moment(duration.asMilliseconds()).format('mm:ss')}
        })
      }, 1000)
      this.setState(() => {return {setTimeInterval: interval}})

    }
    countUp = (startTimestamp) => {
        startTimestamp.add(1, 'second');
        return startTimestamp.format('mm:ss')
    }
    stopTimer = (interval) => {
      clearInterval(interval)
    }
    toggleWorkout = () => {
      this.setState((state) => {
        return {Workout: !state.Workout, elapsedTime: "00:00", setTime: "00:00", setCount: 1,  workoutData: {setTime: []}}
      })
      if(!this.state.Workout){
        this.stopTimer(this.state.elapsedTimeInterval)
        this.stopTimer(this.state.setTimeInterval)
        this.endWorkout()
      } else {
        this.startTimer()
        this.countDown()
      }
    }

    startSetTimer = () => {
      var setTimeStamp = moment().startOf("day");
      var interval = setInterval(() => { 
        this.setState(() => {
          return {setTime: this.countUp(setTimeStamp)}
        })
      }, 1000)
      this.setState(() => {return {setTimeInterval: interval}})
    }
    endWorkout = () => {
      this.setState((state) => {
        return  {
          workoutData: {setCount: state.setCount, setTime: [...state.workoutData.setTime, state.setTime], elapsedTime: state.elapsedTime},
        }
      })
      console.log("TODO save workout to DB", this.state.workoutData)
    }
  render() {
    const {
      containerStyle,
      circle,
      boltTxt,
      txtStyle,
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
                  <Text style={txtStyle}>Elapsed</Text>
                  <Text style={boltTxt}>{this.state.elapsedTime}</Text>
                </Col>
                <Text style={{borderRightWidth:1,borderColor:'blue',marginTop:10}}></Text>
                <Col style={[{height: 140} ,makeCenter]}>
                  <Text style={txtStyle}>Set {this.state.setCount}</Text>
                  <Text style={boltTxt}>{this.state.setTime}</Text>
                  <TouchableOpacity onPress={this.nextSet}>
                    <Text style={[txtStyle,{marginTop:20}]}>Next Set</Text>
                  </TouchableOpacity>
                </Col>
              </Row>
             
              <View style={makeCenter}>
                <TouchableOpacity onPress={this.toggleWorkout}>
                  <Text style={[txtStyle,{marginTop:10,marginBottom:10}]}>{(this.state.Workout)? "Start" : "End"} Workout</Text>
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
  txtStyle:{
    fontWeight:'100' ,
    fontSize:14
  },
  makeCenter:{
    justifyContent:'center',
    alignItems:'center'
  }
}