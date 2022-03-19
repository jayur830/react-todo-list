import React from "react";
import { RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
    {
        path: "/",
        element: React.createElement(React.lazy(() => import("../layouts/FullLayout"))),
        children: [
            {
                index: true,
                path: "/todoList",
                element: React.createElement(React.lazy(() => import("../components/TodoList"))),
            }
        ]
    }
];

export default routes;