import Navbar from "./navbar";
import {useState,useContext} from "react";
import {Recordscontext} from "../contextstate";
import { useParams } from "react-router-dom";


// this component update the feed in the records which is a global state

export default function Editpage()
{
    const {id}=useParams();
    let temp="";
    const feed_context=useContext(Recordscontext);
    const [Title,setTitle]=useState("");
    const [Category,setCategory]=useState("");
    const [Content,setContent]=useState("");
    const [imageurl,setURL]=useState(null);

    for(let i=0;i<feed_context.records.length;i++)
    {
        if(feed_context.records[i].title===id)
        {
            temp=feed_context.records[i];
            break;
        }
    }


    async function handleform(e)
    {
        e.preventDefault();
        const date=new Date();
        const payload={
        title:Title,
        category:Category,
        imageurl:imageurl,
        content:Content,
        creation_date:date,
        comments:temp.comments,
        views:temp.views,
        likes:temp.likes
        }
        const store=[];
        for(let i=0;i<feed_context.records.length;i++)
        {
            if(feed_context.records[i].title===id)
            {
                store.push(payload);
            }
            else
            {

                store.push(feed_context.records[i]);
            }
        }
        
        feed_context.update(store);
        setCategory("");
        setContent("");
        setTitle("");
    }

    function geturl(e)
    {
        const reader=new FileReader();
       

        reader.addEventListener("load",()=>{

            setURL(reader.result);
        })

         reader.readAsDataURL(e.target.files[0])
        
    }

    function handleChangetitle(e)
    {
        setTitle(e.target.value);
    }
    function handleChangecategory(e)
    {
        setCategory(e.target.value);
    }
    function handleChangecontent(e)
    {
        setContent(e.target.value);
    }


    return(
    <div className="createFeed">
        <Navbar/>
        <div className="Feedcontent">
            <h1>Update your Feed</h1>
            <div>
                <form method="post" onSubmit={handleform}>
                    <label htmlFor="first">Title :</label>
                    <input type="text" id="first" name="title" value={Title} onChange={handleChangetitle} placeholder="Title"/>
                    <label htmlFor="second">Category :</label>
                    <input type="text" id="second" name="category" value={Category} onChange={handleChangecategory} placeholder="Category"/>
                    <label htmlFor="third">Content :</label>
                    <textarea type="text" id="third" name="content" value={Content} onChange={handleChangecontent} placeholder="Type your content here..."/>
                    <label htmlFor="fourth">Image :</label>
                    <input type="file" id="fourth" name="file" onChange={geturl}/>
                    <button>Submit</button>

                </form>

            </div>

        </div>
    </div>
    );
}