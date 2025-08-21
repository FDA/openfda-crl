import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHourglassHalf } from '@fortawesome/free-solid-svg-icons'

export default function CustomLoadingOverlay (props) {
  return (
    <div
      className="ag-overlay-loading-center"
      style={{ backgroundColor: 'lightsteelblue', height: '19%' }}
    >
      <FontAwesomeIcon icon={faHourglassHalf}/>
      <span> {props.loadingMessage}</span>
    </div>
  );
};