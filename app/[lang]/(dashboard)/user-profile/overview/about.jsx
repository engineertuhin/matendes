"use client";

import { UserSign, Phone, Mail2 } from "@/components/svg";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@iconify/react";
import { useAppSelector } from "@/hooks/use-redux";

const About = () => {
  // Get profile from Redux
  const profile = useAppSelector((state) => state.profileData.profile);

  // Bio & Preferences
  const bio = profile?.system_info?.bio || "No bio available.";
  const preferences = profile?.system_info?.preferences || "No preferences set.";

  // About items
  const aboutItems = [
    {
      title: "Designation",
      position: profile?.job_position?.title || "N/A",
      icon: UserSign,
    },
    {
      title: "Phone",
      position: profile?.contact_info?.primary_phone || "N/A",
      icon: Phone,
    },
    {
      title: "Email",
      position: profile?.contact_info?.work_email || "N/A",
      icon: Mail2,
    },
  ];

  return (
    <Card>
      <CardHeader className="flex-row justify-between items-center mb-3 border-none">
        <CardTitle className="text-lg font-medium text-default-800">About</CardTitle>
        <Button
          size="icon"
          className="w-6 h-6 bg-default-100 dark:bg-default-50 text-default-500 hover:bg-default-100"
        >
          <Icon icon="heroicons:ellipsis-vertical" className="w-4 h-4" />
        </Button>
      </CardHeader>
      <CardContent>
        {/* Bio */}
        <div className="text-sm text-default-600 mb-3">{bio}</div>

        {/* Preferences */}
        <div className="text-sm text-default-600 mb-6">
          <strong>Preferences:</strong> {preferences}
        </div>

        {/* Designation / Phone / Email */}
        <div className="flex flex-wrap items-center gap-6 2xl:gap-16">
          {aboutItems.map((item, index) => (
            <div key={`about-${index}`} className="flex items-center gap-2">
              <div className="bg-default-100 dark:bg-default-50 text-primary h-10 w-10 grid place-content-center rounded">
                <item.icon className="w-6 h-6" />
              </div>
              <div>
                <div className="text-sm font-medium text-default-800">{item.title}</div>
                <div className="text-xs font-medium text-default-600">{item.position}</div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default About;
