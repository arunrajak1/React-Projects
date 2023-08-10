import { Button, Chip, Flex, Grid, Group, Input, Select, Space } from "@mantine/core";
import React, { FC, useState } from "react";
import { DateInput } from '@mantine/dates';
import { IconArrowRight, IconArrowLeft, IconArrowLeftCircle, IconArrowLeftRight, IconArrowLeftBar, IconArrowRightBar, IconArrowRightRhombus, IconArrowLeftRhombus } from '@tabler/icons-react';

interface FilterMenuProps {
    className?: string;
    onChangeFilter?: any;
}

export const FilterMenu: FC<FilterMenuProps>  = ({ onChangeFilter }) => {
    const [dataIndex, setDataIndex] = useState(1);
    const [period, setPeriod] = useState('daily');
    const [fromValue, setFromValue] = useState<Date | null>(null);
    const [toValue, setToValue] = useState<Date | null>(null);
    onChangeFilter(period, fromValue, toValue, dataIndex); 

    const handlePeriodChange = (event:any) => {
      setPeriod(event);
      onChangeFilter(period, fromValue, toValue, dataIndex); 
    };

    const handleFromChange = (event:any) => {
      setFromValue(event);
      onChangeFilter(period, fromValue, toValue, dataIndex); 
    };

    const handleToChange = (event:any) => {
      setToValue(event);
      onChangeFilter(period, fromValue, toValue, dataIndex); 
    };

    return (
        <>
        <Grid.Col md={12}>
        <Flex justify='flex-end'>
            {/* <Flex align='flex-start' justify='flex-start'>
            <Select p='md' data={['Current Quarter','Previous Quarter','Current Year', 'Previous Year']} defaultValue='Current Quarter'></Select>
            </Flex> */}
            <Group position="center">
            <DateInput
              value={fromValue}
              onChange={handleFromChange}
              placeholder="From Date"
              maw={400}
              mx="auto"
            />
            </Group>
            <Flex p='md'>&nbsp;to&nbsp;</Flex>
            <Group position="center">
              <DateInput
                value={toValue}
                onChange={handleToChange}
                placeholder="To Date"
                maw={400}
                mx="auto"
              />
            </Group>
          <Chip.Group multiple={false} value={period} onChange={handlePeriodChange}>
            <Group p='md'>
            <Chip value="daily" variant='filled'>Daily</Chip>
            <Chip value="weekly" variant='filled'>Weekly</Chip>
            <Chip value="monthly" variant='filled'>Monthly</Chip>
            </Group>
          </Chip.Group>
          <Flex p={8}>
            <Button onClick={() => setDataIndex(dataIndex-1)}>
              <IconArrowLeft size={26} />
            </Button>
            <Space w='md'/>
            <Button onClick={() => setDataIndex(dataIndex+1)}>
              <IconArrowRight size={26} />
            </Button>
          </Flex>
        </Flex>
        </Grid.Col>
        </>
    )
}