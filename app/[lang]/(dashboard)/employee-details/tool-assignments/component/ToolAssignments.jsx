"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BasicTableLayout from "@/components/table/basic-table-layout";
import columns from "../config/columns"; 
import { useEmploy } from "@/domains/employ/hook/useEmploy";

const ToolAssignments = () => { 
  const { actions, employState } = useEmploy(); // projectState.data will have projects
  const tool_distributions = employState.data[0]?.tool_distributions || [];

  return ( 
    <Card className="w-full">
      <CardHeader className="border-none mb-0">
        <CardTitle className="text-lg font-semibold text-default-800 tracking-tight">
          Assigned Tools
        </CardTitle>
      </CardHeader>

      <CardContent className="px-6 pb-6">
        <BasicTableLayout 
                columns={columns(actions)}
                state={{data: tool_distributions}}
            /> 
      </CardContent>
    </Card>  
  );
};

export default ToolAssignments;