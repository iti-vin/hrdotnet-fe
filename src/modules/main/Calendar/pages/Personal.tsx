/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

import { Checkbox, Flex, Stack, Text } from "@mantine/core";
import { ResponsiveContainer } from "recharts";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { useEffect, useRef, useState } from "react";
import "../index.css";
import { useCalendarContext } from "../context";
import { CalendarApi } from "@fullcalendar/core";
import renderEventContent from "../components/Event";
import { useCalendarStore } from "../store";
import dayjs from "dayjs";
import DateDetails from "../dialog/DateDetails";
import RequestDetails from "../dialog/RequestDetails";

export default function Personal() {
  const { fetchCalendar } = useCalendarContext();
  const { calendarEvents, setType, date, setDate, dialog, setDialog, isRestDayShow, setIsRestDayShow, isHolidayShow, setIsHolidayShow } = useCalendarStore();
  const calendarRef = useRef<FullCalendar>(null);
  const api = calendarRef!.current?.getApi() as CalendarApi;

  useEffect(() => {
    fetchCalendar(date);
  }, [isRestDayShow, isHolidayShow, date]);

  const handleViewChange = () => {
    if (api) {
      setType(api.view.type);
      const currentDate = api.getDate();
      const date = dayjs(currentDate).format("YYYYMMDD");
      handleDateChange(date);
    }
  };

  const handleDateChange = (newDate: string) => {
    setDate(newDate);
    fetchCalendar(newDate);
  };

  const [selectedDate, setSelectedDate] = useState<string>("");

  const handleDateClick = (arg: { dateStr: string }) => {
    setSelectedDate(arg.dateStr);
    setDialog("DateDetails");
  };

  return (
    <Stack className="w-full h-full  flex flex-col lg:flex-row">
      <Stack className=" w-full h-[80%] lg:h-full rounded-lg select-none bg-white p-4">
        <ResponsiveContainer height="100%">
          <FullCalendar
            ref={calendarRef}
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
            headerToolbar={{ left: "today, prev,next", center: `title, filter`, right: "dayGridMonth,timeGridDay,listWeek" }}
            customButtons={{ filter: { click: () => {}, text: ">" } }}
            themeSystem="bootstrap5"
            datesSet={handleViewChange}
            dayHeaderFormat={{ weekday: "long" }}
            events={calendarEvents}
            eventContent={renderEventContent}
            dayHeaderClassNames="custom-header"
            allDayClassNames="custom-all-day"
            eventClassNames="custom-event"
            initialView="dayGridMonth"
            dayMaxEvents={true}
            dateClick={handleDateClick}
          />
        </ResponsiveContainer>
      </Stack>
      <Stack className="w-full h-auto lg:w-1/5 rounded-lg select-none bg-white p-4">
        <Text fz={20} c={"#6d6d6d"} fw={700}>
          Filters
        </Text>
        <Flex className="w-full flex flex-col  justify-evenly gap-5">
          <Checkbox defaultChecked classNames={{ label: "text-[#6D6D6D] font-semibold" }} label="Shift Schedule" color="#ED8028" />
          <Checkbox defaultChecked classNames={{ label: "text-[#6D6D6D] font-semibold" }} label="Logs" color="#559CDA" />
          <Checkbox defaultChecked classNames={{ label: "text-[#6D6D6D] font-semibold" }} label="Missing Logs" color="#FF4B34" />
          <Checkbox defaultChecked classNames={{ label: "text-[#6D6D6D] font-semibold" }} label="Leave" color="#5A9D27" />
          <Checkbox defaultChecked classNames={{ label: "text-[#6D6D6D] font-semibold" }} label="CTO" color="#54BF81" />
          <Checkbox defaultChecked classNames={{ label: "text-[#6D6D6D] font-semibold" }} label="Official Business" color="#FEC001" />
          <Checkbox defaultChecked classNames={{ label: "text-[#6D6D6D] font-semibold" }} label="Overtime" color="#3E72C6" />
          <Checkbox
            defaultChecked
            checked={isRestDayShow}
            onChange={(e) => setIsRestDayShow(e.currentTarget.checked)}
            classNames={{ label: "text-[#6D6D6D] font-semibold" }}
            label="Rest Day"
            color="#A3A3A3"
          />
          <Checkbox
            defaultChecked
            checked={isHolidayShow}
            onChange={(e) => setIsHolidayShow(e.currentTarget.checked)}
            classNames={{ label: "text-[#6d6d6d] font-semibold" }}
            label="Holiday"
            color="#FFC4C4"
          />
        </Flex>
      </Stack>

      <DateDetails opened={dialog === "DateDetails"} onClose={() => setDialog("")} buttonClose={() => setDialog("")} date={selectedDate} />

      <RequestDetails opened={dialog === "RequestDetails"} onClose={() => setDialog("")} buttonClose={() => setDialog("DateDetails")} />
    </Stack>
  );
}
