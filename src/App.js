import './App.css';
import { useEffect,useState} from 'react';
import Header from './Header.js';
import Body from './Body.js';
import Footer from './Footer.js';
import Search from './Search';

function App() {
  const [items,setItems] = useState([])
  const [addItem,setAddItem] = useState('');
  const [search,setSearch] = useState('');

  useEffect = (()=>{
    JSON.parse(localStorage.getItem('to-do-list')) 
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
      const listItems = addItem.length ? [...items,{id:id,checked:true,item:addItem}] : alert("List Is Empty");
      setAddItem('')
      setItems(listItems)
      localStorage.setItem('to-do-list',JSON.stringify(listItems))
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
      <Body
        items={items.filter(item => (item.item).toLowerCase().includes(search.toLowerCase()))}
        handleCheck={handleCheck}
        handleDelete={handleDelete}
      />
      <Footer
        items = {items}
      />
    </div>
  );
}

export default App;
