import React, { useEffect } from 'react';
import HealthCheckCard from './Card';
import { connect } from 'react-redux';
import { getDataHealthCheck } from '../actions';

function Quality(props) {
  useEffect(() => {
    props.getDataHealthCheck();
  }, []);
  return (
    <div className="px-4 py-16 md:px-16 lg:py-20">
      <>
        {!props.data.loading ? (
          <>
            {props.data.columns.map((item, index) => (
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
  data: state.data,
});
const mapActionsToProps = {
  getDataHealthCheck,
};
export default connect(mapStateToProps, mapActionsToProps)(Quality);
