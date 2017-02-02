import React from 'react';

const CamperListItem = ({camper, number}) => {
  return (
    <tr>
      <td className="col-xs-3">{number} <img src={camper.img}/></td>
      <td className="col-xs-3"><a href={`https://freecodecamp.com/${camper.username}`} target="_blank">{camper.username}</a></td>
      <td className="col-xs-3">{camper.recent}</td>
      <td className="col-xs-3">{camper.alltime}</td>
    </tr>
  );
}

export default CamperListItem;
