import {
  LOADING_PEOJECT,
  NAVIGATE_TO_NEXT_STEP,
  GET_ERRORS,
  PROCESS_COMPLETED, //TODO: REFACTOR NAME
  LOADING_PIPELINE_STEPS_LOG,
  GET_PREPARATION_PIPELINE_STEPS_LOG,
  GET_API_PIPELINE_STEPS_LOG,
  PIPELINE_LOG_ERROR,
  PIPELINE_STEPS_LOG_ERROR,
  LOADING_TRIGGER_API,
  TRIGGER_API,
  SET_NAVIGATION_TAB,
  //
  LOADING_PREPARATION_PIPELINE_LOG,
  GET_PREPARATION_PIPELINE_LOG,
  //
  LOADING_APICALL_PIPELINE_LOG,
  GET_APICALL_PIPELINE_LOG,
} from './types';
import axios from 'axios';


export const startProject = (startProjectData, stepRouteUrl) => (dispatch) => {
  dispatch({ type: LOADING_PEOJECT });
  axios
    .post(`${process.env.REACT_APP_API_URL}/projects`, startProjectData)
    .then((res) => {
      dispatch(activateTab('preparation'));
      dispatch(navigate(stepRouteUrl));
      localStorage.setItem('projectId', res.data.project.id);
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: GET_ERRORS,
      });
    });
};

export const navigate = (stepRouteUrl) => {
  return {
    type: NAVIGATE_TO_NEXT_STEP,
    payload: stepRouteUrl,
  };
};

export const getPreparationPipelineLogTimer = () => (dispatch) => {
  let requestStatusTimer;
  requestStatusTimer = setInterval(() => {
    console.log('request pipline log sended');
    let projectId = localStorage.getItem('projectId');
    dispatch(getPreparationPiplineLog(requestStatusTimer, projectId));
  }, 5000);
};

export const getPreparationPiplineLog =
  (requestStatusTimer, projectId) => (dispatch) => {
    dispatch({ type: LOADING_PREPARATION_PIPELINE_LOG });
    axios
      .get(`${process.env.REACT_APP_API_URL}/piplines/preparation/${projectId}`)
      .then((res) => {
        dispatch({
          type: GET_PREPARATION_PIPELINE_LOG,
          payload: res.data.piplineLog,
        });
        dispatch(getPrepationPiplineStepsLog(res.data.piplineLog.id));
        if (
          (res.data.piplineLog.status === 'Success' ||
            res.data.piplineLog.status === 'Failed') &&
          res.data.piplineLog.is_active === false
        ) {
          dispatch({ type: PROCESS_COMPLETED });
          clearInterval(requestStatusTimer);
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: PIPELINE_LOG_ERROR,
        });
        // clearInterval(requestStatusTimer);
      });
  };

export const getPrepationPiplineStepsLog = (piplineLogId) => (dispatch) => {
  // dispatch(activateTab('run'));
  dispatch({ type: LOADING_PIPELINE_STEPS_LOG });
  axios
    .get(
      `${process.env.REACT_APP_API_URL}/piplines/preparation-steps/${piplineLogId}`
    )
    .then((res) => {
      dispatch({
        type: GET_PREPARATION_PIPELINE_STEPS_LOG,
        payload: res.data.piplineStepsLog,
      });
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: PIPELINE_STEPS_LOG_ERROR,
      });
    });
};

export const getApiPipelineLogTimer = () => (dispatch) => {
  let requestStatusTimer;
  requestStatusTimer = setInterval(() => {
    let projectId = localStorage.getItem('projectId');
    dispatch(getApiCallPiplineLog(requestStatusTimer, projectId));
  }, 5000);
};

export const getApiCallPiplineLog =
  (requestStatusTimer, projectId) => (dispatch) => {
    dispatch({ type: LOADING_APICALL_PIPELINE_LOG });
    axios
      .get(`${process.env.REACT_APP_API_URL}/piplines/apicall/${projectId}`)
      .then((res) => {
        dispatch({
          type: GET_APICALL_PIPELINE_LOG,
          payload: res.data.piplineLog,
        });
        dispatch(getApiCallPiplineStepsLog(res.data.piplineLog.id));
        if (
          (res.data.piplineLog.status === 'Success' ||
            res.data.piplineLog.status === 'Failed') &&
          res.data.piplineLog.is_active === false
        ) {
          dispatch({ type: PROCESS_COMPLETED });
          clearInterval(requestStatusTimer);
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch({
          type: PIPELINE_LOG_ERROR,
        });
        // clearInterval(requestStatusTimer);
      });
  };

export const getApiCallPiplineStepsLog = (piplineLogId) => (dispatch) => {
  dispatch({ type: LOADING_PIPELINE_STEPS_LOG });
  axios
    .get(
      `${process.env.REACT_APP_API_URL}/piplines/apicall-steps/${piplineLogId}`
    )
    .then((res) => {
      dispatch({
        type: GET_API_PIPELINE_STEPS_LOG,
        payload: res.data.piplineStepsLog,
      });
      // if (res.data.piplineStepsLog.length === 4) {
      //   dispatch(activateTab('results'));
      // }
    })
    .catch((error) => {
      console.log(error);
      dispatch({
        type: PIPELINE_STEPS_LOG_ERROR,
      });
    });
};

export const triggerPipelineApi = (stepRouteUrl) => (dispatch) => {
  dispatch(activateTab('run'));
  let projectId = localStorage.getItem('projectId');
  dispatch({ type: LOADING_TRIGGER_API });
  axios
    .post(`${process.env.REACT_APP_API_URL}/piplines/trigger-api`, {
      projectId,
    })
    .then((res) => {
      dispatch(navigate(stepRouteUrl));
      dispatch({
        type: TRIGGER_API,
      });
    })
    .catch((error) => {
      console.log(error);
    });
};

export const activateTab = (tab) => (dispatch) => {
  dispatch({ type: SET_NAVIGATION_TAB, payload: tab });
};
