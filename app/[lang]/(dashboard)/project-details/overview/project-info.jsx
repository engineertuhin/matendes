"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Building2, ClipBoard, Calendar, CalenderCheck, ChartBar, Flag } from "@/components/svg"; 
import { useProject } from "@/domains/project/hook/useProject";

const ProjectInfo = () => {
  const { projectState, actions } = useProject();
  const project = projectState.data?.[0]; // Assuming you want the first project

  // Optionally, load projects on mount
  // React.useEffect(() => {
  //   actions.getProject();
  // }, []);

  if (!project) {
    return (
      <Card>
        <CardContent className="p-4">No project info found</CardContent>
      </Card>
    );
  }

 const projectInfo = [
  { icon: ClipBoard, label: "Project Name", value: project?.name || "N/A" },
  { icon: Flag, label: "Status", value: project?.status || "N/A" },
  { icon: ChartBar, label: "Total Earning", value: project?.total_earning || "€0,00" }, // optional
  { icon: ChartBar, label: "Total Expense", value: project?.total_expense || "€0,00" }, // optional
  { icon: Calendar, label: "Start Date", value: project?.start_date || "N/A" },
  { icon: CalenderCheck, label: "End Date", value: project?.end_date || "N/A" },
  { icon: Building2, label: "Client", value: project?.client?.name || "N/A" },
  { icon: User, label: "Responsible", value: project?.employees?.[0]?.first_name || "N/A" }, 
  { icon: ChartBar, label: "Balance", value: project?.balance || "€0,00" },
];


  return (
    <Card className="w-full">
      <CardHeader className="border-none mb-0">
        <CardTitle className="text-lg font-semibold text-default-800 tracking-tight">
          Project Details
        </CardTitle>
      </CardHeader>

      <CardContent className="px-6 pb-6">
        <p className="text-sm text-default-600 leading-relaxed mb-6">
          Overview of the project status, client information, financial summary, and schedule.
        </p>

        {/* Two-column grid layout */}
        <div className="grid sm:grid-cols-2 gap-x-6 gap-y-4">
          {projectInfo.map((item, index) => (
            <div
              key={`project-info-${index}`}
              className="flex items-start gap-2 border-b border-default-200/40 pb-3"
            >
              <div className="flex items-center gap-2 min-w-[140px]">
                <item.icon className="w-4 h-4 text-primary shrink-0" />
                <span className="text-sm font-medium text-default-800">{item.label}:</span>
              </div>
              <div className="text-sm text-default-700">{item.value}</div>
            </div>
          ))}
        </div>

        <div className="mt-8">
          <h3 className="text-base font-semibold text-default-800 mb-4">Notes</h3>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-default-50/60 rounded-xl p-4 border border-default-100">
              <p className="text-sm font-medium text-default-800 mb-1">Description</p>
              <p className="text-sm text-default-700 leading-relaxed">{project?.description || "No description"}</p>
            </div>
            <div className="bg-default-50/60 rounded-xl p-4 border border-default-100">
              <p className="text-sm font-medium text-default-800 mb-1">Observations</p>
              <p className="text-sm text-default-700 leading-relaxed">{project?.observation || "No observations"}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProjectInfo;
