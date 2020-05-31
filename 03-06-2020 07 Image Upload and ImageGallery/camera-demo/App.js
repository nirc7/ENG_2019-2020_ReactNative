import React from 'react';
import { Text, View, TouchableOpacity, Image, Button, Vibration } from 'react-native';
import { Camera } from 'expo-camera';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null,
      type: Camera.Constants.Type.back,
      picUri: 'https://facebook.github.io/react-native/docs/assets/favicon.png',
      uploadedPicUri: { uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }
    };

    this.uploadedPicPath = 'http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site23/uploadFiles/';
  
  }

  async componentDidMount() {
    const { status } = await Camera.requestPermissionsAsync();
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  btnPic = async () => {
    debugger;
    let photo = await this.camera.takePictureAsync({ quality: 0.7 });
    console.log(photo);
    this.setState({ picUri: photo.uri });
    Vibration.vibrate();
  }

  btnUpload = () => {
    let img = this.state.picUri;
    let imgName = 'profilePic1.jpg';
    this.imageUpload(img, imgName);
  }

  imageUpload = (imgUri, picName) => {
    let urlAPI = "http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site23/uploadpicture";
    let dataI = new FormData();
    dataI.append('picture', {
      uri: imgUri,
      name: picName,
      type: 'image/jpg'
    });
    const config = {
      method: 'POST',
      body: dataI,
    };


    fetch(urlAPI, config)
      .then((res) => {
        console.log('res.status=', res.status);
        if (res.status == 201) {
          return res.json();
        }
        else {
          console.log('error uploding with status=', res.status);
          return "err";
        }
      })
      .then((responseData) => {
        console.log(responseData);
        if (responseData != "err") {
          let picNameWOExt = picName.substring(0, picName.indexOf("."));
          let imageNameWithGUID = responseData.substring(responseData.indexOf(picNameWOExt), responseData.indexOf(".jpg") + 4);
          this.setState({
            uploadedPicUri: { uri: this.uploadedPicPath + imageNameWithGUID },
          });
          console.log("img uploaded successfully!");
        }
        else {
          console.log('error uploding ...');
          alert('error uploding ...');
        }
      })
      .catch(err => {
        alert('err upload= ' + err);
      });
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
          style={{
            width: 200, height: 150,
            alignSelf: 'center'
          }} type={this.state.type}>
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
              <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
            </TouchableOpacity>
          </View>
        </Camera>
        <View style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          margin: 5
        }}>
          <View>
            <Button title="pic" onPress={this.btnPic} />
          </View>
          <View>
            <Text>picUri = {this.state.picUri}</Text>
          </View>
          <View>
            <Image
              style={{ width: 150, height: 150 }}
              source={{ uri: this.state.picUri, }}
            />
          </View>
          <View style={{ margin: 10, marginTop: 20 }}>
            <Button title="upload" onPress={this.btnUpload} />
          </View>
          <View>
            <Image
              style={{ width: 150, height: 150 }}
              source={this.state.uploadedPicUri}
            />
          </View>
        </View>
      </View>
    );
  }
}