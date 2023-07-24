// -----------------------------------
// Paginas
// -----------------------------------
import Home from "./routes/Home";
import Login from "./routes/Login";
import Register from "./routes/Register";
import NotFound from "./routes/NotFound";

// -----------------------------------
// Componetes
// -----------------------------------
import Navbar from "./components/Navbar";
import LayoutRequiereAuth from "./components/layouts/LayoutRequiereAuth";
import LayoutContainerForm from "./components/layouts/LayoutContainerForm";
import LayoutRedirect from "./components/layouts/LayOutRedirect";
import Perfil from "./components/Perfil";

// -----------------------------------
// Librerias
// -----------------------------------
import { Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./context/UserProvider";

const App = () => {
    const { user } = useContext(UserContext);
    if (user === false) {
        return <p>Loading ....</p>;
    }

    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<LayoutRequiereAuth />}>
                    <Route index element={<Home />} />
                    <Route path="/perfil" element={<Perfil />} />
                </Route>
                <Route path="/" element={<LayoutContainerForm />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Route>
                <Route path="/:nanoid" element={<LayoutRedirect />}>
                    <Route index element={<NotFound />} />
                </Route>
            </Routes>
        </>
    );
};

export default App;
