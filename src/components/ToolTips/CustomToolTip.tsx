import React from 'react';
import { TooltipProps } from 'recharts';

interface CustomTooltipProps extends TooltipProps<any, any> {
  label?: string | number;
}


const dollarFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',

    minimumFractionDigits: 0,
  });

const CustomTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label">{` ${dollarFormatter.format(payload[0].value)}`}</p>
      </div>
    );
  }

  return null;
};

export default CustomTooltip;
