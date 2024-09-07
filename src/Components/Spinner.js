import React from 'react';
import loader from './Loader.gif';

const Spinner = () => {
  return (
    <div className="text-center">
      <img src={loader} style={{ width: "5rem", height: "5rem" }} alt="loading" />
    </div>
  );
};

export default Spinner;



// import React, { Component } from 'react'
// import loader from './Loader.gif'

// export class Spinner extends Component{
//     render(){

//         return(
//             <div className='text-center'>
//               <img src={loader} style={{width:"5rem",height:"5rem"}} alt="loading" />

//             </div>
//         )
//     }
// }
// export default Spinner;