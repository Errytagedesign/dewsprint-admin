import {
  DashboardIcon,
  UsersIcon,
  SettingsIcon,
  RiderIcon,
} from "@/public/svgs/svgs";
import { TbTruckDelivery } from "react-icons/tb";

export const SidebarData = [
  {
    icon: <DashboardIcon />,
    title: "Dashboard",
    url: "/dashboard",
  },

  {
    icon: <UsersIcon />,
    title: "Customers",
    url: "/customers",
  },
  {
    icon: <RiderIcon />,
    title: "Riders",
    url: "/riders",
  },

  {
    icon: <TbTruckDelivery size={24} />,
    title: "Orders",
    url: "/orders",
  },

  {
    icon: <SettingsIcon />,
    title: "Settings",
    url: "/settings",
  },
];
