import React, { FC } from 'react';

import {
  AppShell,
  Header,
  Footer,
  useMantineTheme,
  Container
} from '@mantine/core';

import './DashboardLayout.css';
import { DashboardNavbar } from './DashboardNavbar';
import { DashboardFooter } from './DashboardFooter';
import { DashboardHeader } from './DashboardHeader';
import { useDisclosure } from '@mantine/hooks';
import { ReactNode } from 'react';

interface DashboardLayoutProps {
    children: ReactNode;
}
  
export const DashboardLayout: FC<DashboardLayoutProps> = (props) => {
  const theme = useMantineTheme();
  const [opened, handlers] = useDisclosure(false);

  return (
    <AppShell
      styles={{
        main: {
          background: theme.colorScheme === 'dark' ? theme.colors.dark[8] : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="lg"
      asideOffsetBreakpoint="sm"
      layout="alt"

      // navbar={
      //   <DashboardNavbar opened={opened} handlers={handlers} className="dashboard-navbar"></DashboardNavbar>
      // }

      footer={
        <Footer height={40} p="md" withBorder={false} className="footer-container">
          <DashboardFooter className="footer"></DashboardFooter>
        </Footer>
      }

      header={
        <Header height={{ base: 80, md: 80 }} p="md" withBorder={false} className="header-container">
          <DashboardHeader  opened={opened} handlers={handlers} className="header"></DashboardHeader>
        </Header>
      }
    >
    
    <Container className="page-content">
        {props.children}
    </Container>

    </AppShell>
  );
}