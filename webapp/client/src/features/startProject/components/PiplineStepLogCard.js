import React from 'react';
import moment from 'moment';
import { CgSpinner } from 'react-icons/cg';

export default function PiplineStepLogCard(props) {
  return (
    <div className="h-24 border border-[#EAEAF2] shadow-sm rounded-md my-2 px-4 py-3">
      <div className="flex justify-between">
        <div className="text-sm text-gray-600 flex items-center mb-2">
          <p className="text-sm font-bold flex items-center justify-center">
            <p className="h-8 w-8 mr-4 bg-white rounded-full flex items-center justify-center">
              {props.pipelineStepLog.status === 'Success' ? (
                <div className="flex items-center justify-center w-5 h-5  rounded-full bg-green-700">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              ) : props.pipelineStepLog.status === 'Failed' ? (
                <div className="flex items-center justify-center w-5 h-5  rounded-full bg-red-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-white"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              ) : (
                <div className="">
                  <CgSpinner className="text-[#ff7f50] animate-spin-slow h-6 w-6" />
                </div>
              )}
            </p>
            {props.index + 1} : {props.pipelineStepLog.pipeline_name}
          </p>
        </div>
      </div>
      <div className="flex justify-between">
        <div className="text-xs text-gray-600">
          <p className="text-sm font-medium">Status</p>
          <p className="">{props.pipelineStepLog.status}</p>
        </div>
        <div className="text-xs text-gray-600">
          <p className="text-sm font-medium">Starting Time</p>
          <p className="">
            {moment(props.pipelineStepLog.starting_time).format('lll')}
          </p>
        </div>
        <div className="text-xs text-gray-600 ">
          <p className="text-sm font-medium">Ending Time</p>
          {props.pipelineStepLog.ending_time ? (
            <p>{moment(props.pipelineStepLog.ending_time).format('lll')}</p>
          ) : (
            <p class="mt-2 animate-pulse h-2 bg-[#E2E2E2] rounded"></p>
          )}
        </div>
        <div className="text-xs text-gray-600 ">
          <p className="text-sm font-medium">Created By</p>
          <p className=" rounded-md ">{props.pipelineStepLog.created_by}</p>
        </div>
      </div>
    </div>
  );
}
