import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ApolloProvider } from "@apollo/react-hooks";
import { ApolloClient, ApolloLink, InMemoryCache, createHttpLink } from "@apollo/client";
import { BrowserRouter } from "react-router-dom";

const client = new ApolloClient({
  link: ApolloLink.from([
    createHttpLink({ uri: "http://localhost:4000" })
  ]),
  cache: new InMemoryCache().restore({})
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
