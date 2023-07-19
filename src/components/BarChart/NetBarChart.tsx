import axios from 'axios';
import React, { FC, useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  LineChart,
  Line,
} from 'recharts';
import CustomTooltip from '../ToolTips/CustomToolTip';

interface BarChartProps {
    period?:string;
    fromValue?:any;
    toValue?:any;
    dataIndex:number;
}

export const NetBarChart: FC<BarChartProps> = ({period, dataIndex}) => {
    const [data, setData] = useState([]);

    const handleAPI = (period:any) => {
        axios.get(`http://localhost:3001/${period}`)
        .then(response => {
          setData(response.data[dataIndex].companies.checkr.net);
        })    
        .catch(error => {
          console.error('Error fetching data:', error);
        });
      }
      
      useEffect(() => {
        console.log(period);
          handleAPI(period);
          }, [period, dataIndex]);
    
    console.log(data);
    const formatYAxisTick = (value:any) => {
        return value.toLocaleString(undefined, { maximumFractionDigits: 2 });
      };

    return (
        <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis yAxisId="left" tickFormatter={formatYAxisTick} tick={{ style: { fontSize: '12px' } }}/>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Line yAxisId="left" type="monotone" dataKey="net" stroke="#8884d8" strokeWidth={2} activeDot={{ r: 8 }} />
          {/* <Line yAxisId="right" type="monotone" dataKey="net_predicted" stroke="#82ca9d" strokeWidth={2}/> */}
        </LineChart>
      </ResponsiveContainer>
    );
}
