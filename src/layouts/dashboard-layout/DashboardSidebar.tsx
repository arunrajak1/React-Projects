import { ActionIcon, Drawer, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { FC } from 'react';
import { FaFilter } from "react-icons/fa";


interface DashboardSidebarProps {
  className?: string;
}

const DashboardSidebar: FC<DashboardSidebarProps> = (props) => {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <ActionIcon variant="hover" className={props.className} radius="xl" size="sm" onClick={open}>
        <FaFilter/>
      </ActionIcon>
      <Drawer opened={opened} onClose={close} title="Filters" position="right" className={props.className}>
        <Text>Drawer Content</Text>
      </Drawer>      
    </>
  );
};

export default DashboardSidebar;