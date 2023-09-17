import { Resend } from "resend";

export const emailInstructions = (instructions: string) => {
    const resend = new Resend(process.env.RESEND_API_KEY);
    resend.emails.send({
        from: "onboarding@resend.dev",
        to: "kevinsliu0@gmail.com",
        subject: "Call me asap please",
        html: `<p>A detailed solution to your problem...</p><p>${instructions}</p><p>Good luck!</p><p>CheetCode</p>`,
    });
};
