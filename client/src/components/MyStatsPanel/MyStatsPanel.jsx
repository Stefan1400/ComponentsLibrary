import React, { useContext, useEffect } from 'react';
import './MyStatsPanel.css'
import { StatsContext } from '../../context/StatsContext';

function MyStats() {

   const { myStats, setMyStats, getAllStats } = useContext(StatsContext);

  return (
    // <ul className='my-stats-ul'>
    //   {myStats && Object.entries(myStats)
    //     .filter(([key]) => key === "total_words")
    //     .map(([key, value]) => (
    //       <li className='my-stats-ul-li' key={key}>
    //         <span className='my-stats-title'>Total Words</span>
    //         <span className='my-stats-number'>{value}</span>
    //       </li>
    //     ))
    //   }
    // </ul>
    <ul className='my-stats-ul'>
      <h2 className='my-stats-h2'>My Stats</h2>
      
      <div className='word-stats'>
          {myStats && Object.entries(myStats)
          .filter(([key]) => key === "total_words")
          .map(([key, value]) => (
            <li className='my-stats-ul-li' key={key}>
              <span className='my-stats-title'>Total Words</span>
              <span className='my-stats-number'>{value}</span>
            </li>
          ))
        }
        {myStats && Object.entries(myStats)
          .filter(([key]) => key === "known_words")
          .map(([key, value]) => (
            <li className='my-stats-ul-li' key={key}>
              <span className='my-stats-title'>Known Words</span>
              <span className='my-stats-number'>{value}</span>
            </li>
          ))
        }
        {myStats && Object.entries(myStats)
          .filter(([key]) => key === "learning_words")
          .map(([key, value]) => (
            <li className='my-stats-ul-li' key={key}>
              <span className='my-stats-title'>Learning Words</span>
              <span className='my-stats-number'>{value}</span>
            </li>
          ))
        }
      </div>
    </ul>
  )
}

export default MyStats