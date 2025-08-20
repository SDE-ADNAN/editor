/* eslint-disable react/jsx-pascal-case */
import React, { Suspense } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import EditorTemplates from "./components/EditorDesign/EditorTemplates";

const Editor = React.lazy(() => import("./components/Editor/Editor"));

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  var urlHit = localStorage.getItem("page_view");
  localStorage.setItem("page_view", 1);
  var urlHit2 = Number(urlHit) + 1;
  localStorage.setItem("page_view", urlHit2);

  return (
    <div className="text-center">
      <Suspense fallback={<p>Loading...</p>}>
        <Routes>
          {!isLoggedIn ? (
            <>
              <Route path="/" element={<Navigate to="/editor" replace />} />
              <Route path="/templates" element={<EditorTemplates />} />
              <Route path="/editor" element={<Editor />} />
              <Route path="/editor-download" element={<Editor />} />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/editor" replace />} />
          )}
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
