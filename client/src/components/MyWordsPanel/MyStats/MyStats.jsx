import React, {useState, useEffect, useContext} from 'react';
import './MyStats.css';
import { StatsContext } from '../../../context/StatsContext';

function MyStats({ statType, statName }) {

   const { myStats, getAllStats } = useContext(StatsContext);

  return (
   <>
      {myStats && Object.entries(myStats)
      .filter(([key]) => key === statType)
      .map(([key, value]) => (
         <div className='my-words-word-stats-li' key={key}>
         <div className='my-words-stats-header-div'> 
            <div className={`my-words-stats-color-indicator-${statName}`}></div>
            <span className='my-words-stats-title'>{statName}</span>
         </div>
         <span className='my-words-stats-number'>{value}</span>
      </div>
   ))}
   </> 
   )
}

export default MyStats;