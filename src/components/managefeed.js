import { useContext } from "react";
import  {Recordscontext} from "../contextstate";
import Navbar from "./navbar";
import {Link} from "react-router-dom";

export default function Managefeeds()
{
    const data=useContext(Recordscontext);


    function handledelete(e)
    {
        let store=[];
        for(let i=0;i<data.records.length;i++)
        {
            if(data.records[i].title!==e.target.id)
            {
                store.push(data.records[i]);
            }
        }

        data.update(store);
    }
    
    let count=0;
    return (
        <div className="feedscontent">
            <Navbar/>
            <div className="ManageFeed">
                <h1>Manage your feeds</h1>
                <table>
                <thead>
                    <tr>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Creation Date</th>
                    <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.records.map((item)=>{
                        count++
                        return(
                        <tr key={count}>
                            <td>{item.title}</td>
                            <td>{item.category}</td>
                            <td>{new Date(item.creation_date).toISOString()}</td>
                            <td id="buttons">
                                <Link to={`/viewpage/${encodeURIComponent(item.title)}`}><img className="left" id={item.title} src="/images/eye.png" alt="" width="30" height="30"/></Link>
                                <Link to={`/editpage/${encodeURIComponent(item.title)}`}><img className="between" id={item.title} src="/images/pen.png" alt="" width="30" height="30"/></Link>
                                <img className="right" id={item.title} src="/images/delete.png" alt="" width="30" height="30" onClick={handledelete}/>
                            </td>
                        </tr>
                        );
                })
                } 
                </tbody>

                </table>
                </div>
        </div>
    );
}