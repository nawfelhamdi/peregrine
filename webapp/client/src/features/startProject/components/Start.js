import React, { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { CheckIcon, SelectorIcon } from '@heroicons/react/solid';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Navigate } from 'react-router-dom';

import { connect } from 'react-redux';
import { startProject } from '../actions';
import moment from 'moment';

const measurementModels = [
  {
    id: 1,
    name: 'PAA',
  },
  {
    id: 2,
    name: 'GMM',
  },
];

const validationSchema = yup.object({
  projectName: yup.string().required('Please add project name'),
  // : yup.date().required('Please add project end date'),
  startDate: yup
    .string()
    .test(
      'startDate',
      'Please make sure if is the last day of the month',
      (value) => {
        let startDate = new Date(value);
        let month = startDate.getMonth();
        startDate.setDate(startDate.getDate() + 1);
        return startDate.getMonth() !== month;
      }
    )
    .required('Please add project start date'),
  endDate: yup
    .string()
    .test(
      'endDate',
      'Please make sure if is the last day of the month',
      (value) => {
        let startDate = new Date(value);
        let month = startDate.getMonth();
        startDate.setDate(startDate.getDate() + 1);
        return startDate.getMonth() !== month;
      }
    )
    .test(
      'startDate',
      'Please Make sure the end date is after the start date',
      (value) => {
        moment().isAfter(value); //true
      }
    )
    .required('Please add project end date'),
});

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

function Start(props) {
  const [selectedMeasurementModel, setSelectedMeasurementModel] = useState(
    measurementModels[0]
  );

  const formik = useFormik({
    initialValues: {
      projectName: '',
      startDate: '',
      endDate: '',
    },
    validationSchema: validationSchema,
    onSubmit: (formData) => {
      const projectData = {
        project_name: formData.projectName,
        measurement_model: selectedMeasurementModel.name,
        start_date: formData.startDate,
        end_date: formData.endDate,
        created_by: 'loged user', // TODO: TO REMOVE AFTER BUILD AUTH FEATURE
        last_updated_by: 'loged User', // TODO: TO REMOVE AFTER BUILD AUTH FEATURE
        moody_project_id: '??', // TODO: TO REMOVE AFTER BUILD AUTH FEATURE
      };
      const stepRouteUrl = 'preparation';
      props.startProject(projectData, stepRouteUrl);
    },
  });

  return (
    <div className="">
      <form className="py-8 space-y-2 mb-16" onSubmit={formik.handleSubmit}>
        <div class="grid grid-cols-3 gap-0 max-w-xl">
          <div className="flex justify-start items-center col-span-1">
            <label className="block font-medium text-gray-700">
              Project name
            </label>
          </div>
          <div className="col-span-2">
            <input
              className="flex-grow w-full h-10 px-4 border-gray-300 transition duration-200 bg-white border  rounded shadow-sm appearance-none md:mr-2 focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
              placeholder="Project name"
              type="text"
              id="projectName"
              name="projectName"
              value={formik.values.projectName}
              onChange={formik.handleChange}
            />
          </div>
          {/* Input Error */}
          <div className="mt-1 ml-4 w-full col-start-2 col-span-2">
            {formik.touched.projectName &&
            Boolean(formik.errors.projectName) ? (
              <p className="text-red-400 w-full  bg-white text-sm">
                {formik.errors.projectName}
              </p>
            ) : null}
          </div>
        </div>

        <div className="grid grid-cols-3  gap-0 max-w-xl">
          <div className="flex justify-start items-center col-span-1">
            <label className="block text-md font-medium text-gray-700">
              Measurement Approach
            </label>
          </div>
          <div className="col-span-2">
            <Listbox
              value={selectedMeasurementModel}
              onChange={setSelectedMeasurementModel}
            >
              {({ open }) => (
                <>
                  <div className="mt-1 relative">
                    <Listbox.Button className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                      <span className="flex items-center">
                        <span className="ml-3 block truncate">
                          {selectedMeasurementModel.name}
                        </span>
                      </span>
                      <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <SelectorIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>

                    <Transition
                      show={open}
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                        {measurementModels.map((item) => (
                          <Listbox.Option
                            key={item.id}
                            className={({ active }) =>
                              classNames(
                                active
                                  ? 'text-white bg-indigo-600'
                                  : 'text-gray-900',
                                'cursor-default select-none relative py-2 pl-3 pr-9'
                              )
                            }
                            value={item}
                          >
                            {({ selected, active }) => (
                              <>
                                <div className="flex items-center">
                                  <span
                                    className={classNames(
                                      selected
                                        ? 'font-semibold'
                                        : 'font-normal',
                                      'ml-3 block truncate'
                                    )}
                                  >
                                    {item.name}
                                  </span>
                                </div>

                                {selected ? (
                                  <span
                                    className={classNames(
                                      active ? 'text-white' : 'text-indigo-600',
                                      'absolute inset-y-0 right-0 flex items-center pr-4'
                                    )}
                                  >
                                    <CheckIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </>
              )}
            </Listbox>
          </div>
          {/* Input Error */}
          <div className="mt-1 ml-4 w-full col-start-2 col-span-2">
            {formik.touched.selectedMeasurementModel &&
            Boolean(formik.errors.selectedMeasurementModel) ? (
              <p className="text-red-400 w-full  bg-white text-sm">
                {formik.errors.selectedMeasurementModel}
              </p>
            ) : null}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-0 max-w-xl">
          <div className="flex justify-start items-center col-span-1">
            <label className="block text-md font-medium text-gray-700">
              Project Start Date
            </label>
          </div>
          <div className="col-span-2">
            <input
              placeholder="Project name"
              type="date"
              onkeydown="return false"
              className="mt-1 flex-grow w-full h-10 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
              id="startDate"
              name="startDate"
              value={formik.values.startDate}
              onChange={formik.handleChange}
            />
          </div>
          {/* Input Error */}
          <div className="mt-1 ml-4 w-full col-start-2 col-span-2">
            {formik.touched.startDate && Boolean(formik.errors.startDate) ? (
              <p className="text-red-400 w-full  bg-white text-sm">
                {formik.errors.startDate}
              </p>
            ) : null}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-0 max-w-xl">
          <div className="flex justify-start items-center col-span-1">
            <label className="block text-md font-medium text-gray-700">
              Project End Date
            </label>
          </div>
          <div className="col-span-2">
            <input
              placeholder="date"
              onkeydown="return false"
              type="date"
              className="mt-1 flex-grow w-full h-10 px-4 mb-2 transition duration-200 bg-white border border-gray-300 rounded shadow-sm appearance-none md:mr-2 md:mb-0 focus:border-deep-purple-accent-400 focus:outline-none focus:shadow-outline"
              id="endDate"
              name="endDate"
              value={formik.values.endDate}
              onChange={formik.handleChange}
            />
          </div>
          {/* Input Error */}
          <div className="mt-1 ml-4 w-full col-start-2 col-span-2">
            {formik.touched.endDate && Boolean(formik.errors.endDate) ? (
              <p className="text-red-400 w-full  bg-white text-sm">
                {formik.errors.endDate}
              </p>
            ) : null}
          </div>
        </div>
        <button
          type="submit"
          className="top-8 relative font-bold inline-flex items-center justify-center h-12 px-8 md:px-12 font-medium tracking-wide transition duration-200 rounded-md shadow-md text-gray-900 bg-skin-button-accent disabled:opacity-70 float-right"
        >
          {props.project.loading ? (
            <svg
              role="status"
              className="mr-2 w-8 h-8 text-skin-base animate-spin fill-white"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              ></path>
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              ></path>
            </svg>
          ) : null}

          <div className="flex items-center">
            <span>Start Processing</span>
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
      </form>

      {props.project.navigate === 'preparation' && (
        <Navigate to="/start-project/preparation" replace={true} />
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  project: state.project,
});
const mapActionsToProps = { startProject };
export default connect(mapStateToProps, mapActionsToProps)(Start);
