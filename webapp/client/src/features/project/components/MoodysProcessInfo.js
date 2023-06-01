import React from 'react';
import { AiFillInfoCircle, AiOutlineFileDone } from 'react-icons/ai';
import { connect } from 'react-redux';

function MoodysProcessInfo(props) {
  return (
    <div>
      {props.project.moodysProgressBar !== 100 ? (
        <div className="flex items-center mb-4">
          <AiFillInfoCircle className="h-8 w-8 text-skin-base" />
          <p className="ml-4 text-lg">
            Please wait a few minutes to complete processing!
          </p>
        </div>
      ) : (
        <div className="flex items-center mb-4">
          <AiOutlineFileDone className="h-8 w-8 text-green-500" />
          <p className="ml-4 text-lg">
            Moody's RI pipelines steps are completed successfully!
          </p>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  project: state.project,
});

export default connect(mapStateToProps, null)(MoodysProcessInfo);
