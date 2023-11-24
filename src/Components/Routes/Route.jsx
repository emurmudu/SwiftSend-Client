import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../HomePage/Home";
import Login from "../Users/Login";
import Register from "../Users/Register";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'register',
                element: <Register></Register>
            },
        ]
    },
]);

export default router;