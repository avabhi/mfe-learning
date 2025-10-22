import React, { lazy, Suspense, useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import Header from "./components/Header";
import Progress from "./components/Progress";

import {
  StylesProvider,
  createGenerateClassName,
} from "@material-ui/core/styles";

const MarketingAppLazy = lazy(() => import("./components/MarketingApp"));
const AuthAppLazy = lazy(() => import("./components/AuthApp"));

const generateClassName = createGenerateClassName({
  productionPrefix: "co",
});

export default () => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  console.log("isSignin", isSignedIn);
  return (
    <>
      <StylesProvider generateClassName={generateClassName}>
        <BrowserRouter>
          <div>
            <Header
              isSignedIn={isSignedIn}
              onSignOut={() => setIsSignedIn(false)}
            />
            <Suspense fallback={<Progress />}>
              <Switch>
                <Route path="/auth">
                  <AuthAppLazy onSignin={() => setIsSignedIn(true)} />
                </Route>
                <Route path="/" component={MarketingAppLazy} />
              </Switch>
            </Suspense>
          </div>
        </BrowserRouter>
      </StylesProvider>
    </>
  );
};
