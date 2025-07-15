// hooks/useResponsive.ts
import { useMediaQuery } from "@mantine/hooks";

export default function useResponsive() {
  const isLaptopHeight = useMediaQuery("(max-height: 800px)");
  const isLaptopWidth = useMediaQuery("(min-width: 1024px) and (max-width: 1440px)");

  const isSmallHeight = useMediaQuery("(max-height: 600px)");
  const isSmallWidth = useMediaQuery("(max-width: 900px)");

  return {
    isLaptopHeight,
    isLaptopWidth,
    isSmallHeight,
    isSmallWidth,
    isLaptop: isLaptopWidth && isLaptopHeight,
  };
}
