/* eslint-disable react/jsx-pascal-case */
import React, { Suspense } from "react";
import { Route, Switch } from "react-router";
import { useSelector } from "react-redux";
import "./app.scss"

import EditorTemplates from "./components/EditorDesign/EditorTemplates";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import { bgwallpaper } from "./media";

const Editor = React.lazy(() => import("./components/Editor/Editor"));

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  var urlHit = localStorage.getItem("page_view");
  localStorage.setItem("page_view", 1);
  var urlHit2 = Number(urlHit) + 1;
  localStorage.setItem("page_view", urlHit2);

  return (
    <div className="App">
      <div className="image_container blur">
        <img className="bg_img_main" src={bgwallpaper} alt={"bgimg"}></img>
      </div>
      <Suspense fallback={<p>Loading...</p>}>
        <Switch>
          {!isLoggedIn && (
            <>
              <Route path="/" exact>
                <Redirect to="/editor"/>
              </Route>
              <Route path="templates" exact>
                <EditorTemplates />
              </Route>
              <Route path="/editor" exact>
                <Editor />
              </Route>
              <Route path="editor-download" exact>
                <Editor />
              </Route>
            </>
          )}
        </Switch>
      </Suspense>
    </div>
  );
}

export default App;
