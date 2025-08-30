import React from 'react';
import './Grid.css';
import { useState } from 'react';
import AddWordsPanel from '../AddWordsPanel/AddWordsPanel';
import MyWordsPanel from '../MyWordsPanel/MyWordsPanel';
// import MyStatsPanel from '../MyStatsPanel/MyStatsPanel';
import ReviewPanel from '../ReviewPanel/ReviewPanel';


function Grid() {
  
   const [panel1Open, setPanel1Open] = useState(true);
   const [panel2Open, setPanel2Open] = useState(false);
   const [panel3Open, setPanel3Open] = useState(true);
   const [panel4Open, setPanel4Open] = useState(false);
   
   const panels = [panel1Open, panel2Open, panel3Open, panel4Open];
   const countOpen = panels.filter(Boolean).length === 1;


   return (
    <div className='grid'>
      {panel1Open && (
         <div className={`grid-item ${countOpen ? 'fill-grid' : !panel2Open ? "fill-row" : ""}`}>
            
            <AddWordsPanel />

         </div>
      )}
      {panel2Open && (
         <div className={`grid-item ${countOpen ? 'fill-grid' : !panel1Open ? "fill-row" : ""}`}>

            <MyWordsPanel />

         </div>
      )}
      {panel3Open && (
         <div className={`grid-item ${countOpen ? 'fill-grid' : !panel4Open ? "fill-row" : ""}`}>

            {/* <MyStatsPanel /> */}

         </div>
      )}
      {panel4Open && (
         <div className={`grid-item ${countOpen ? 'fill-grid' : !panel3Open ? "fill-row" : ""}`}>

            <ReviewPanel />

         </div>
      )}
    </div>
  )
}

export default Grid