import {React, useState} from "react";
import DeleteButton from "./UI/Button/Delete/DeleteButton";
import EditButton from "./UI/Button/Warn/EditButton";


const SuggestionItem = ({suggestion, openModal, openEditModal, openDemandsModal}) => {

    return(
        <div className="suggestion">
            <ul className="suggestion__ul" onClick={() => openDemandsModal(suggestion)}>
                {suggestion.client_id !== null && suggestion.client_id !== ""
                ? <li><h3>Id клиента:</h3> {suggestion.client_id}</li>
                : <li><h3>Id клиента:</h3> Не указан</li> 
                }
                {suggestion.agent_id !== null && suggestion.agent_id !== ""
                    ? <li><h3>Id риелтора</h3> {suggestion.agent_id}</li>
                    : <li><h3>Id риелтора</h3> Не указан</li> 
                }
                {suggestion.realty_id !== null && suggestion.realty_id !== ""
                    ? <li><h3>Id недвижимости</h3> {suggestion.realty_id}</li>
                    : <li><h3>Id недвижимости</h3>Не указан</li>
                }
                {suggestion.price !== null && suggestion.price !== ""
                    ? <li><h3>Цена</h3>{suggestion.price}</li>
                    : <li><h3>Цена</h3> Не указана</li>
                }
            </ul>
            <div className="btn__container">
                <EditButton onClick={()=> openEditModal(suggestion)}>Edit</EditButton>
                <DeleteButton onClick={()=> openModal(suggestion.id)}>Delete</DeleteButton>
            </div>
        </div>
    );
};

export default SuggestionItem; 