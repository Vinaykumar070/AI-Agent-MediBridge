import { tool } from "@langchain/core/tools";
import axios from 'axios';
import { z } from "zod";
const sgMail = require('@sendgrid/mail')
const EmailKey = process.env.SENDGRID_API_KEY ?? ``; // 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
sgMail.setApiKey(EmailKey);


export const getWeather = tool(
    async ({ query, location = 'Bangalore, KA' }) => {
        try {
            const API_KEY = process.env.WEATHER_API_KEY ?? ``; // z1jBwV4Rz8obuHXlb2gJws74K8ay6Ue2
            const API = process.env.WEATHER_API ?? `https://api.tomorrow.io/v4/weather/realtime`;
            let config = {
                method: 'GET',
                url: `${API}?location=${location}&apikey=${API_KEY}`,
                headers: {
                    'accept': 'application/json'
                }
            };
            const res = await axios(config);
            if (res.status === 200) {
                return JSON.stringify({ data: res?.data, query });
            }
            return JSON.stringify({ error: 'Failed to get Weather info!', query });
        } catch (err) {
            console.log('getCurrentWeather: ERROR', err);
            return JSON.stringify({ error: 'Failed to get Weather info!', query });
        }
    },
    {
        name: "getWeather",
        description: "Get Weather details based on location",
        schema: z.object({
            query: z.string().describe("The search query"),
            location: z
                .string()
                .optional()
        }),
    }
);

export const sendEmail = tool(
    async ({ query, fromEmails, toEmails, subject, body }) => {
        try {
            const msg = {
                to: toEmails,
                from: fromEmails,
                subject: subject,
                text: body,
                html: `<strong>${body}</strong>`,
            }
            console.log(JSON.stringify(msg, null, 2))
            await sgMail.send(msg);
            console.log('email sent successfully', { query })
            return JSON.stringify({ message: 'email sent', query });
        } catch (err: any) {
            console.error('sendEmail: ERROR', err, JSON.stringify(err?.response));
            return JSON.stringify({ error: 'Failed to send email' });
        }
    },
    {
        name: "sendEmail",
        description: "Send emails",
        schema: z.object({
            query: z.string().describe('Search Query'),
            fromEmails: z.string().describe('From Emails emails.'),
            toEmails: z.string().describe('To Emails emails.'),
            subject: z.string().describe('Email Subject.'),
            body: z.string().describe('Email body content.')
        }),
    }
);