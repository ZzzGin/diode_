import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Amplify } from "@aws-amplify/core"
import aws_exports from "./aws-exports";
import { Authenticator } from '@aws-amplify/ui-react';
Amplify.configure(aws_exports);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Authenticator>
    {({ signOut, user }) => (
      <App signOut={signOut} user={user}/>
    )}
  </Authenticator>
);