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
  const {profile}=useAppSelector((state)=> state.profileData); 
  console.log(profile);
  
  if (!profile) {
    return (
      <Card>
        <CardContent className="p-4">No user info found</CardContent>
      </Card>
    );
  }

  const userInfo = [
    {
      icon: User,
      label: "Full Name",
      value: profile?.personal_info?.display_name || "N/A",
    },
    {
      icon: Phone,
      label: "Mobile",
      value: profile?.contact_info?.primary_phone || "N/A",
    },
    {
      icon: Mail,
      label: "Work Email",
      value: profile?.contact_info?.work_email || "N/A",
    },
    {
      icon: Location,
      label: "Branch",
      value: profile?.branch?.name || "N/A",
    },
    {
      icon: CalenderCheck,
      label: "Joining Date",
      value: profile?.employment_info?.hire_date || "N/A",
    },
    {
      icon: Calender,
      label: "Probation End Date",
      value: profile?.employment_info?.probation_end_date || "N/A",
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
        {/* <p className="text-sm text-default-600">
          {profile?.system_info?.bio ||
            "No bio available. Please update your profile."}
        </p> */}

        {/* Info List */}
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
              <div className="flex-1 text-sm text-default-700">
                {item.value}
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default UserInfo;
