import 'bootstrap/dist/css/bootstrap.min.css';

import { AppRouter } from './AppRouter';
import { RootProviders } from '../../../packages/dynamic/src/Store';

export const GQLENDPOINT_ = "/api/gql"
// const getSdl = () => client.sdl()


// eslint-disable-next-line react/prop-types
export const App = ({ GQLENDPOINT=GQLENDPOINT_}) => {
    return (
        <RootProviders clientOptions={{ endpoint: GQLENDPOINT }}>
            <AppRouter />
        </RootProviders>
    );

};
