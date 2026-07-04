import {
  Package,
  Users,
  Monitor,
  BarChart3,
  BellRing,
  Building2,
} from "lucide-react";

export const featuresData = [
  {
    icon: <Package className="w-8 h-8 text-primary-500" />,
    title: "Stock Management",
    desc: "Real-time inventory tracking with barcode integration to ensure you never lose track of stock.",
  },
  {
    icon: <Users className="w-8 h-8 text-primary-500" />,
    title: "Manage Employees",
    desc: "Role-based access controls for admins and staff. Track employee performance and activity logs.",
  },
  {
    icon: <Monitor className="w-8 h-8 text-primary-500" />,
    title: "Kiosk Creation",
    desc: "Authorize secure terminals via PIN generation and manage distinct kiosk configurations for different branches.",
  },
  {
    icon: <BarChart3 className="w-8 h-8 text-primary-500" />,
    title: "Sales Analysis",
    desc: "In-depth visual metrics on peak hours, best-selling items, and profit margin analysis.",
  },
  {
    icon: <BellRing className="w-8 h-8 text-primary-500" />,
    title: "Low Stock Warning",
    desc: "Automated alerts triggered when items dip below your defined safety threshold.",
  },
  {
    icon: <Building2 className="w-8 h-8 text-primary-500" />,
    title: "Multi-Branch",
    desc: "Manage multiple retail locations from one central dashboard with branch-specific reporting.",
  },
];
