import {
    createBrowserRouter,
    Outlet,
    RouterProvider,
} from "react-router-dom";
import { NavigationHistoryLinks, NavigationHistoryProvider } from '../../../packages/_template/src/Base/Helpers/NavigationHistoryProvider';

import { BaseRouterSegments } from "../../../packages/_template/src/Base/Pages/RouterSegment";

import { GroupRouterSegments } from "../../../packages/_template/src/GroupGQLModel/Pages/RouterSegment";
import { RoleTypeRouterSegments } from "../../../packages/_template/src/RoleTypeGQLModel/Pages";
import { UserRouterSegments } from "../../../packages/_template/src/UserGQLModel/Pages/RouterSegment";
import { GroupTypeRouterSegments } from "../../../packages/_template/src/GroupTypeGQLModel/Pages/RouterSegment";
import { RoleRouterSegments } from "../../../packages/_template/src/RoleGQLModel/Pages";
import { AppNavbar } from "./AppNavbar";
import { CatchRouterSegments } from "../../../packages/granting2/src/_PageCatch/PageCatch";


const AppLayout = () => (
    <NavigationHistoryProvider>
        <AppNavbar />
        <NavigationHistoryLinks />
        <Outlet />
    </NavigationHistoryProvider>
);

const ChildRoutes = [
    ...BaseRouterSegments,
    ...GroupRouterSegments,
    ...RoleTypeRouterSegments,
    ...UserRouterSegments,
    ...GroupTypeRouterSegments,
    ...RoleRouterSegments,
    ...CatchRouterSegments
]

const Routes = [
    {
        path: "/",          // root
        element: <AppLayout />,
        children: [
            ...ChildRoutes
        ],
    },
];

// console.log("Routes", Routes)
// console.log("Routes", GroupRouterSegments)

const router = createBrowserRouter(Routes);

export const AppRouter = () => <RouterProvider router={router} />;
