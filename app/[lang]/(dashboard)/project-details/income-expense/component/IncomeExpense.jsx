"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BasicTableLayout from "@/components/table/basic-table-layout";
import { useFinancialRecords } from "@/domains/finance/hook/useFinancialRecords";
import columns from "../config/columns"; 
import { useAppSelector } from "@/hooks/use-redux";

const IncomeExpense = () => {
  const { actions, financialState } = useFinancialRecords();
  
  // Get the current project from Redux (selected project)
  const project = useAppSelector(state => state.projectData.projectData);

  // Flatten and filter project-specific records
   const projectFinancialRecords = (financialState.data || []).map(record => {
  const detail = record.details?.[0] || {};
  return {
    id: record.id,
    payment_code: `FR-${record.id}`,
    project_name: record.project_id?.name || "—",
    payment_type: detail.rec_payment_type_id?.name || "—",
    transaction_type: record.financial_type === "income" ? "Income" : "Expense",
    date: record.receive_payment_date?.split(" ")[0] || "—",
    employee: detail.employee_id || "—",
    description: record.reference_remarks || "—",
    amount: record.total_amount || 0,
    belong_to: record.project_id?.name || "—",
  };
});

  const filteredState = {
    ...financialState,
    data: projectFinancialRecords,
  };

  return (
    <Card className="w-full">
      <CardHeader className="border-none mb-0">
        <CardTitle className="text-lg font-semibold text-default-800 tracking-tight">
          Income / Expense
        </CardTitle>
      </CardHeader>

      <CardContent className="px-6 pb-6">
        <BasicTableLayout
         columns={columns(actions)}
          state={{ ...financialState, data: projectFinancialRecords }}
        />
      </CardContent>
    </Card>
  );
};

export default IncomeExpense;
