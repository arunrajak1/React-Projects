import React, { FC, ReactNode } from 'react';
import { Card, Group, Text, Menu, ActionIcon, Space, Container } from '@mantine/core';
import { FaEllipsisV } from "react-icons/fa";

interface TileProps {
  className?: string;
  title: string;
  description: string;
  note?: string;
  children: ReactNode;
}

const Tile: FC<TileProps> = (props) => {

  return (
    <Card shadow="sm" radius="md" className={props.className}>
      <Card.Section withBorder inheritPadding py="xs">
        <Group position="apart">
          <Text weight={500}>{props.title}</Text>
          <Menu withinPortal position="bottom-end" shadow="sm">
            <Menu.Target>
              <ActionIcon>
                <FaEllipsisV></FaEllipsisV>
              </ActionIcon>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Item>Menu Option 1</Menu.Item>
              <Menu.Item>Menu Option 2</Menu.Item>
              <Menu.Item>Menu Option 3</Menu.Item>
              <Menu.Item>Menu Option 4</Menu.Item>
              {/* <Menu.Item icon={<IconFileZip size={14} />}>Download zip</Menu.Item>
              <Menu.Item icon={<IconEye size={14} />}>Preview all</Menu.Item>
              <Menu.Item icon={<IconTrash size={14} />} color="red">
                Delete all
              </Menu.Item> */}
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Card.Section>

      <Text mt="sm" color="dimmed" size="sm">
        {props.description} 
      </Text>

      <Space h="sm"/>

      <Card.Section>
        <Container className="tile-content">
          {props.children}
        </Container>
      </Card.Section>

      <Card.Section inheritPadding mt="sm" pb="md">
        <Text mt="sm" color="dimmed" size="sm">
          {props.note}
        </Text>  
      </Card.Section>

    </Card>
  );
}


export default Tile;

