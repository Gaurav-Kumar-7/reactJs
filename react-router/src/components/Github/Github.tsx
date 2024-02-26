import React, { useEffect, useState } from 'react'
import { useLoaderData } from 'react-router-dom'

function Github() {
    // const data = useLoaderData()
    const [data, setData] = useState<any>([]);
    useEffect(() => {
     fetch('https://api.github.com/users/vikasrajjj')
     .then(response => response.json())
     .then(data => {
        setData(data)
     })
    }, [])
    
  return (
    <div className='text-center m-4 bg-gray-600 text-white p-4 text-3xl'>Github followers: {data.followers}
    <img className='rounded-3xl' src={data.avatar_url} alt="Git picture" width={300} />
    </div>
  )
}

export default Github

// export const githubInfoLoader:any = async () => {
//     const response = await fetch('https://api.github.com/users/hiteshchoudhary')
//     return response.json()
// }