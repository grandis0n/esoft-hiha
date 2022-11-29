import React, { useState } from "react";
import SuggestionItem from "./SuggestionItem";


const SuggestionList = ({suggestions, openModal, openEditModal, openDemandsModal}) => {
    return(
        <div className="suggestions__list">
            {suggestions.map((suggestion) => 
              <SuggestionItem suggestion={suggestion} openModal={openModal} openEditModal={openEditModal} openDemandsModal={openDemandsModal} key={suggestion.id}/>
            ) }
        </div>
    );
};

export default SuggestionList; 
