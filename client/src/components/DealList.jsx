import React, { useState } from "react";
import DealItem from "./DealItem";


const DealList = ({deals, openModal, openEditModal, openInfoModal}) => {
    return(
        <div className="deals__list">
            {deals.map((deal) => 
              <DealItem deal={deal} openModal={openModal} openEditModal={openEditModal} key={deal.id} openInfoModal={openInfoModal}/>
            ) }
        </div>
    );
};

export default DealList; 
