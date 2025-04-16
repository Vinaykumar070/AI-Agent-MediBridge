import mongoose, { Schema, model } from "mongoose";

export interface UserDoc {
    _id: string;
    firstName: string;
    lastName: string;
    employeeId: string;
    position: string;
    username: string;
    skills: string;
    qualification: string;
    jobDescription: string;
    jobTitle: string;
    email: string;
    mobile: number;
    address: Object;
    salary: number;
    reportingManager: Object;
    dateOfBirth: Date;
    joiningDate: Date;
    resignDate: Date;
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<UserDoc>({
    firstName: {
        type: String,
        required: [true, "First Name is required"],
    },
    lastName: {
        type: String,
        required: [true, "Last Name is required"],
    },
    employeeId: {
        type: String,
        required: [true, "EmployeeId is required"],
    },
    username: {
        type: String,
        required: [true, "Username is required"],
    },
    position: {
        type: String,
        required: [true, "Position is required"],
    },
    qualification: {
        type: String,
    },
    skills: {
        type: String,
    },
    jobDescription: {
        type: String,
    },
    jobTitle: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "Email is required"]
    },
    mobile: {
        type: Number,
        required: [true, "Mobile Nuber is required"],
    },
    reportingManager: {
        type: Object,
    },
    address: {
        type: Object,
    },
    salary: {
        type: Number,
        required: [true, "Salary is required"]
    },
    dateOfBirth: {
        type: Date,
        required: [true, "DOB is required"]
    },
    joiningDate: {
        type: Date,
        required: [true, "Joining Date is required"]
    },
    resignDate: {
        type: Date,
        default: null
    }
},
    {
        timestamps: true,
    }
);

const User = mongoose.models?.User || model<UserDoc>('User', UserSchema);
export default User;