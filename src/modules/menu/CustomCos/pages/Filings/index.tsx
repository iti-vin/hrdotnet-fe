import { Group, Stack } from "@mantine/core";

import { Filters } from "../../component/Filters";
import { CustomTitle } from "../../component/CustomTitle";
import { NewRequestBtn } from "../../component/buttons/NewRequestBtn";
// import { CustomTable } from "../../component/CustomTable";

const Filings = () => {
  return (
    <Stack>
      <Group justify="space-between">
        <CustomTitle />
        <NewRequestBtn />
      </Group>

      <Filters />
      {/* <CustomTable /> */}
    </Stack>
  );
};

export default Filings;
