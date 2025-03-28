import { useRef } from "react";
import { ActionIcon, rem } from "@mantine/core";
import { IconClock } from "@tabler/icons-react";

export function useTimePicker() {
  const ref = useRef<HTMLInputElement>(null);

  const pickerControl = (
    <ActionIcon variant="subtle" color="gray" onClick={() => ref.current?.showPicker()}>
      <IconClock style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
    </ActionIcon>
  );

  return { ref, pickerControl };
}
