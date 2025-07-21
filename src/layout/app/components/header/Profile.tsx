/**
 * @version    HRDotNet(v.2.0.0)
 * @author     Hersvin Fred De La Cruz Labastida
 */

//--- Mantine Modules
import { Avatar, Flex, Menu, rem } from "@mantine/core";
//--- Tabler Icons
import { IconUserCircle, IconLogout, IconSettings } from "@tabler/icons-react";

//--- Sample-Image
import mina from "@shared/assets/images/mina2.jpg";
import { useNavigate } from "react-router-dom";
import { useAuthGlobalStore } from "@shared/store/auth";

export default function Profile() {
  const navigate = useNavigate();
  const handleLogout = () => {
    useAuthGlobalStore.getState().clear();
    navigate("/login");
  };
  return (
    <Menu shadow="md" width={200} position="bottom-end" radius={10} transitionProps={{ transition: "fade-down", duration: 100 }}>
      <Menu.Target>
        <Avatar src={mina} alt="it's me" className="cursor-pointer" size="md" />
      </Menu.Target>

      <Menu.Dropdown className="pt-5 pb-2 px-2">
        <Flex mih={50} justify="center" align="center" direction="column" wrap="wrap" mb={20}>
          <Avatar src={mina} alt="it's me" className="cursor-pointer" size="lg" />
          <p className="font-semibold poppins text-md text-gray-600">Myoui Mina</p>
          <p className="text-xs text-gray-600">HR Admin</p>
        </Flex>
        <Menu.Item
          className={`poppins ${location.pathname == "/user/profile" && "text-white custom-gradient"}`}
          color="#6d6d6d"
          fz={13}
          fw={500}
          onClick={() => navigate("/user/profile")}
          leftSection={<IconUserCircle visibility="sm" style={{ width: rem(20), height: rem(20) }} />}>
          Profile
        </Menu.Item>
        <Menu.Item
          onClick={() => navigate("/user/account-settings")}
          className={`poppins ${location.pathname == "/user/account-settings" && "text-white custom-gradient"}`}
          color="#6d6d6d"
          fz={13}
          fw={500}
          leftSection={<IconSettings style={{ width: rem(20), height: rem(20) }} />}>
          Account Settings
        </Menu.Item>

        <Menu.Divider />
        <Menu.Item
          className={`poppins ${location.pathname == "" && "text-white custom-gradient"}`}
          color="#6d6d6d"
          fw={500}
          fz={13}
          onClick={handleLogout}
          leftSection={<IconLogout style={{ width: rem(20), height: rem(20) }} />}>
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
