import React, { useState, useEffect } from 'react'
import { useLoaderData } from 'react-router-dom'

function Github() {
    const data = useLoaderData() // This will automatically fetch the data using the loader function defined in main.jsx
//   const [data, setData] = useState({})  // should be {} not [] since you're expecting an object

//   useEffect(() => {
//     fetch('https://api.github.com/users/madhvendrasingh007')
//       .then(res => res.json())
//       .then(data => {
//         console.log(data)
//         setData(data)
//       })
//   }, [])

  return (
    <div className='text-center m-4 bg-gray-600 text-white p-4 text-3xl'>
      Github followers : {data.followers}
      <img className='rounded-full m-4' src={data.avatar_url} alt="avatar" width={200}/>
    </div>
  )
}

export default Github

export const githubLoader = async () => {
    const res = await fetch('https://api.github.com/users/madhvendrasingh007')
    return res.json()
}