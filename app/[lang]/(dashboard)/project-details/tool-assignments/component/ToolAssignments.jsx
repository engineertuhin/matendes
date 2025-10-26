"use client";

import PageLayout from "@/components/page-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BasicTableLayout from "@/components/table/basic-table-layout"; 
import columns from "../config/columns"; 
import { useToolDistribution } from "@/domains/inventory/tool-distribution/hook/useToolDistribution";


const ToolAssignments = () => {
const { actions, toolDistributionState } = useToolDistribution();


const projectToolAssignments = (toolDistributionState.data || []).flatMap(distribution =>
  (distribution.assign_tools || []).map(tool => ({
    id: distribution.id,
    employee: distribution.employee?.name || "—",
    tool: tool.tool_name || "—",
    quantity: tool.quantity || "—",
    assign_date: distribution.distribution_date || "—",
    return_date: distribution.return_date || distribution.expected_return_date || "—",
    status: distribution.status || "—",
    project_name: distribution.project?.name || "—",
  }))
);



  return ( 
    <Card className="w-full">
      <CardHeader className="border-none mb-0">
        <CardTitle className="text-lg font-semibold text-default-800 tracking-tight">
          Tool Assignments
        </CardTitle>
      </CardHeader>

      <CardContent className="px-6 pb-6">
        <BasicTableLayout 
                columns={columns(actions)}
                 state={{ ...toolDistributionState, data: projectToolAssignments }}
            /> 
      </CardContent>
    </Card>  
  );
};

export default ToolAssignments;