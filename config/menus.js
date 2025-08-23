import { DashBoard, Stacks, UserPlus, Graph } from "@/components/svg";

export const menusConfig = {
    mainNav: [
        {
            title: "Dashboard",
            icon: DashBoard,
            child: [
                {
                    title: "Analytics",
                    href: "/dashboard",
                    icon: Graph,
                },
            ],
        },
        {
            title: "Organization",
            icon: Stacks,
            child: [
                {
                    title: "Company list",
                    href: "/company",
                    icon: UserPlus,
                },
                {
                    title: "Branch list",
                    href: "/branch",
                    icon: UserPlus,
                },
                {
                    title: "Department list",
                    href: "/department",
                    icon: UserPlus,
                },
            ],
        },
    ],
    sidebarNav: {
        modern: [
            {
                title: "Dashboard",
                icon: DashBoard,
                child: [
                    {
                        title: "Analytics",
                        href: "/dashboard",
                        icon: Graph,
                    },
                ],
            },
            {
                title: "Organization",
                icon: Stacks,
                child: [
                    {
                        title: "Company list",
                        href: "/company",
                        icon: UserPlus,
                    },
                    {
                        title: "Branch list",
                        href: "/branch",
                        icon: UserPlus,
                    },
                    {
                        title: "Department list",
                        href: "/department",
                        icon: UserPlus,
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
                icon: DashBoard,
                href: "/dashboard",
                isOpen: false,
                isHide: false,
                child: [
                    {
                        title: "Analytics",
                        href: "/dashboard",
                        icon: Graph,
                    },
                ],
            },
            {
                title: "Organization",
                icon: Stacks,
                href: "/dashboard",
                isOpen: false,
                isHide: false,
                child: [
                    {
                        title: "Company list",
                        href: "/company",
                        icon: UserPlus,
                    },
                    {
                        title: "Branch list",
                        href: "/branch",
                        icon: UserPlus,
                    },
                    {
                        title: "Department list",
                        href: "/department",
                        icon: UserPlus,
                    },
                ],
            },
        ],
    },
};
