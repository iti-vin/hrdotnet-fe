import { ActionIcon, Avatar, Button, Card, Flex, Image, LoadingOverlay, ScrollArea, Stack, Text, TextInput } from "@mantine/core";
import { IconCaretDownFilled, IconCircleCheckFilled, IconCircleXFilled, IconLayoutGrid, IconList, IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { basketballPlayers } from "../assets/array";
import TeamCalendar from "../dialog/TeamCalendar";
import { useCalendarStore } from "../store";
import { DateTimeUtils } from "@shared/utils/DateTimeUtils";
import "../index.css";
import DrawerFilter from "../components/DrawerFilter";
import { Select } from "@shared/components";
interface Team {
  name: string;
  position: string;
  active: boolean;
  image: string;
}

export default function Team() {
  const [players, setPlayers] = useState<Team[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { dialog, setDialog } = useCalendarStore();
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
    <Stack className="h-full w-full overflow-hidden gap-2 p-8 bg-white rounded-md">
      <Flex className="justify-between h-[15%] md:h-[5%] flex flex-col md:flex-row items-center">
        <Text className="text-lg lg:text-2xl font-bold text-[#6d6d6d]">{DateTimeUtils.getIsoDateFullWord(dateToday.toString())}</Text>

        <Flex className="gap-2" align="center">
          <Flex direction={{ base: "row", md: "row" }} align="center" justify="end" gap={5}>
            {/* <Text size="sm">Search By:</Text> */}
            <Select
              variant="outline"
              size="md"
              radius={8}
              defaultValue={"Name"}
              w={150}
              placeholder="Search By:"
              data={["Date", "Schedule", "Name"]}
              rightSection={<IconCaretDownFilled size={18} color="#6d6d6d" />}
              styles={{
                input: {
                  backgroundColor: "white",
                  fontWeight: 600,
                  border: "1px solid #6d6d6d",
                },
              }}
            />
            <TextInput
              variant="outline"
              onChange={() => {}}
              placeholder="Search...."
              radius={8}
              w={200}
              leftSection={<IconSearch size={18} color="#6d6d6d" />}
              styles={{
                input: {
                  backgroundColor: "white",
                  fontWeight: 600,
                  border: "1px solid #6d6d6d",
                },
              }}
            />
          </Flex>
          <Flex className="gap-2 bg-[#EBF6FA] p-1 rounded-md">
            <ActionIcon variant={isList ? "filled" : "transparent"} color="white" size="lg" className="rounded-md" onClick={() => setIsList(true)}>
              <IconLayoutGrid style={{ width: "70%", height: "70%" }} stroke={2} color="#7E7E7E" />
            </ActionIcon>
            <ActionIcon variant={isList ? "transparent" : "filled"} color="white" size="lg" className="rounded-md" onClick={() => setIsList(false)}>
              <IconList style={{ width: "70%", height: "70%" }} stroke={2} color="#7E7E7E" />
            </ActionIcon>
          </Flex>
        </Flex>
      </Flex>
      <ScrollArea className="h-[85%] md:h-[95%] w-full">
        {isList ? (
          <Stack className="h-[85%] md:h-[95%] w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 place-items-center gap-7">
            <LoadingOverlay visible={loading} />
            {players.map((player, index) => (
              <Card
                key={index}
                radius="md"
                className="w-full h-[350px] md:h-[300px] lg:w-[220px] 2xl:w-[250px] cursor-pointer shadow-md shadow-slate-400 hover:scale-105 bg-[#fafafa] hover:bg-slate-200"
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
          <Stack className="h-[85%] md:h-[95%] w-full flex flex-col py-4 px-1">
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
      {/* <Pagination currentPage={1} pageSize={15} recordsLength={10} total={5} time="0.340" /> */}

      <TeamCalendar opened={dialog === "TeamCalendar"} onClose={() => setDialog("")} buttonClose={() => setDialog("")} name={name} />

      <DrawerFilter />
    </Stack>
  );
}
