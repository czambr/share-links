export const erroresFirebase = code => {
    switch (code) {
        case "auth/email-already-in-use":
            return { code: "email", message: "Usuario ya registrado" };
        case "auth/invalid-email":
            return { code: "email", message: "Formato email no valido" };
        case "auth/user-not-found":
        case "auth/wrong-password":
            return {
                code: "password",
                message: "Usuario o constraseña no validos",
            };
        default:
            return {
                code: "email",
                message: "Ocurrio un error en el servidor",
            };
    }
};
