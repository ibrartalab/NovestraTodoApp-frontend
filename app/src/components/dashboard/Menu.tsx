import React, { useEffect} from 'react'
import { SearchBar } from './SearchBar'

export const Menu = () => {
    const [greeting, setGreeting] = React.useState<string>("");
    const userName = "User";

    useEffect(()=>{
        const currentHour = new Date().getHours();
        if(currentHour < 12) {
            setGreeting(`Good Morning ${userName}`);
        } else if(currentHour < 18) {
            setGreeting(`Good Afternoon ${userName}`);
        } else {
            setGreeting(`Good Evening ${userName}`);
        }
    },[])
  return (
    <div className='menu w-full h-20 flex items-center justify-between px-8'>
        <div className="greeting">
            <h1 className="text-lg font-medium">{greeting || "Welcome"}</h1>
            <p className="text-gray-600 text-sm">Whats your plan for today?</p>
        </div>
        <SearchBar />
    </div>
  )
}
