import React, { useEffect } from "react";
import LoginPage from "./LoginPage";
import SlotListPage from "./SlotListPage";
import ProofUploadPage from "./ProofUploadPage";
import RequestHistoryPage from "./RequestHistoryPage";
import "./App.css";
import { Switch, Route } from "react-router-dom";
import StatusKanban from "./status/statusKanban";
import { Redirect } from "react-router-dom";
import AddSlot from "./addslot/addslot";

const RedirectComponent = () => {
  if (localStorage.getItem("authtoken") === null) {
    return <Redirect to="/login" />;
  }
  return <div>App</div>;
};

function App() {
  useEffect(() => {}, []);

  return (
    <div className="App">
      <main className="App-main">
        <Switch>
          <Route path="/login">
            <LoginPage />
          </Route>

          <Route path="/staff/slots">
            <SlotListPage />
          </Route>
          <Route path="/staff/slotstatus/:id">
            <StatusKanban />
          </Route>
          <Route path="/student/slotrequest">
            <ProofUploadPage />
          </Route>
          <Route path="/student/request">
            <RequestHistoryPage />
          </Route>
          <Route path="/staff/addslot">
            <AddSlot />
          </Route>
          <Route exact path="/">
            <RedirectComponent />
          </Route>
        </Switch>
        {/* <LoginPage />
          <StaffLoginPage />
          <SlotListPage />
         
          <RequestHistoryPage /> */}
      </main>
    </div>
  );
}

export default App;
