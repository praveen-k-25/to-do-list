import React from 'react'

const Body = ({items,handleCheck,handleDelete}) => {
  return (
    <main>
        {(items.length) ? (
                <ul>
                    {items.map((item)=>(
                            <li key={item.id}>
                                <input type="checkbox"
                                id={item.id}
                                    checked={item.checked}
                                    onChange={()=>(handleCheck(item.id))}
                                 />
                                 <label htmlFor={item.id}>{item.item}</label>
                                 <button
                                    onClick={()=>(handleDelete(item.id))}
                                 >Delete</button>
                            </li>
                    ))
                    }
                </ul>
                ): (<h2>Item List Is Empty</h2>)
        }
    </main>
  )
}

export default Body