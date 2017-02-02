import React, {Component} from 'react';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

import CamperListItem from './camper_list_item';

// import styles from './table.css'



//functional

const CamperList = ({campers}) => {

  const Items = campers.map((camper, index) => {
    return <CamperListItem key={index} camper={camper} number={ index + 1}/>
  });


    return (
      <table className="table table-hover table-striped table-fixed" >
        <thead>
          <tr>
            <th className="col-xs-3">#</th>
            <th className="col-xs-3">Username</th>
            <th className="col-xs-3">Last 30 Days</th>
            <th className="col-xs-3">All Time Points</th>
          </tr>
        </thead>
        <tbody>
          {Items}
        </tbody>
      </table>

  );
}

export default CamperList;
