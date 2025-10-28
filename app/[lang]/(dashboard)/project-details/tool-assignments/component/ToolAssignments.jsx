"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BasicTableLayout from "@/components/table/basic-table-layout"; 
import columns from "../config/columns"; 
import { useToolDistribution } from "@/domains/inventory/tool-distribution/hook/useToolDistribution";
import { useAppSelector } from "@/hooks/use-redux";


const ToolAssignments = () => {
const { actions, toolDistributionState } = useToolDistribution();
  const projectData = useAppSelector((state) => state.project.projectData);
  let project = projectData.project;



const projectToolAssignments = project?.tool_distribution_items?.map((item) => ({
    id: item.id,
    employee: item.tool_distribution?.employee?.name || "—",
    tool: item.tool_name || "—",
    quantity: item.quantity || "—",
    assign_date: item.tool_distribution?.distribution_date || "—",
    return_date:
        item.tool_distribution?.return_date ||
        item.tool_distribution?.expected_return_date ||
        "—",
    status: item.status || "—",
    project_name: item.tool_distribution?.project?.name || "—",
}));



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
        
                  state={{ data: projectToolAssignments }}
              />
          </CardContent>
      </Card>
  );
};

export default ToolAssignments;