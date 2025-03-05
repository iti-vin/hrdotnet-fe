/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import React from "react";
//--- Mantine Modules
import { Avatar, Container, Divider, Flex, Text } from "@mantine/core";
//--- Tabler Icons
import { IconClock, IconFileCheck } from "@tabler/icons-react";

//--- Sample-Data
import items from "@shared/services/notification.json";

export default function NotificationItems({ filingStatus }: { filingStatus?: string }) {
  return (
    <React.Fragment>
      <Divider size={1} color="#ebe5e5" />
      {(filingStatus ? items.notifications.filter((notification) => notification.filing_status === filingStatus) : items.notifications).map((items, index) => (
        <>
          <Container key={index} py={10} className={`gap-10 w-full cursor-pointer select-none ${items.notif_status === 0 && "bg-blue-100"}`}>
            <Flex align="start" justify="start" gap={10}>
              <Avatar variant="filled" radius="md" color="#c6fa98" size={30}>
                <IconFileCheck color="green" style={{ width: "100%", height: "100%" }} stroke={1} />
              </Avatar>
              <Flex direction="column" align="flex-start" gap={5}>
                <Flex direction="column">
                  <Text fw={600}>{items.title}</Text>
                  <Text fw={200}>
                    {items.description} {items.document_no}
                  </Text>
                </Flex>

                <Flex direction="row" justify="space-between" align="end" className="w-full">
                  <Flex direction="row" align="center" justify="start" gap={5}>
                    <IconClock size={13} stroke={1} />
                    <Text size="xs" c="dimmed">
                      {items.date_posted}
                    </Text>
                  </Flex>
                  <Text size="xs" c="gray">
                    Click to view details.
                  </Text>
                </Flex>
              </Flex>
            </Flex>
          </Container>
          <Divider size={1} color="#ebe5e5" />
        </>
      ))}
    </React.Fragment>
  );
}
