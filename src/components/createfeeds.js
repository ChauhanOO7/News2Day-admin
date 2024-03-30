import Navbar from "./navbar";
import {useState,useContext} from "react";
import {Recordscontext} from "../contextstate";

export default function CreateFeed()
{
    const feed_context=useContext(Recordscontext);
    const [Title,setTitle]=useState("");
    const [Category,setCategory]=useState("");
    const [Content,setContent]=useState("");
    const [imageurl,setURL]=useState(null);
    const [submit,setSubmit]=useState(false);
    const [store_title,setstore_title]=useState("");
    const [store_content,setstore_content]=useState("");


    async function handleform(e)
    {
        e.preventDefault();
        setSubmit(true);
        const date=new Date();
        const payload={
        title:Title,
        category:Category,
        imageurl:imageurl,
        content:Content,
        creation_date:date,
        comments:0,
        views:0,
        likes:0
        }
        
        const store=[];
        store.push(...feed_context.records);
        store.push(payload);
        feed_context.update(store);
        setstore_title(Title);
        setstore_content(Content);
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

         reader.readAsDataURL(e.target.files[0])        //generating url for image file,so that we can display it on frontend.
        
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

    return (
        <div className="createFeed">
            <Navbar/>
            <div className="Feedcontent">
                <h1>Create your Feed</h1>
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
                    {!submit ?  <div className="mobile">
                        <h1>Mobile Preview</h1>
                        <h2>Fill your feed first</h2>
                    </div> : 
                    <div className="aftersubmit">
                        <h1>Mobile Preview</h1>
                        <img src={imageurl ? imageurl: "/images/automatic.jpg"} alt=""/>
                        <h2>{store_title}</h2>
                        <p>{store_content}</p>
                    </div>

                    }

                </div>

            </div>
        </div>
    );
}