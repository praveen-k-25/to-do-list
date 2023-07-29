import React from 'react'

const Search = ({addItem,setAddItem,Search,setSearch,handleAdd}) => {
  return (
    <div className='seach-box'>
        <form onSubmit={(e)=>(e.preventDefault())}>
          <input type="text"
            placeholder='List Name'
            value={addItem}
            onChange={(e)=>(setAddItem(e.target.value))}
          />
          <button
            id='btn'
            onClick={addItem.length > 1? handleAdd : ()=>alert("list Name is empty")}
          >+</button>
        </form>
        <input type="text"
        id='search'
            placeholder='Search'
            value={Search}
            onChange={(e)=>(setSearch(e.target.value))}
        />
    </div>
    
  )
}

export default Search