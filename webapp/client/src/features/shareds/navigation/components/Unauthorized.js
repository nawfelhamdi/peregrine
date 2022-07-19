import { Link } from 'react-router-dom';
export default function Unauthorized() {
  return (
    <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
      <div className="max-w-2xl mx-auto sm:max-w-xl md:max-w-2xl">
        <div className="text-center">
          <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
            <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
              unauthorized
            </h2>
            <p className="text-base text-gray-700 md:text-lg">
              You are unauthorized to view this content.
            </p>
            {/* <p className='text-base text-gray-700 md:text-lg'>
              Vous pouvez revenir à la page d'accueil
            </p> */}
          </div>
          {/* <Link to='/'>
            <button className='inline-flex items-center justify-center h-12 px-10 font-medium tracking-wide text-white transition duration-200 rounded-md shadow-md bg-skin-button-accent hover:bg-deep-purple-accent-700 focus:shadow-outline focus:outline-none'>
              Home
            </button>
          </Link> */}
        </div>
      </div>
    </div>
  );
}
