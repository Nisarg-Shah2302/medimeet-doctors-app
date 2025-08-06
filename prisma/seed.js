const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clear existing data
  console.log('🧹 Clearing existing data...');
  await prisma.payout.deleteMany();
  await prisma.creditTransaction.deleteMany();
  await prisma.appointment.deleteMany();
  await prisma.availability.deleteMany();
  await prisma.user.deleteMany();

  // Create Admin User
  console.log('👑 Creating admin user...');
  const admin = await prisma.user.create({
    data: {
      clerkUserId: 'admin_clerk_id',
      email: 'admin@doctorsapp.com',
      name: 'System Administrator',
      role: 'ADMIN',
      credits: 0,
    },
  });

  // Create Doctor Users
  console.log('👨‍⚕️ Creating doctors...');
  const doctors = await Promise.all([
    prisma.user.create({
      data: {
        clerkUserId: 'dr_smith_clerk_id',
        email: 'dr.smith@doctorsapp.com',
        name: 'Dr. John Smith',
        role: 'DOCTOR',
        specialty: 'Cardiology',
        experience: 15,
        credentialUrl: 'https://example.com/credentials/dr-smith.pdf',
        description: 'Experienced cardiologist with 15 years of practice. Specializes in heart disease prevention and treatment.',
        verificationStatus: 'VERIFIED',
        credits: 25,
      },
    }),
    prisma.user.create({
      data: {
        clerkUserId: 'dr_johnson_clerk_id',
        email: 'dr.johnson@doctorsapp.com',
        name: 'Dr. Sarah Johnson',
        role: 'DOCTOR',
        specialty: 'Dermatology',
        experience: 10,
        credentialUrl: 'https://example.com/credentials/dr-johnson.pdf',
        description: 'Board-certified dermatologist focusing on skin health and cosmetic procedures.',
        verificationStatus: 'VERIFIED',
        credits: 18,
      },
    }),
    prisma.user.create({
      data: {
        clerkUserId: 'dr_garcia_clerk_id',
        email: 'dr.garcia@doctorsapp.com',
        name: 'Dr. Maria Garcia',
        role: 'DOCTOR',
        specialty: 'Pediatrics',
        experience: 8,
        credentialUrl: 'https://example.com/credentials/dr-garcia.pdf',
        description: 'Pediatrician dedicated to providing comprehensive healthcare for children and adolescents.',
        verificationStatus: 'VERIFIED',
        credits: 12,
      },
    }),
    prisma.user.create({
      data: {
        clerkUserId: 'dr_pending_clerk_id',
        email: 'dr.pending@doctorsapp.com',
        name: 'Dr. Michael Brown',
        role: 'DOCTOR',
        specialty: 'Orthopedics',
        experience: 5,
        credentialUrl: 'https://example.com/credentials/dr-brown.pdf',
        description: 'Orthopedic surgeon specializing in sports medicine and joint replacement.',
        verificationStatus: 'PENDING',
        credits: 0,
      },
    }),
  ]);

  // Create Patient Users
  console.log('🤒 Creating patients...');
  const patients = await Promise.all([
    prisma.user.create({
      data: {
        clerkUserId: 'patient_alice_clerk_id',
        email: 'alice.wilson@email.com',
        name: 'Alice Wilson',
        role: 'PATIENT',
        credits: 8,
      },
    }),
    prisma.user.create({
      data: {
        clerkUserId: 'patient_bob_clerk_id',
        email: 'bob.miller@email.com',
        name: 'Bob Miller',
        role: 'PATIENT',
        credits: 4,
      },
    }),
    prisma.user.create({
      data: {
        clerkUserId: 'patient_carol_clerk_id',
        email: 'carol.davis@email.com',
        name: 'Carol Davis',
        role: 'PATIENT',
        credits: 12,
      },
    }),
    prisma.user.create({
      data: {
        clerkUserId: 'patient_david_clerk_id',
        email: 'david.brown@email.com',
        name: 'David Brown',
        role: 'PATIENT',
        credits: 2,
      },
    }),
    prisma.user.create({
      data: {
        clerkUserId: 'patient_emma_clerk_id',
        email: 'emma.taylor@email.com',
        name: 'Emma Taylor',
        role: 'PATIENT',
        credits: 15,
      },
    }),
  ]);

  // Create Availability Slots for Doctors
  console.log('📅 Creating doctor availability slots...');
  const today = new Date();
  const availabilities = [];

  for (const doctor of doctors.slice(0, 3)) { // Only for verified doctors
    for (let day = 0; day < 30; day++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + day);
      
      // Create morning slots (9 AM - 12 PM)
      for (let hour = 9; hour < 12; hour++) {
        const startTime = new Date(currentDate);
        startTime.setHours(hour, 0, 0, 0);
        const endTime = new Date(currentDate);
        endTime.setHours(hour + 1, 0, 0, 0);

        availabilities.push({
          doctorId: doctor.id,
          startTime,
          endTime,
          status: Math.random() > 0.3 ? 'AVAILABLE' : 'BOOKED',
        });
      }

      // Create afternoon slots (2 PM - 6 PM)
      for (let hour = 14; hour < 18; hour++) {
        const startTime = new Date(currentDate);
        startTime.setHours(hour, 0, 0, 0);
        const endTime = new Date(currentDate);
        endTime.setHours(hour + 1, 0, 0, 0);

        availabilities.push({
          doctorId: doctor.id,
          startTime,
          endTime,
          status: Math.random() > 0.4 ? 'AVAILABLE' : 'BOOKED',
        });
      }
    }
  }

  await prisma.availability.createMany({
    data: availabilities,
  });

  // Create Appointments
  console.log('📋 Creating appointments...');
  const appointmentStatuses = ['SCHEDULED', 'COMPLETED', 'CANCELLED'];
  const appointments = [];

  for (let i = 0; i < 15; i++) {
    const doctor = doctors[Math.floor(Math.random() * 3)]; // Only verified doctors
    const patient = patients[Math.floor(Math.random() * patients.length)];
    const appointmentDate = new Date(today);
    appointmentDate.setDate(today.getDate() + Math.floor(Math.random() * 30) - 15); // Past and future appointments
    
    const startTime = new Date(appointmentDate);
    startTime.setHours(9 + Math.floor(Math.random() * 8), 0, 0, 0);
    const endTime = new Date(startTime);
    endTime.setHours(startTime.getHours() + 1);

    appointments.push({
      patientId: patient.id,
      doctorId: doctor.id,
      startTime,
      endTime,
      status: appointmentStatuses[Math.floor(Math.random() * appointmentStatuses.length)],
      patientDescription: `Patient consultation for ${doctor.specialty.toLowerCase()} related concerns.`,
      notes: Math.random() > 0.5 ? 'Patient responded well to treatment recommendations.' : null,
      videoSessionId: `session_${Date.now()}_${i}`,
    });
  }

  await prisma.appointment.createMany({
    data: appointments,
  });

  // Create Credit Transactions
  console.log('💳 Creating credit transactions...');
  const transactionTypes = ['CREDIT_PURCHASE', 'APPOINTMENT_DEDUCTION', 'ADMIN_ADJUSTMENT'];
  const transactions = [];

  // Create transactions for patients
  for (const patient of patients) {
    // Initial credit purchase
    transactions.push({
      userId: patient.id,
      amount: 10,
      type: 'CREDIT_PURCHASE',
      packageId: 'standard',
    });

    // Some appointment deductions
    for (let i = 0; i < Math.floor(Math.random() * 5) + 1; i++) {
      transactions.push({
        userId: patient.id,
        amount: -2,
        type: 'APPOINTMENT_DEDUCTION',
        packageId: null,
      });
    }
  }

  // Create transactions for doctors (credits earned)
  for (const doctor of doctors.slice(0, 3)) {
    for (let i = 0; i < Math.floor(Math.random() * 10) + 5; i++) {
      transactions.push({
        userId: doctor.id,
        amount: 2,
        type: 'APPOINTMENT_DEDUCTION',
        packageId: null,
      });
    }
  }

  await prisma.creditTransaction.createMany({
    data: transactions,
  });

  // Create Payouts
  console.log('💰 Creating payouts...');
  const payouts = [];

  for (const doctor of doctors.slice(0, 2)) { // Only for first 2 doctors
    payouts.push({
      doctorId: doctor.id,
      amount: doctor.credits * 10, // $10 per credit
      credits: doctor.credits,
      platformFee: doctor.credits * 2, // $2 platform fee per credit
      netAmount: doctor.credits * 8, // $8 to doctor per credit
      paypalEmail: doctor.email,
      status: Math.random() > 0.5 ? 'PROCESSED' : 'PROCESSING',
      processedAt: Math.random() > 0.5 ? new Date() : null,
      processedBy: Math.random() > 0.5 ? admin.id : null,
    });
  }

  await prisma.payout.createMany({
    data: payouts,
  });

  console.log('✅ Database seeding completed successfully!');
  console.log('\n📊 Summary:');
  console.log(`- ${1} Admin created`);
  console.log(`- ${doctors.length} Doctors created (${doctors.filter(d => d.verificationStatus === 'VERIFIED').length} verified)`);
  console.log(`- ${patients.length} Patients created`);
  console.log(`- ${availabilities.length} Availability slots created`);
  console.log(`- ${appointments.length} Appointments created`);
  console.log(`- ${transactions.length} Credit transactions created`);
  console.log(`- ${payouts.length} Payouts created`);
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 