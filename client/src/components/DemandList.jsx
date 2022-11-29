import React, { useState } from "react";
import DemandItem from "./DemandItem";


const DemandList = ({demands, openModal, openEditModal, openSuggestionsModal}) => {
    return(
        <div className="demands__list">
            {demands.map((demand) => 
              <DemandItem demand={demand} openModal={openModal} openEditModal={openEditModal} openSuggestionsModal={openSuggestionsModal} key={demand.id}/>
            ) }
        </div>
    );
};

export default DemandList; 
