import { Container, Group, Text, Divider, Anchor } from '@mantine/core';
import React, { FC } from 'react';

interface DashboardFooterProps {
  className?: string
}
export const DashboardFooter: FC<DashboardFooterProps> = (props) => {
 
  return (
    <Container className={props.className}>
      <Group className={props.className}>
        <Anchor href="#" color="dimmed" underline={false}>Help</Anchor>
        <Divider orientation="vertical" />
        <Anchor href="#" color="dimmed" underline={false}>Submit Ticket</Anchor>
        <Divider orientation="vertical" />
        <Anchor href="#" color="dimmed" underline={false}>Feedback</Anchor>
        <Divider orientation="vertical" />
        <Text color="dimmed">(c) 2023 Calfus, All Rights Reserved</Text>
      </Group>      
    </Container>    
  );
};
