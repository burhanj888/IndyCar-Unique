import React from 'react';
import '../index.css';

const Loader = ({ visible }) => {
    if(!visible){
        return null
    }
    return  <div className="loader"></div>
}

export default Loader;
