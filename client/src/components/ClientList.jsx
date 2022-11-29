import React, { useState } from "react";
import ClientItem from "./ClientItem";


const ClientList = ({clients, openModal, openEditModal, openSugDemModal}) => {
    return(
        <div className="clients__list">
            {clients.map((client) => 
              <ClientItem client={client} openModal={openModal} openEditModal={openEditModal} openSugDemModal={openSugDemModal} key={client.id}/>
            ) }
        </div>
    );
};

export default ClientList; 
