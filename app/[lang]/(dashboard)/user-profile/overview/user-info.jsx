"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  User,
  Phone,
  Location,
  Calender,
  CalenderCheck,
  Mail,
} from "@/components/svg";
import { useAppSelector } from "@/hooks/use-redux";

const UserInfo = () => {
  const { profile } = useAppSelector((state) => state.profileData);

  if (!profile?.user) {
    return (
      <Card>
        <CardContent className="p-4">No user info found</CardContent>
      </Card>
    );
  }

  const { user } = profile;
  const { employee, company } = user;

  const userInfo = [
    {
      icon: User,
      label: "Full Name",
      value: employee
        ? `${employee.first_name || ""} ${employee.last_name || ""}`.trim() || "N/A"
        : company
        ? company.name || "N/A"
        : "N/A",
    },
    {
      icon: Phone,
      label: "Mobile",
      value: employee?.primary_phone || company?.phone || "N/A",
    },
    {
      icon: Mail,
      label: "Work Email",
      value: employee?.work_email || company?.email || "N/A",
    },
    {
      icon: Location,
      label: "Branch",
      value: employee?.branch_id ? employee.branch_id : "N/A", // if you want, map branch name later
    },
    {
      icon: CalenderCheck,
      label: "Joining Date",
      value: employee?.hire_date || "N/A",
    },
    {
      icon: Calender,
      label: "Probation End Date",
      value: employee?.probation_end_date || "N/A",
    },
  ];

  return (
    <Card>
      <CardHeader className="border-none mb-0">
        <CardTitle className="text-lg font-medium text-default-800">
          Information
        </CardTitle>
      </CardHeader>
      <CardContent className="px-4">
        <ul className="space-y-4">
          {userInfo.map((item, index) => (
            <li key={`user-info-${index}`} className="flex items-center">
              <div className="flex-none 2xl:w-56 flex items-center gap-1.5">
                <span>
                  <item.icon className="w-4 h-4 text-primary" />
                </span>
                <span className="text-sm font-medium text-default-800">
                  {item.label}:
                </span>
              </div>
              <div className="flex-1 text-sm text-default-700">{item.value}</div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default UserInfo;
