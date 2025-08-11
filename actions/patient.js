import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

/**
 * Get all appointments for the authenticated patient
 */
export async function getPatientAppointments() {
  const { userId } = await auth();

  if (!userId) {
    throw new Error("Unauthorized");
  }

  try {
    const user = await db.user.findUnique({
      where: {
        clerkUserId: userId,
        role: "PATIENT",
      },
      select: {
        id: true,
      },
    });

    if (!user) {
      throw new Error("Patient not found");
    }
 
    const appointmentsWithCounts = await db.$transaction(async (tx) => {
      // GET ALL APPOINTMENTS
      const appointments = await tx.appointment.findMany({
        where: {
          patientId: user.id,
        },
        include: {
          doctor: {
              select: {
                id: true,
                name: true,
                specialty: true,
                imageUrl: true,
              },
            },
          },
        orderBy: {
          startTime: "asc",
        },
      });

      // GET APPOINTMENT COUNTS BASED ON STATUS FOR THE PATIENT
      const appointmentCounts = await tx.appointment.groupBy({
        by: ["status"],
        where: {
          patientId: user.id,
        },
        _count: true,
      });
      return { appointments, appointmentCounts };
    });

    return {
      appointments: appointmentsWithCounts.appointments,
      appointmentCounts: appointmentsWithCounts.appointmentCounts,
    };

    /**
     * ORIGINAL LOGIC START
    */
      // const appointments = await db.appointment.findMany({
      //   where: {
      //     patientId: user.id,
      //   },
      //   include: {
      //     doctor: {
      //       select: {
      //         id: true,
      //         name: true,
      //         specialty: true,
      //         imageUrl: true,
      //       },
      //     },
      //   },
      //   orderBy: {
      //     startTime: "asc",
      //   },
      // });
      // return { appointments };
    /**
     * ORIGINAL LOGIC END
    */
  } catch (error) {
    console.error("Failed to get patient appointments:", error);
    return { error: "Failed to fetch appointments" };
  }
}
