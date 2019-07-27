import React, {Component} from "react";
import './MapView.scss';

import {Map, GoogleApiWrapper} from 'google-maps-react';

// Import custom styles to customize the style of Google Map
const styles = require('./GoogleMapStyles.json')
const EmptyLoadingContainer = () => (
    <span></span>
)

class MapView extends Component {

    render() {

        return (
            <Map className="map-container"
                 google={this.props.google}
                 zoom={12}
                 styles={styles}
                 disableDefaultUI={true}

                 initialCenter={{
                     lat: -34.49500,
                     lng: -58.47500
                 }}
            />
        );
    }
}


export default GoogleApiWrapper({
    apiKey: 'AIzaSyAHvCZF6bk27fO-ieRetP066BSoYLkqD94',
    LoadingContainer: EmptyLoadingContainer
})(MapView);



