import React, { useEffect, useState } from 'react';
import { Bar, Line, XAxis, YAxis, CartesianGrid, Legend, ResponsiveContainer, ComposedChart } from 'recharts';
import axios from 'axios';

interface CombinationCart {
  period?: string;
  fromValue?: any;
  toValue?: any;
  dataIndex: number;
}
const CombinedChart: React.FC<CombinationCart> = ({ period, fromValue, toValue, dataIndex }) => {
  let [data, setData] = useState<any[]>([]);


  const handleAPI = (period: string | undefined, dataInd: number) => {
    axios.get(`http://localhost:3001/${period}`)
      .then(response => {
        console.log(period);
        const response1 = response.data[dataIndex].companies.checkr.data;
        const response2 = response.data[dataIndex].companies.checkr.net
        // const response3 = response.data[dataIndex].companies.checkr.net.date
        // console.log('Mydate',response3);
        const combinedData = combineData(response1, response2);
        setData(combinedData);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  const formatYAxisTick = (value: any) => {
    return value.toLocaleString(undefined, { maximumFractionDigits: 2 });
  };

  
  useEffect(() => {
    if (period && dataIndex) {
      handleAPI(period, dataIndex);
    }
  }, [period, dataIndex]);

  const combineData = (data: any, data1: any) => {
    return data.map((entry: any) => ({
      ...entry,
      net: -data1.find((d: any) => d.date === entry.date).net, // Data change Issues Date

    }));
  }

  return (

    <ResponsiveContainer width="100%" height='100%'>
      <ComposedChart width={400} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis tickFormatter={formatYAxisTick} 
        tick={{ style: { fontSize: '10px', fontWeight: '400' } } }
        domain={[(dataMin: number) => Math.min(dataMin, 0), (dataMax: number) => Math.max(dataMax, 0)]} // Customize the domain
        orientation="right"
        yAxisId={'right'}
       />
           <YAxis
          tickFormatter={formatYAxisTick}
          tick={{ style: { fontSize: '10px', fontWeight: '400' } }}
          orientation="left" // Set orientation to right side
          yAxisId="left" // Add yAxisId for right side
          domain={[(dataMin: number) => Math.min(dataMin, 0), (dataMax: number) => Math.max(dataMax, 0)]} // Customize the domain

        />
        <Legend />
        <Bar dataKey="ap" name="Outflows" fill="#8884d8" yAxisId={'right'}/>
        <Bar dataKey="ar" name="Inflows" fill="#82ca9d"  yAxisId={'right'} />
        <Line dataKey="net" name="Cash Balance" stroke="red"  yAxisId="left" />
      </ComposedChart>
    </ResponsiveContainer>
  );
};

export default CombinedChart;



