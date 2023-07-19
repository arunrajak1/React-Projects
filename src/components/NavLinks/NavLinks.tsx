import { Container, NavLink, Navbar, Space, Tooltip, UnstyledButton } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { FaHome, FaCog } from "react-icons/fa";

interface NavLinksProps {
  className?: string;
}

const NavLinks: FC<NavLinksProps> = (props) => {
  const [ collapsed, handlers ] = useDisclosure(false);
  const [ active, setActive ] = useState(0);
  
  const items = [
    { link: "home", label: "Home", icon: <FaHome/>},
    { link: "settings", label: "Settings", icon: <FaCog/> }
  ];

  return (
    <Container className={props.className}>
      <Container className={`${props.className} navbar-collapse-button`}>
        { collapsed ?
          (<UnstyledButton>
            <FaChevronRight onClick={handlers.toggle} className={`${props.className} navbar-collapse-button icon`}/>
          </UnstyledButton>):
          (<UnstyledButton>
            <FaChevronLeft onClick={handlers.toggle} className={`${props.className} navbar-collapse-button icon`}/>
          </UnstyledButton>)
        } 
      </Container>
    
      <Space h="md"/>

      <Container>
        <Navbar.Section>
        { items.map (({ link, label, icon}, index) => (
          <Tooltip
            key={label}
            label={label}
            position="right">

            { collapsed ? 
              (
                <NavLink component={Link} to={link} icon={icon} key={label}
                  active={index === active}
                  onClick={() => setActive(index)}>
                </NavLink>
              ) :
              (
                <NavLink component={Link} to={link} label={label} key={label} icon={icon} 
                  active={index === active}
                  onClick={() => setActive(index)}>
                </NavLink>
              )
            }              
          </Tooltip>
          ))
        }            
        </Navbar.Section>
      </Container>
  </Container>        
  );
};

export default NavLinks;
