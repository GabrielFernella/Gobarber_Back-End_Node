export default {
    host: "smtp.mailtrap.io",
    port: 2525,
    secure:false,
    auth: {
        user: "e4c41ca1d788a2",
        pass: "a4c4b981963883"
    },
    default: {
        from: 'Equipe GoBarber <noreply@gobarber.com>'
    }
};
/*
export default {
    host: process.env.MAIL_HOST,
    port: process.env.MAIL_PORT,
    secure:false,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
    default: {
        from: 'Equipe GoBarber <noreply@gobarber.com>'
    }
};*/