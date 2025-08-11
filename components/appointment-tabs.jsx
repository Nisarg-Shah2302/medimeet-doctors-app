"use client";

import { useState, useEffect } from "react";
import { AppointmentCard } from "@/components/appointment-card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Calendar } from "lucide-react";
import useFetch from "@/hooks/use-fetch";

export function AppointmentTabs({ 
  userRole, 
  // fetchFunction, 
  appointments,
  appointmentCounts,
  loading,
  title = "Your Appointments" 
}) {
  const [activeTab, setActiveTab] = useState("");
  
  // Use external data if provided (for server components), otherwise fetch data
  // const shouldFetchData = !externalAppointments || !externalAppointmentCounts;
  
  // const {
  //   loading,
  //   data,
  //   fn: fetchAppointments,
  // } = useFetch(fetchFunction, !shouldFetchData);

  // useEffect(() => {
  //   if (shouldFetchData && fetchFunction) {
  //     fetchAppointments();
  //   }
  // }, [shouldFetchData, fetchFunction]);

  // Use external data or fetched data
  // const appointments = externalAppointments || data?.appointments || [];
  // const appointmentCounts = externalAppointmentCounts || data?.appointmentCounts || [];

  useEffect(() => {
    if (appointmentCounts?.length > 0) {
      setActiveTab(appointmentCounts[0].status);
    }
  }, [appointmentCounts]);

  // Filter appointments by active tab
  const filteredAppointments = appointments.filter(
    (appointment) => appointment.status === activeTab
  );

  const renderAppointmentsTabs = () => {
    if (!appointmentCounts?.length) return null;

    return (
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="w-full"
      >
        <TabsList className="w-full justify-start overflow-x-auto">
          {appointmentCounts.map((appointmentCount) => (
            <TabsTrigger
              key={appointmentCount.status}
              value={appointmentCount.status}
              disabled={appointmentCount._count === 0}
              className={appointmentCount._count === 0 ? "opacity-50 cursor-not-allowed" : ""}
            >
              <div className="flex gap-2">
                <div className="opacity-80">
                  {appointmentCount.status}
                </div>
              </div>
              {appointmentCount?._count > 0 && (
                <div className="ml-2 bg-emerald-900/30 text-emerald-400 text-xs px-2 py-1 rounded">
                  {appointmentCount._count}
                </div>
              )}
            </TabsTrigger>
          ))}
        </TabsList>

        {appointmentCounts.map((appointmentCount) => (
          <TabsContent key={appointmentCount.status} value={appointmentCount.status} className="pt-4">
            {filteredAppointments.length > 0 ? (
              <div className="space-y-4">
                {filteredAppointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                    userRole={userRole}
                    appointmentCounts={appointmentCounts}
                    // refetchAppointments={fetchAppointments}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
                <h3 className="text-xl font-medium text-white mb-2">
                  No {appointmentCount.status.toLowerCase()} appointments
                </h3>
                <p className="text-muted-foreground">
                  {userRole === "DOCTOR" 
                    ? `You don't have any ${appointmentCount.status.toLowerCase()} appointments yet.`
                    : `You don't have any ${appointmentCount.status.toLowerCase()} appointments yet.`
                  }
                </p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    );
  };

  // For client components with data fetching (like doctor dashboard)
  // if (shouldFetchData) {
    return (
      <div>
        {loading ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Loading appointments...</p>
          </div>
        ) : appointments.length > 0 ? (
          <div className="space-y-4">
            {renderAppointmentsTabs()}
          </div>
        ) : (
          <div className="text-center py-8">
            <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
            <h3 className="text-xl font-medium text-white mb-2">
              No appointments yet
            </h3>
            <p className="text-muted-foreground">
              {userRole === "DOCTOR"
                ? "You don't have any appointments yet. Make sure you've set your availability to allow patients to book."
                : "You don't have any appointments scheduled yet. Browse our doctors and book your first consultation."
              }
            </p>
          </div>
        )}
      </div>
    );
  // }

  // For server components with pre-fetched data (like patient appointments)
  // return renderAppointmentsTabs();
} 