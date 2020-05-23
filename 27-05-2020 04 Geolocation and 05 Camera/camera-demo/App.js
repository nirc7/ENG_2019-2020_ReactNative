import React from 'react';
import { Text, View, TouchableOpacity, Image, Button, Vibration } from 'react-native';
import { Camera } from 'expo-camera';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      picUri: 'https://facebook.github.io/react-native/docs/assets/favicon.png'
    };

  }

  async componentDidMount() {
    const { status } = await Camera.requestPermissionsAsync();
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  btnPic = async () => { 
    debugger;
    let photo = await this.camera.takePictureAsync();
    console.log(photo);    
    this.setState({ picUri: photo.uri });
    Vibration.vibrate();
  }

  render() {
    if (this.state.hasCameraPermission === null) {
      return <View />;
    }
    if (this.state.hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }

    return (
      <View style={{ flex: 1 }}>
        <Camera
          ref={ref => { this.camera = ref; }}
          style={{ flex: 0.5 }} type={this.state.type}>
          <View
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              flexDirection: 'row',
            }}>
            <TouchableOpacity
              style={{
                flex: 0.2,
                alignSelf: 'flex-end',
                alignItems: 'center',
              }}
              onPress={() => {
                this.setState({
                  type: this.state.type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                });
              }}>
              <Text style={{ fontSize: 18, marginBottom: 20, color: 'white' }}> Flip </Text>
            </TouchableOpacity>
          </View>
        </Camera>
        <View style={{
          flex: 0.5,
          justifyContent: 'center',
          alignItems: 'center',
          margin: 20
        }}>
          <View>
            <Button title="pic" onPress={this.btnPic} />
          </View>
          <View>
            <Text>picUri = {this.state.picUri}</Text>
          </View>
          <View>
            <Image
              style={{ width: 200, height: 200 }}
              source={{
                uri: this.state.picUri,
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}