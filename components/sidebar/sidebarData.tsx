import {
  DashboardIcon,
  UsersIcon,
  TransactionIcon,
  SettingsIcon,
  RiderIcon,
} from "@/public/svgs/svgs";

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
    icon: <SettingsIcon />,
    title: "Settings",
    url: "/settings",
  },
];
