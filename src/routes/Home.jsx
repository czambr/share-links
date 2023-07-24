// -----------------------------
//    Componentes
// -----------------------------
import { useEffect, useState } from "react";
import Title from "../components/Title";
import Button from "../components/Button";
import FormInput from "../components/FormInput";
import FormError from "../components/FormError";

// -----------------------------
//    Hooks + librerias
// -----------------------------
import { useFirestore } from "../hooks/useFirestore";
import { formValidate } from "../utils/formValidate";
import { useForm } from "react-hook-form";
import { erroresFirebase } from "../utils/erroresFirebase";

const Home = () => {
    const [copy, setCopy] = useState({});
    const { required, patternURL, validateSpaces } = formValidate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
        resetField,
        setValue,
    } = useForm();

    const { data, error, loading, getData, addData, deleteData, updateData } =
        useFirestore();
    const [newOriginID, setNewOriginID] = useState();

    useEffect(() => {
        getData();
    }, []);

    if (loading.getData) return <p>loading data...</p>;
    if (error) return <p>error {error}</p>;

    const onSubmit = async ({ url }) => {
        try {
            if (newOriginID) {
                await updateData(newOriginID, url);
                setNewOriginID("");
            } else {
                await addData(url);
            }
            resetField("url");
        } catch (error) {
            console.log(error.code);
            const { code, message } = erroresFirebase(error.code);
            setError(code, { message });
        }
    };

    const handleClickDelete = async nanoid => {
        await deleteData(nanoid);
    };

    const handleClickEdit = item => {
        setValue("url", item.origin);
        setNewOriginID(item.nanoid);
    };

    const pathURL = window.location.href;
    const handleClickCopy = async nanoid => {
        await navigator.clipboard.writeText(window.location.href + nanoid);
        setCopy({ [nanoid]: true });
    };
    return (
        <>
            <Title title="Home" />

            <form onSubmit={handleSubmit(onSubmit)}>
                <FormInput
                    type="text"
                    placeholder="https://google.com"
                    label="Ingrese tu URL"
                    error={errors.url}
                    {...register("url", {
                        required,
                        pattern: patternURL,
                        validate: validateSpaces,
                    })}>
                    <FormError errors={errors.url} />
                </FormInput>

                {newOriginID ? (
                    <Button
                        type="submit"
                        text="Edit URL"
                        color="green"
                        loading={loading.updateData}
                    />
                ) : (
                    <Button
                        type="submit"
                        text="Add URL"
                        color="blue"
                        loading={loading.addData}
                    />
                )}
            </form>

            {data.map(item => (
                <div
                    className="mb-2 p-6 bg-white border border-gray-200  dark:bg-gray-800 dark:border-gray-700"
                    key={item.nanoid}>
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {pathURL}
                        {item.nanoid}
                    </h5>
                    <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                        {item.origin}
                    </p>

                    <div className="flex space-x-2">
                        <Button
                            type="button"
                            text="Delete URL"
                            color="red"
                            loading={loading[item.nanoid]}
                            onclick={() => handleClickDelete(item.nanoid)}
                        />
                        <Button
                            type="button"
                            text="Edit"
                            color="green"
                            onclick={() => handleClickEdit(item)}
                        />
                        <Button
                            type="button"
                            text={copy[item.nanoid] ? "Copied" : "Copy"}
                            color="gray"
                            onclick={() => handleClickCopy(item.nanoid)}
                        />
                    </div>
                </div>
            ))}
        </>
    );
};

export default Home;
