import React from "react";
import { Routes, Navigate, useLocation, Route } from "react-router-dom";
import SongsListPage from "app/songs/SongsListPage";
import SetlistsListPage from "app/setlists/SetlistsListPage";
import SongViewPage from "app/songs/SongViewPage";
import { NewSongFormPage, EditSongFormPage } from "app/songs/form/SongFormPage";
import SetlistFormPage from "app/setlists/form/SetlistFormPage";
import AddToSetlistFormPage from "app/setlists/form/AddToSetlistFormPage";
import SetlistViewPage from "app/setlists/SetlistViewPage";
import RouteModal from "app/core/RouteModal";

export function AppRootRoutes() {
  const location = useLocation();
  const state = location.state as { background?: Location };
  return (
    <>
      <Routes location={state?.background || location}>
        <Route element={<SongsListPage />} path="/songs" />
        <Route element={<SongViewPage />} path="/song/:id/view" />
        <Route element={<NewSongFormPage />} path="/song/new" />
        <Route element={<EditSongFormPage />} path="/song/:id/edit" />

        <Route element={<SetlistFormPage />} path="/setlist/new" />
        <Route element={<SetlistsListPage />} path="/setlists" />
        <Route element={<AddToSetlistFormPage />} path="/setlist/add" />
        <Route element={<SetlistFormPage />} path="/setlist/:id/edit" />
        <Route element={<SetlistViewPage />} path="/setlist/:id/:songIndex" />
        <Route element={<SetlistViewPage />} path="/setlist/:id" />
        <Route path="/" element={<Navigate to="/songs" />} />
      </Routes>
      {state?.background && (
        <RouteModal open>
          <Routes>
            <Route element={<AddToSetlistFormPage />} path="/setlist/add" />
            <Route element={<SetlistFormPage />} path="/setlist/new" />
            <Route element={<SetlistFormPage />} path="/setlist/:id/edit" />
          </Routes>
        </RouteModal>
      )}
    </>
  );
}

export default AppRootRoutes;
