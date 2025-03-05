import { IconCirclePlus, IconTrash, IconX } from "@tabler/icons-react";
import { ListFilter } from "lucide-react";
import { ActionIcon, Chip, Container, Flex, Group, Pill, Text } from "@mantine/core";

export default function Filter({ filterOpen }: { filterOpen: () => void }) {

    return (
        <div className="flex justify-between items-center rounded-md border-[1px] border-[#a8a8a8]">
            <div className="w-3/4 sm:w-2/4 lg:w-15% items-center rounded-l-md flex gap-2 p-2" style={{ background: "#eeeeee" }}>
                <ListFilter size={20} color="#6d6d6d" />
                <Text fw={500} c="#6d6d6d">
                    FILTERS APPLIED
                </Text>
            </div>
            <div className="grow ml-2 hidden sm:flex items-center gap-2">
                Doc No:
                <Pill withRemoveButton>
                    <Pill.Group>123</Pill.Group>
                </Pill>
            </div>


            <div className="flex gap-1 px-2 ">
                <ActionIcon
                    variant="transparent"
                    color="gray"
                    size="md"
                    aria-label="Settings"
                    onClick={filterOpen}
                >
                    <IconCirclePlus
                        // style={{ width: "100%", height: "100%" }}
                        stroke={1.5}
                        color="#6d6d6d"
                    />
                </ActionIcon>
                <ActionIcon
                    variant="transparent"
                    color="gray"
                    size="md"
                    aria-label="Settings"
                >
                    <IconTrash
                        // style={{ width: "100%", height: "100%" }}
                        stroke={1.5}
                        color="#6d6d6d"
                    />
                </ActionIcon>
            </div>

        </div>
    );
}