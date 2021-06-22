import React from 'react'
import './App.css';
import MainContainer from './components/MainContainer'
import { Provider } from 'react-redux'
import reduxStore from './redux/store'
import { PersistGate } from 'redux-persist/integration/react';

function App() {
  const { store, persistor } = reduxStore()

  return (
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistor} >
        <div className="App">
          <MainContainer />
        </div>
      </PersistGate>
    </Provider>
  );
}

export default App;
