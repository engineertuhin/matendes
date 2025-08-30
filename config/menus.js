import {
    LayoutDashboard,
    BarChart2,
    Building2,
    GitBranch,
    Building,
    Briefcase,
    Users,
    UserCircle,
    ScanFace,
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
                },
                {
                    title: "Branch list",
                    href: "/branch",
                    icon: GitBranch,
                },
                {
                    title: "Department list",
                    href: "/department",
                    icon: Building,
                },
                {
                    title: "Job Position list",
                    href: "/job-position",
                    icon: Briefcase,
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
                },
                {
                    title: "Face Attendance",
                    href: "/attendance/face-attendance",
                    icon: ScanFace,
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
                    },
                    {
                        title: "Branch list",
                        href: "/branch",
                        icon: GitBranch,
                    },
                    {
                        title: "Department list",
                        href: "/department",
                        icon: Building,
                    },
                    {
                        title: "Job Position list",
                        href: "/job-position",
                        icon: Briefcase,
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
                    },
                    {
                        title: "Face Attendance",
                        href: "/attendance/face-attendance",
                        icon: ScanFace,
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
                    },
                    {
                        title: "Branch list",
                        href: "/branch",
                        icon: GitBranch,
                    },
                    {
                        title: "Department list",
                        href: "/department",
                        icon: Building,
                    },
                    {
                        title: "Job Position list",
                        href: "/job-position",
                        icon: Briefcase,
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
                    },
                    {
                        title: "Face Attendance",
                        href: "/attendance/face-attendance",
                        icon: ScanFace,
                    },
                ],
            },
        ],
    },
};
