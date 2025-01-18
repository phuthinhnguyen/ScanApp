import "./App.css";
import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Loadinglogin from "./components/Loadinglogin";
import Loadingpath from "./components/Loadingpath";
import Updateitem from "./components/Updateitem";
import Scan from "./components/Scan";
import Settings from "./components/Settings";
import "yet-another-react-lightbox/styles.css";
import Addnewleaverequest from "./components/Addnewleaverequest";

// use lazy for every loading path
const Home = React.lazy(() => import("./components/Home"));
const Login = React.lazy(() => import("./components/Login"));
const Userprofile = React.lazy(() => import("./components/Userprofile"));
const Adminworkspace = React.lazy(() => import("./components/Adminworkspace"));
const Userprofileonline = React.lazy(() => import("./components/Userprofileonline"));
const Products = React.lazy(() => import("./components/Products"));
const Slideshowphoto = React.lazy(() => import("./components/Slideshowphoto"));
const SampleTracking = React.lazy(() => import("./components/SampleTracking"));
const LeaveRequest = React.lazy(() => import("./components/LeaveRequest"));

function App() {
  let persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate loading={<Loadinglogin/>} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<Loadingpath/>}>
                  <Login />
                </Suspense>
              }
            />
            <Route
              path="/home"
              element={
                <Suspense fallback={<Loadingpath/>}>
                  <Home />
                </Suspense>
              }
            />
            <Route
              path="/userprofile"
              element={
                <Suspense fallback={<Loadingpath/>}>
                  <Userprofile />
                </Suspense>
              }
            />
            <Route
              path="/userprofileonline"
              element={
                <Suspense fallback={<Loadingpath/>}>
                  <Userprofileonline />
                </Suspense>
              }
            />
            <Route
              path="/adminworkspace"
              element={
                <Suspense fallback={<Loadingpath/>}>
                  <Adminworkspace />
                </Suspense>
              }
            />
             <Route
              path="/updateitem"
              element={
                <Suspense fallback={<Loadingpath/>}>
                  <Updateitem />
                </Suspense>
              }
            />
             <Route
              path="/scan"
              element={
                <Suspense fallback={<Loadingpath/>}>
                  <Scan />
                </Suspense>
              }
            />
             <Route
              path="/products"
              element={
                <Suspense fallback={<Loadingpath/>}>
                  <Products />
                </Suspense>
              }
            />
             <Route
              path="/slideshow"
              element={
                <Suspense fallback={<Loadingpath/>}>
                  <Slideshowphoto />
                </Suspense>
              }
            />
             <Route
              path="/settings"
              element={
                <Suspense fallback={<Loadingpath/>}>
                  <Settings />
                </Suspense>
              }
            />
              <Route
              path="/sampletracking"
              element={
                <Suspense fallback={<Loadingpath/>}>
                  <SampleTracking />
                </Suspense>
              }
            />
            <Route
              path="/leaverequest"
              element={
                <Suspense fallback={<Loadingpath/>}>
                  <LeaveRequest />
                </Suspense>
              }
            />
             <Route
              path="/addnewleaverequest"
              element={
                <Suspense fallback={<Loadingpath/>}>
                  <Addnewleaverequest />
                </Suspense>
              }
            />
          </Routes>
          
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
