"use server"
import { client } from "@/lib/mongoClient";
import { faker } from '@faker-js/faker';
import User from "@/models/User";
const db = client.db("test");

export const getUsers = async () => {
    try {
        const users = await User.find({}).sort({ 'createdAt': -1 });
        return users
    } catch (err) {
        console.log(err);
    }
};

export const createNewUser = async (body: any) => {
    const { name, desc } = await body;
    try {
        const save = new User({ name, desc });
        const data = await save.save();
        return data
    } catch (err: any) {
        console.log(err);
        throw new Error(err?.message ? err?.message : err);
    }
}

// export function createRandomUser() {
//     return {
//         firstName: faker.person.firstName(),
//         lastName: faker.person.lastName(),
//         employeeId: faker.database.mongodbObjectId(),
//         username: faker.internet.username(),
//         position: faker.person.jobArea(),
//         skills: faker.word,
//         qualification: faker.word,
//         email: faker.internet.email(),
//         mobile: faker.phone.number(),
//         address: faker.word,
//         salary: faker.finance.amount(),
//         reportingManager: faker.database.mongodbObjectId(),
//         dateOfBirth: faker.date.birthdate(),
//         joiningDate: faker.date.past(),
//         resignDate: faker.date.future(),
//         jobDescription: faker.person.jobDescriptor(),
//         jobTitle: faker.person.jobTitle(),
//     };
// }

export const createUsers = async () => {
    try {
        // const users = faker.helpers.multiple(createRandomUser, { count: 5 });
        const docs = [
            { firstName: "Halley", lastName: "Hyakutake", employeeId: "E001", username: "Halley", position: 'T4', skills: `NodeJS, React, AWS, MongoDB, React Native`, qualification: 'MCA', email: 'Halley@smarterp.com', mobile: 9700788443, address: 'Bangalore', salary: '190000', dateOfBirth: faker.date.birthdate(), joiningDate: faker.date.past(), jobDescription: 'Full Stack Developer', jobTitle: 'Developer' },
            { firstName: "Stinn", lastName: "Bose", employeeId: "E002", username: "Stinn", position: 'T2', skills: `MYSQL, SQL, AZURE`, qualification: 'MCA', email: 'Bose@smarterp.com', mobile: 9700788223, address: 'Bangalore', salary: '100000', dateOfBirth: faker.date.birthdate(), joiningDate: faker.date.past(), jobDescription: 'DBA', jobTitle: 'Developer' },
            { firstName: "Jhon", lastName: "Hank", employeeId: "E003", username: "Hank", position: 'T3', skills: `JAVA, MYSQL, Testing`, qualification: 'MCA', email: 'Hank@smarterp.com', mobile: 9700788553, address: 'Bangalore, KA', salary: '120000', dateOfBirth: faker.date.birthdate(), joiningDate: faker.date.past(), jobDescription: 'Tester', jobTitle: 'Developer' },
            { firstName: "Wick", lastName: "Wills", employeeId: 'E004', username: "Wills", position: "T2", skills: `React Native, React`, qualification: 'MCA', email: 'Wills@smarterp.com', mobile: 9700788663, address: 'Bangalore', salary: '90000', dateOfBirth: faker.date.birthdate(), joiningDate: faker.date.past(), jobDescription: 'FE Developer', jobTitle: 'Developer' },
            { firstName: "Comet", lastName: "Hyakutake", employeeId: "E005", username: "Hyakutake", position: 'T3', skills: `NodeJS, AWS, React`, qualification: 'MCA', email: 'Hyakutake@smarterp.com', mobile: 9700788222, address: 'Bangalore, KA', salary: '180000', dateOfBirth: faker.date.birthdate(), joiningDate: faker.date.past(), jobDescription: 'BE Developer', jobTitle: 'Developer' }
        ];
        const result = await User.insertMany(docs);
        return result
    } catch (err: any) {
        console.log(err);
        throw new Error(err?.message ? err?.message : err);
    }
}

export const deleteUser = async (id: string | number) => {
    try {
        const deleteUser = await User.findOneAndDelete({ _id: id });
        return deleteUser;
    } catch (err: any) {
        console.log(err);
        throw new Error(err?.message ? err?.message : err);
    }
}

export const deleteAll = async () => {
    try {
        const deleteAll = await User.deleteMany();
        return deleteAll;
    } catch (err: any) {
        console.log(err);
        throw new Error(err?.message ? err?.message : err);
    }
}