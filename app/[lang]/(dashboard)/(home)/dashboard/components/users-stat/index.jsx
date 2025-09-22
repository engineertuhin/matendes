"use client"
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Icon } from "@iconify/react";
import UsersDataChart from "./users-data-chart";
import UsersDataTable from "./users-data-table";

const UsersStat = () => {
  const employees = [
    { id: 1, department: "HR", count: "12" },
    { id: 2, department: "Finance", count: "20" },
    { id: 3, department: "IT", count: "30" },
    { id: 4, department: "Marketing", count: "15" },
    { id: 5, department: "Operations", count: "18" },
  ];
  const totalEmployees = employees.reduce((acc, emp) => acc + Number(emp.count), 0);
  return (
    <Card>
      <CardHeader className="border-none pb-0 mb-5">
        <div className="flex items-center gap-1">
          <div className="flex-1">
            <div className="text-xl font-semibold text-default-900">Employees</div>
            <span className="text-xs text-default-600 ml-1">Total Employees by Department</span>
          </div>
          <div className="flex-none flex items-center gap-1">
            <span className="text-4xl font-semibold text-primary">{totalEmployees}</span>
            <span className="text-2xl text-success">
              <Icon icon="heroicons:arrow-trending-up-16-solid" />
            </span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-5 pb-0">
        <p className="text-xs font-medium text-default-800">Employees Distribution</p>
        <UsersDataChart />
        <UsersDataTable users={employees} />
      </CardContent>
    </Card>
  );
};

export default UsersStat;