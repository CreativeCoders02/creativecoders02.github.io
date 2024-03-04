import React from "react";
import LoginPage from "./LoginPage";
import StaffLoginPage from "./StaffLoginPage";
import SlotListPage from "./SlotListPage";
import ProofUploadPage from "./ProofUploadPage";
import RequestHistoryPage from "./RequestHistoryPage";
import "./App.css";
import { HashRouter } from "react-router-dom";

function App() {
  return (
    <HashRouter>
      <div className="App">
        <main className="App-main">
          <LoginPage />
          <StaffLoginPage />
          <SlotListPage />
          <ProofUploadPage />
          <RequestHistoryPage />
        </main>
      </div>
    </HashRouter>
  );
}

export default App;
