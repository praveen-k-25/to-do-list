import './App.css';
import { useEffect,useState} from 'react';
import Header from './Header.js';
import Body from './Body.js';
import Footer from './Footer.js';
import Search from './Search';
import apiRequest from './ApiRequest';

function App() {
  /* 
    The API_URL link will work by follwing commands
    # open terminal 
    # type "cd to-do-list"
    # type "npx json-server -p 3500 -w data.json"

    After done he above commands , You wish open the app the follwing needs to be done..
    open new terminal
    #Type npx json-server -p 3500 -w data/db.json
  */
 
  const API_URL = 'http://localhost:3500/items';
  const [items,setItems] = useState([])
  const [addItem,setAddItem] = useState('');
  const [search,setSearch] = useState('');
  const [fetchError,setFetchError] = useState(null);
  const [isLoading,setIsLoading]= useState(true);
  useEffect (()=>{
    const fetch_item = async()=>{
      try{
        const response = await fetch(API_URL);
        if(!response.ok) throw Error("Data Not Recieved")
        const list_items = await response.json();

        setItems(list_items)
      } catch (err){
          setFetchError(err.message);
      } finally{
        setIsLoading(false);
      }
    }
    setTimeout(()=>{
      (async ()=>{await fetch_item()})()
    },2000);
    
  },[])
  const handleClick = (e)=>{
    e.preventDefault();
  }

  const handleCheck = async (id)=>{
    const listItems = items.map((item)=> item.id===id ? {...item,checked:!item.checked}:item)
    setItems(listItems)

    const additem = listItems.filter((item)=> item.id === id)
    const updateOption = {
      method:'PATCH',
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({checked:additem[0].checked})
    }
    const reqUrl = `${API_URL}/${id}`
    const result = await apiRequest(reqUrl,updateOption)
    if(result) setFetchError(result)
  }

  const handleDelete = async (id)=>{
    const listItems = items.filter((item)=> item.id !== id)
    setItems(listItems)
    localStorage.setItem('to-do-list',JSON.stringify(listItems))
    setSearch('')

    const deleteOption = {method:"DELETE"}
    const reqUrl = `${API_URL}/${id}`
    const result = await apiRequest(reqUrl,deleteOption)
    if(result) setFetchError(result)
  }

  const handleAdd = async(e)=>{
    e.preventDefault();
      const id = items.length ? items[items.length -1].id +1 :1

      if(addItem.length){
        const listItems = {id:id,checked:false,item:addItem}
        setItems([...items,listItems])
        setAddItem('')
        const postOption = {
          method:'POST',
          headers:{
            'Content-Type':'application/json'
          },
          body:JSON.stringify(listItems)
        }
        const result = await apiRequest(API_URL,postOption)
        if(result) setFetchError(result)
      }
      else{
        alert("List Is Empty");
      }
       
  }

  
  return (
    <div className="App">
      <Header
        items = {items}
        setItems = {setItems}
        handleClick={handleClick}
      />
      <Search
        addItem = {addItem}
        setAddItem = {setAddItem}
        search = {search}
        setSearch ={setSearch}
        handleAdd={handleAdd}
      />
      {/* when the error happened the error will shown to the user, else body component will execute...*/}
      <main>
        {
          (isLoading) ? <p>Loading...</p> :
          ((fetchError) ? <p>{`Error : ${fetchError}`}</p> : <Body
          items={items.filter(item => (item.item).toLowerCase().includes(search.toLowerCase()))}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
          />)
        }
      </main>
      <Footer
        items = {items}
      />
    </div>
  );
}

export default App;
