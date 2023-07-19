import axios from "axios";
import { Container } from '@mantine/core';

import React, { FC, useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, AreaChart, ComposedChart, Legend, Line, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

interface BarChartProps {
  period?:string;
  fromValue?:any;
  toValue?:any;
  dataIndex:number;
}

export const MVBarChart: FC<BarChartProps> = ({period, fromValue, toValue, dataIndex}) => {
    const [data, setData] = useState([]);

    const handleAPI = (period:any, dataInd:number) => {
      axios.get(`http://localhost:3001/${period}`)
      .then(response => {
        console.log(period);
        setData(response.data[dataIndex].companies.checkr.data);
      })    
      .catch(error => {
        console.error('Error fetching data:', error);
      });
    }

    const formatYAxisTick = (value:any) => {
      return value.toLocaleString(undefined, { maximumFractionDigits: 2 });
    };
    
    useEffect(() => {
        handleAPI(period, dataIndex);
        }, [period, dataIndex]);
      
    
    return (
        <ResponsiveContainer width='100%' height='100%'>
          <ComposedChart data={data} width={400} height={400}>
            {/* <BarChart data={data}> */}
                {/* <CartesianGrid strokeDasharray="3 3" /> */}
            <XAxis dataKey="date" />
            <YAxis tickFormatter={formatYAxisTick} tick={{ style: { fontSize: '10px', fontWeight: '400' } }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="ap" name="outflows" fill="#8884d8" />
            <Bar dataKey="ar" name="inflows" fill="#82ca9d" />
            <Bar dataKey="ap_predict" name="predicted outflows" fill="#8884d8" fillOpacity={0.4} />
            <Bar dataKey="ar_predict" name="predicted inflows" fill="#52ca9d" fillOpacity={0.4}/>
            {/* <Line type="monotone" dataKey="ar_predict" stroke="#82ca9d" strokeWidth={2} dot={true}/>
            <Line type="monotone" dataKey="ap_predict" stroke="#e33d40" strokeWidth={2}/> */}
          
            {/* </BarChart> */}
            </ComposedChart>
        </ResponsiveContainer>
    )
}