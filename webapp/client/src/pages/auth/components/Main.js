import { Link } from 'react-router-dom';

import { useFormik } from 'formik';
import * as yup from 'yup';
import { connect } from 'react-redux';
import { loginUser } from '../actions';

const validationSchema = yup.object({
  email: yup
    .string()
    .email('Add error message here')
    .required('Add errormessage'),
  password: yup.string().required('add custom message here'),
});
function Main(props) {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (formData) => {
      const userData = {
        email: formData.email,
        password: formData.password,
      };
      props.loginUser(userData);
    },
  });
  return (
    <form className="mt-8 space-y-6" onSubmit={formik.handleSubmit}>
      <input type="hidden" name="remember" defaultValue="true" />
      <div className="rounded-md-space-y-px">
        <div className="space-y-3">
          <label htmlFor="email-address">Email address</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            placeholder="Email address"
            className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          />
        </div>
        <div className="w-full h-10 my-1">
          {formik.touched.email && Boolean(formik.errors.email) ? (
            <p className="text-red-400 mb-4 w-full h-12  bg-white text-sm">
              {formik.errors.email}
            </p>
          ) : null}
        </div>
        <div className="space-y-3">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
            placeholder="Password"
            className="appearance-none  relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          />
        </div>
        <div className="w-full h-10 my-1">
          {formik.touched.password && Boolean(formik.errors.password) ? (
            <p className="text-red-400 mb-4 w-full h-12  bg-white text-sm">
              {formik.errors.password}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Log in
          </button>
        </div>

        <div className="text-sm">
          <Link
            to="#"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Forgot your password?
          </Link>
        </div>
      </div>
    </form>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapActionsToProps = { loginUser };
export default connect(mapStateToProps, mapActionsToProps)(Main);
