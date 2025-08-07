# 🩺 Doctors Appointment Platform - Full Stack Healthcare Solution

**A modern telemedicine platform connecting patients with verified doctors through seamless appointment booking and HD video consultations. Built with Next.js 15, PostgreSQL, Clerk Auth, and Vonage Video API.**

## 📋 **What This Project Does**

🏥 **Complete Healthcare Ecosystem**: Patients browse 15+ medical specialties, book appointments with verified doctors, and conduct secure video consultations from home.

🎯 **Core Features**: 
- **Patient Portal**: Profile management, doctor discovery, appointment booking, video calls
- **Doctor Dashboard**: Availability settings, patient management, earnings tracking, PayPal payouts  
- **Admin Panel**: Doctor verification, payout processing, platform analytics
- **Credit System**: Subscription-based consultation credits ($10 per consultation, $8 to doctor)

🛠 **Tech Stack**: Next.js 15 + App Router, PostgreSQL + Prisma ORM, Clerk Authentication, Vonage Video API, Tailwind CSS

🚀 **Perfect For**: Healthcare startups, telemedicine platforms, appointment booking systems, video consultation services, medical practice management

---

A comprehensive healthcare platform built with **Next.js 15**, **PostgreSQL**, **Prisma**, **Clerk Auth**, **Vonage Video API**, and **Tailwind CSS** that connects patients with verified doctors for seamless appointment booking and video consultations.

<img width="1470" alt="Screenshot 2025-05-27 at 1 18 06 PM" src="https://github.com/user-attachments/assets/a0d3d443-f5e1-433a-85a7-a76a3866858d" />

## 🌟 Key Features

### For Patients
- **🔐 Secure Authentication** - Clerk-powered sign up/sign in
- **👥 Profile Management** - Complete patient profiles with medical history
- **🔍 Doctor Discovery** - Browse doctors by specialty (15+ specialties available)
- **📅 Smart Booking** - Real-time availability checking and appointment scheduling
- **💳 Credit System** - Subscription-based credit packages for consultations
- **🎥 Video Consultations** - High-quality video calls via Vonage Video API
- **📋 Appointment History** - Track past and upcoming appointments
- **💬 Medical Notes** - Access doctor's notes and recommendations

### For Doctors
- **✅ Verification System** - Admin-verified doctor profiles
- **⏰ Availability Management** - Set custom availability schedules
- **👤 Professional Profiles** - Showcase specialty, experience, and credentials
- **📊 Earnings Dashboard** - Track consultation credits and request payouts
- **🎥 Video Consultation Tools** - Professional video calling interface
- **📝 Patient Management** - Add notes and manage patient consultations
- **💰 PayPal Integration** - Seamless payout system ($8 per consultation)

### For Administrators
- **🔍 Doctor Verification** - Review and approve doctor applications
- **💸 Payout Management** - Process doctor payout requests
- **📊 Platform Analytics** - Monitor platform usage and transactions
- **🛠 User Management** - Manage users, appointments, and system settings

## 🏗 Technical Architecture

### Frontend Stack
- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS 4.1.7 + Shadcn/ui components
- **State Management**: React 19 with Server Actions
- **Authentication**: Clerk Auth with role-based access
- **Video Calling**: Vonage Client SDK for video consultations
- **Date Handling**: date-fns
- **UI Components**: Radix UI primitives with custom styling

### Backend Stack
- **Runtime**: Node.js (v22+ required for WebAssembly support)
- **Database**: PostgreSQL with Prisma ORM
- **API**: Next.js Server Actions for type-safe backend operations
- **Video Service**: Vonage Video API for session management
- **File Storage**: Clerk for user avatars and file uploads
- **Payments**: Clerk Billing for subscription management

### Database Schema
```sql
- Users (patients, doctors, admins)
- Appointments (with video session data)
- Availability (doctor scheduling)
- CreditTransactions (billing history)
- Payouts (doctor earnings)
```

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js**: v22.0.0 or higher (required for Prisma WebAssembly)
- **PostgreSQL**: v12+ database
- **Clerk Account**: For authentication ([clerk.com](https://clerk.com))
- **Vonage Account**: For video calling ([vonage.com](https://vonage.com))

### 1. Clone and Install
```bash
git clone <repository-url>
cd doctors-appointment-platform
npm install
```

### 2. Environment Configuration
Create `.env.local` in the project root:

```env
# Database Configuration
DATABASE_URL="postgresql://username:password@localhost:5432/doctors_appointment_db"

# Clerk Authentication (get from clerk.com dashboard)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_test_your_clerk_key_here"
CLERK_SECRET_KEY="sk_test_your_clerk_secret_here"

# Vonage Video API (get from vonage.com dashboard)
NEXT_PUBLIC_VONAGE_APPLICATION_ID="your_vonage_application_id"
VONAGE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----
your_vonage_private_key_content_here
-----END PRIVATE KEY-----"

# Environment
NODE_ENV="development"
```

### 3. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Seed with sample data
npm run db:seed

# (Optional) Open Prisma Studio to view data
npx prisma studio
```

### 4. Authentication Setup
1. **Clerk Dashboard** ([dashboard.clerk.com](https://dashboard.clerk.com)):
   - Create new application
   - Configure authentication methods (email, social login)
   - Set up billing/subscriptions for credit system
   - Copy API keys to `.env.local`

### 5. Video API Setup
1. **Vonage Dashboard** ([dashboard.nexmo.com](https://dashboard.nexmo.com)):
   - Create Video API application
   - Generate private key (download full .pem file)
   - Copy Application ID and Private Key to `.env.local`

### 6. Start Development
```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 📱 Application Flow

### Patient Journey
1. **Sign Up/Sign In** → Clerk authentication
2. **Profile Setup** → Complete patient profile during onboarding
3. **Browse Doctors** → Filter by specialty, view profiles
4. **Book Appointment** → Select time slot, provide description
5. **Video Consultation** → Join video call at scheduled time
6. **Post-Consultation** → View notes, manage future appointments

### Doctor Journey
1. **Sign Up/Sign In** → Clerk authentication
2. **Profile Setup** → Submit credentials, experience, specialty
3. **Verification Wait** → Admin reviews and verifies profile
4. **Set Availability** → Configure available time slots
5. **Manage Appointments** → View bookings, conduct consultations
6. **Earnings & Payouts** → Track credits, request PayPal payouts

### Admin Journey
1. **Admin Dashboard** → Overview of pending actions
2. **Verify Doctors** → Review credentials, approve/reject
3. **Process Payouts** → Handle doctor payout requests
4. **Monitor Platform** → Track appointments, users, transactions

## 💰 Business Model

### Credit System
- **Each consultation costs**: 2 credits for patients
- **Each consultation earns**: 2 credits for doctors
- **Credit value**: $10 total ($2 platform fee + $8 to doctor)

### Subscription Plans (Clerk Billing)
- **Free Plan**: 2 credits (1 consultation)
- **Standard Plan**: 10 credits monthly ($50/month)
- **Premium Plan**: 24 credits monthly ($120/month)

### Revenue Distribution
- **Platform Fee**: $2 per consultation (20%)
- **Doctor Earnings**: $8 per consultation (80%)
- **Payout Method**: PayPal integration

## 🔧 Key Technologies Explained



### Video Integration
Vonage Video API provides:
- **Session Creation**: Server-side session generation
- **Token Generation**: Secure client tokens
- **WebRTC Streams**: High-quality video/audio
- **Recording Capability**: Optional session recording

### Authentication & Authorization
Clerk provides:
- **Multi-factor Auth**: Email, phone, social logins
- **Role-based Access**: Patient, Doctor, Admin roles
- **Subscription Billing**: Integrated payment processing
- **User Management**: Profile management and verification

## 📁 Project Structure

```
doctors-appointment-platform/
├── app/                          # Next.js App Router
│   ├── (auth)/                   # Authentication pages
│   │   ├── sign-in/             # Sign in page
│   │   └── sign-up/             # Sign up page
│   ├── (main)/                   # Main application
│   │   ├── admin/               # Admin dashboard
│   │   ├── appointments/        # Appointment management
│   │   ├── doctor/              # Doctor dashboard
│   │   ├── doctors/             # Doctor discovery
│   │   ├── onboarding/          # User onboarding
│   │   ├── pricing/             # Subscription plans
│   │   └── video-call/          # Video consultation
│   └── layout.js                # Root layout
├── actions/                      # Server Actions
│   ├── admin.js                 # Admin operations
│   ├── appointments.js          # Appointment booking
│   ├── credits.js               # Credit management
│   ├── doctor.js                # Doctor operations
│   └── payout.js                # Payout processing
├── components/                   # Reusable components
│   ├── ui/                      # Shadcn/ui components
│   ├── appointment-card.jsx     # Appointment display
│   ├── header.jsx               # Navigation header
│   └── pricing.jsx              # Pricing table
├── lib/                         # Utility libraries
│   ├── prisma.js                # Database client

│   ├── specialities.js          # Medical specialties
│   └── utils.js                 # General utilities
├── prisma/                      # Database
│   ├── schema.prisma            # Database schema
│   ├── seed.js                  # Sample data
│   └── migrations/              # Database migrations
└── public/                      # Static assets
```

## 🔐 Security Features

- **Role-based Access Control**: Strict role separation (Patient/Doctor/Admin)
- **Input Validation**: Zod schema validation on all forms
- **SQL Injection Protection**: Prisma ORM with parameterized queries
- **Authentication**: Clerk's enterprise-grade security
- **HTTPS Enforcement**: Secure communication for video calls
- **Data Encryption**: Encrypted sensitive data storage

## 🚀 Deployment

### Vercel Deployment (Recommended)
1. **Connect Repository**: Link GitHub repo to Vercel
2. **Environment Variables**: Add all `.env.local` variables
3. **Database**: Use Neon, Supabase, or any PostgreSQL provider
4. **Domain**: Configure custom domain if needed

### Environment Variables for Production
```env
DATABASE_URL="postgresql://..."
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_live_..."
CLERK_SECRET_KEY="sk_live_..."
NEXT_PUBLIC_VONAGE_APPLICATION_ID="..."
VONAGE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----..."
NODE_ENV="production"
```

## 🧪 Testing

### Run Database Seed
```bash
npm run db:seed
```

### Test Video Integration
1. Create two accounts (patient & doctor)
2. Book an appointment
3. Join video call from both sides
4. Verify audio/video functionality

### Test Payment Flow
1. Set up Clerk billing in dashboard
2. Subscribe to a plan as patient
3. Book consultation
4. Verify credit deduction

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/amazing-feature`
3. **Commit changes**: `git commit -m 'Add amazing feature'`
4. **Push to branch**: `git push origin feature/amazing-feature`
5. **Open Pull Request**

## 📞 Support

### Common Issues
- **Node.js Version**: Ensure v22+ for Prisma WebAssembly support
- **Database Connection**: Verify PostgreSQL is running and accessible
- **Clerk Setup**: Check API keys and authentication configuration
- **Vonage Integration**: Ensure private key is complete and properly formatted

### Getting Help
- **GitHub Issues**: Report bugs and request features
- **Documentation**: Check Clerk, Vonage, and Prisma docs
- **Community**: Join discussions in the issues section

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## �� Acknowledgments

- **Next.js Team** - For the amazing React framework
- **Clerk** - For authentication and billing solutions
- **Vonage** - For video communication infrastructure
- **Prisma** - For the excellent database toolkit
- **Tailwind CSS** - For the utility-first CSS framework
- **Shadcn/ui** - For beautiful, accessible UI components

---

**Built with ❤️ for the healthcare community** 🏥

## 🔗 Quick Links

- **Live Demo**: [Your deployment URL]
- **Documentation**: [Link to detailed docs]
- **API Reference**: [Link to API docs]
- **Support**: [Link to support channels]
