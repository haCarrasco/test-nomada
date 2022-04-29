import React, { Component } from 'react';
import InfoActors from "../InfoActors/InfoActors";
import DragAndDropComponent from '../../components/DragAndDropComponent';
import { Routes, Route  } from "react-router-dom";



class MainComponent extends Component {
  

 render() {
  
   return (
     <div>
       <Routes>
         <Route exact path="/" element={<DragAndDropComponent/>} />
         <Route exact path="/InfoActors/:actorName" element={<InfoActors />} />
       </Routes>
     </div>
   );
 }
}

export default MainComponent;
