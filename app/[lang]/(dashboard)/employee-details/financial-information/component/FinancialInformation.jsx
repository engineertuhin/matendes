"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BasicTableLayout from "@/components/table/basic-table-layout";
import columns from "../config/columns"; 
import { useAppSelector } from "@/hooks/use-redux";

const FinancialInformation = () => { 
  // Assuming you store the currently viewed employee in Redux
  const employeeData = useAppSelector((state) => state.employ.currentEmployee);

  // Financial records for this specific employee
  const financialInfo = employeeData?.financeRecordDetail || [];

  return (
    <Card className="w-full">
      <CardHeader className="border-none mb-0">
        <CardTitle className="text-lg font-semibold text-default-800 tracking-tight">
          Financial Information
        </CardTitle>
      </CardHeader>

      <CardContent className="px-6 pb-6">
        <BasicTableLayout columns={columns()} state={{ data: financialInfo }} />
      </CardContent>
    </Card>
  );
};

export default FinancialInformation;
