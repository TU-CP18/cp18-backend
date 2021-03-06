import * as R from 'ramda';
import React from 'react';
import Map from 'pigeon-maps';
import Overlay from 'pigeon-overlay';
import Measure from 'react-measure';

import styles from './map-view.module.scss';
import { Button, Tooltip } from 'antd';

export default class MapView extends React.Component {
  static defaultProps = {
    cars: [],
  };

  state = {
    dimensions: { width: -1, height: -1 },
    mapSettings: { center: [52.5126276, 13.3218814], zoom: 15 },
  }

  isCarInEmergency = (id) => {
    return R.findIndex(
      c => c.vehicleId === id,
      this.props.emergencyEvents
    ) >= 0;
  }

  handleResetMap = () => {
    this.setState({ mapSettings: { center: [52.5126276, 13.3218814], zoom: 15  } });
    this.forceUpdate();
  }

  handleMapBoundsChanged = ({ center, zoom }) => {
    this.setState({ mapSettings: { center, zoom }});
  }

  handleCarMarkerClick = (id) => () => {
    this.props.onCarSelect(id);
  }

  render() {
    return (
      <div className={styles.mapViewContainer}>
        <Measure
          bounds
          onResize={contentRect => { this.setState({ dimensions: contentRect.bounds }) }}
        >
          {({ measureRef }) => (
            <div ref={measureRef} className={styles.mapView}>
              <Map
                center={this.state.mapSettings.center}
                zoom={this.state.mapSettings.zoom}
                width={this.state.dimensions.width}
                height={this.state.dimensions.height}
                onBoundsChanged={this.handleMapBoundsChanged}
              >
                {this.props.cars.map(c => (
                  <Overlay
                    key={c.vehicleId} anchor={c.location} offset={[0, 0]}
                  >
                    <svg
                      className={styles.carMarker}
                      width={25} height={25}
                      onClick={this.handleCarMarkerClick(c.vehicleId)}
                    >
                      <rect x={0} y={0} width={25} height={25} fill={this.isCarInEmergency(c.vehicleId) ? '#f00' : '#000'} />
                      <text x={7.5} y={17.5} fill="#fefefe">{c.vehicleId}</text>
                    </svg>
                  </Overlay>
                ))}
              </Map>
            </div>
          )}
        </Measure>
        <Button
          className={styles.resetButton}
          icon="compass"
          size="large"
          shape="circle"
          onClick={this.handleResetMap}
        />
      </div>
    );
  }
}
