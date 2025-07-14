// import { Flex, Pill, PillProps, Text } from "@mantine/core";
// import styles from "../style/filter.module.css";
// import { ReactNode } from "react";

// interface IFilter extends PillProps {
//   title?: string;
//   children: ReactNode;
//   onRemove: () => void;
// }

// export default function FilterPill({ title, children, onRemove }: IFilter) {
//   return (
//     <Flex className={styles.flexRow}>
//       <Text className={styles.text}>{title}</Text>
//       <Pill className={styles.pill} withRemoveButton onRemove={onRemove}>
//         {children}
//       </Pill>
//     </Flex>
//   );
// }

import { Flex, Pill, PillProps, Text } from "@mantine/core";
import styles from "../style/filter.module.css";
import { ReactNode } from "react";

interface IFilter extends PillProps {
  title?: string;
  children: ReactNode;
  onRemove: () => void;
  isLast?: boolean; // Add this prop
}

export default function FilterPill({ title, children, onRemove, isLast = false }: IFilter) {
  return (
    <Flex className={`${styles.flexRow} ${isLast ? styles.lastPill : ""}`}>
      <Text className={styles.text}>{title}</Text>
      <Pill className={styles.pill} withRemoveButton onRemove={onRemove}>
        {children}
      </Pill>
    </Flex>
  );
}
