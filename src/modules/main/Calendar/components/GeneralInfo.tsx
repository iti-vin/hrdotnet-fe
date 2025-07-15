import { Flex, Text, TextInput } from "@mantine/core";
import { Fragment } from "react";

export default function GeneralInfo({ items }: { items: any }) {
  return (
    <Fragment>
      <Text style={{ color: "#559CDA" }} className="font-bold">
        General Information {items}
      </Text>
      <Flex direction="column" gap={5}>
        <Flex gap={{ base: 5, md: 10 }} direction={{ base: "column", md: "row" }}>
          <TextInput label="From Date" className="w-full" radius="md" size="lg" placeholder="none" disabled />
          <TextInput label="To Date" className="w-full" radius="md" size="lg" placeholder="none" disabled />
        </Flex>

        <Flex gap={{ base: 5, md: 10 }} direction={{ base: "column", md: "row" }}>
          <TextInput label="OB Time In" className="w-full" radius="md" size="lg" placeholder="none" disabled />
          <TextInput label="OB Time Out" className="w-full" radius="md" size="lg" placeholder="none" disabled />
        </Flex>
        <Flex gap={{ base: 5, md: 10 }} direction={{ base: "column", md: "row" }}>
          <TextInput label="Location" className="w-full" radius="md" size="lg" placeholder="none" disabled />
          <TextInput label="Branch" className="w-full" radius="md" size="lg" placeholder="none" disabled />
        </Flex>
        <TextInput label="Reference No." radius="md" size="lg" placeholder="none" disabled />
      </Flex>
    </Fragment>
  );
}
