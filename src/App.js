import './App.css';
import {useState} from 'react';
import Header from './Header.js';
import Body from './Body.js';
import Footer from './Footer.js';
import Search from './Search';

function App() {
  const [items,setItems] = useState(JSON.parse(localStorage.getItem('to-do-list'))||[])
  const [addItem,setAddItem] = useState('');
  const [search,setSearch] = useState('');
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
  }
  
  const handleAdd = ()=>{
      const id = items.length ? items[items.length -1].id +1 :1
      const listItems = [...items,{id:id,checked:true,item:addItem}]
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
        items={items}
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
