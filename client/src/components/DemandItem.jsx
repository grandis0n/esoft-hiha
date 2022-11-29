import {React, useState} from "react";
import DeleteButton from "./UI/Button/Delete/DeleteButton";
import EditButton from "./UI/Button/Warn/EditButton";


const DemandItem = ({demand, openModal, openEditModal, openSuggestionsModal}) => {

    return(
        <div className="demand">
            <ul className="demand__ul" onClick={() => openSuggestionsModal(demand)}>
                {demand.client_id !== null && demand.client_id !== ""
                ? <li><h3>Id клиента:</h3> {demand.client_id}</li>
                : <li><h3>Id клиента:</h3> Не указан</li> 
                }

                {demand.agent_id !== null && demand.agent_id !== ""
                    ? <li><h3>Id риелтора</h3> {demand.agent_id}</li>
                    : <li><h3>Id риелтора</h3> Не указан</li> 
                }

                {demand.type_id !== null && demand.type_id !== ""
                    ? <li><h3>Id типа недвижимости</h3> {demand.type_id}</li>
                    : <li><h3>Id типа недвижимости</h3>Не указан</li>
                }

                {demand.adress_city !== null && demand.adress_city !== ""
                    ? <li><h3>Город</h3> {demand.address_city}</li>
                    : <li><h3>Город</h3> Не указан</li>
                }

                
                {demand.min_price !== null && demand.min_price !== ""
                    ? <li><h3>Минимальная цена</h3> {demand.min_price}</li>
                    : <li><h3>Минимальная цена</h3> Не указана</li>
                }

                
                {demand.max_price !== null && demand.max_price !== ""
                    ? <li><h3>Максимальная цена</h3> {demand.max_price}</li>
                    : <li><h3>Максимальная цена</h3> Не указан</li>
                }

                { demand.type_id === 1
                    ? <div>
                        {demand.min_area !== null && demand.min_area !== ""
                        ? <li><h3>Минимальная площадь</h3> {demand.min_area}</li>
                        : <li><h3>Минимальная площадь</h3> Не указана</li>}

                        {demand.max_area !== null && demand.max_area !== ""
                        ? <li><h3>Максимальная площадь</h3> {demand.max_area}</li>
                        : <li><h3>Максимальная площадь</h3> Не указана</li>}

                        {demand.min_total_rooms !== null && demand.min_total_rooms !== ""
                        ? <li><h3>Минимальное число комнат</h3> {demand.min_total_rooms}</li>
                        : <li><h3>Минимальное число комнат</h3> Не указано</li>}

                        {demand.max_total_rooms !== null && demand.max_total_rooms !== ""
                        ? <li><h3>Максимальное число комнат</h3> {demand.max_total_rooms}</li>
                        : <li><h3>Максимальное число комнат</h3> Не указано</li>}

                        {demand.min_floor !== null && demand.min_floor !== ""
                        ? <li><h3>Минимальный этаж</h3> {demand.min_floor}</li>
                        : <li><h3>Минимальный этаж</h3> Не указан</li>}

                        {demand.max_floor !== null && demand.max_floor !== ""
                        ? <li><h3>Максимальный этаж</h3> {demand.max_floor}</li>
                        : <li><h3>Максимальный этаж</h3> Не указан</li>}

                    </div>
                        
                    : demand.type_id === 2
                        ? <div>
                            {demand.min_area !== null && demand.min_area !== ""
                            ? <li><h3>Минимальная площадь</h3> {demand.min_area}</li>
                            : <li><h3>Минимальная площадь</h3> Не указана</li>}

                            {demand.max_area !== null && demand.max_area !== ""
                            ? <li><h3>Максимальная площадь</h3> {demand.max_area}</li>
                            : <li><h3>Максимальная площадь</h3> Не указана</li>}

                            {demand.min_total_rooms !== null && demand.min_total_rooms !== ""
                            ? <li><h3>Минимальное число комнат</h3> {demand.min_total_rooms}</li>
                            : <li><h3>Минимальное число комнат</h3> Не указано</li>}

                            {demand.max_total_rooms !== null && demand.max_total_rooms !== ""
                            ? <li><h3>Максимальное число комнат</h3> {demand.max_total_rooms}</li>
                            : <li><h3>Максимальное число комнат</h3> Не указано</li>}

                            {demand.min_total_floors !== null && demand.min_total_floors !== ""
                            ? <li><h3>Минимальное число этажей</h3> {demand.min_total_floors}</li>
                            : <li><h3>Минимальное число этажей</h3> Не указано</li>}

                            {demand.max_total_floors !== null && demand.max_total_floors !== ""
                            ? <li><h3>Максимальное число этажей</h3> {demand.max_total_floors}</li>
                            : <li><h3>Максимальное число этажей</h3> Не указано</li>}

                        </div>
                    :
                    <div>
                            {demand.min_area !== null && demand.min_area !== ""
                            ? <li><h3>Минимальная площадь</h3> {demand.min_area}</li>
                            : <li><h3>Минимальная площадь</h3> Не указана</li>}

                            {demand.max_area !== null && demand.max_area !== ""
                            ? <li><h3>Максимальная площадь</h3> {demand.max_area}</li>
                            : <li><h3>Максимальная площадь</h3> Не указана</li>}
                    </div>
                }

            </ul>
            <div className="btn__container">
                <EditButton onClick={()=> openEditModal(demand)}>Edit</EditButton>
                <DeleteButton onClick={()=> openModal(demand.id)}>Delete</DeleteButton>
            </div>
        </div>
    );
};

export default DemandItem; 