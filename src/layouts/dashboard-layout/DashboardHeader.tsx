import { Container, Space, Text, Header, MediaQuery, ActionIcon, Image, Title, Flex } from '@mantine/core';
import { FaBars } from "react-icons/fa";

import React, { FC } from 'react';
import DashboardSidebar from './DashboardSidebar';

interface DashboardHeaderProps {
  className?: string;
  opened: boolean;
  handlers: { open: ()=> void; close: () => void; toggle: () => void }
}

export const DashboardHeader: FC<DashboardHeaderProps> = (props) => {
    return (
      <Header height={{ base: 80, md: 80 }} p="md" withBorder={false} >
        {/* <MediaQuery largerThan="sm" styles={{ display: 'none' }}>
          <ActionIcon variant="hover"
            radius="xl"
            size="sm"
            onClick={props.handlers.open}>
              <FaBars/>
          </ActionIcon>
        </MediaQuery> */}
        {/* <Container className={props.className}>
          <Image mx="auto" radius="md" src="/Checkr_Logo_Wordmark_Aqua@4x.png" alt="Logo" className={`${props.className} header-image`}/>
          <Image maw={240} mx="auto" radius="md" src="/Checkr_Logo_Wordmark_Aqua@4x.png" alt="Random image" />
          <Space w="lg"></Space>
          <Title order={1} variant='gradient' gradient={{from: 'cyan', to:'green'}}>MVue</Title>
        </Container> */}
        <Flex justify='center'>
        <Title order={1} variant='gradient' gradient={{from: 'cyan', to:'green'}}>NoQueue</Title>
        </Flex>
        {/* <DashboardSidebar className="sidebar"></DashboardSidebar> */}
      </Header>     
    );
  };

