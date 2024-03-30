import Navbar from "./navbar";
import React, { useContext,Fragment } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import {Recordscontext} from '../contextstate';
import Media from 'react-media';


export default function Performance()
{
    const values=useContext(Recordscontext);
    let temp=[];
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

            }
        }
    }

    const data=temp;

    
    return (
        <div className="performance">
            <Navbar/>
            <div className="performancecontent">
                <h1>Performance Report of Feeds</h1>

                <div className="charts">
                    <Media queries={{
                        small: "(max-width: 600px)",
                        medium: "(min-width: 601px) and (max-width: 1199px)",
                        large: "(min-width: 1200px)"
                        }}>
                        {matches => (
                            <Fragment>
                            {matches.small && <BarChart
                                                width={550}
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
                                                <Bar dataKey="Views" fill="#105463" />
                                                <Bar dataKey="Likes" fill="#0866ff" />
                                            </BarChart>}
                            {matches.medium && <BarChart
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
                                                <Bar dataKey="Views" fill="#105463" />
                                                <Bar dataKey="Likes" fill="#0866ff" />
                                            </BarChart>}
                            {matches.large && <BarChart
                                                width={1300}
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
                                                <Bar dataKey="Views" fill="#105463" />
                                                <Bar dataKey="Likes" fill="#0866ff" />
                                            </BarChart>}
                            </Fragment>
                        )}
                    </Media>

                </div>
            </div>
        </div>
    );
}