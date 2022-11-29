import {React, useState, useEffect} from "react";
import '../style/App.css';
import DealList from "../components/DealList";
import MyModal from "../components/UI/Modal/MyModal";
import DeleteButton from "../components/UI/Button/Delete/DeleteButton";
import MyButton from "../components/UI/Button/Apply/MyButton";
import MyInput from "../components/UI/Input/MyInput"
import SuccessButton from "../components/UI/Button/Success/SuccessButton";

const DealPage = () => {
    const [deals, setDeals] = useState([]);
    const [selectedDeal, setSelectedDeal] = useState({
      seller_client_amount: 0,
      buyer_client_amount: 0,
      revenue: {
        buyer_agent: 0,
        seller_agent: 0,
        company: 0,
      }
    });
    const [suggestions, setSuggestions] = useState([]);
    const [demands, setDemands] = useState([]);

    const [isDealsLoading, setIsDealsLoading] = useState(false);
    const [modalActive, setModalActive] = useState(false);
    const [infoModalActive, setInfoModalActive] = useState(false);
    const [notification, setNotification] = useState("");
    const [modalCreateActive, setModalCreateActive] = useState(false);
    const [notModalActive, setNotModalActive] = useState(false);
    const [editModalActive, setEditModalActive] = useState(false);
    const [dealToEdit, setDealToEdit] = useState({ });

    const [searchDeal, setSearchDeal] = useState({
      suggestion_id: 0,
      demand_id: 0,
    });

    const [createDeal, setCreateDeal] = useState({
      suggestion_id: 0,
      demand_id:0,
    });

    const [delId, setDelId] = useState();
    const [editId, setEditId] = useState();

    useEffect(() => {
      fetchDeals()
      fetchSuggestions();
      fetchDemands();
    }, [])
  
    async function fetchDeals(){
      setIsDealsLoading(true);

      let body = JSON.stringify({})
      
      const fdeals = await fetch("https://esoft.onrender.com/api/deal/all", {
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
      setDeals(fdeals.data)
      setIsDealsLoading(false);
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


    async function deleteDeal(id){
      const result = await fetch('https://esoft.onrender.com/api/deal/delete/' + String(id), {method: 'DELETE'})
        .then((response1) => {
          if (response1 && response1 !== undefined){
            return response1.json();
          }
        })
        if (result.msg === "success"){
          const filteredDeals = deals.filter((item) => item.id !== id)
          setDeals(filteredDeals)
          setNotification("Удалено успешно")
          setNotModalActive(true)
          deleteSuggestionAsInDeal(deals.find(item=> item.id === id).suggestion_id)
          deleteDemandAsInDeal(deals.find(item => item.id === id).demand_id)
        }else{
            setNotification("Ошибка удаления: " + result.message)
            setNotModalActive(true)
        } 
    };


    async function editDeal(){
      let body = {}
      if (dealToEdit.suggestion_id){
        body.suggestion_id = dealToEdit.suggestion_id
      }
      if (dealToEdit.demand_id){
        body.demand_id = dealToEdit.demand_id
      }

      const editedDeal = await fetch("https://esoft.onrender.com/api/deal/update/" + String(editId), {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }).then((response) => {
        return response.json()
      })
      if (editedDeal.msg === "success"){
        let temp = [...deals]
        for (let i=0; i < temp.length; i++){
          if (temp[i].id == editId){
            temp[i] = {...dealToEdit}
            break;
          }
        } 
        setDeals(temp)
        setNotification("Сделка отредактирована")
        setNotModalActive(true)
      }else{
        setNotification(editedDeal.msg)
        setNotModalActive(true)
      }
    };

    async function markSuggestionAsInDeal(suggestion_id) {
      let body
      body = JSON.stringify({
        served:true
      })

      console.log(body)
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

    async function deleteSuggestionAsInDeal(suggestion_id) {
      let body
      body = JSON.stringify({
        served:false
      })

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
      console.log(body)
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

    async function deleteDemandAsInDeal(demand_id) {
      let body
      body = JSON.stringify({
        served:false
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
      let body

      if (createDeal.suggestion_id !== null && createDeal.demand_id !== null){
        body = JSON.stringify({
          suggestion_id: createDeal.suggestion_id,
          demand_id: createDeal.demand_id,
      })}
      

      
      const createResponse = await fetch('https://esoft.onrender.com/api/deal/create', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: body
      }).then((response) => {
        return response.json()
      })


      if (createResponse && createResponse !== undefined && createResponse.msg == "success"){
        setDeals([...deals, createResponse.data])
        setNotification("Сделка успешно создана")
        setNotModalActive(true)
        markDemandAsInDeal(createDeal.demand_id)
        markSuggestionAsInDeal(createDeal.suggestion_id)
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

    async function searchDeals(){

      const sdeals = await fetch("https://esoft.onrender.com/api/deal/all", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(searchDeal)
      }).then((response) => {
        return response.json()
      })
      if (sdeals.msg == "success"){
        setDeals(sdeals.data)
      }
    };
  

    const handleCreate = () => {
      addDeal();
      setCreateDeal({});
      setModalCreateActive(false);
    }

    const handleEdit = () => {
      editDeal();
      setDealToEdit({});
      setEditModalActive(false);
    }

    const handleOutOfSearch = () => {
      setSearchDeal({
        suggestion_id: 0,
        demand_id: 0,
      })
      fetchDeals()
    }

    const exit = (id) => {
        deleteDeal(id)
        setModalActive(false)
    }

    function openModal(id){
      setModalActive(true)
      setDelId(id)
    }

    function openInfoModal(deal){
      setInfoModalActive(true)
      setSelectedDeal(deal)
    }

    function openEditModal(edeal){
      setEditModalActive(true)
      setEditId(edeal.id)
      setDealToEdit(edeal)
    }


    return(
        <div className="deals__container">
          <div className="search__container">
            <MyInput
              type="text"
              placeholder="Id предложения"
              value={searchDeal.suggestion_id}
              onChange={e => setSearchDeal({...searchDeal, suggestion_id: e.target.value})}
            />
            <MyInput
              type="text"
              placeholder="Id потребности"
              value={searchDeal.demand_id}
              onChange={e => setSearchDeal({...searchDeal, demand_id: e.target.value})}
            />
            <MyButton onClick={()=>searchDeals()}>Поиск</MyButton>
            <DeleteButton onClick={()=>handleOutOfSearch()}>Сбросить параметры поиска</DeleteButton>
          </div>
          <MyModal active={modalActive} setActive={setModalActive}>
            <h2 style={{textAlign: "center"}}>Удалить сделку?</h2>
            <DeleteButton onClick={()=> exit(delId)}>Delete</DeleteButton>
            <MyButton onClick={()=>setModalActive(false)}>Отмена</MyButton>
          </MyModal>

          <MyModal active={infoModalActive} setActive={setInfoModalActive}>
            <h1>Отчисления и комиссии</h1>
            <p><b>Стоимость услуг для клиента-продавца:</b> {selectedDeal.seller_client_amount}р</p>
            <p><b>Стоимость услуг для клиента-покупателя:</b> {selectedDeal.buyer_client_amount}р</p>
            <p><b>Отчисления риэлтору клиента-покупателя:</b> {selectedDeal.revenue.buyer_agent}р</p>
            <p><b>Отчисления риэлтору клиента-продавца:</b> {selectedDeal.revenue.seller_agent}р</p>
            <p><b>Отчисления компании:</b> {selectedDeal.revenue.company}р</p>
          </MyModal>


          <MyModal active={modalCreateActive} setActive={setModalCreateActive}>
            <div className="createModal">
              <label htmlFor="">
                  Выберите предложение
                  <select type="text" value={createDeal.suggestion_id} onChange={e => setCreateDeal({...createDeal, suggestion_id: e.target.value})}>
                      {suggestions.filter(el => el.served !== true).map(suggestion => {
                          return <option value={suggestion.id} key={suggestion.id}>{suggestion.id}</option>
                     })}
                  </select>
              </label>

              <label htmlFor="">
              Выберите потребность
                  <select type="text" value={createDeal.demand_id} onChange={e => setCreateDeal({...createDeal, demand_id: e.target.value})}>
                      {demands.filter(el => el.served !== true).map(demand => {
                          return <option key={demand.id} value={demand.id}>{demand.id}</option>
                      })}
                  </select>
              </label>
              <SuccessButton onClick={()=>handleCreate()}>Создать сделку</SuccessButton>
              <MyButton onClick={()=>setModalCreateActive(false)}>Отмена</MyButton>
            </div>
          </MyModal>
          <MyModal active={editModalActive} setActive={setEditModalActive}>
            <div className="editModal">
              <label htmlFor="">
                  Выберите предложение
                  <select type="text" value={dealToEdit.suggestion_id} onChange={e => setDealToEdit({...dealToEdit, suggestion_id: e.target.value})}>
                      {suggestions.filter(el => el.served !== true).map(suggestion => {
                          return <option key={suggestion.id} value={suggestion.id}>{suggestion.id}</option>
                      })}
                  </select>
              </label>


              <label htmlFor="">
                  Выберите потребность
                  <select type="text" value={dealToEdit.demand_id} onChange={e => setDealToEdit({...dealToEdit, demand_id: e.target.value})}>
                      {demands.filter(el => el.served !== true).map(demand => {
                          return <option key={demand.id} value={demand.id}>{demand.id}</option>
                      })}
                  </select>
              </label>
              <SuccessButton onClick={()=>handleEdit()}>Редактировать сделку</SuccessButton>
              <MyButton onClick={()=>setEditModalActive(false)}>Отмена</MyButton>
            </div>
          </MyModal>
          <MyModal active={notModalActive} setActive={setNotModalActive}>
            <h2>{notification}</h2>
          </MyModal>
          <MyButton onClick={()=>setModalCreateActive(true)}>Создать сделку</MyButton>
          {isDealsLoading || !deals
              ? <h1>Идет загрузка</h1>
              : <DealList deals={deals??[]} openModal={openModal} openEditModal={openEditModal} openInfoModal={openInfoModal}/>
          }
        </div>
    );
};

export default DealPage;