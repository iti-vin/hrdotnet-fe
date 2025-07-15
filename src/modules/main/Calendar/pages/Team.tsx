import {
  ActionIcon,
  Avatar,
  Button,
  Card,
  Flex,
  Group,
  Image,
  LoadingOverlay,
  ScrollArea,
  Stack,
  Text,
} from "@mantine/core";
import {
  IconCircleCheckFilled,
  IconCirclePlus,
  IconCircleXFilled,
  IconLayoutGrid,
  IconList,
  IconTrash,
} from "@tabler/icons-react";
import Pagination from "../components/Pagination";
import { useEffect, useState } from "react";
import { basketballPlayers } from "../assets/array";
import TeamCalendar from "../dialog/TeamCalendar";
import { useCalendarStore } from "../store";
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";
import "../index.css";
import { ListFilter } from "lucide-react";
import DrawerFilter from "../components/DrawerFilter";
interface Team {
  name: string;
  position: string;
  active: boolean;
  image: string;
}

export default function Team() {
  const [players, setPlayers] = useState<Team[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { dialog, setDialog, setDrawer } = useCalendarStore();
  const [isList, setIsList] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const dateToday = new Date();

  useEffect(() => {
    setPlayers(basketballPlayers);
    setLoading(false);
  }, [loading]);

  const onHandleOpen = (name: string) => {
    setDialog("TeamCalendar");
    setName(name);
  };

  return (
    <Stack className="h-full w-full overflow-hidden gap-2">
      <Flex className="justify-between h-[5%]">
        <Text className="text-lg lg:text-2xl font-bold text-[#6d6d6d]">
          {DateTimeUtils.getIsoDateFullWord(dateToday.toString())}
        </Text>
        <Flex className="gap-4 items-center">
          {isList ? (
            <ActionIcon variant="filled" color="#7E7E7E" size="lg" radius="md" onClick={() => setIsList(false)}>
              <IconList style={{ width: "70%", height: "70%" }} stroke={2} />
            </ActionIcon>
          ) : (
            <ActionIcon variant="filled" color="#7E7E7E" size="lg" radius="md" onClick={() => setIsList(true)}>
              <IconLayoutGrid style={{ width: "70%", height: "70%" }} stroke={2} />
            </ActionIcon>
          )}
        </Flex>
      </Flex>

      <Flex className="filter-container">
        <Flex className="h-full flex flex-row items-center justify-center">
          <Flex bg="#eeeeee" className="w-auto h-full items-center px-2 gap-4 rounded-l-md">
            <ListFilter size={20} color="#6d6d6d" />
            <Text fw={500} c="#6d6d6d" visibleFrom="md">
              FILTERS APPLIED
            </Text>
          </Flex>
          <Group></Group>
        </Flex>

        <Flex pr={10} py={8} gap={5}>
          <ActionIcon
            variant="transparent"
            color="gray"
            size="md"
            aria-label="Settings"
            onClick={() => setDrawer(true)}>
            <IconCirclePlus style={{ width: "100%", height: "100%" }} stroke={1.5} color="#6d6d6d" />
          </ActionIcon>
          <ActionIcon variant="transparent" color="gray" size="md" aria-label="Settings">
            <IconTrash style={{ width: "100%", height: "100%" }} stroke={1.5} color="#6d6d6d" onClick={() => {}} />
          </ActionIcon>
        </Flex>
      </Flex>
      <ScrollArea className="h-full w-full">
        {isList ? (
          <Stack className="h-[80%] w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-7 gap-7 items-center justify-center">
            <LoadingOverlay visible={loading} />
            {players.map((player, index) => (
              <Card
                key={index}
                radius="md"
                className="w-[200px] h-[280px] cursor-pointer shadow-md shadow-slate-400 hover:scale-105 bg-[#fafafa] hover:bg-slate-200"
                onClick={() => onHandleOpen(player.name)}>
                <Flex className="w-full h-full flex flex-col justify-between">
                  <Flex>
                    {player.image ? (
                      <Image src={player.image} alt={player.name} height={160} width={160} fit="cover" radius="md" />
                    ) : (
                      <div className="h-40 w-full bg-gray-300 flex items-center justify-center rounded-md">
                        <Text>No Image</Text>
                      </div>
                    )}
                  </Flex>
                  <Flex className="flex flex-col">
                    <Text fw={500} mt="md" className="text-center">
                      {player.name}
                    </Text>
                    <Text size="sm" color="dimmed" className="text-center">
                      {player.position}
                    </Text>
                    <Flex className="items-center justify-center gap-4 mt-2">
                      {player.active ? <IconCircleCheckFilled color="green" /> : <IconCircleXFilled color="red" />}
                      <Text size="sm" color={player.active ? "green" : "red"} className="text-center">
                        {player.active ? "In Office" : "Out of the Office"}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Card>
            ))}
          </Stack>
        ) : (
          <Stack className="w-full flex flex-col py-4 px-1">
            <LoadingOverlay visible={loading} />
            {players.map((player, index) => (
              <Flex
                key={index}
                className="w-full h-auto cursor-pointer shadow-md shadow-slate-400  bg-[#fafafa] px-4 rounded-md hover:bg-slate-200"
                onClick={() => onHandleOpen(player.name)}>
                <Flex className="flex flex-row w-full justify-between p-2">
                  <Flex className="w-full h-full items-center">
                    {player.image ? <Avatar src={player.image} alt="it's me" /> : <Avatar radius="xl" />}
                    <Flex className="flex flex-col">
                      <Text size="sm" fw={500}>
                        {player.name}
                      </Text>
                      <Text size="xs" color="dimmed">
                        {player.position}
                      </Text>
                    </Flex>
                  </Flex>
                  <Flex className="w-full h-full items-center gap-4">
                    {player.active ? <IconCircleCheckFilled color="green" /> : <IconCircleXFilled color="red" />}
                    <Text size="sm" color={player.active ? "green" : "red"} className="text-center">
                      {player.active ? "In Office" : "Out of the Office"}
                    </Text>
                  </Flex>
                  <Flex className="w-full h-full justify-end items-center">
                    <Button className="rounded-2xl  bg-white text-[#6d6d6d] shadow-md shadow-slate-300" size="xs">
                      View Schedule
                    </Button>
                  </Flex>
                </Flex>
              </Flex>
            ))}
          </Stack>
        )}
      </ScrollArea>
      <Pagination currentPage={1} pageSize={15} recordsLength={10} total={5} time="0.340" />

      <TeamCalendar
        opened={dialog === "TeamCalendar"}
        onClose={() => setDialog("")}
        buttonClose={() => setDialog("")}
        name={name}
      />

      <DrawerFilter />
    </Stack>
  );
}
