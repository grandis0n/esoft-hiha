import React from "react";
import { Route, Routes } from 'react-router-dom';
import AgentPage from "../pages/AgentPage";
import ClientsPage from "../pages/ClientsPage";
import RealtyPage from "../pages/RealtyPage";
import SuggestionPage from "../pages/SuggestionPage";
import DemandPage from "../pages/DemandPage";
import DealPage from "../pages/DealPage";

const AppRouter = () => {

    return(
        <Routes>
          <Route path="/clients" element={<ClientsPage/>}/>
          <Route path="/agents" element={<AgentPage/>}/>
          <Route path="/realties" element={<RealtyPage/>}/>
          <Route path="/suggestions" element={<SuggestionPage/>}/>
          <Route path="/demands" element={<DemandPage/>}/>
          <Route path="/deals" element={<DealPage/>}/>
        </Routes>
    );
}

export default AppRouter;