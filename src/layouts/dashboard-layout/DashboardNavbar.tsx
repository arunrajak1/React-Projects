import React, { FC } from 'react';
import { Navbar, MediaQuery, Drawer } from '@mantine/core';

import NavLinks from '../../components/NavLinks/NavLinks';

interface DashboardNavbarProps {
  className?: string;
  opened: boolean;
  handlers: { open: ()=> void; close: () => void; toggle: () => void }
}

export const DashboardNavbar: FC<DashboardNavbarProps> = (props) => {
  return (    
    <>
    <Navbar p="sm" hiddenBreakpoint="sm" hidden={!props.opened} withBorder={false} className="navbar-container">
      <Navbar.Section>
        <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
          <NavLinks className={props.className}/>
        </MediaQuery>
      </Navbar.Section>
    </Navbar>

    <MediaQuery largerThan="sm" styles={{ display: "none" }}>
          <Drawer opened={props.opened} onClose={props.handlers.close} title="" position="left">
            <NavLinks className={props.className}/>
          </Drawer>      
    </MediaQuery>
    </>
    );
  };
