
import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import * as actions from "../actions";
// import ToDoListItem from "./ToDoListItem";
// import Preloader from "./Preloader";

import mapboxgl from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css'
import { authRef } from '../config/firebase'

import * as data from "../drivers.json"

mapboxgl.accessToken =
  "pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4M29iazA2Z2gycXA4N2pmbDZmangifQ.-g_vE53SD2WrJ6tFX7QHmA";

let map = null

class MapList extends Component {

  constructor(props: Props) {
    super(props);
    //TODO: Use user's location
    this.state = {
      lat: 13.1734433, lng: -59.6276261, zoom: 6,
      addFormVisible: false,
      addFormValue: "",
      user: { name: 'shannon' }
    };
  }

  componentWillMount() {
    this.props.fetchUser();

  }

  componentDidMount() {

    const { lng, lat, zoom } = this.state;


    map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [lng, lat],
      zoom: 6
    });

    map.on('move', () => {
      const { lng, lat } = map.getCenter();

      this.setState({
        lng: lng.toFixed(4),
        lat: lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });


  }

  componentWillUpdate(nextProps) {
    let { auth } = nextProps;
    console.log(auth)

    if (auth) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;

          this.setState({
            lat: latitude,
            lng: longitude,
            loading: false
          });

          // create the popup
          var popup = new mapboxgl.Popup({ offset: 25 })
            .setText(auth.displayName);

          // create DOM element for the marker
          var el = document.createElement('div');
          el.id = 'marker';
          el.style.backgroundImage = `url(${auth.photoURL})`;

          let userPosition = [this.state.lng, this.state.lat]

          // create the marker
          new mapboxgl.Marker(el)
            .setLngLat(userPosition)
            .setPopup(popup) // sets a popup on this marker
            .addTo(map);

          map.flyTo({
            center: userPosition,
            zoom: 12
          });
        },
        () => {
          this.setState({ loading: false });
        }
      );
    }


  }


  render() {
    const { lng, lat, zoom, addFormVisible } = this.state;
    console.log(data)

    const driverList = data.drivers.map((i) =>
      <li className="collection-item avatar">
        <i className="material-icons circle">folder</i>
        <span className="title">{i.name}</span>
        <p>$ {i.hourly_rate}<br />
          {i.ratings} stars
              </p>
        <a href="#!" className="secondary-content"><i className="material-icons">grade</i></a>
      </li>
    );

    return (
      <div className="row">

        <div className="col s3">
          <h6>Available Drivers</h6>
          <ul className="collection">
            {driverList}
          </ul>
        </div>
        <div className="col s9"><div ref={el => this.mapContainer = el} className="absolute top right left bottom" style={{ height: '500px', width: '100%' }} /></div>
      </div>


    );
  }
}

const mapStateToProps = ({ data, auth }) => {
  return {
    data,
    auth
  };
};

export default connect(mapStateToProps, actions)(MapList);
