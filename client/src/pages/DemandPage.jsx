import {React, useState, useEffect} from "react";
import '../style/App.css';
import DemandList from "../components/DemandList";
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


const DemandPage = () => {
    const [demands, setDemands] = useState([]);
    const [selectedDemand, setSelectedDemand] = useState({
      id: 1,
    });

    const [selectedSuggestion, setSelectedSuggestion] = useState({
      id: 1,
    });
    const [clients, setClients] = useState([]);
    const [agents, setAgents] = useState([]);
    const [typeOfRealty, setTypeOfRealty] = useState(1);
    const [realties, setRealties] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [isDemandsLoading, setIsDemandsLoading] = useState(false);

    const [modalActive, setModalActive] = useState(false);
    const [notification, setNotification] = useState("");
    const [modalCreateActive, setModalCreateActive] = useState(false);
    const [suggestionsModalActive, setSuggestionsModalActive] = useState(false);
    const [notModalActive, setNotModalActive] = useState(false);
    const [editModalActive, setEditModalActive] = useState(false);
    const [demandToEdit, setDemandToEdit] = useState({ });

    const [createDemand, setCreateDemand] = useState({
      client_id: 0,
      agent_id: 0,
      type_id: 0,
      min_price: 0,
      max_price: 0,
    });

    const [delId, setDelId] = useState();
    const [editId, setEditId] = useState();

    useEffect(() => {
      fetchDemands();
      fetchClients();
      fetchAgents();
      fetchRealties();
      fetchSuggestions();
    }, [])

    async function fetchDemands(){
      setIsDemandsLoading(true);

      let body = JSON.stringify({
        first_name: "",
        middle_name: "",
        last_name: ""
      })
      
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
      setIsDemandsLoading(false);
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
  
        let body = JSON.stringify({
          first_name: "",
          middle_name: "",
          last_name: ""
        })
        
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

      async function fetchSuggestions(){
  
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
      };

    async function deleteDemand(id){
      const dsuggestion = demands.find((item) => item.id == id)
      if(dsuggestion.served === false) {
        const result = await fetch('https://esoft.onrender.com/api/demand/delete/' + String(id), {method: 'DELETE'})
          .then((response1) => {
            if (response1 && response1 !== undefined){
              return response1.json();
            }
          })
          if (result.msg === "success"){
            const filteredDemands = demands.filter((item) => item.id !== id)
            setDemands(filteredDemands)
            setNotification("Удалено успешно")
            setNotModalActive(true)
          }else{
              setNotification("Ошибка удаления: " + result.message)
              setNotModalActive(true)
          }
        } else {
          setNotification("Не возможно удалить потребность! Она находится в сделке!")
          setNotModalActive(true)
        }
    };


    async function editDemand(){
      let body = {}

      if (demandToEdit.client_id){
        body.client_id = demandToEdit.client_id
      }

      if (demandToEdit.agent_id){
        body.agent_id = demandToEdit.agent_id
      }

      if (demandToEdit.type_id){
        body.type_id = demandToEdit.type_id
      }

      if (demandToEdit.min_price){
        body.min_price = demandToEdit.min_price
      }

      if (demandToEdit.max_price){
        body.max_price = demandToEdit.max_price
      }

      const editedDemand = await fetch("https://esoft.onrender.com/api/demand/update/" + String(editId), {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }).then((response) => {
        return response.json()
      })
      if (editedDemand.msg === "success"){
        let temp = [...demands]
        for (let i=0; i < temp.length; i++){
          if (temp[i].id == editId){
            temp[i] = {...demandToEdit}
            break;
          }
        } 
        setDemands(temp)
        setNotification("Потребность отредактирована")
        setNotModalActive(true)
      }else{
        setNotification(editedDemand.msg)
        console.log(editedDemand)
        setNotModalActive(true)
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

    async function addDemand(){
      let body

      if (createDemand.client_id  && createDemand.agent_id && createDemand.type_id && createDemand.min_price && createDemand.max_price) {
        body = JSON.stringify({
          client_id: createDemand.client_id,
          agent_id: createDemand.agent_id,
          type_id: createDemand.type_id,
          min_price: createDemand.min_price,
          max_price: createDemand.max_price,
      })}
  
      const createResponse = await fetch('https://esoft.onrender.com/api/demand/create', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: body
      }).then((response) => {
        return response.json()
      })


      if (createResponse && createResponse !== undefined && createResponse.msg == "success"){
        setDemands([...demands, createResponse.data])
        setNotification("Потребность успешно создана")
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
  
    const handleCreate = () => {
      addDemand();
      setCreateDemand({
        client_id: 0,
        agent_id: 0,
        type_id: 0,
        min_price: 0,
        max_price: 0,
      });
      setModalCreateActive(false);
    }

    const handleEdit = () => {
      editDemand();
      setDemandToEdit({
        client_id: 0,
        agent_id: 0,
        type_id: 0,
        max_price: 0,
        min_price: 0,
      });
      setEditModalActive(false);
    }

    const handleCreateDeal = () => {
      addDeal();
      setSelectedDemand({
        id:1
      });
      setSelectedSuggestion({
        id:1
      });
      setSuggestionsModalActive(false);
    }

    const exit = (id) => {
        deleteDemand(id)
        setModalActive(false)
    }

    function openModal(id){
      setModalActive(true)
      setDelId(id)
    }

    function openSuggestionsModal(demand){
      setSuggestionsModalActive(true)
      setSelectedDemand(demand)
    }

    function openEditModal(edemand){
      setEditModalActive(true)
      setEditId(edemand.id)
      setDemandToEdit(edemand)
      console.log(edemand)
    }

    return(
        <div className="clients__container">
        <MyModal active={modalActive} setActive={setModalActive}>
          <h2 style={{textAlign: "center"}}>Удалить потребность?</h2>
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
                    value={createDemand.client_id||""}
                    label="Age"
                    className="box__margin"
                    onChange={e => setCreateDemand({...createDemand, client_id: e.target.value})}
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
                    value={createDemand.agent_id||""}
                    label="Age"
                    className="box__margin"
                    onChange={e => setCreateDemand({...createDemand, agent_id: e.target.value})}
                    >
                    {agents.map(agent => {
                        return <MenuItem key={agent.id} value={agent.id}>{agent.first_name + ' ' + agent.last_name}</MenuItem>
                    })}
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ minWidth: 200 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Тип</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={createDemand.type_id||""}
                    label="Age"
                    className="box__margin"
                    onChange={(e) => {
                      setCreateDemand({...createDemand, type_id: e.target.value})
                      setTypeOfRealty(e.target.value);
                    }}
                    >
                    <MenuItem value={1}>Квартира</MenuItem>
                    <MenuItem value={2}>Дом</MenuItem>
                    <MenuItem value={3}>Земля</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <MyInput type="number" placeholder="Укажите минимальную цену" value={createDemand.min_price} onChange={e => setCreateDemand({...createDemand, min_price: e.target.value})}></MyInput>
            <MyInput type="number" placeholder="Укажите максимальную цену" value={createDemand.max_price} onChange={e => setCreateDemand({...createDemand, max_price: e.target.value})}></MyInput>

            {typeOfRealty == 1
                            ? <div className="createModal">
                              <MyInput type="number" placeholder="Минимальная площадь" value={createDemand.min_area} onChange={e => setCreateDemand({...createDemand, min_area: e.target.value})}></MyInput>
                              <MyInput type="number" placeholder="Максимальная площадь" value={createDemand.max_area} onChange={e => setCreateDemand({...createDemand, max_area: e.target.value})}></MyInput>
                              <MyInput type="number" placeholder="Минимальное число комнат" value={createDemand.min_total_rooms} onChange={e => setCreateDemand({...createDemand, min_total_rooms: e.target.value})}></MyInput>
                              <MyInput type="number" placeholder="Максимальное число комнат" value={createDemand.max_total_rooms} onChange={e => setCreateDemand({...createDemand, max_total_rooms: e.target.value})}></MyInput>
                              <MyInput type="number" placeholder="Минимальный этаж" value={createDemand.min_floor} onChange={e => setCreateDemand({...createDemand, min_floor: e.target.value})}></MyInput>
                              <MyInput type="number" placeholder="Максимальный этаж" value={createDemand.max_floor} onChange={e => setCreateDemand({...createDemand, max_floor: e.target.value})}></MyInput>
                            </div>

                            : typeOfRealty == 2
                                ?  <div className="createModal">
                              <MyInput type="number" placeholder="Минимальная площадь" value={createDemand.min_area} onChange={e => setCreateDemand({...createDemand, total_floors: e.target.value})}></MyInput>
                              <MyInput type="number" placeholder="Максимальная площадь" value={createDemand.max_area} onChange={e => setCreateDemand({...createDemand, total_floors: e.target.value})}></MyInput>
                              <MyInput type="number" placeholder="Минимальное число комнат" value={createDemand.min_total_rooms} onChange={e => setCreateDemand({...createDemand, min_total_rooms: e.target.value})}></MyInput>
                              <MyInput type="number" placeholder="Максимальное число комнат" value={createDemand.max_total_rooms} onChange={e => setCreateDemand({...createDemand, max_total_rooms: e.target.value})}></MyInput>
                              <MyInput type="number" placeholder="Минимальное число этажей" value={createDemand.min_total_floors} onChange={e => setCreateDemand({...createDemand, min_total_floors: e.target.value})}></MyInput>
                              <MyInput type="number" placeholder="Максимальное число этажей" value={createDemand.max_total_floors} onChange={e => setCreateDemand({...createDemand, max_total_floors: e.target.value})}></MyInput>
                            </div>
                                : <div className="createModal">
                                  <MyInput type="number" placeholder="Минимальная площадь" value={createDemand.min_area} onChange={e => setCreateDemand({...createDemand, min_area: e.target.value})}></MyInput>
                                  <MyInput type="number" placeholder="Максимальная площадь" value={createDemand.max_area} onChange={e => setCreateDemand({...createDemand, max_area: e.target.value})}></MyInput>
                                </div>
                        }

            <SuccessButton onClick={()=>handleCreate()}>Создать потребность</SuccessButton>
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
                    value={demandToEdit.client_id||""}
                    label="Age"
                    className="box__margin"
                    onChange={e => setDemandToEdit({...demandToEdit, client_id: e.target.value})}
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
                    value={demandToEdit.agent_id||""}
                    label="Age"
                    className="box__margin"
                    onChange={e => setDemandToEdit({...demandToEdit, agent_id: e.target.value})}
                    >
                    {agents.map(agent => {
                        return <MenuItem key={agent.id} value={agent.id}>{agent.first_name + ' ' + agent.last_name}</MenuItem>
                    })}
                    </Select>
                </FormControl>
            </Box>
            <Box sx={{ minWidth: 200 }}>
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Тип</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={demandToEdit.type_id||""}
                    label="Age"
                    className="box__margin"
                    onChange={(e) => {
                      setDemandToEdit({...demandToEdit, type_id: e.target.value})
                      setTypeOfRealty(e.target.value);
                      }}
                    >
                        <MenuItem value={1}>Квартира</MenuItem>
                        <MenuItem value={2}>Дом</MenuItem>
                        <MenuItem value={3}>Земля</MenuItem>
                    </Select>
                </FormControl>
            </Box>

            <MyInput
              type="number"
              placeholder="Введите минимальную цену"
              value={demandToEdit.min_price}
              onChange={e => setDemandToEdit({...demandToEdit, min_price: e.target.value})}
            />

            <MyInput
              type="number"
              placeholder="Введите максимальную цену"
              value={demandToEdit.max_price}
              onChange={e => setDemandToEdit({...demandToEdit, max_price: e.target.value})}
            />

                    {typeOfRealty == 1
                            ? <div className="createModal">
                              <MyInput type="number" placeholder="Минимальная площадь" value={demandToEdit.min_area} onChange={e => setDemandToEdit({...demandToEdit, min_area: e.target.value})}></MyInput>
                              <MyInput type="number" placeholder="Максимальная площадь" value={demandToEdit.max_area} onChange={e => setDemandToEdit({...demandToEdit, max_area: e.target.value})}></MyInput>
                              <MyInput type="number" placeholder="Минимальное число комнат" value={demandToEdit.min_total_rooms} onChange={e => setDemandToEdit({...demandToEdit, min_total_rooms: e.target.value})}></MyInput>
                              <MyInput type="number" placeholder="Максимальное число комнат" value={demandToEdit.max_total_rooms} onChange={e => setDemandToEdit({...demandToEdit, max_total_rooms: e.target.value})}></MyInput>
                              <MyInput type="number" placeholder="Минимальный этаж" value={demandToEdit.min_floor} onChange={e => setDemandToEdit({...demandToEdit, min_floor: e.target.value})}></MyInput>
                              <MyInput type="number" placeholder="Максимальный этаж" value={demandToEdit.max_floor} onChange={e => setDemandToEdit({...demandToEdit, max_floor: e.target.value})}></MyInput>
                            </div>

                            : typeOfRealty == 2
                                ?  <div className="createModal">
                              <MyInput type="number" placeholder="Минимальная площадь" value={demandToEdit.min_area} onChange={e => setDemandToEdit({...demandToEdit, min_area: e.target.value})}></MyInput>
                              <MyInput type="number" placeholder="Максимальная площадь" value={demandToEdit.max_area} onChange={e => setDemandToEdit({...demandToEdit, max_area: e.target.value})}></MyInput>
                              <MyInput type="number" placeholder="Минимальное число комнат" value={demandToEdit.min_total_rooms} onChange={e => setDemandToEdit({...demandToEdit, min_total_rooms: e.target.value})}></MyInput>
                              <MyInput type="number" placeholder="Максимальное число комнат" value={demandToEdit.max_total_rooms} onChange={e => setDemandToEdit({...demandToEdit, max_total_rooms: e.target.value})}></MyInput>
                              <MyInput type="number" placeholder="Минимальное число этажей" value={demandToEdit.min_total_floors} onChange={e => setDemandToEdit({...demandToEdit, min_total_floors: e.target.value})}></MyInput>
                              <MyInput type="number" placeholder="Максимальное число этажей" value={demandToEdit.max_total_floors} onChange={e => setDemandToEdit({...demandToEdit, max_total_floors: e.target.value})}></MyInput>
                            </div>
                                : <div className="createModal">
                                  <MyInput type="number" placeholder="Минимальная площадь" value={demandToEdit.min_area} onChange={e => setDemandToEdit({...demandToEdit, min_area: e.target.value})}></MyInput>
                                  <MyInput type="number" placeholder="Максимальная площадь" value={demandToEdit.max_area} onChange={e => setDemandToEdit({...demandToEdit, max_area: e.target.value})}></MyInput>
                                </div>
                        }

            <SuccessButton onClick={()=>handleEdit()}>Редактировать потребность</SuccessButton>
            <MyButton onClick={()=>setEditModalActive(false)}>Отмена</MyButton>
          </div>
        </MyModal>

        <MyModal active={notModalActive} setActive={setNotModalActive}>
          <h2>{notification}</h2>
        </MyModal>

        <MyModal active={suggestionsModalActive} setActive={setSuggestionsModalActive}>
          <h2>Подходящие предложения</h2>
          <ul className="suggestion__focused">
              {suggestions.filter((item) => (selectedDemand.min_price <= item.price && selectedDemand.max_price >= item.price)
              || (selectedDemand.max_price == null && item.price >= selectedDemand.min_price)
              || (selectedDemand.min_price == null && item.price <= selectedDemand.max_price)
              || (selectedDemand.min_price  == null && selectedDemand.max_price == null) 
              || (item.price == null)
              && (item.served === false)
              ).map((el) => {
                return <li key={el.id} style={{border: "1px solid black", listStyle: "none", padding:"2px",margin: "5px"}} onClick={() => setSelectedSuggestion(el)}>Id: {el.id}</li>
              })}
            </ul>
            <SuccessButton onClick={()=>handleCreateDeal()}>Создать сделку</SuccessButton>
            <MyButton onClick={()=>setSuggestionsModalActive(false)}>Отмена</MyButton>
        </MyModal>

        <MyButton onClick={()=>setModalCreateActive(true)}>Создать потребность</MyButton>
        {isDemandsLoading || !demands
            ? <h1>Идет загрузка</h1>
            : <DemandList demands={demands??[]} openModal={openModal} openEditModal={openEditModal} openSuggestionsModal={openSuggestionsModal}/>
        }
      </div>
    );
};



export default DemandPage;