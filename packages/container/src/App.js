import React, { lazy, Suspense } from "react";
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
  return (
    <>
      <StylesProvider generateClassName={generateClassName}>
        <BrowserRouter>
          <div>
            <Header />
            <Suspense fallback={<Progress />}>
              <Switch>
                <Route path="/auth" component={AuthAppLazy} />
                <Route path="/" component={MarketingAppLazy} />
              </Switch>
            </Suspense>
          </div>
        </BrowserRouter>
      </StylesProvider>
    </>
  );
};
