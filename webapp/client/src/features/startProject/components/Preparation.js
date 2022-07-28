import React, { Fragment, useState, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import Progress from './Progress';
import PreparationProcessInfo from './PreparationProcessInfo';
import PiplineStepLogCard from './PiplineStepLogCard';

import { connect } from 'react-redux';
import { getPreparationPipelineLogTimer, triggerPipelineApi } from '../actions';
import { Link } from 'react-router-dom';
import Quality from '../../governance/components/Quality';
function Preparation(props) {
  let [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    props.getPreparationPipelineLogTimer();
  }, []);

  const handletriggerPipelineApi = () => {
    props.triggerPipelineApi('run');
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

        <button
          disabled={props.project.preparationProgressBar !== 100}
          className="my-8 disabled:bg-[#cccccc] inline-flex items-center justify-center h-12 px-8 md:px-12 font-medium tracking-wide transition duration-200 rounded-md shadow-md text-gray-900 bg-skin-button-accent disabled:opacity-70 float-left"
          onClick={() => setIsOpen(true)}
        >
          <div className="flex items-center">
            <span>Check DQ Health</span>
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
      </div>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed top-14 inset-x-0 mx-auto flex z-40"
          onClose={setIsOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-y-full"
            enterTo="translate-y-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-y-0"
            leaveTo="-translate-y-full"
          >
            <div className="relative bg-white max-w-sm rounded-md md:max-w-3xl w-full mx-auto shadow-xl  flex flex-col overflow-y-auto">
              <div className="py-3 px-4 space-y-6">
                <div className=" flex absolute top-5 right-5 z-20">
                  <button
                    type="button"
                    className="-m-2 p-2 rounded-md inline-flex items-center justify-center text-gray-400"
                    onClick={() => setIsOpen(false)}
                  >
                    <span className="sr-only">Close menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
                <div className="flow-root">
                  <div
                    id="authentication-modal"
                    aria-hidden="true"
                    className="overflow-y-auto overflow-x-hidden justify-center items-center md:h-full md:inset-0"
                  >
                    <div className="relative z-0">
                      <div className="relative">
                        <Quality />
                        <div className="flex items-center justify-between">
                          <button
                            onClick={() => setIsOpen(false)}
                            className="flex items-center my-8 inline-flex items-center justify-center h-12 px-8 md:px-12 font-medium tracking-wide transition duration-200 rounded-md shadow-md text-gray-900 bg-skin-button-accent disabled:opacity-70 float-left"
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
                          </button>
                          <Link to="/start-project/run">
                            <button
                              disabled={props.dataGovernance.loading}
                              className="my-8 disabled:bg-[#cccccc] inline-flex items-center justify-center h-12 px-8 md:px-12 font-medium tracking-wide transition duration-200 rounded-md shadow-md text-gray-900 bg-skin-button-accent disabled:opacity-70 float-left"
                              onClick={() => handletriggerPipelineApi()}
                            >
                              <div className="flex items-center">
                                <span>Validate and run Moody’s RI</span>
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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Transition.Child>
        </Dialog>
      </Transition.Root>
    </div>
  );
}

const mapStateToProps = (state) => ({
  project: state.project,
  dataGovernance: state.dataGovernance,
});
const mapActionsToProps = {
  getPreparationPipelineLogTimer,
  triggerPipelineApi,
};
export default connect(mapStateToProps, mapActionsToProps)(Preparation);
