import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactRouterPropTypes from 'react-router-prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { FlyToInterpolator, LinearInterpolator } from 'deck.gl';
import * as d3 from 'd3';
import {
  changeMapWidth,
  changeMapHeight,
  changeMapViewport,
} from '../../../../redux/actions/mapActions';
import {
  createTourStep,
  deleteTourStep,
  updateTourStep,
  reorderTourSteps,
  createMarker,
  updateMarker,
  deleteMarker,
  getTourDetail,
} from '../../../../redux/actions/tourActions';
import { SidebarProps, MapProps, ToursProps } from '../../../../shared/prop-types/ReducerProps';
import FullscreenMap from './components/FullscreenMap';
import TourPanel from './components/TourPanel';
import MapPopover from './components/MapPopover';

class Map extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    sidebar: SidebarProps.isRequired,
    map: MapProps.isRequired,
    tours: ToursProps.isRequired,
    match: ReactRouterPropTypes.match.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      activeTourStepId: -1,
      tourLoaded: false,
    };
  }

  componentDidMount() {
    console.log(this.props);
    this.props.dispatch(getTourDetail(this.props.match.params.tourId))
      .then(this.setState({ tourLoaded: true })); // eslint-disable-line
  }

  getNewId = (arr) => {
    if (arr.length) {
      return Math.max(...arr.map(elem => elem.id), 0) + 1;
    }
    return 0;
  };

  getStep = stepId => this.props.tours.tours[this.props.tours.loadedTourId].steps
    .filter(elem => elem.id === parseInt(stepId, 10))[0];

  getStepIndex = () => {
    const step = this.getStep(this.state.activeTourStepId);
    return this.props.tours.tours[this.props.tours.loadedTourId].steps.indexOf(step);
  };

  handleChangeMapHeight = (newMapHeight) => {
    this.props.dispatch(changeMapHeight(newMapHeight));
  };

  handleChangeMapWidth = (newMapWidth) => {
    this.props.dispatch(changeMapWidth(newMapWidth));
  };

  handleChangeMapViewport = (newMapViewport) => {
    this.props.dispatch(changeMapViewport(newMapViewport));
  };

  addInterpolator(data, step) {  // eslint-disable-line
    const newStep = step;
    switch (data.transitionInterpolator) {
      case 'FlyToInterpolator':
        newStep.viewport.transitionInterpolator = new FlyToInterpolator();
        newStep.viewport.transitionInterpolatorName = 'FlyToInterpolator';
        break;
      case 'LinearInterpolator':
        newStep.viewport.transitionInterpolator = new LinearInterpolator();
        newStep.viewport.transitionInterpolatorName = 'LinearInterpolator';
        break;
      default:
        newStep.viewport.transitionInterpolator = null;
        newStep.viewport.transitionInterpolatorName = 'None';
    }
    return newStep;
  }

  handleCreateTourStep = (data) => {
    // Consider width and height values here, could be an issue. They MUST be overridden in the
    // client app.
    let step = {
      id: this.getNewId(this.props.tours.tours[this.props.tours.loadedTourId].steps),
      name: data.name,
      text: data.text,
      viewport: {
        ...this.props.map.viewport,
        transitionDuration: data.transitionDuration,
        transitionEasing: d3.easeCubic,
        transitionEasingName: 'd3.easeCubic',
      },
      markers: [],
    };
    step = this.addInterpolator(data, step);

    this.props.dispatch(createTourStep(step));
    this.setState({ activeTourStepId: step.id });
    // Send POST request to server with new step
  };

  handleDeleteTourStep = (id) => {
    this.props.dispatch(deleteTourStep(id));
    // Send DELETE request to server
  };

  handleUpdateTourStep = (updates, prevStep, index) => {
    let step = {
      id: prevStep.id,
      name: updates.name,
      text: updates.text,
      viewport: {
        ...this.props.map.viewport,
        transitionDuration: updates.transitionDuration,
        transitionEasing: d3.easeCubic,
        transitionEasingName: 'd3.easeCubic',
      },
      markers: prevStep.markers,
    };
    step = this.addInterpolator(updates, step);
    this.props.dispatch(updateTourStep(step, index));
    // Send PUT request to server with updated step
  };

  handleChangeToStepViewport = (id) => {
    // Update the viewport
    const step = this.getStep(id);
    this.handleChangeMapViewport(step.viewport);

    // Set the active step in state and set the markers
    // array in state to the markers of the active step
    this.setState({ activeTourStepId: id });
  };

  handleOnDragEnd = (result) => {
    // Update state
    const { destination, source, draggableId } = result;
    const step = this.getStep(draggableId);
    if (!destination) {
      return;
    }
    if (destination.index === source.index) {
      return;
    }
    this.props.dispatch(reorderTourSteps(step, result));
    // Send PUT request to server to update order
  };

  handleCreateMarker = (step) => {
    const newMarker = {
      id: this.getNewId(step.markers),
      name: 'New marker',
      text: 'Edit me. Move me around. Resize me. Do what you will...',
      longitude: this.props.map.viewport.longitude,
      latitude: this.props.map.viewport.latitude,
      width: 200,
      height: 200,
    };
    this.props.dispatch(createMarker(newMarker, step, this.getStepIndex()));
    // Send POST request to server with new marker
  };

  handleUpdateMarkerPosition = (e, marker, markerIndex) => {
    const newMarker = {
      ...marker,
      longitude: e.lngLat[0],
      latitude: e.lngLat[1],
    };
    // Clear up the naming conventions with regards to marker and newMarker
    const step = this.getStep(this.state.activeTourStepId);
    this.props.dispatch(updateMarker(newMarker, markerIndex, step, this.getStepIndex()));
    // Send POST request to server with new marker (or step?) instance
  };

  handleUpdateMarker = (marker, markerIndex, step) => {
    this.props.dispatch(updateMarker(marker, markerIndex, step, this.getStepIndex()));
    // Send PUT request to server with new marker (or step?) instance
  };

  handleDeleteMarker = (marker, step) => {
    this.props.dispatch(deleteMarker(marker, step, this.getStepIndex()));
    // Send DELETE request to server
  };

  render() {
    return (
      <>
        {this.state.tourLoaded ? (
          <>
            <FullscreenMap
              sidebar={this.props.sidebar}
              map={this.props.map}
              handleChangeMapWidth={this.handleChangeMapWidth}
              handleChangeMapHeight={this.handleChangeMapHeight}
              handleChangeMapViewport={this.handleChangeMapViewport}
              tours={this.props.tours}
              activeTourStepId={this.state.activeTourStepId}
              updateMarkerPosition={this.handleUpdateMarkerPosition}
              createMarker={this.handleCreateMarker}
              updateMarker={this.handleUpdateMarker}
              deleteMarker={this.handleDeleteMarker}
            />
            <TourPanel
              tours={this.props.tours}
              createTourStep={this.handleCreateTourStep}
              deleteTourStep={this.handleDeleteTourStep}
              changeToStepViewport={this.handleChangeToStepViewport}
              updateTourStep={this.handleUpdateTourStep}
              activeTourStepId={this.state.activeTourStepId}
              createMarker={this.handleCreateMarker}
              onDragEnd={this.handleOnDragEnd}
            />
            <MapPopover
              activeTourStepId={this.state.activeTourStepId}
              newTour={this.state.tour}
              changeToStepViewport={this.handleChangeToStepViewport}
            />
          </>
        ) : (
          <>
            Loading
          </>
        )}
      </>
    );
  }
}

export default withRouter(connect(state => ({
  sidebar: state.sidebar,
  map: state.map,
  tours: state.tours,
}))(Map));
