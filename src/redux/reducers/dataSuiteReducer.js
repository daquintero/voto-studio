import {
  LIST_DATA_SETS,
  GET_DATA_SET_DETAIL, CREATE_DATA_SET,
} from '../actionCreators/dataSuiteActionCreators';
import { initializeActions, actionResult } from '../helpers/asyncHelpers';

const initialState = {
  idCode: 'MD',
  actions: initializeActions([
    'LIST_DATA_SETS',
    'CREATE_DATA_SET',
    'GET_DATA_SET_DETAIL',
  ]),
};

export default (state = initialState, action) => {
  switch (action.type) {
    // List data sets reducers ---------------------------
    case LIST_DATA_SETS.REQUEST:
      return {
        ...state,
        actions: {
          ...state.actions,
          ...actionResult('LIST_DATA_SETS.REQUEST'),
        },
      };
    case LIST_DATA_SETS.SUCCESS:
      return {
        ...state,
        dataSets: action.dataSets,
        actions: {
          ...state.actions,
          ...actionResult('LIST_DATA_SETS.SUCCESS'),
        },
      };
    case LIST_DATA_SETS.ERROR:
      return {
        ...state,
        actions: {
          ...state.actions,
          ...actionResult('LIST_DATA_SETS.ERROR', { error: action.error }),
        },
      };
      // -----------------------------------------------

    // List data sets reducers ---------------------------
    case CREATE_DATA_SET.REQUEST:
      return {
        ...state,
        actions: {
          ...state.actions,
          ...actionResult('CREATE_DATA_SET.REQUEST'),
        },
      };
    case CREATE_DATA_SET.SUCCESS:
      return {
        ...state,
        dataSets: [
          ...state.dataSets,
          action.newDataSet,
        ],
        actions: {
          ...state.actions,
          ...actionResult('CREATE_DATA_SET.SUCCESS'),
        },
      };
    case CREATE_DATA_SET.ERROR:
      return {
        ...state,
        actions: {
          ...state.actions,
          ...actionResult('CREATE_DATA_SET.ERROR', { error: action.error }),
        },
      };
      // -----------------------------------------------

    // Get data set detail reducers --------------------
    case GET_DATA_SET_DETAIL.REQUEST:
      return {
        ...state,
        actions: {
          ...state.actions,
          ...actionResult('GET_DATA_SET_DETAIL.REQUEST'),
        },
      };
    case GET_DATA_SET_DETAIL.SUCCESS:
      return {
        openDataSet: action.dataSet,
        actions: {
          ...state.actions,
          ...actionResult('GET_DATA_SET_DETAIL.SUCCESS'),
        },
      };
    case GET_DATA_SET_DETAIL.ERROR:
      return {
        ...state,
        actions: {
          ...state.actions,
          ...actionResult('GET_DATA_SET_DETAIL.ERROR', { error: action.error }),
        },
      };
      // -----------------------------------------------
    default:
      return state;
  }
};
