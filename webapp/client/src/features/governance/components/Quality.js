import React, { useEffect } from 'react';

import { connect } from 'react-redux';
import { getDataHealthCheck } from '../actions';

function HealthCheckCard({
  item: { column_name, table_name, rows, missing, distinct, health_status },
}) {
  return (
    <div
      className={`shadow-sm rounded-md my-2 px-4 py-3 h-30 border-2 ${
        health_status
          ? 'border-red-400 bg-red-50'
          : 'border-green-500 bg-green-50'
      }`}
    >
      <div className="flex justify-between ">
        <div className="text-sm text-gray-600 flex items-center mb-2">
          <p className="text-sm font-bold flex items-center justify-center">
            Column Name: {column_name}
          </p>
        </div>
        {/* <button>See More</button> */}
      </div>

      <div className="flex justify-between ">
        <div className="text-xs text-gray-600  w-1/4">
          <p className="text-sm font-medium">Table Name</p>
          {table_name}
        </div>
        <div className="text-xs text-gray-600 w-1/4">
          <p className="text-sm font-medium ">Rows</p>
          <p>{rows}</p>
        </div>
        <div className="text-xs text-gray-600  w-1/4">
          <p className="text-sm font-medium">Missing</p>
          <p className="">{missing}</p>
        </div>

        <div className="text-xs text-gray-600  w-1/4">
          <p className="text-sm font-medium">Distinct</p>
          {distinct}
        </div>
      </div>
    </div>
  );
}

function Quality(props) {
  useEffect(() => {
    props.getDataHealthCheck();
  }, []);
  return (
    <div className="px-4 md:px-16">
      <h1 className="text-xl font-bold text-center my-6">
        DQ Health Check Status
      </h1>
      <>
        {!props.dataGovernance.loading ? (
          <>
            {props.dataGovernance.columns.map((item, index) => (
              <HealthCheckCard key={index} item={item} />
            ))}
          </>
        ) : (
          <p className="text-center">Loading ...</p>
        )}
      </>
    </div>
  );
}

const mapStateToProps = (state) => ({
  dataGovernance: state.dataGovernance,
});
const mapActionsToProps = {
  getDataHealthCheck,
};
export default connect(mapStateToProps, mapActionsToProps)(Quality);
