import {
    createBrowserRouter,
    Outlet,
    RouterProvider,
} from "react-router-dom";
import { NavigationHistoryLinks, NavigationHistoryProvider } from '../../../packages/_template/src/Base/Helpers/NavigationHistoryProvider';

import { StudentGQLModelRouterSegments } from "../../../packages/granting2/src/StudentGQLModel/Pages/RouterSegment";
import { CatchRouterSegments } from "../../../packages/granting2/src/_PageCatch/PageCatch";
import { AppNavbar } from "./AppNavbar";
import { ProgramGQLModelRouterSegments } from "../../../packages/granting2/src/ProgramGQLModel/Pages/RouterSegment";
import { SemesterGQLModelRouterSegments } from "../../../packages/granting2/src/SemesterGQLModel/Pages/RouterSegment";
import { TopicGQLModelRouterSegments } from "../../../packages/granting2/src/TopicGQLModel/Pages/RouterSegment";
import { StudyPlanGQLModelRouterSegments } from "../../../packages/granting2/src/StudyPlanGQLModel/Pages/RouterSegment";


const AppLayout = () => (
    <NavigationHistoryProvider>
        <AppNavbar />
        <NavigationHistoryLinks />
        <Outlet />
    </NavigationHistoryProvider>
);

const ChildRoutes = [
    ...StudentGQLModelRouterSegments,
    ...ProgramGQLModelRouterSegments,
    ...SemesterGQLModelRouterSegments,
    ...TopicGQLModelRouterSegments,
    ...StudyPlanGQLModelRouterSegments,
    ...CatchRouterSegments,
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
