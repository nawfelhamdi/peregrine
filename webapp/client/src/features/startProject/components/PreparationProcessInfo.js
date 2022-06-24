import React from 'react';
import { AiFillInfoCircle, AiOutlineFileDone } from 'react-icons/ai';
import { connect } from 'react-redux';

function PreparationProcessInfo(props) {
  return (
    <div>
      {props.project.preparationProgressBar !== 100 ? (
        <div className="flex items-center my-8">
          <AiFillInfoCircle className="h-8 w-8 text-skin-base" />
          <p className="ml-4 text-lg">
            Please wait a few minutes to complete processing!
          </p>
        </div>
      ) : (
        <div className="flex items-center my-8">
          <AiOutlineFileDone className="h-8 w-8 text-green-500" />
          <p className="ml-4 text-lg">
            {props.piplineStep} Pipelines steps are completed successfully!
          </p>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  project: state.project,
});

export default connect(mapStateToProps, null)(PreparationProcessInfo);
