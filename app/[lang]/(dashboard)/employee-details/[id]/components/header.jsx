"use client";

import { Fragment } from "react";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Card, CardContent } from "@/components/ui/card";
import { Home } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { usePathname, useParams } from "next/navigation";

const Header = () => {
  const location = usePathname() ?? ""; // fallback empty string during SSR
  const { id } = useParams() ?? {};     // fallback empty object during SSR

  // Remove locale prefix if present
  const normalizedPath = location.replace(/^\/[a-z]{2}/, "");

  const navItems = [
    { title: "Employee Details", link: `/employee-details/${id}` },
    { title: "Project Activity", link: `/employee-details/${id}/project-activity` },
    { title: "Financial Information", link: `/employee-details/${id}/financial-information` },
    { title: "Assigned Tools", link: `/employee-details/${id}/tool-assignments` },
  ];

  // Render breadcrumbs + nav only if we have `id` to avoid SSR duplication
  if (!id) return null;

  return (
    <Fragment>
      {/* Top Breadcrumbs */}
      <Breadcrumbs className="mb-4">
        <BreadcrumbItem>
          <Home className="h-4 w-4" />
        </BreadcrumbItem>
        <BreadcrumbItem>Pages</BreadcrumbItem>
        <BreadcrumbItem>Employee</BreadcrumbItem>
        <BreadcrumbItem>Employee Details V2</BreadcrumbItem>
      </Breadcrumbs>

      {/* Navigation Tabs */}
      <Card className="mt-2 rounded-t-2xl">
        <CardContent className="p-0">
          <div className="flex flex-wrap justify-center gap-4 lg:gap-8 pt-7 lg:pt-5 pb-4 px-6">
            {navItems.map((item, index) => {
              const isActive =
                normalizedPath === item.link ||
                normalizedPath.startsWith(item.link + "/");

              return (
                <Link
                  key={index}
                  href={item.link}
                  className={cn(
                    "text-sm font-semibold text-default-500 hover:text-primary",
                    { "text-primary border-b-2 border-primary": isActive }
                  )}
                >
                  {item.title}
                </Link>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default Header;
