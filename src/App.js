import './App.css';
import { useEffect,useState} from 'react';
import Header from './Header.js';
import Body from './Body.js';
import Footer from './Footer.js';
import Search from './Search';

function App() {
  const API_URL = 'http://localhost:3500/items';
  const [items,setItems] = useState([])
  const [addItem,setAddItem] = useState('');
  const [search,setSearch] = useState('');
  const [fetchError,setFetchError] = useState(null);
  useEffect (()=>{
    const fetch_item = async()=>{
      try{
        const response = await fetch(API_URL);
        if(!response.ok) throw Error("Data Not Recieved")
        const list_items = await response.json();
        setItems(list_items)
      } catch (err){
          setFetchError(err.message);
      }
    }
    setTimeout(()=>{
      (async ()=>{await fetch_item()})()
    },2000);
    
  },[])
  const handleClick = (e)=>{
    e.preventDefault();
  }

  const handleCheck = (id)=>{
    const listItems = items.map((item)=> item.id===id ? {...item,checked:!item.checked}:item)
    setItems(listItems)
    localStorage.setItem('to-do-list',JSON.stringify(listItems))
  }

  const handleDelete = (id)=>{
    const listItems = items.filter((item)=> item.id !== id)
    setItems(listItems)
    localStorage.setItem('to-do-list',JSON.stringify(listItems))
    setSearch('')
  }

  const handleAdd = (e)=>{
    e.preventDefault();
      const id = items.length ? items[items.length -1].id +1 :1
      if(addItem.length){
        const listItems = [...items,{id:id,checked:false,item:addItem}]
        setAddItem('')
        setItems(listItems)
        localStorage.setItem('to-do-list',JSON.stringify(listItems))
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
          (fetchError) ? <p>{`Error : ${fetchError}`}</p> : <Body
        items={items.filter(item => (item.item).toLowerCase().includes(search.toLowerCase()))}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
        }
        
      </main>
      
      <Footer
        items = {items}
      />
    </div>
  );
}

export default App;
