import { DrawerProps, Drawer as DrawerComponent } from "@mantine/core";
import { IconX } from "@tabler/icons-react";
import { ReactNode } from "react";

import { cn } from "@/lib/utils";

import drawer from "./index.module.css";

interface Drawer extends DrawerProps {
  title: string;
  footer?: ReactNode;
  contentClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
  formProps?: React.FormHTMLAttributes<HTMLFormElement>;
}

export default function Drawer({
  opened,
  onClose,
  position,
  size,
  title = "Sample Title",
  children,
  footer,
  contentClassName,
  bodyClassName,
  headerClassName,
  footerClassName,
  formProps,
  ...rest
}: Drawer) {
  return (
    <DrawerComponent {...rest} styles={{ body: { height: "100%" } }} opened={opened} onClose={onClose} position={position} size={size} withCloseButton={false} p={0}>
      <div className={cn(drawer.contentClass, contentClassName)}>
        {formProps ? (
          <form {...formProps} className="h-full flex flex-col justify-between">
            <div className="flex flex-col gap-2 2xl:gap-4 p-0">
              <div className={cn(drawer.headerClass, headerClassName)}>
                <div className="flex flex-row justify-between">
                  <p className="font-bold text-[22px] text-[#559CDA]">{title}</p>
                  <IconX className="cursor-pointer" onClick={onClose} size={30} color="gray" />
                </div>
              </div>
              <div className="w-full h-[2px] bg-[#edeeed]" />

              <div className={cn(drawer.bodyClass, bodyClassName)}>
                {/* Divider */}
                {children}
              </div>
            </div>

            <div className={cn(drawer.footerClass, footerClassName)}>{footer}</div>
          </form>
        ) : (
          <>
            <div className="flex flex-col gap-2 2xl:gap-4 p-0">
              <div className={cn(drawer.headerClass, headerClassName)}>
                <div className="flex flex-row justify-between">
                  <p className="font-bold text-[22px] text-[#559CDA]">{title}</p>
                  <IconX className="cursor-pointer" onClick={onClose} size={30} color="gray" />
                </div>
              </div>
              <div className="w-full h-[2px] bg-[#edeeed]" />

              <div className={cn(drawer.bodyClass, bodyClassName)}>
                {/* Divider */}
                {children}
              </div>
            </div>
            <div className={cn(drawer.footerClass, footerClassName)}>{footer}</div>
          </>
        )}
      </div>
    </DrawerComponent>
  );
}
