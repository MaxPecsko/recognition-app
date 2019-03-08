import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import {particlesSettings} from './particlesSettings';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import './App.css';

const app = new Clarifai.App({
  apiKey: '0fd2c5196ec746c696d52ed7524229f3'
});

class App extends Component {
  constructor() {
    super();

    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false
    }
  }

  calculateLocation = data => {
    const locationData = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: locationData.left_col * width,
      topRow: locationData.top_row * height,
      rightCol: width - (locationData.right_col * width),
      bottomRow: height - (locationData.bottom_row * height)
    }
  }

  onRouteChange = route => {
    if(route === 'signin') {
      this.setState({ isSignedIn: false });
    } else if(route === 'home') {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route })
  }

  boxLocation = (box) => {
    this.setState({box: box});
  };

  onInputChange = event => {
    this.setState({ input: event.target.value }); 
  }

  onSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    app.models
      .initModel({
        id: Clarifai.FACE_DETECT_MODEL,
        version: "28b2ff6148684aa2b18a34cd004b4fac"
      })
      .then(generalModel => generalModel.predict(this.state.input))
      .then(response => this.boxLocation(this.calculateLocation(response)))
      .catch(err => console.log(err));
  }

  render() {
    return (
      <div className="App">
        <Particles 
          className='particles' 
          params={particlesSettings}  
        />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        { this.state.route === 'home' 
          ? <div>
            <Logo />
            <Rank />
            <ImageLinkForm 
              onInputChange={this.onInputChange}
              onSubmit={this.onSubmit}
            />
            <FaceRecognition
             imageUrl={this.state.imageUrl}
             box={this.state.box}
            />
          </div>
          : (this.state.route === 'signin'
            ? <SignIn onRouteChange={this.onRouteChange}/>
            : <Register onRouteChange={this.onRouteChange}/> 
          )
        }
      </div>
    );
  }
}

export default App;