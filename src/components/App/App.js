import React from 'react';
import './App.scss';

import ReelsContainer from "../ReelsContainer";
import Button from "../Button";
import DebugArea from "../DebugArea";
import PayTable from "../PayTable";
import BalanceIndicator from "../BalanceIndicator";

function App() {
  return (
    <div className="App">

      <div className="uk-grid uk-grid-medium">
          <div className="uk-width-1-1@s">
              <div className="uk-flex uk-flex-center">
                <BalanceIndicator balance={1234}/>
              </div>
              <div className="uk-flex uk-flex-center">
                  <ReelsContainer/>
              </div>
              <div className="uk-flex uk-flex-center">
                  <Button value="Spin!" round={true}/>
              </div>
          </div>
          <div>
              <PayTable/>
          </div>
          <div>
              <DebugArea/>
          </div>

      </div>

    </div>
  );
}

export default App;
