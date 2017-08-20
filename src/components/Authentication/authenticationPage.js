import React from 'react';
import * as firebase from 'firebase';

class AuthenticationPage extends React.Component {
  render() {
    return (
      <div>
        <div className="col-md-4">
          <h3>Login</h3>
          <form>

          </form>
        </div>

        <div className="col-md-4">
          <h3>Register</h3>
          <form>

          </form>
        </div>
      </div>

    );
  }
}

export default AuthenticationPage;


// Initialize Firebase
let config = {
  apiKey: "AIzaSyCUE3xWpxfvtyuCndUOGHxi3eCKn02mjVU",
  authDomain: "fb-fundamentals.firebaseapp.com",
  databaseURL: "https://fb-fundamentals.firebaseio.com",
  projectId: "fb-fundamentals",
  storageBucket: "fb-fundamentals.appspot.com",
  messagingSenderId: "387512992496"
};
firebase.initializeApp(config);

// Get Elements
const txtEmail = document.getElementById("txtEmail");
const txtPassword = document.getElementById("txtPassword");
const btnLogin = document.getElementById("btnLogin");
const btnSignUn = document.getElementById("btnSignUn");
const btnLogout = document.getElementById("btnLogout");

// Add Login event
btnLogin.addEventListener('click', e => {
  // Get email and pass
  const email = txtEmail.value;
  const pass = txtPassword.value;
  const auth = firebase.auth();

  // Log in
  const promise = auth.signInWithEmailAndPassword(email, pass);
  promise.catch(e => alert(e.message));
});

// Add Sign up event
btnSignUn.addEventListener('click', e => {
  // Get email and pass
  const email = txtEmail.value;
  const pass = txtPassword.value;
  const auth = firebase.auth();

  // Sign up
  const promise = auth.createUserWithEmailAndPassword(email, pass);
  promise
    .catch(e => alert(e.message));

});

// Add Logout event
btnLogout.addEventListener('click', e => {
  firebase.auth().signOut();
});

// Add a realtime listener
firebase.auth().onAuthStateChanged(firebaseUser => {
  if (firebaseUser) {
    btnLogout.classList.remove('hide');
  } else {
    btnLogout.classList.add('hide');
  }
});
