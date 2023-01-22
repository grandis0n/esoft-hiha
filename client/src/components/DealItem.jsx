import {React, useState} from "react";
import DeleteButton from "./UI/Button/Delete/DeleteButton";
import EditButton from "./UI/Button/Warn/EditButton";


const DealItem = ({deal, openModal, openEditModal, openInfoModal}) => {

    return(
        <div className="client">
            <ul className="client__ul" onClick={() => openInfoModal(deal)}>
                {deal.suggestion_id !== null && deal.suggestion_id !== ""
                ? <li><h3>Id предложения:</h3> {deal.suggestion_id}</li>
                : <li><h3>Id предложения:</h3> Не указан</li> 
                }
                {deal.demand_id !== null && deal.demand_id !== ""
                    ? <li><h3>Id потребности:</h3> {deal.demand_id}</li>
                    : <li><h3>Id потребности:</h3> Не указан</li> 
                }
            </ul>
            <div className="btn__container">
                <EditButton onClick={()=> openEditModal(deal)}>Edit</EditButton>
                <DeleteButton onClick={()=> openModal(deal.id)}>Delete</DeleteButton>
            </div>
        </div>
    );
};

export default DealItem; 