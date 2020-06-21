import React from 'react';
import FileUpload from './components/FileUpload';



const App = () => (
  <div className='container mt-4'>
    <h4 className='display-4 text-center mb-4'>
      <i className='fab fa-react' />AI Calorie Tracker
    </h4>
    <div style={{
      paddingTop: "50px"
    }} >
      <FileUpload />
    </div>

  </div>
);

export default App;