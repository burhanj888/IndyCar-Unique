import React from 'react';
import '../index.css';

const Loader = ({ visible }) => (
    <div className={`loader ${visible ? '' : 'd-none'}`}></div>
);

export default Loader;
