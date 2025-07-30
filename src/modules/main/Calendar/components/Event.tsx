/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//-- Full Calendar
import { EventContentArg } from "@fullcalendar/core/index.js";
//--- Mantine Components
import { Box, Container, Text } from "@mantine/core";

export default function renderEventContent(eventInfo: EventContentArg) {
  const eventDetails = eventInfo.event?._def;
  return (
    <Container
      bg={eventInfo.backgroundColor}
      style={{ border: `1.5px solid ${eventInfo.borderColor}` }}
      className={`flex flex-row overflow-hidden pl-2 h-5 hover:overflow-visible w-full items-center gap-2 truncate cursor-pointer rounded-sm`}>
      <Box bg={eventInfo.textColor} className={`p-1 h-1 rounded-full`} />
      <Text c={eventInfo.textColor} size="12px" fw={500} py={2} ta="center">
        {eventDetails.title}
      </Text>
    </Container>
  );
}
