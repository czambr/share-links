// ---------------------------------------
// Librerias
// ---------------------------------------
import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";

// ---------------------------------------
// Componentes + Contexto
// ---------------------------------------
import { UserContext } from "../context/UserProvider";

const Navbar = () => {
    const { user, singOutUser } = useContext(UserContext);
    const handelClickLogOut = async () => {
        try {
            await singOutUser();
        } catch (error) {
            console.log(error);
        }
    };

    const classButtonBlue =
        "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";

    const classButtonRed =
        "text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800";

    return (
        <nav className="bg-white dark:bg-gray-900 w-full z-20 top-0 left-0 border-b border-gray-200 dark:border-gray-600">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                <Link to="/" className="flex items-center">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                        URL to Logo
                    </span>
                </Link>
                <div className="flex md:order-2">
                    {user ? (
                        <>
                            <NavLink to="/" className={classButtonBlue}>
                                Inicio
                            </NavLink>
                            <button
                                onClick={handelClickLogOut}
                                className={classButtonRed}>
                                LogOut
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink to="/login" className={classButtonBlue}>
                                Login
                            </NavLink>
                            <NavLink to="/register" className={classButtonBlue}>
                                Register
                            </NavLink>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
