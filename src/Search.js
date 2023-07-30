import { useRef } from 'react'

const Search = ({addItem,setAddItem,Search,setSearch,handleAdd}) => {
  const inputRef = useRef(); 
  return (
    <div className='seach-box'>
        <form onSubmit={handleAdd}>
          <input type="text"
            id='search'
            ref={inputRef}
            placeholder='List Name'
            value={addItem}
            onChange={(e)=>(setAddItem(e.target.value))}
          />
          <button
            id='btn'
            type='submit'
            onClick={()=>inputRef.current.focus()}
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