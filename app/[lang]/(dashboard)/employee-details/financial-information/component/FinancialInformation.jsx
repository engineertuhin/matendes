"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BasicTableLayout from "@/components/table/basic-table-layout";
import columns from "../config/columns"; 
import { useEmploy } from "@/domains/employ/hook/useEmploy";

const FinancialInformation = () => { 
  const { actions, employState } = useEmploy(); // projectState.data will have projects
  const FinancialInfo = employState.data[0]?.financeRecordDetail || [];

  return (
    <Card className="w-full">
      <CardHeader className="border-none mb-0">
        <CardTitle className="text-lg font-semibold text-default-800 tracking-tight">
          Financial Information
        </CardTitle>
      </CardHeader>

      <CardContent className="px-6 pb-6">
        <BasicTableLayout columns={columns(actions)} state={{ data: FinancialInfo }} />
      </CardContent>
    </Card>
  );
};

export default FinancialInformation;
