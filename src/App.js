import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import GoogleSheetsProvider from 'react-db-google-sheets';
import Data from './Data';
import './App.css';



export default class App extends React.Component {


  render() {

    return (
      <GoogleSheetsProvider>
        <Data />
      </GoogleSheetsProvider>
    );
  }
}

