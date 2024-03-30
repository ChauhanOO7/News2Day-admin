import { useContext,useState,useEffect } from "react";
import Navbar from "./navbar";
import { useParams } from "react-router-dom";
import {Recordscontext} from "../contextstate";

// this component take the id from url using useParams() of a feed which we want to display on webpage 

export default function Viewpage()
{
    const {id}=useParams();
    const [content,setContent]=useState({});
    const show=useContext(Recordscontext);

    useEffect(()=>{

        for(let i=0;i<show.records.length;i++)
        {
            if(show.records[i].title===id)
            {
                setContent(show.records[i]);
            }
        }
        // eslint-disable-next-line
    },[id]);
    
    return (
        <div className="viewpage">
            <Navbar/>
            <div className="viewcontent">
            <img src={content.imageurl ? content.imageurl : "/images/automatic.jpg"} alt=""/>
            <h1>{content.title}</h1>
            <p>{content.content}</p>
            </div>
        </div>
    );
}