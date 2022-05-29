import React, { useEffect, useState } from "react";
import '@aws-amplify/ui-react/styles.css';
import "./App.css";
import { API, graphqlOperation } from '@aws-amplify/api';
import { Auth } from '@aws-amplify/auth';
import { listDiodes } from './graphql/queries';
import { createDiode, updateDiode } from './graphql/mutations';
import { onUpdateDiode } from './graphql/subscriptions';

function App(props) {

  const [turnedOn, setTurnedOn] = useState({
    id: "",
    state: true
  });

  const onClick = () => {
    API.graphql(graphqlOperation(updateDiode, {
      input: {id: turnedOn.id, state: !turnedOn.state}
    }))
  }

  useEffect(() => {
    API.graphql(graphqlOperation(listDiodes, {})).then(({ data }) => {
      const diodes = data.listDiodes.items
      if (diodes.length === 0) {
        API.graphql(graphqlOperation(createDiode, {input: {state: true} })).then(({ data }) => {
          setTurnedOn({
            id: data.createDiode.id,
            state: data.createDiode.state
          });
        })
        return;
      }

      setTurnedOn({
        id: diodes[0].id,
        state:diodes[0].state
      });
    });

    Auth.currentAuthenticatedUser().then((data) => {
      API.graphql(graphqlOperation(onUpdateDiode, { owner: data.username })).subscribe({
        next: data => {
          setTurnedOn({
            id: data.value.data.onUpdateDiode.id,
            state: data.value.data.onUpdateDiode.state
          });
        }
      })
    });

    
  }, []);

  return (
    
    <div className="App" onClick={ onClick } style={{
      background: turnedOn.state ? "white" : "black",
      color: turnedOn.state ? "black" : "white"
    }}>
      <div className="svg">
        <svg style={{fill: turnedOn.state ? "black" : "white"}} id="a" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 170 117.58"><rect x="120" y="76.57" width="50" height="3" rx="1.5" ry="1.5"/><path d="M52.5,116.08V39.06c0-1.16,1.27-1.88,2.27-1.28l65.01,39.01c.98,.59,.97,2-.01,2.57L54.75,117.37c-1,.58-2.25-.14-2.25-1.29Zm3-71.71V110.85c0,1.16,1.25,1.87,2.25,1.29l56.12-32.81c.98-.57,.99-1.99,.01-2.57L57.77,43.08c-1-.6-2.27,.12-2.27,1.28Z"/><rect x="118.5" y="37.57" width="3" height="78.5" rx="1.5" ry="1.5"/><g><rect x="61.33" y="15.73" width="34.22" height="3" rx="1.5" ry="1.5" transform="translate(24.29 76.54) rotate(-60)"/><path d="M91.19,17.49h0c-.81,.19-1.61-.32-1.79-1.12l-2.61-11.39c-.19-.85-1.07-1.35-1.9-1.1l-11.17,3.43c-.79,.24-1.63-.2-1.87-.99h0c-.24-.8,.2-1.64,.99-1.88L87.08,.07c.83-.26,1.7,.25,1.9,1.1l3.33,14.53c.18,.8-.32,1.61-1.12,1.79Z"/></g><g><rect x="83.49" y="29.12" width="34.22" height="3" rx="1.5" ry="1.5" transform="translate(23.78 102.43) rotate(-60)"/><path d="M113.36,30.88h0c-.81,.19-1.61-.32-1.79-1.12l-2.61-11.39c-.19-.85-1.07-1.35-1.9-1.1l-11.17,3.43c-.79,.24-1.63-.2-1.87-.99h0c-.24-.8,.2-1.64,.99-1.88l14.26-4.38c.83-.26,1.7,.25,1.9,1.1l3.33,14.53c.18,.8-.32,1.61-1.12,1.79Z"/></g><rect y="76.57" width="54" height="3" rx="1.5" ry="1.5"/></svg>
        嗨 { props.user.username }! 点击成为二极管.
        <div class="logout" onClick={props.signOut}>点此链接不当二极管</div>
      </div>
      
    </div>
  );
}

export default App;