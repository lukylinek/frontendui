import {
    createBrowserRouter,
    Outlet,
    RouterProvider,
} from "react-router-dom";

import {
    NavigationHistoryLinks,
    NavigationHistoryProvider
} from '../../../packages/_template/src/Base/Helpers/NavigationHistoryProvider';

import { AppNavbar } from "./AppNavbar";
import { ProjectGQLModelRouterSegments } from "../../../packages/projekt_lukas/src/ProjectGQLModel/Pages/RouterSegment";

const AppLayout = () => (
    <NavigationHistoryProvider>
        <AppNavbar />
        {/* <NavigationHistoryLinks /> */}
        <Outlet />
    </NavigationHistoryProvider>
);

const Routes = [
    {
        path: "/",
        element: <AppLayout />,
        children: [
            ...ProjectGQLModelRouterSegments,
        ],
    },
];

const router = createBrowserRouter(Routes);

export const AppRouter = () => <RouterProvider router={router} />;