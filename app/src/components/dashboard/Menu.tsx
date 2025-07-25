import React, { useContext, useEffect} from 'react'
import { SearchBar } from './SearchBar'
import {UserContext}  from '../../context/UserContext';

export const Menu = () => {
    const [greeting, setGreeting] = React.useState<string>("");
    const {user} = useContext(UserContext);
    console.log("User in Menu:", user);

    useEffect(()=>{
        const currentHour = new Date().getHours();
        if(currentHour < 12) {
            setGreeting(`Good Morning ${user}`);
        } else if(currentHour < 18) {
            setGreeting(`Good Afternoon ${user}`);
        } else {
            setGreeting(`Good Evening ${user}`);
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
