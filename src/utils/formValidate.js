export const formValidate = () => {
    return {
        require: {
            value: true,
            message: "Campo obligatorio",
        },
        patternEmail: {
            value: /[a-z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})/,
            message: "Formato de email incorrecto",
        },
        patternURL: {
            value: /^https?:\/\/[\w\-]+(.[\w\-]+)+[/#?]?.*$/,
            message: "Formato URL no valida",
        },
        minLength: {
            value: 6,
            message: "Mínimo 6 caracteres",
        },
        validateSpaces: { trim: v => !(v.trim() === "") || "Campo vacio" },
        cleanSpaces: v => v.trim(),
        validateEqualsPassword(value) {
            return {
                equals: v => v === value || "No coinciden las contraseñas",
            };
        },
    };
};
