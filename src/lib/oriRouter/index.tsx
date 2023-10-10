import { createHashRouter, RouteObject, RouterProvider } from "react-router-dom";

interface IOriRouter {
    config: RouteObject[];
}

export function OriRouter(props: IOriRouter) {

    return <RouterProvider router={createHashRouter(props.config)} />

}