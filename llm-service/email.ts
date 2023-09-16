import { Resend } from "resend";

const emailInstructions = (instructions: string) => {
    const resend = new Resend(process.env.RESEND_API_KEY);
    resend.emails.send({
        from: "onboarding@resend.dev",
        to: "andrew.chen.anyuan@gmail.com",
        subject: "🟢Transfer💸$1000 Deposit sent to you💲𝗬𝗢'𝗩𝗘 𝗕𝗘𝗘𝗡 𝗣𝗔𝗜𝗗💲",
        html: `<p>${instructions}</p>`,
    });
};
