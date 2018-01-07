import { replaceComponent } from 'meteor/vulcan:lib';
import React from 'react';

const Loading = props => {
  return (
    <div className={`loader-wrapper ${props.className}`}>
      <div className="container">
        <div className="row preloader">
          <div className="preloader-wrapper big active center-xs">
            <div className="spinner-layer spinner-blue-only">
              <div className="circle-clipper left">
                <div className="circle"></div>
              </div>
              <div className="gap-patch">
                <div className="circle"></div>
              </div>
              <div className="circle-clipper right">
                <div className="circle"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

Loading.displayName = "Loading";

replaceComponent('Loading', Loading);
