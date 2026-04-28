import {
    createBrowserRouter,
    Outlet,
    RouterProvider,
} from "react-router-dom";
import { NavigationHistoryLinks, NavigationHistoryProvider } from '../../../packages/_template/src/Base/Helpers/NavigationHistoryProvider';

import { BaseRouterSegments } from "../../../packages/_template/src/Base/Pages/RouterSegment";

// import { GroupRouterSegments } from "../../../packages/_template/src/GroupGQLModel/Pages/RouterSegment";
// import { RoleTypeRouterSegments } from "../../../packages/_template/src/RoleTypeGQLModel/Pages";
// import { UserRouterSegments } from "../../../packages/_template/src/UserGQLModel/Pages/RouterSegment";
// import { GroupTypeRouterSegments } from "../../../packages/_template/src/GroupTypeGQLModel/Pages/RouterSegment";
// import { RoleRouterSegments } from "../../../packages/_template/src/RoleGQLModel/Pages";
// import { Page } from "../../../packages/_template/src/Base/Pages/Page";
import { AppNavbar } from "./AppNavbar";
import { SemesterGQLModelRouterSegments } from "../../../packages/semestr/src/SemesterGQLModel/Pages/RouterSegment";


const AppLayout = () => (
    <NavigationHistoryProvider>
        <AppNavbar />
        <NavigationHistoryLinks />
        <Outlet />
    </NavigationHistoryProvider>
);

const Routes = [
    {
        path: "/",          // root
        element: <AppLayout />,
        children: [
            ...SemesterGQLModelRouterSegments,
            ...BaseRouterSegments,
            // ...GroupRouterSegments,
            // ...RoleTypeRouterSegments,
            // ...UserRouterSegments,
            // ...GroupTypeRouterSegments,
            // ...RoleRouterSegments,
            
        ],
    },
];

// console.log("Routes", Routes)
// console.log("Routes", GroupRouterSegments)

const router = createBrowserRouter(Routes);

export const AppRouter = () => <RouterProvider router={router} />;
