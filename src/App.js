import React, { Component } from 'react';
import './App.css';


  
class App extends Component {
  constructor() {
    super();
    this.state = {
      hours: 0,
      minutes: 0,
      seconds:0
    }
    this.hoursInput = React.createRef();
    this.minutesInput= React.createRef();
    this.secondsInput = React.createRef();
  }
      


  inputHandler = (e) => {
    this.setState({[e.target.name]: e.target.value});
  }

  convertToSeconds = ( hours, minutes,seconds) => {
    return seconds + minutes * 60 + hours * 60 * 60;
  }

  startTimer = () => {
    this.timer = setInterval(this.countDown, 1000);
  }

  countDown = () => {
    const  { hours, minutes, seconds } = this.state;
    let c_seconds = this.convertToSeconds(hours, minutes, seconds);

    if(c_seconds) {

      // seconds change
      seconds ? this.setState({seconds: seconds-1}) : this.setState({seconds: 59});

      // minutes change
      if(c_seconds % 60 === 0 && minutes) {
        this.setState({minutes: minutes -1});
      }

      // when only hours entered
      if(!minutes && hours) {
        this.setState({minutes: 59});
      }

      // hours change
      if(c_seconds % 3600 === 0 && hours) {
        this.setState({hours: hours-1});
      }

    } else {
      clearInterval(this.timer);
    }
  }


  stopTimer = () => {
    clearInterval(this.timer);
  }

  resetTimer = () => {
    this.setState({
      hours: 0,
      minutes: 0,
      seconds: 0
    });
    this.hoursInput.current.value = 0;
    this.minutesInput.current.value = 0;
    this.secondsInput.current.value = 0;
  }


  render() {
    const { hours, minutes, seconds } = this.state;

    return (
      <div className="App">
         <div className="inputGroup">
           <h1>Simple Countdown</h1>
           <h1> Time Remaining {hours}: {minutes} : {seconds} </h1>
            <h3>Hours</h3>
            <input ref={this.hoursInput} type="number" placeholder={0}  name="hours"  onChange={this.inputHandler} />
            <h3>Minutes</h3>
            <input  ref={this.minutesInput} type="number"  placeholder={0}   name="minutes"  onChange={this.inputHandler} />
            <h3>Seconds</h3>
            <input   ref={this.secondsInput} type="number"  placeholder={0}  name="seconds"  onChange={this.inputHandler} />
         </div>

         <div>
            <button onClick={this.startTimer} className="start">START</button>
            <button onClick={this.stopTimer}  className="stop">PAUSE</button>
            <button onClick={this.resetTimer}  className="reset">RESET</button>
         </div>
      </div>

    );
  }
}

export default App;

