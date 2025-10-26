"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BasicTableLayout from "@/components/table/basic-table-layout";
import columns from "../config/columns"; 
import { useEmploy } from "@/domains/employ/hook/useEmploy";

const ProjectActivity = () => { 
  const { actions, employState } = useEmploy(); // projectState.data will have projects
  const projectEmployees = employState.data[0]?.projectEmployees || [];

  return (
    <Card className="w-full">
      <CardHeader className="border-none mb-0">
        <CardTitle className="text-lg font-semibold text-default-800 tracking-tight">
          Project Activities
        </CardTitle>
      </CardHeader>

      <CardContent className="px-6 pb-6">
        <BasicTableLayout
          columns={columns(actions)}
          state={{ data: projectEmployees }}
        />
      </CardContent>
    </Card>
  );
};

export default ProjectActivity;
