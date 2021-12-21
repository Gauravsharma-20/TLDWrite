import React from 'react';

import './feature.css';

const Feature = ({ title, text }) => (
  <div className="f14FeatureContainer">
    <div className="f14FeatureTitle">
      <div />
      <h1>{title}</h1>
    </div>
    <div className="f14FeatureText">
      <p>{text}</p>
    </div>
  </div>
);

export default Feature;