import {
  LOADING_PEOJECT,
  NAVIGATE_TO_NEXT_STEP,
  LOADING_PIPELINE_LOG,
  GET_PIPELINE_LOG,
  LOADING_PIPELINE_STEPS_LOG,
  LOADING_TRIGGER_API,
  TRIGGER_API,
  SET_NAVIGATION_TAB,
  //
  LOADING_PREPARATION_PIPELINE_LOG,
  GET_PREPARATION_PIPELINE_LOG,
  GET_PREPARATION_PIPELINE_STEPS_LOG,

  //
  LOADING_APICALL_PIPELINE_LOG,
  GET_APICALL_PIPELINE_LOG,
  GET_API_PIPELINE_STEPS_LOG,
} from './types';

const initialState = {
  loading: false,
  navigate: '',
  stepRouteUrl: '',

  loadingPrepationPipelineLog: false,
  prepationPiplineLog: {},

  loadingPrepationPipelineStepsLog: false,
  preparationPiplineStepsLog: [],

  loadingApiPipelineLog: false,
  apiPiplineLog: {},

  loadingApiPipelineStepsLog: false,
  apiPiplineStepsLog: [],

  triggerApiLoading: false,
  navigationTabs: ['start'],

  preparationProgressBar: 0,

  moodysProgressBar: 0,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOADING_PEOJECT:
      return {
        ...state,
        loading: true,
      };
    case NAVIGATE_TO_NEXT_STEP:
      return {
        ...state,
        loading: false,
        navigate: action.payload,
      };
    case LOADING_PREPARATION_PIPELINE_LOG:
      return {
        ...state,
        loadingPrepationPipelineLog: true,
        loadingPrepationPipelineStepsLog: true,
      };
    case GET_PREPARATION_PIPELINE_LOG:
      return {
        ...state,
        loadingPipelineLog: false,
        prepationPiplineLog: action.payload,
      };
    // case LOADING_PREPARATION_PIPELINE_STEPS_LOG:
    //   return {
    //     ...state,
    //     loadingPrepationPipelineStepsLog: true,
    //   };
    case GET_PREPARATION_PIPELINE_STEPS_LOG:
      let preparationProgressBar = 0;
      state.preparationPiplineStepsLog.forEach((element) => {
        if (element.status === 'Success') {
          preparationProgressBar = preparationProgressBar + 25;
        } else {
          preparationProgressBar = preparationProgressBar + 0;
        }
      });
      return {
        ...state,
        loadingPrepationPipelineStepsLog: false,
        preparationPiplineStepsLog: action.payload,
        preparationProgressBar: preparationProgressBar,
      };
    case LOADING_APICALL_PIPELINE_LOG:
      return {
        ...state,
        loadingApiPipelineLog: true,
        loadingApiPipelineStepsLog: true,
      };
    case GET_APICALL_PIPELINE_LOG:
      return {
        ...state,
        loadingPipelineLog: false,
        apiPiplineLog: action.payload,
      };
    case GET_API_PIPELINE_STEPS_LOG:
      let moodysProgressBar = 0;
      state.apiPiplineStepsLog.forEach((element) => {
        if (element.status === 'Success') {
          moodysProgressBar = moodysProgressBar + 25;
        } else {
          moodysProgressBar = moodysProgressBar + 0;
        }
      });
      return {
        ...state,
        loadingPipelineStepsLog: false,
        apiPiplineStepsLog: action.payload,
        moodysProgressBar: moodysProgressBar,
      };

    case LOADING_TRIGGER_API:
      return {
        ...state,
        triggerApiLoading: true,
      };
    case TRIGGER_API:
      return {
        ...state,
        triggerApiLoading: false,
        navigate: action.payload,
      };
    case SET_NAVIGATION_TAB:
      let navigationTabs = state.navigationTabs;
      if (navigationTabs.indexOf(action.payload) === -1) {
        navigationTabs.push(action.payload);
      }
      return {
        ...state,
        navigationTabs: navigationTabs,
      };

    default:
      return state;
  }
}
