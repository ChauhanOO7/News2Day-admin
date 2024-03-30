import {createContext,useState,useEffect} from "react";
import axios from "axios";

export const Recordscontext=createContext();

export default function Recordsstate(props)
{
    let records_data,records_users;
    const storedRecords = localStorage.getItem("feeds");
    const storedUsers = localStorage.getItem("Users");

    if(storedUsers!==null)
    {
        records_users=JSON.parse(storedUsers);
    }
    else
    {
        records_users=[];
    }

    if(storedRecords!==null)
    {
        records_data=JSON.parse(storedRecords);
    }
    else
    {
        records_data=[];
    }

    const [records,setRecords]=useState(records_data);
    const [users,setUsers]=useState(records_users);

    useEffect(()=>{

            async function getalldata()
            {
                const response=await axios.get("https://randomapi.com/api/6de6abfedb24f889e0b5f675edc50deb?fmt=raw&sole");
                const users_data=response.data;

                for(let i=0;i<users_data.length;i++)
                {
                    if(i<=40)
                    {
                        users_data[i].active=true;
                    }
                    else
                    {
                        users_data[i].active=false;
                    }
                }

                setUsers(users_data);
                
              try
              {
                const present=localStorage.getItem("feeds");
                if (!present || JSON.parse(present).length === 0)
                {
                    let store_feeds=[];
                    let comments=0;
                    const cat=["national", "business", "sports", "world", "politics", "technology",
                    "startup", "entertainment", "miscellaneous", "hatke", "science", "automobile"];
            
                    for(let i=0;i<cat.length;i++)
                    {
                        const response=await axios.get(`https://inshortsapi.vercel.app/news?category=${cat[i]}`);
        
                        const result=response.data.data;
                        const category=response.data.category;
        
                        for(let j=0;j<(result.length-4);j++)
                        {
                            comments+=20;
                            const views=Math.floor(Math.random()*12+30);
                            const likes=Math.floor(Math.random()*views+1);
                            const payload={
                            title:result[j].title,
                            category:category,
                            imageurl:result[j].imageUrl,
                            content:result[j].content,
                            creation_date:result[j].date,
                            comments:comments,
                            views:views,
                            likes:likes
                            }
                            store_feeds.push(payload);
                        }
        
            
                    }
                
                    setRecords(store_feeds);
                }
    
              }
              catch(err)
              {
                console.error(err);
              }
    
            }
        
            getalldata();

            // eslint-disable-next-line

    },[]);

    function update(arr)
    {
        setRecords(arr);
    }

    useEffect(()=>{
        localStorage.setItem("feeds",JSON.stringify(records));
        localStorage.setItem("Users",JSON.stringify(users));
    },[records,users]);

    return (
        <Recordscontext.Provider value={{records,update,users}}>
            {props.children}
        </Recordscontext.Provider>
    );
}

