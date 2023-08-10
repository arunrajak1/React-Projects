import { Grid, Container, Card, Text, Space, Box, Chip, Group, Badge, Table, Button, SegmentedControl, Switch, useMantineTheme, Title, Flex } from '@mantine/core';
import { ChevronsDown, ChevronsUp, StepInto, StepOut, TrendingUp2, TrendingUp3 } from 'tabler-icons-react';
import { FC, useEffect, useState } from 'react';
import Tile from '../components/Tile/Tile';
import { FilterMenu } from '../components/FilterMenu/FilterMenu';
import axios from 'axios';
import { NetBarChart } from '../components/BarChart/NetBarChart';
import CombinationChart from '../components/CombinationChart/CombinationChart';
import { MVBarChart } from '../components/BarChart/MVBarChart';



interface HomePageProps {
  className?: string
}

export const HomePage: FC<HomePageProps> = (props) => {
  const theme = useMantineTheme();
  const [showNet, setShowNet] = useState(false);
  const [dataIndex, setDataIndex] = useState(1);
  const [period, setPeriod] = useState('');
  const [fromValue, setFromValue] = useState<Date | null>(null);
  const [toValue, setToValue] = useState<Date | null>(null);

  const dollarFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
  });
  

  const handleChangeFilter = (period:string, from:any, to:any, dataInd:number) => {
    setPeriod(period);
    setFromValue(from);
    setToValue(to);
    setDataIndex(dataInd);
  };
  
  const [isReceipt, setIsReceipt] = useState(false)

  const child = <Card shadow="sm" padding="md" withBorder><Text>This is sample text</Text></Card>;
  const [data, setData] = useState([]);
  const [ar, setAr] = useState([]);
  const [ap, setAp] = useState([]);

  useEffect(() => {
    axios.get(`https://dashboard-api-9n0g.onrender.com/${period}`)
      .then(response => {
        console.log(response.data);
        setData(response.data[dataIndex].companies.new_company.data);
        setAr(response.data[dataIndex].companies.new_company.ar);
        setAp(response.data[dataIndex].companies.new_company.ap);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [period, dataIndex]);

  const receipts = ar;
  const disbursements = ap;
  const rows = (isReceipt?receipts:disbursements).map((receipt:any) => (
    <tr key={receipt.name}>
      <Flex justify='space-between'>
      <td>{receipt.name}</td>
      <td>{dollarFormatter.format(receipt.amount)}</td>
      </Flex>
    </tr>
  ));

  

  return (
    <Container className={props.className}>
      <Grid className={`${props.className} grid`}>
        {/* <Grid.Col md={12}> */}
          <Card m='lg' padding="lg" radius="lg" withBorder bg={theme.primaryColor}>
            {/* <Group> */}
              <Group>
              <Title order={1} color='white'>
              $ 49,856,324
              </Title>
              <TrendingUp3 size={36} color='white'></TrendingUp3>
              </Group>
              <Flex justify='center' align='center'>
              <Badge m='sm' color='gray' size='sm' variant='light'>Cash Balance</Badge>
              </Flex>
            {/* </Group> */}
          </Card>
        {/* </Grid.Col> */}
        <Grid.Col md={12}>
          <FilterMenu onChangeFilter={handleChangeFilter} ></FilterMenu>
        </Grid.Col>
        <Grid.Col md={12}>
          <Tile title="Out-flow & In-flow" description="" note="" className="tile">
            {/* <MVLineChart></MVLineChart>  */}
             <MVBarChart period={period} fromValue={fromValue} toValue={toValue} dataIndex={dataIndex}></MVBarChart>
            <CombinationChart period={period} fromValue={fromValue} toValue={toValue} dataIndex={dataIndex}></CombinationChart>
          </Tile>
        </Grid.Col>
        
        <Grid.Col md={12}>
          <Tile title="Combine Data" description="" note="" className="tile">
            {/* <MVLineChart></MVLineChart> */}
            {/* <MVBarChart period={period} fromValue={fromValue} toValue={toValue} dataIndex={dataIndex}></MVBarChart> */}
            <CombinationChart period={period} fromValue={fromValue} toValue={toValue} dataIndex={dataIndex}></CombinationChart>
          </Tile>
        </Grid.Col>
        <Grid.Col md={12}>
          <Flex gap="md">
            <Box w={200}>
              <Button fullWidth variant="outline" onClick={() => setShowNet(!showNet)}>
                Net Cash Position
              </Button>
            </Box>
          </Flex>
        </Grid.Col>
        {showNet ? <Grid.Col md={12}> <Tile title="" description="" note="" className="tile" >
             <NetBarChart period={period} fromValue={fromValue} toValue={toValue} dataIndex={dataIndex}></NetBarChart>
            </Tile> </Grid.Col>
            : ''}
        <Grid.Col md={12}>
        <Group>
          {/* <Button variant='gradient' gradient={{from: 'indigo',to:'teal'}} radius='xl'>Checkr</Button>
          <Button variant='' gradient={{from: 'green',to:'teal'}} radius='xl'>tessera</Button>
          <Button variant='gradient' gradient={{from: 'indigo',to:'teal'}} radius='xl'>Screening Canada</Button>
          <Button variant='gradient' gradient={{from: 'indigo',to:'teal'}} radius='xl'>Inflection</Button> */}
          <SegmentedControl  data={[{label: 'All', value: 'All'},{label: 'Checkr', value: 'Checkr'},{label: 'tessera', value: 'tessera', disabled:true},{label: 'Screening Canada', value: 'Screening Canada', disabled:true},{label: 'Inflection', value: 'Inflection', disabled: true}]} size='lg' radius='xl' color={theme.primaryColor} fullWidth></SegmentedControl>
        </Group>
        </Grid.Col>
        <Grid.Col md={6}>
          <Card shadow="sm" radius="md" className="tile">
            <Grid justify='flex-end' align='center'>
              <Text pr='xs' fw={400} c='dimmed'>{isReceipt?'Inflows':'Outflows'}</Text>
            <Switch checked={isReceipt} onChange={(event) => setIsReceipt(event.currentTarget.checked)} size='lg' onLabel={<ChevronsUp size="1.5rem" strokeWidth={2} color='white' />} offLabel={<ChevronsDown size='1.5rem' strokeWidth={2.5} color='red'/>}></Switch>
            </Grid>
            <Table highlightOnHover fontSize='lg'>
              <thead>
                <tr>
                <Flex justify='space-between' align='right'>
                  <th><Text fw={700} fz='xl'>{isReceipt?'Receipts':'Disbursements'}</Text></th>
                  <Space w="xl" />
                  <th><Text fw={700} fz='xl'>Amount</Text></th>
                </Flex>
                </tr>
              </thead>
              <tbody>
              {rows}
              </tbody>
            </Table>
          </Card>
        </Grid.Col>
        <Grid.Col md={6}>
          {/* <Tile title="Disbursements" description="" className="tile">
          </Tile> */}
          <Card shadow="sm" radius="md" className="tile">
            <Table fontSize='lg'>
              <thead><tr>
                <Flex justify='space-between' align='right' m={5}>
                  <th><Text fw={800} fz='xl'>AR Aging</Text></th>
                  <Space w="xl" />
                  <th><Text fw={700} fz='xl'></Text></th>
                </Flex>
                </tr></thead>
              <tbody>
                <tr><Flex justify='space-between'><td>1-30 Days</td><td>{dollarFormatter.format(30725325)}</td></Flex></tr>
                <tr><Flex justify='space-between'><td>31-60 Days</td><td>{dollarFormatter.format(7450288)}</td></Flex></tr>
                <tr><Flex justify='space-between'><td>61-90 Days</td><td>{dollarFormatter.format(678506)}</td></Flex></tr>
                <tr><Flex justify='space-between'><td>91-120 Days</td><td>{dollarFormatter.format(282061)}</td></Flex></tr>
                <tr><Flex justify='space-between'><td>&gt;121 Days</td><td>{dollarFormatter.format(1044198)}</td></Flex></tr>
              </tbody>
            </Table>
          </Card>
        </Grid.Col>
      </Grid>
    </Container>
  );
};
