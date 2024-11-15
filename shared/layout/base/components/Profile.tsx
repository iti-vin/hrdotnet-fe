//--- Mantine Modules
import { Menu, Avatar, rem, Flex, Text, Indicator } from "@mantine/core";
//--- Tabler Icons
import {
  IconUserCircle,
  IconReceipt,
  IconInfoCircle,
  IconShieldLock,
  IconLogout,
} from "@tabler/icons-react";
import mina from "@shared/assets/images/mina.jpg";
import "@shared/layout/base/styles/navbar.css";

export const Profile = () => {
  return (
    <Menu
      shadow="md"
      width={250}
      position="bottom-end"
      radius={20}
      zIndex={9999}
      transitionProps={{ transition: "fade-down", duration: 100 }}
    >
      <Menu.Target>
        <Indicator
          label="PA"
          size={20}
          position="bottom-end"
          withBorder
          offset={5}
        >
          <Avatar
            src={mina}
            alt="it's me"
            className="cursor-pointer"
            size="md"
          />
        </Indicator>
      </Menu.Target>

      <Menu.Dropdown className="pt-5 pb-2 px-2">
        <Flex
          mih={50}
          justify="center"
          align="center"
          direction="column"
          wrap="wrap"
          mb={20}
        >
          <p className="custom-gradient bg-clip-text text-transparent font-semibold poppins text-2xl">
            Welcome, Jane!
          </p>
          <p className="text-xs text-gray-600 poppins">
            Customize your account here.
          </p>
        </Flex>
        <Menu.Item
          className="poppins"
          fw={500}
          leftSection={
            <IconUserCircle
              visibility="sm"
              style={{ width: rem(20), height: rem(20) }}
            />
          }
        >
          Profile
        </Menu.Item>
        <Menu.Item
          fw={500}
          className="poppins"
          leftSection={
            <IconReceipt style={{ width: rem(20), height: rem(20) }} />
          }
        >
          Payslip
        </Menu.Item>
        <Menu.Item
          fw={500}
          className="poppins"
          leftSection={
            <IconInfoCircle style={{ width: rem(20), height: rem(20) }} />
          }
        >
          About
        </Menu.Item>
        <Menu.Item
          fw={500}
          className="poppins"
          leftSection={
            <IconShieldLock style={{ width: rem(20), height: rem(20) }} />
          }
        >
          Change Password
        </Menu.Item>
        <Menu.Item
          fw={500}
          className="poppins"
          leftSection={
            <IconLogout style={{ width: rem(20), height: rem(20) }} />
          }
        >
          Logout
        </Menu.Item>

        <Menu.Divider />
        <Menu.Label>
          <Flex direction="row" justify="space-between" align="center">
            <Text size="xs">Switch Company</Text>
            {/* <IconSettings size={14} color="black" className="cursor-pointer" /> */}
          </Flex>
        </Menu.Label>
        <Menu.Item
          fw={500}
          className="poppins"
          leftSection={
            <Avatar
              size="sm"
              name="Pan Asia"
              color="black"
              allowedInitialsColors={["white", "red"]}
            />
          }
        >
          Pan Asia
        </Menu.Item>
        <Menu.Item
          fw={500}
          className="poppins"
          leftSection={
            <Avatar
              size="sm"
              name="Toms World"
              color="black"
              allowedInitialsColors={["white", "red"]}
            />
          }
        >
          Toms World
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
