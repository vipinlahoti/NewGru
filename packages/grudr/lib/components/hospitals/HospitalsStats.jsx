import { Components, registerComponent } from 'meteor/vulcan:core';
import React from 'react';

const HospitalsStats = ({hospital}) => {

  return (
    <div className="hospitals-stats">
      {hospital.score ? <span className="hospitals-stats-item" title="Score"><Components.Icon name="score"/> {Math.floor((hospital.score || 0)*10000)/10000} <span className="sr-only">Score</span></span> : ""}
      <span className="hospitals-stats-item" title="Upvotes"><Components.Icon name="upvote"/> {hospital.baseScore || 0} <span className="sr-only">Upvotes</span></span>
      <span className="hospitals-stats-item" title="Clicks"><Components.Icon name="clicks"/> {hospital.clickCount || 0} <span className="sr-only">Clicks</span></span>
      <span className="hospitals-stats-item" title="Views"><Components.Icon name="views"/> {hospital.viewCount || 0} <span className="sr-only">Views</span></span>
    </div>
  )
}

HospitalsStats.displayName = "HospitalsStats";

registerComponent('HospitalsStats', HospitalsStats);
