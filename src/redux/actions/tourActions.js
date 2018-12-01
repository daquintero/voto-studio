import tourService from '../../services/tourService';
import {
  LIST_TOURS,
  CREATE_TOUR,
  OPEN_TOUR,
  CREATE_TOUR_STEP,
  UPDATE_TOUR_STEP,
  REORDER_TOUR_STEPS,
  CHANGE_ACTIVE_TOUR_STEP,
  DELETE_TOUR_STEP,
  CREATE_MARKER,
  UPDATE_MARKER,
  DELETE_MARKER,
  CLOSE_OPEN_TOUR,
} from '../actionCreators/tourActionCreators';


export const getTourList = () => (dispatch) => {
  dispatch({
    type: LIST_TOURS.REQUEST,
  });
  return tourService.get.list().then(
    response => dispatch({
      type: LIST_TOURS.SUCCESS,
      tourList: response.data,
    }),
    error => dispatch({
      type: LIST_TOURS.ERROR,
      error,
    }),
  );
};

export const getTourDetail = tourId => (dispatch) => {
  dispatch({
    type: OPEN_TOUR.REQUEST,
  });
  return tourService.get.detail(tourId).then(
    response =>
      dispatch({
        type: OPEN_TOUR.SUCCESS,
        tour: response.data,
      }),
    error =>
      dispatch({
        type: OPEN_TOUR.ERROR,
        error,
      }),
  );
};

export const createTour = newTourInfo => (dispatch) => {
  dispatch({
    type: CREATE_TOUR.REQUEST,
  });
  return tourService.post.createTour(newTourInfo).then(
    response =>
      dispatch({
        type: CREATE_TOUR.SUCCESS,
        newTour: response.data,
      }),
    error =>
      dispatch({
        type: CREATE_TOUR.ERROR,
        error,
      }),
  );
};


export const createTourStep = (step, tourId) => (dispatch) => {
  dispatch({
    type: CREATE_TOUR_STEP.REQUEST,
  });
  return tourService.post.createStep(step, tourId).then(
    response =>
      dispatch({
        type: CREATE_TOUR_STEP.SUCCESS,
        newTourStep: response.data,
      }),
    error =>
      dispatch({
        type: CREATE_TOUR_STEP.ERROR,
        error,
      }),
  );
};

export const updateTourStep = (updatedTourStep, index) => (dispatch) => {
  dispatch({
    type: UPDATE_TOUR_STEP.REQUEST,
    id: updatedTourStep.id,
  });
  return tourService.post.updateStep(updatedTourStep, index).then(
    response =>
      dispatch({
        type: UPDATE_TOUR_STEP.SUCCESS,
        id: updatedTourStep.id,
        updatedTourStep: response.data,
        index,
      }),
    error =>
      dispatch({
        type: UPDATE_TOUR_STEP.ERROR,
        id: updatedTourStep.id,
        error,
      }),
  );
};

export const deleteTourStep = id => (dispatch) => {
  dispatch({
    type: DELETE_TOUR_STEP.REQUEST,
    id,
  });
  return tourService.delete.deleteStep(id).then(
    response =>
      dispatch({
        type: DELETE_TOUR_STEP.SUCCESS,
        id: response.data.id,
      }),
    error =>
      dispatch({
        type: DELETE_TOUR_STEP.ERROR,
        error,
      }),
  );
};

export const reorderTourSteps = (tourId, result) => (dispatch) => {
  dispatch({
    type: REORDER_TOUR_STEPS.REQUEST,
    result,
  });
  return tourService.post.reorderTourSteps(tourId, result).then(
    response =>
      dispatch({
        type: REORDER_TOUR_STEPS.SUCCESS,
        result: response.data.result,
      }),
    error =>
      dispatch({
        type: REORDER_TOUR_STEPS.ERROR,
        error,
      }),
  );
};

export function changeActiveTourStep(id) {
  return {
    type: CHANGE_ACTIVE_TOUR_STEP,
    id,
  };
}

export function createMarker(newMarker, step, stepIndex) {
  return {
    type: CREATE_MARKER,
    newMarker,
    step,
    stepIndex,
  };
}

export function deleteMarker(marker, step, stepIndex) {
  return {
    type: DELETE_MARKER,
    marker,
    step,
    stepIndex,
  };
}

export function updateMarker(newMarker, newMarkerIndex, step, stepIndex) {
  return {
    type: UPDATE_MARKER,
    newMarker,
    newMarkerIndex,
    step,
    stepIndex,
  };
}

export const closeOpenTour = () => ({
  type: CLOSE_OPEN_TOUR,
});
