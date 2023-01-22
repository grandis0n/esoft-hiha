import {React, useState, useEffect} from "react";
import '../style/App.css';
import SuggestionList from "../components/SuggestionList";
import MyModal from "../components/UI/Modal/MyModal";
import DeleteButton from "../components/UI/Button/Delete/DeleteButton";
import MyButton from "../components/UI/Button/Apply/MyButton";
import MyInput from "../components/UI/Input/MyInput"
import SuccessButton from "../components/UI/Button/Success/SuccessButton";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const SuggestionPage = () => {
    const [suggestions, setSuggestions] = useState([]);
    const [selectedSuggestion, setSelectedSuggestion] = useState({
      id: 1,
    });
    const [selectedDemand, setSelectedDemand] = useState({
      id: 1,
    });


    const [clients, setClients] = useState([]);
    const [agents, setAgents] = useState([]);
    const [realties, setRealties] = useState([]);
    const [demands, setDemands] = useState([]);
    const [isSuggestionsLoading, setIsSuggestionsLoading] = useState(false);

    const [modalActive, setModalActive] = useState(false);
    const [demandsModalActive, setDemandsModalActive] = useState(false);
    const [notification, setNotification] = useState("");
    const [modalCreateActive, setModalCreateActive] = useState(false);
    const [notModalActive, setNotModalActive] = useState(false);
    const [editModalActive, setEditModalActive] = useState(false);
    const [suggestionToEdit, setSuggestionToEdit] = useState({ });

    const [createSuggestion, setCreateSuggestion] = useState({});
    // const [createDeal, setCreateDeal] = useState({});

    const [delId, setDelId] = useState();
    const [editId, setEditId] = useState();

    useEffect(() => {
      fetchSuggestions();
      fetchClients();
      fetchAgents();
      fetchRealties();
      fetchDemands();
    }, [])

    async function fetchSuggestions(){
      setIsSuggestionsLoading(true);

      let body = JSON.stringify({})
      
      const fsuggestions = await fetch("https://esoft.onrender.com/api/suggestion/all", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: body
      }).then((response) => {
        return response.json()
      }).catch((e) => {
        console.log('bad', e)
      })
      setSuggestions(fsuggestions.data)
      setIsSuggestionsLoading(false);
    };

    async function fetchClients(){
  
        let body = JSON.stringify({
          first_name: "",
          middle_name: "",
          last_name: ""
        })
        
        const fclients= await fetch("https://esoft.onrender.com/api/client/all", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: body
        }).then((response) => {
          return response.json()
        }).catch((e) => {
          console.log('bad', e)
        })
        setClients(fclients.data)
      };


      async function fetchAgents(){
  
        let body = JSON.stringify({
          first_name: "",
          middle_name: "",
          last_name: ""
        })
        
        const fagents= await fetch("https://esoft.onrender.com/api/agent/all", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: body
        }).then((response) => {
          return response.json()
        }).catch((e) => {
          console.log('bad', e)
        })
        setAgents(fagents.data)
      };


      async function fetchRealties(){
  
        let body = JSON.stringify({})
        
        const frealties= await fetch("https://esoft.onrender.com/api/realty/all", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: body
        }).then((response) => {
          return response.json()
        }).catch((e) => {
          console.log('bad', e)
        })
        setRealties(frealties.data)
      };

      async function fetchDemands(){
  
        let body = JSON.stringify({})
        
        const fdemands = await fetch("https://esoft.onrender.com/api/demand/all", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: body
        }).then((response) => {
          return response.json()
        }).catch((e) => {
          console.log('bad', e)
        })
        setDemands(fdemands.data)
      };
  

    async function deleteSuggestion(id){
        const dsuggestion = suggestions.find((item) => item.id == id)
        if(dsuggestion.served === false) {
            const result = await fetch('https://esoft.onrender.com/api/suggestion/delete/' + String(id), {method: 'DELETE'})
            .then((response1) => {
              if (response1 && response1 !== undefined){
                return response1.json();
              }
            })
            if (result.msg === "success"){
              const filteredSuggestions = suggestions.filter((item) => item.id !== id)
              setSuggestions(filteredSuggestions)
              setNotification("Удалено успешно")
              setNotModalActive(true)
            }else{
                setNotification("Ошибка удаления: " + result.message)
                setNotModalActive(true)
            } 
          } else {
            setNotification("Не возможно удалить предложение! Оно находится в сделке!")
            setNotModalActive(true)
          }
    };


    async function editSuggestion(){
      let body = {}
      if (suggestionToEdit.client_id){
        body.client_id = suggestionToEdit.client_id
      }
      if (suggestionToEdit.agent_id){
        body.agent_id = suggestionToEdit.agent_id
      }
      if (suggestionToEdit.realty_id){
        body.realty_id = suggestionToEdit.realty_id
      }
      if (suggestionToEdit.price){
        body.price = suggestionToEdit.price
      }
      
      const editedSuggestion = await fetch("https://esoft.onrender.com/api/suggestion/update/" + String(editId), {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }).then((response) => {
        return response.json()
      })
      if (editedSuggestion.msg === "success"){
        let temp = [...suggestions]
        for (let i=0; i < temp.length; i++){
          if (temp[i].id == editId){
            temp[i] = {...suggestionToEdit}
            break;
          }
        } 
        setSuggestions(temp)
        setNotification("Предложение отредактировано")
        setNotModalActive(true)
      }else{
        setNotification(editedSuggestion.msg)
        console.log(editedSuggestion)
        setNotModalActive(true)
      }
    };


    async function addSuggestion(){
      let body

      if (createSuggestion.client_id !== null && createSuggestion.agent_id !== null && createSuggestion.realty_id !== null && createSuggestion.price !== null) {
        body = JSON.stringify({
          client_id: createSuggestion.client_id,
          agent_id: createSuggestion.agent_id,
          realty_id: createSuggestion.realty_id,
          price: createSuggestion.price,
      })}
      
      const createResponse = await fetch('https://esoft.onrender.com/api/suggestion/create', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: body
      }).then((response) => {
        return response.json()
      })


      if (createResponse && createResponse !== undefined && createResponse.msg == "success"){
        setSuggestions([...suggestions, createResponse.data])
        setNotification("Предложение успешно создано")
        setNotModalActive(true)
      }else{
        if (createResponse.message == "Ошибка при валидации"){
          setNotification("Ошибка: " + createResponse.errors[0].msg)
          setNotModalActive(true)
        }else{
          if(createResponse.message == "Ошибка валидации"){
            setNotification("Ошибка: " + createResponse.errors[0].msg)
            setNotModalActive(true)
          }
        }
      }
    };

    async function markSuggestionAsInDeal(suggestion_id) {
      let body
      body.served = true

      await fetch('https://esoft.onrender.com/api/suggestion/update/' + String(suggestion_id), {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: body
      }).then((response) => {
        return response.json()
      })
    }

    
    async function markDemandAsInDeal(demand_id) {
      let body
      body = JSON.stringify({
        served:true
      })

      await fetch('https://esoft.onrender.com/api/demand/update/' + String(demand_id), {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: body
      }).then((response) => {
        return response.json()
      })

    }

    async function addDeal(){
      let body = {
        suggestion_id: 1,
        demand_id: 1,
      }

      if (selectedSuggestion.id !== null && selectedDemand.id !== null){
        body = JSON.stringify({
          suggestion_id: selectedSuggestion.id,
          demand_id: selectedDemand.id,
          
      })
    }
      
      console.log(body)
      console.log(selectedSuggestion.id)
      console.log(selectedDemand.id)

      const createResponse = await fetch('https://esoft.onrender.com/api/deal/create', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: body
      }).then((response) => {
        return response.json()
      })

      console.log(createResponse);
      if (createResponse && createResponse !== undefined && createResponse.msg == "success"){
        // setDeals([...deals, createResponse.data])
        setNotification("Сделка успешно создана")
        setNotModalActive(true)
        markDemandAsInDeal(selectedDemand.id)
        markSuggestionAsInDeal(selectedSuggestion.id)
      }else{
        if (createResponse.message == "Ошибка при валидации"){
          setNotification("Ошибка: " + createResponse.errors[0].msg)
          setNotModalActive(true)
        }else{
          if(createResponse.message == "Ошибка валидации"){
            setNotification("Ошибка: " + createResponse.errors[0].msg)
            setNotModalActive(true)
          }
        }
      }
    };
  
    const handleCreate = () => {
      addSuggestion();
      setCreateSuggestion({});
      setModalCreateActive(false);
    }

    const handleCreateDeal = () => {
      addDeal();
      setSelectedDemand({
        id:0
      });
      setSelectedSuggestion({
        id:0
      });
      setDemandsModalActive(false);
    }

    const handleEdit = () => {
      editSuggestion();
      setSuggestionToEdit({});
      setEditModalActive(false);
    }

    const exit = (id) => {
        deleteSuggestion(id)
        setModalActive(false)
    }

    function openModal(id){
      setModalActive(true)
      setDelId(id)
    }

    function openDemandsModal(suggestion){
      setDemandsModalActive(true)
      setSelectedSuggestion(suggestion)
    }

    function openEditModal(esuggestion){
      setEditModalActive(true)
      setEditId(esuggestion.id)
      setSuggestionToEdit(esuggestion)
      console.log(esuggestion)
    }

    return(
        <div className="clients__container">
        <MyModal active={modalActive} setActive={setModalActive}>
          <h2 style={{textAlign: "center"}}>Удалить предложение?</h2>
          <DeleteButton onClick={()=> exit(delId)}>Delete</DeleteButton>
          <MyButton onClick={()=>setModalActive(false)}>Отмена</MyButton>
        </MyModal>
        <MyModal active={modalCreateActive} setActive={setModalCreateActive}>
          <div className="createModal">
            <Box sx={{ minWidth: 200 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Клиент</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={createSuggestion.client_id||""}
                    label="Age"
                    className="box__margin"
                    onChange={e => setCreateSuggestion({...createSuggestion, client_id: e.target.value})}
                    >
                    {clients.map(client => {
                      return <MenuItem key={client.id} value={client.id}>{client.first_name + ' ' + client.last_name}</MenuItem>
                    })}
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ minWidth: 200 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Риэлтор</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={createSuggestion.agent_id||""}
                    label="Age"
                    className="box__margin"
                    onChange={e => setCreateSuggestion({...createSuggestion, agent_id: e.target.value})}
                    >
                    {agents.map(agent => {
                        return <MenuItem key={agent.id} value={agent.id}>{agent.first_name + ' ' + agent.last_name}</MenuItem>
                    })}
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ minWidth: 200 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Недвижимость</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={createSuggestion.realty_id||""}
                    label="Age"
                    className="box__margin"
                    onChange={e => setCreateSuggestion({...createSuggestion, realty_id: e.target.value})}
                    >
                    {realties.map(realty => {
                      return <MenuItem key={realty.id} value={realty.id}>{realty.address_city + ' ' + realty.address_street}</MenuItem>
                    })}
                    </Select>
                </FormControl>
            </Box>

            <MyInput type="number" placeholder="Укажите цену" value={createSuggestion.price} onChange={e => setCreateSuggestion({...createSuggestion, price: e.target.value})}></MyInput>

            <SuccessButton onClick={()=>handleCreate()}>Создать предложение</SuccessButton>
            <MyButton onClick={()=>setModalCreateActive(false)}>Отмена</MyButton>
          </div>
        </MyModal>
        <MyModal active={editModalActive} setActive={setEditModalActive}>
          <div className="createModal">
          <Box sx={{ minWidth: 200 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Клиент</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={suggestionToEdit.client_id||""}
                    label="Age"
                    className="box__margin"
                    onChange={e => setSuggestionToEdit({...suggestionToEdit, client_id: e.target.value})}
                    >
                    {clients.map(client => {
                      return <MenuItem key={client.id} value={client.id}>{client.first_name + ' ' + client.last_name}</MenuItem>
                    })}
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ minWidth: 200 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Риэлтор</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={suggestionToEdit.agent_id||""}
                    label="Age"
                    className="box__margin"
                    onChange={e => setSuggestionToEdit({...suggestionToEdit, agent_id: e.target.value})}
                    >
                    {agents.map(agent => {
                        return <MenuItem key={agent.id} value={agent.id}>{agent.first_name + ' ' + agent.last_name}</MenuItem>
                    })}
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ minWidth: 200 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Недвижимость</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={suggestionToEdit.realty_id||""}
                    label="Age"
                    className="box__margin"
                    onChange={e => setSuggestionToEdit({...suggestionToEdit, realty_id: e.target.value})}
                    >
                    {realties.map(realty => {
                        return <MenuItem key={realty.id} value={realty.id}>{realty.address_city + ' ' + realty.address_street}</MenuItem>
                    })}
                    </Select>
                </FormControl>
            </Box>


            <MyInput
              type="number"
              value={suggestionToEdit.price}
              onChange={e => setSuggestionToEdit({...suggestionToEdit, price: e.target.value})}
            />

            <SuccessButton onClick={()=>handleEdit()}>Редактировать предложение</SuccessButton>
            <MyButton onClick={()=>setEditModalActive(false)}>Отмена</MyButton>
          </div>
        </MyModal>
        <MyModal active={notModalActive} setActive={setNotModalActive}>
          <h2>{notification}</h2>
        </MyModal>
        <MyModal active={demandsModalActive} setActive={setDemandsModalActive}>
        <h2>Подходящие потребности</h2>
            <ul className="suggestion__focused">
              {demands.filter((item) => (selectedSuggestion.price <= item.max_price && selectedSuggestion.price >= item.min_price)
              || (item.max_price == null && selectedSuggestion.price >= item.min_price)
              || (item.min_price == null && item.min_price <= item.max_price)
              ||(item.min_price == null && item.max_price == null) 
              && (item.served ===false)
              ).map((el) => {
                return <li key={el.id} style={{border: "1px solid black", listStyle: "none",padding:"2px", margin: "5px"}} onClick={() => setSelectedDemand(el)}>Id: {el.id}</li>
              })}
            </ul>

            <SuccessButton onClick={()=>handleCreateDeal()}>Создать сделку</SuccessButton>
            <MyButton onClick={()=>setDemandsModalActive(false)}>Отмена</MyButton>
        </MyModal>
        <MyButton onClick={()=>setModalCreateActive(true)}>Создать предложение</MyButton>
        {isSuggestionsLoading || !suggestions
            ? <h1>Идет загрузка</h1>
            : <SuggestionList suggestions={suggestions??[]} openModal={openModal} openEditModal={openEditModal} openDemandsModal={openDemandsModal}/>
        }
      </div>
    );
};



export default SuggestionPage;