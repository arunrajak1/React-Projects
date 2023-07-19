import axios from 'axios';
import React, { FC, useEffect, useState } from 'react';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface LineChartProps {}

const MicroLineChart: FC<LineChartProps> = () => {
  const [data, setData] = useState([]);
    
  useEffect(() => {
      axios.get('http://localhost:3001/companies')
        .then(response => {
          setData(response.data.tessera.data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
      }, []);
    
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
        }}>
        {/* <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis /> */}
        {/* <Tooltip /> */}
        {/* <Area type="monotone" dataKey="ar" stackId="1" stroke="#a11233" fill="#f394aa" />
        <Area type="monotone" dataKey="ap" stackId="1" stroke="#378153" fill="#82ca9d" /> */}
        <Line dataKey="ap" type='monotone' stroke="#a11233" fill="#f394aa" strokeWidth={2} dot={false}/>
        {/* <Line dataKey="ap_predict" type='monotone' stroke="#a11233" fill="#f394aa" strokeDasharray='5 5' strokeWidth={1}/>
        <Line dataKey="ar" type='monotone' stroke="#378153" fill="#82ca9d" strokeWidth={2} />
        <Line dataKey="ar_predict" type='monotone' stroke="#378153" fill="#82ca9d" strokeDasharray='4 4 2'/> */}
      </LineChart>
    </ResponsiveContainer>
  );
}

export default MicroLineChart;
