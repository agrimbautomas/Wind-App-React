import React from 'react';
import PropTypes from 'prop-types';
import {Route, Switch, Redirect} from 'react-router';
import {withRouter} from 'react-router-dom';

import 'react-router-modal/css/react-router-modal.css';

import {
    notAuthenticatedRouteWrapper
} from './lib/componentRouteCreator';

import {connectComponent} from './lib/connectComponent';
import InfoMessagePropType from './types/infoMessage';
import ConfirmationDialogPropType from './types/confirmationDialog';

import Login from './screens/Login/Login';
// import SignUp from './screens/SignUp/SignUp';


const UnauthenticatedLogin = notAuthenticatedRouteWrapper(Login);
// const UnauthenticatedRegister = notAuthenticatedRouteWrapper(SignUp);

// const App = ({
//                  currentUserLoggedIn, infoMessage, confirmationDialog, hideConfirmationDialog
//              }) => (
//     <div>
//         <Switch>
//             {/*<Route exact path="/" render={() => (<Redirect to="/projects"/>)}/>*/}
//             <Route path="/login" render={({history}) => (<UnauthenticatedLogin history={history}/>)} />
//             {/*<Route*/}
//             {/*    path="/signup"*/}
//             {/*    render={({history}) => (<UnauthenticatedRegister history={history}/>)}*/}
//             {/*/>*/}
//         </Switch>
//
//     </div>
// );
//
// App.propTypes = {
//     currentUserLoggedIn: PropTypes.bool,
//     infoMessage: InfoMessagePropType,
//     confirmationDialog: ConfirmationDialogPropType,
//     hideConfirmationDialog: PropTypes.func
// };
//
// App.defaultProps = {
//     currentUserLoggedIn: null,
//     infoMessage: null,
//     confirmationDialog: null,
//     hideConfirmationDialog: () => {
//     }
// };
//
// export default withRouter(connectComponent(
//     ({infoMessage, confirmationDialog, currentUser}) => ({
//         infoMessage,
//         confirmationDialog,
//         currentUserLoggedIn: !!currentUser
//     })
// )(App));
class ShowTheLocation extends React.Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    };

    render() {
        const { match, location, history } = this.props;

        return <div>You are now at {location.pathname}</div>;
    }
}

export default withRouter(ShowTheLocation);