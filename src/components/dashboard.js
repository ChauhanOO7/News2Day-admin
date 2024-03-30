import Navbar from "./navbar";
import React, { useContext,Fragment} from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, } from 'recharts';
import {Recordscontext} from '../contextstate';
import Media from 'react-media';

export default function Dashboard()
{
    const values=useContext(Recordscontext);
    let temp=[],active=0,inactive=0,engagement=[],max;

    const category=["national", "business", "sports", "world", "politics", "technology",
    "startup", "entertainment", "miscellaneous", "hatke", "science", "automobile"];

    for(let i=0;i<category.length;i++)
    {
        const store={};
        store["category"]=category[i];
        store["Views"]=0;
        store["Likes"]=0;
        store["Comments"]=0;
        temp.push(store);

    }
    
    for(let i=0;i<values.records.length;i++)
    {
        for(let j=0;j<temp.length;j++)
        {
            if(values.records[i].category===temp[j].category)
            {
                temp[j].Views+=values.records[i].views;
                temp[j].Likes+=values.records[i].likes;
                temp[j].Comments+=values.records[i].comments;

            }
        }
    }

    for(let i=0;i<temp.length;i++)
    {
        let store={};
        store["category"]=temp[i].category;
        const value_engage=(temp[i].Likes+temp[i].Comments)/temp[i].Views;
        store["engagement"]=value_engage;
        engagement.push(store);
    }

    engagement.sort();

    for(let i=0;i<engagement.length;i++)
    {
        max=engagement[i].category;
    }

    for(let i=0;i<values.users.length;i++)
    {
        if(values.users[i].active===true)   active++;
        else    inactive++;
    }

    const data = temp;
    return (
        <div className="dashboard">
            <Navbar/>
            <div className="dashcontent">
                <h1>Dashboard</h1>
                <div className="stats">

                    <div className="useractivity">
                        <p>Total Users : {active+inactive}</p>
                        <p>User active : {active}</p>
                        <p>User inactive : {inactive}</p>
                        
                    </div>
                    <div className="contentstats">
                            <p>Number of news feeds published : {values.records.length}</p>
                            <p>Most popular news feed Category : {max}</p>
                    </div>

                </div>


                <div className="dashchart">
                    <Media queries={{
                        small: "(max-width: 600px)",
                        medium: "(min-width: 601px) and (max-width: 1199px)",
                        large: "(min-width: 1200px)"
                        }}>
                        {matches => (
                            <Fragment>
                            {matches.small && <BarChart
                                                width={500}
                                                height={500}
                                                data={data}
                                                margin={{
                                                    top: 5,
                                                    right: 30,
                                                    left: 20,
                                                    bottom: 5,
                                                }}
                                            >
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="category" />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <Bar dataKey="Comments" fill="#0866ff" />
                                            </BarChart>}
                            {matches.medium &&  <BarChart
                                                    width={900}
                                                    height={500}
                                                    data={data}
                                                    margin={{
                                                        top: 5,
                                                        right: 30,
                                                        left: 20,
                                                        bottom: 5,
                                                    }}
                                                    >
                                                    <CartesianGrid strokeDasharray="3 3" />
                                                    <XAxis dataKey="category" />
                                                    <YAxis />
                                                    <Tooltip />
                                                    <Legend />
                                                    <Bar dataKey="Comments" fill="#0866ff" />
                                                </BarChart>}
                            {matches.large &&  <BarChart
                                                width={1250}
                                                height={500}
                                                data={data}
                                                margin={{
                                                    top: 5,
                                                    right: 30,
                                                    left: 20,
                                                    bottom: 5,
                                                }}
                                                >
                                                <CartesianGrid strokeDasharray="3 3" />
                                                <XAxis dataKey="category" />
                                                <YAxis />
                                                <Tooltip />
                                                <Legend />
                                                <Bar dataKey="Comments" fill="#0866ff" />
                                            </BarChart>}
                            </Fragment>
                        )}
                    </Media>
                </div>
                
            </div>
        </div>
    );
}