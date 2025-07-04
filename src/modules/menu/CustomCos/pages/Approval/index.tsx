import { Group, Stack } from "@mantine/core";

import { Filters } from "../../component/Filters";
import { CustomTitle } from "../../component/CustomTitle";
import { NewRequestBtn } from "../../component/buttons/NewRequestBtn";

const Approval = () => {
  return (
    <Stack>
      <Group justify="space-between">
        <CustomTitle />
        <NewRequestBtn />
      </Group>

      <Filters />
    </Stack>
  );
};

export default Approval;
