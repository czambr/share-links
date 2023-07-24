// ---------------------------------------
// Librerias
// ---------------------------------------
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { erroresFirebase } from "../utils/erroresFirebase";
import { formValidate } from "../utils/formValidate";

// ---------------------------------------
// Componentes + Contexto
// ---------------------------------------
import { UserContext } from "../context/UserProvider";
import FormError from "../components/FormError";
import FormInput from "../components/FormInput";
import Title from "../components/Title";
import Button from "../components/Button";

const Login = () => {
    const { loginUser } = useContext(UserContext);
    const [loading, setLoading] = useState(false);
    const navegate = useNavigate();
    const { required, patternEmail, minLength, validateSpaces, cleanSpaces } =
        formValidate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm();

    const onSubmit = async ({ email, password }) => {
        try {
            setLoading(true);
            await loginUser(email, password);
            navegate("/");
        } catch (error) {
            const { code, message } = erroresFirebase(error.code);
            setError(code, { message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Title title={"Login"} />
            <FormError errors={errors.firebase} />
            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                    type="email"
                    placeholder="Ingrese email"
                    label="Ingrese el correo"
                    error={errors.email}
                    {...register("email", {
                        required,
                        pattern: patternEmail,
                    })}>
                    <FormError errors={errors.email} />
                </FormInput>

                <FormInput
                    type="password"
                    placeholder="Ingrese password"
                    label="Ingrese su contraseña"
                    error={errors.password}
                    {...register("password", {
                        setValueAs: cleanSpaces,
                        minLength: minLength,
                        validate: validateSpaces,
                    })}>
                    <FormError errors={errors.password} />
                </FormInput>
                <Button text="Login" type="submit" loading={loading} />
            </form>
        </>
    );
};

export default Login;
