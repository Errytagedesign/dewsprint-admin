import {
  DashboardIcon,
  UsersIcon,
  SettingsIcon,
  RiderIcon,
} from "@/public/svgs/svgs";
import { TbTruckDelivery } from "react-icons/tb";
import { GrTransaction } from "react-icons/gr";

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
    icon: <GrTransaction size={24} />,
    title: "Transactions",
    url: "/transactions",
  },

  {
    icon: <SettingsIcon />,
    title: "Settings",
    url: "/settings",
  },
];
