import { Resend } from "resend";

export const emailInstructions = (instructions: string) => {
    const resend = new Resend(process.env.RESEND_API_KEY);
    resend.emails.send({
        from: "onboarding@resend.dev",
        to: "andrew.chen.anyuan@gmail.com",
        subject: "Call me asap please",
        html: `<p>${instructions}</p>`,
    });
};
