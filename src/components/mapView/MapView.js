import React, {Component} from "react";
import './MapView.scss';

import {Map, GoogleApiWrapper} from 'google-maps-react';

// Import custom styles to customize the style of Google Map
const styles = require('./GoogleMapStyles.json')


class MapView extends Component {

    render() {
        const style = {
            width: '50vw',
            height: '75vh',
            'marginLeft': 'auto',
            'marginRight': 'auto'
        }
        return (
            <Map className="map-container"
                 google={this.props.google}
                 zoom={13}
                 styles={styles}
                 disableDefaultUI={true}
                 initialCenter={{
                     lat: -34.46000,
                     lng: -58.50458
                 }}
            />
        );
    }
}


export default GoogleApiWrapper({
    apiKey: 'AIzaSyAHvCZF6bk27fO-ieRetP066BSoYLkqD94'
})(MapView);



