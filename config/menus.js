import {
    LayoutDashboard,
    BarChart2,
    Building2,
    GitBranch,
    Building,
    Briefcase,
    Users,
    UserCircle,
    QrCode,
    ScanLine,
    Settings,
    Shield,
    Banknote,
} from "lucide-react";

export const menusConfig = {
    mainNav: [
        {
            title: "Dashboard",
            icon: LayoutDashboard,
            child: [
                {
                    title: "Analytics",
                    href: "/dashboard",
                    icon: BarChart2,
                    permission: "view-statistics",
                },
            ],
        },
        {
            title: "Organization",
            icon: Building2,
            child: [
                {
                    title: "Company list",
                    href: "/company",
                    icon: Building2,
                    permission: "view-company",
                },
                {
                    title: "Branch list",
                    href: "/branch",
                    icon: GitBranch,
                    permission: "view-branch",
                },
                {
                    title: "Department list",
                    href: "/department",
                    icon: Building,
                    permission: "view-department",
                },
                {
                    title: "Job Position list",
                    href: "/job-position",
                    icon: Briefcase,
                    permission: "view-job-position",
                },
            ],
        },
        {
            title: "Employees",
            icon: Users,
            child: [
                {
                    title: "Employee list",
                    href: "/employ",
                    icon: UserCircle,
                    permission: "view-employee",
                },
                {
                    title: "Generate QR Code",
                    href: "/generate-qr",
                    icon: QrCode,
                    permission: "generate-qr",
                },
                {
                    title: "QR Attendance",
                    href: "/attendance/qr-attendance",
                    icon: ScanLine,
                    permission: "view-attendance",
                },
                {
                    title: "Salary Generate",
                    href: "/salary/generate",
                    icon: Banknote,
                    permission: "generate_salary",
                },
            ],
        },
        {
            title: "Settings",
            icon: Settings,
            child: [
                {
                    title: "Role & Permissions",
                    href: "/role",
                    icon: Users,
                    permission: "manage-settings",
                },
            ],
        },
    ],
    sidebarNav: {
        modern: [
            {
                title: "Dashboard",
                icon: LayoutDashboard,
                child: [
                    {
                        title: "Analytics",
                        href: "/dashboard",
                        icon: BarChart2,
                        permission: "view-statistics",
                    },
                ],
            },
            {
                title: "Organization",
                icon: Building2,
                child: [
                    {
                        title: "Company list",
                        href: "/company",
                        icon: Building2,
                        permission: "view-company",
                    },
                    {
                        title: "Branch list",
                        href: "/branch",
                        icon: GitBranch,
                        permission: "view-branch",
                    },
                    {
                        title: "Department list",
                        href: "/department",
                        icon: Building,
                        permission: "view-department",
                    },
                    {
                        title: "Job Position list",
                        href: "/job-position",
                        icon: Briefcase,
                        permission: "view-job-position",
                    },
                ],
            },
            {
                title: "Employees",
                icon: Users,
                child: [
                    {
                        title: "Employee list",
                        href: "/employ",
                        icon: UserCircle,
                        permission: "view-employee",
                    },
                    {
                        title: "Generate QR Code",
                        href: "/generate-qr",
                        icon: QrCode,
                        permission: "generate-qr",
                    },
                    {
                        title: "QR Attendance",
                        href: "/attendance/qr-attendance",
                        icon: ScanLine,
                        permission: "view-attendance",
                    },
                    {
                        title: "Salary Generate",
                        href: "/salary/generate",
                        icon: Banknote,
                        permission: "generate_salary",
                    },
                ],
            },
            {
                title: "Settings",
                icon: Settings,
                child: [
                    {
                        title: "Role & Permissions",
                        href: "/role",
                        icon: Users,
                        permission: "manage-settings",
                    },
                ],
            },
        ],
        classic: [
            {
                isHeader: true,
                title: "menu",
            },
            {
                title: "Dashboard",
                icon: LayoutDashboard,
                href: "/dashboard",
                isOpen: false,
                isHide: false,
                child: [
                    {
                        title: "Analytics",
                        href: "/dashboard",
                        icon: BarChart2,
                        permission: "view-statistics",
                    },
                ],
            },
            {
                title: "Organization",
                icon: Building2,
                href: "/dashboard",
                isOpen: false,
                isHide: false,
                child: [
                    {
                        title: "Company list",
                        href: "/company",
                        icon: Building2,
                        permission: "view-company",
                    },
                    {
                        title: "Branch list",
                        href: "/branch",
                        icon: GitBranch,
                        permission: "view-branch",
                    },
                    {
                        title: "Department list",
                        href: "/department",
                        icon: Building,
                        permission: "view-department",
                    },
                    {
                        title: "Job Position list",
                        href: "/job-position",
                        icon: Briefcase,
                        permission: "view-job-position",
                    },
                ],
            },
            {
                title: "Employees",
                icon: Users,
                isOpen: false,
                isHide: false,
                child: [
                    {
                        title: "Employee list",
                        href: "/employ",
                        icon: UserCircle,
                        permission: "view-employee",
                    },
                    {
                        title: "Generate QR Code",
                        href: "/generate-qr",
                        icon: QrCode,
                        permission: "generate-qr",
                    },
                    {
                        title: "QR Attendance",
                        href: "/attendance/qr-attendance",
                        icon: ScanLine,
                        permission: "view-attendance",
                    },
                    {
                        title: "Salary Generate",
                        href: "/salary/generate",
                        icon: Banknote,
                        permission: "generate_salary",
                    },
                ],
            },
            {
                title: "Settings",
                icon: Settings,
                href: "#",
                child: [
                    {
                        title: "Role & Permissions",
                        href: "/role",
                        icon: Users,
                        permission: "manage-settings",
                    },
                ],
            },
        ],
    },
};
