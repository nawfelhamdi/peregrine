import React, { useEffect } from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { getArchivesFiles } from '../actions';
import { useParams } from 'react-router-dom';
function FileCard({ file }) {
  return (
    <div className="overflow-hidden transition-shadow border p-4 duration-300 bg-white rounded">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-16 w-16"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
        />
      </svg>

      <div className="py-5">
        <div className="inline-block mb-3 text-black transition-colors duration-200 hover:text-deep-purple-accent-700">
          <p className="text-2xl font-bold leading-5">
            {file.name.split('/').pop()}
          </p>
        </div>
        <p className="mb-2 text-xs font-semibold text-gray-600 ">
          Created At:{' '}
          {moment(file.properties.createdOn).format('MMMM Do YYYY, h:mm:ss a')}
        </p>
        <p className="mb-2 text-xs font-semibold text-gray-600 ">
          Last Modified At:{' '}
          {moment(file.properties.lastModified).format(
            'MMMM Do YYYY, h:mm:ss a'
          )}
        </p>
      </div>
    </div>
  );
}

function Files(props) {
  let { diretoryId } = useParams();
  useEffect(() => {
    props.getArchivesFiles(diretoryId);
    console.log(diretoryId);
  }, []);
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl  md:px-16 lg:py-20">
      {!props.archives.loadingFiles ? (
        <div className="grid gap-5 md:grid-cols-3 sm:mx-auto md:max-w-full">
          {props.archives.files.map((file, index) => (
            <FileCard key={index} file={file} />
          ))}
        </div>
      ) : (
        <p className="text-center">Loading ...</p>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  archives: state.archives,
});
const mapActionsToProps = {
  getArchivesFiles,
};
export default connect(mapStateToProps, mapActionsToProps)(Files);
