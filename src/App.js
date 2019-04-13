import React, { Component } from 'react';
import Particles from 'react-particles-js';
import {particlesSettings} from './particlesSettings';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Navigation from './components/Navigation/Navigation';
// import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import './App.css';

const initialState = {
  input: '',
  imageUrl: '',
  box: {},
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
};

class App extends Component {
  constructor() {
    super();

    this.state = initialState;
  }

  loadUser = data => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  };

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

  boxLocation = box => {
    this.setState({box: box});
  };

  onInputChange = event => {
    this.setState({ input: event.target.value }); 
  }

  onImageSubmit = () => {
    this.setState({ imageUrl: this.state.input });
    fetch('http://localhost:3000/imageUrl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        if(response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(counter => {
              this.setState(Object.assign(this.state.user, { entries: counter }))
            })
            .catch(console.log)
        }
        this.boxLocation(this.calculateLocation(response))
      })
      .catch(err => console.log(err));
  }

  
  onRouteChange = route => {
    if(route === 'signin') {
      this.setState(initialState);
    } else if(route === 'home') {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route })
  }

  render() {
    return (
      <div className="App">
        <Particles 
          className='particles' 
          params={particlesSettings}  
        />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        { this.state.route === 'signin' 
          ? <div>
            <Rank 
              name={this.state.user.name} 
              rank={this.state.user.entries}
            />
            <ImageLinkForm 
              onInputChange={this.onInputChange}
              onImageSubmit={this.onImageSubmit}
            />
            <FaceRecognition
             imageUrl={this.state.imageUrl}
             box={this.state.box}
            />
          </div>
          : (this.state.route === 'home'
            ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
            : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
          )
        }
      </div>
    );
  }
}

export default App;