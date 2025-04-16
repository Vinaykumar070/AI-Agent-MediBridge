import DoctorModel, { Doctor } from "@/models/Doctor";

const doctorNames = [
  "Dr. John Smith",
  "Dr. Emily Johnson",
  "Dr. Michael Brown",
  "Dr. Sarah Davis",
  "Dr. David Wilson",
  "Dr. Linda Martinez",
  "Dr. Robert Garcia",
  "Dr. Mary Rodriguez",
  "Dr. James Hernandez",
  "Dr. Patricia Clark",
];

const specialties = [
  "Cardiology",
  "Neurology",
  "Dermatology",
  "Orthopedics",
  "Pediatrics",
  "Gynecology",
  "Psychiatry",
  "Oncology",
  "Radiology",
  "General Surgery",
];

const hospitals = [
  "City Hospital",
  "Sunrise Medical Center",
  "Green Valley Hospital",
  "Riverfront Clinic",
  "St. Mary's Hospital",
];

const cities = [
  "New York",
  "Los Angeles",
  "Chicago",
  "Houston",
  "Miami",
];

const createDoctorsData = () => {
  const res: Partial<Doctor>[] = [];
  for (let i = 0; i < 10; i++) {
    const doctor = {
      name: doctorNames[i],
      specialty: specialties[i % specialties.length],
      hospital: hospitals[i % hospitals.length],
      city: cities[i % cities.length],
      email: `vinaykumar.mkoudi${i}@gmail.com`,
      phone: `+1-555-000${100 + i}`,
    };
    res.push(doctor);
  }
  return res;
};

export const createDoctors = async () => {
  try {
    const doctors = createDoctorsData();
    const result = await DoctorModel.insertMany(doctors);
    return result;
  } catch (e: any) {
    console.error('Create Doctors ERROR:', e);
    throw new Error(e?.message || "Failed to create doctors");
  }
};

export const getAllDoctors = async () => {
  try {
    const doctors = await DoctorModel.find({});
    return doctors;
  } catch (e: any) {
    console.error('Get Doctors ERROR:', e);
    throw new Error(e?.message || "Failed to fetch doctors");
  }
};

















// "use server";
// import { connectDB, client } from "@/lib/mongoClient";
// import DoctorModal from "@/models/Doctor";
// import Appointment from "@/models/Appointment";

// const db = client.db("ai-charts");

// // export const listDoctors = async (body: any) => {
// //   await connectDB();
// //   const { city, specialty } = body;
// //   try {
// //     const filter: any = {};
// //     if (city) filter.city = city;
// //     if (specialty) filter.specialty = specialty;

// //     const doctors = await DoctorModal.find(filter); // fix here
// //     return JSON.parse(JSON.stringify(doctors));
// //   } catch (err: any) {
// //     console.error('List Doctors ERROR:', err);
// //     throw new Error(err?.message || "Error fetching doctors");
// //   }
// // };

// // export const listDoctors = async (body: any) => {
// //   await connectDB();
// //   try {
// //     const doctors = await DoctorModal.find();
// //     return JSON.parse(JSON.stringify(doctors));
// //   } catch (err: any) {
// //     console.error('List Doctors ERROR:', err);
// //     throw new Error(err?.message || "Error fetching doctors");
// //   }
// // };

// // export const createDoctorProfile = async (body: any) => {
// //   await connectDB();
// //   const { name, specialty, hospital, city, email, phone } = body;
// //   try {
// //     const newDoctor = new Doctor({ name, specialty, hospital, city, email, phone });
// //     const data = await newDoctor.save();
// //     return JSON.parse(JSON.stringify(data));
// //   } catch (err: any) {
// //     console.error('Create Doctor Profile ERROR:', err);
// //     throw new Error(err?.message ? err?.message : err);
// //   }
// // };

// // export const respondToAppointmentRequest = async (body: any) => {
// //   await connectDB();
// //   const { appointmentId, response } = body;
// //   try {
// //     const appointment = await Appointment.findById(appointmentId);
// //     if (!appointment) {
// //       throw new Error("Appointment not found");
// //     }
// //     appointment.status = response === "accept" ? "confirmed" : "rejected";
// //     await appointment.save();
// //     return JSON.parse(JSON.stringify(appointment));
// //   } catch (err: any) {
// //     console.error('Respond to Appointment ERROR:', err);
// //     throw new Error(err?.message ? err?.message : err);
// //   }
// // };

// // export const listAppointmentsDoctor = async (body: any) => {
// //   await connectDB();
// //   const { status } = body;
// //   try {
// //     const filter: any = {};
// //     if (status) filter.status = status;
// //     const appointments = await Appointment.find(filter);
// //     return JSON.parse(JSON.stringify(appointments));
// //   } catch (err: any) {
// //     console.error('List Doctor Appointments ERROR:', err);
// //     throw new Error(err?.message ? err?.message : err);
// //   }
// // };
