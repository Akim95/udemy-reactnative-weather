'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  MapView
} from 'react-native';

import Api from './src/api.js';

var weather = React.createClass ({
  getInitialState() {
    return {
        pin: {    
            longitude: 0,
            latitude: 0
        },
            city: '',
            tempereture: '',
            description: ''
    }
  },
  render() {
     
      return <View style={styles.container}>
            <MapView style={styles.map} annotations={[this.state.pin]} onRegionChangeComplete={this.onRegionChangeComplete}></MapView>
            <View style={styles.textWrapper}>
                <Text style={styles.text}>{this.state.city}</Text>  
                <Text style={styles.text}>{this.state.temperature}</Text>  
                <Text style={styles.text}>{this.state.description}</Text>  
            </View>
          </View>
  },
  onRegionChangeComplete(region) {
    this.setState({
        pin: {
            longitude: region.longitude,
            latitude: region.latitude
        }
    });
      
    Api(region.latitude, region.longitude)
        .then((data) => {
            console.log(data);
            this.setState(data);
        });
  }
});

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF'
    },
    map: {
        flex: 2,  
    },
    textWrapper: {
        flex: 1,
        alignItems: 'center',
    },
    text: {
        fontSize: 30,
    }
});

AppRegistry.registerComponent('weather', () => weather);
