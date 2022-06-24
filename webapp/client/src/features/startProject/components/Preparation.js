import React, { useEffect } from 'react';

import Progress from './Progress';
import PreparationProcessInfo from './PreparationProcessInfo';
import PiplineStepLogCard from './PiplineStepLogCard';

import { connect } from 'react-redux';
import { getPreparationPipelineLogTimer, triggerPipelineApi } from '../actions';
import { Link } from 'react-router-dom';

function Preparation(props) {
  useEffect(() => {
    props.getPreparationPipelineLogTimer();
  }, []);

  const handletriggerPipelineApi = () => {
    props.triggerPipelineApi('run');
    console.log('run');
  };
  return (
    <div>
      <PreparationProcessInfo />
      <Progress value={props.project.preparationProgressBar} />
      <div className="mt-8">
        {props.project.preparationPiplineStepsLog.map((item, index) => (
          <PiplineStepLogCard pipelineStepLog={item} index={index} />
        ))}
      </div>

      <div className="flex items-center justify-between">
        <button className="flex items-center my-8 inline-flex items-center justify-center h-12 px-8 md:px-12 font-medium tracking-wide transition duration-200 rounded-md shadow-md text-gray-900 bg-skin-button-accent disabled:opacity-70 float-left">
          <Link
            to="/start-project/start"
            className="flex items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 19l-7-7 7-7"
              />
            </svg>
            <span>Back</span>
          </Link>
        </button>
        <Link to="/start-project/run">
          <button
            disabled={props.project.preparationProgressBar !== 100}
            className="my-8 disabled:bg-[#cccccc] inline-flex items-center justify-center h-12 px-8 md:px-12 font-medium tracking-wide transition duration-200 rounded-md shadow-md text-gray-900 bg-skin-button-accent disabled:opacity-70 float-left"
            onClick={() => handletriggerPipelineApi()}
          >
            <div className="flex items-center">
              <span>Validate</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </button>
        </Link>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  project: state.project,
});
const mapActionsToProps = {
  getPreparationPipelineLogTimer,
  triggerPipelineApi,
};
export default connect(mapStateToProps, mapActionsToProps)(Preparation);
