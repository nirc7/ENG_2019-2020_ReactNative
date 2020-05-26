import React from 'react';
import { StyleSheet, Text, View, TextInput, Button } from 'react-native';

let url = 'http://185.60.170.14/plesk-site-preview/ruppinmobile.ac.il/site23/api/student';

export default class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            emailText: 'avi@a.com',
            passText: 'avi123'
        };
    }

    txtchgEmail = (emailText) => {
        this.setState({ emailText });
    }

    txtchgPass = (passText) => {
        this.setState({ passText });
    }

    btnLogin = async () => {
        let s = await this.checkStudentDetils(this.state.emailText, this.state.passText);
        console.log('returned value=' + s);

        if (s != null) {
            this.props.navigation.navigate('HomePage', { user: s });
        }
        else {
            alert('err login!')
        }
    }

    checkStudentDetils = async (Email, Password) => {
        let returnedObj = null;

        await fetch(url + `?email=${Email}&password=${Password}`,
            {
                method: 'GET', // 'GET', 'POST', 'PUT', 'DELETE', etc.
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }),
            }) // Call the fetch function passing the url of the API as a parameter
            .then((resp) => resp.json()) // Transform the data into json
            .then(function (data) {
                console.log(data);
                if (data != null) {
                    console.log(data.Email);
                    console.log(data.Password);
                    returnedObj = data;
                }
                else {
                    console.log('wrong email or password!');
                    returnedObj = null;
                }
            })
            .catch(function (err) {
                alert(err);
            });

        return returnedObj;
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>LOGIN APP</Text>
                <View style={styles.viewCss}>
                    <Text>Email:</Text>
                    <TextInput value={this.state.emailText} onChangeText={(text) => { this.txtchgEmail(text) }} placeholder="enter email"></TextInput>
                </View>
                <View style={styles.viewCss}>
                    <Text>Pass:</Text>
                    <TextInput value={this.state.passText} onChangeText={(text) => { this.txtchgPass(text) }} placeholder="enter password"></TextInput>
                </View>
                <View style={styles.viewCss}>
                    <Button title="Login" onPress={this.btnLogin} />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10
    },
    viewCss: {
        margin: 10
    }

});
