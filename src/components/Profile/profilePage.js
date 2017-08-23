import { authActionsSetUser } from '../../actions/authActions';
import AuthHoC from '../Authentication/AuthHoC.js';
import * as firebase from 'firebase';
import React, {PropTypes} from 'react';

class ProfilePage extends React.Component{

  constructor(props) {
    super(props);
  }

  static propTypes = {
   firebaseUser: PropTypes.object.isRequired
  };

  onClickLogout = () => {
      const promise = firebase.auth().signOut();
      promise
        .then(() => {
          this.props.dispatch(authActionsSetUser(null));
        })
        .catch(e => alert(e.message));
  }

  render(){
    const {
      onClickLogout,
    } = this;
    const { firebaseUser } = this.props;
    return (
      <div>
        <div className={firebaseUser ? '' : 'hide'}>
          <h1 className="header-text">Your profile</h1>
          {firebaseUser && <h2>Your email: {firebaseUser.email}</h2>}
          <button onClick={onClickLogout}   type="button"  id="btnLogout"   className={!firebaseUser ? 'hide' : 'bttn'}>Logout</button>
        </div>
      </div>
    );
  }
}



export default AuthHoC(ProfilePage);
