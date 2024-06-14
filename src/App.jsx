import React from 'react';
import MainLoader from './components/MainLoader';

function App() {
  const Form = React.lazy(() => {
    return new Promise(resolve => {
      setTimeout(() => resolve(import('./components/FormValidation')), 1000);
    });
  });

  return (
    <React.Suspense fallback={<MainLoader />}>
      <div className="container">
        <h2 className='text-center'>Formik-Yup Form</h2>
        <Form />
      </div>
    </React.Suspense>
  );
};

export default App;
