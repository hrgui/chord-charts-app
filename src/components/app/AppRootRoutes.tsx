import { Routes, Navigate, useLocation, Route } from "react-router-dom";

import AboutPage from "pages/AboutPage";
import AddToSetlistFormPage from "pages/AddToSetlistFormPage";
import { EditSetlistFormPage } from "pages/EditSetlistFormPage";
import EditSongFormPage from "pages/EditSongFormPage";
import { NewSetlistFormPage } from "pages/NewSetlistFormPage";
import NewSongFormPage from "pages/NewSongFormPage";
import SetlistsListPage from "pages/SetlistsListPage";
import SetlistViewPage from "pages/SetlistViewPage";
import SongsListPage from "pages/SongsListPage";
import SongViewPage from "pages/SongViewPage";
import RouteModal from "~/components/app/RouteModal";

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

        <Route element={<NewSetlistFormPage />} path="/setlist/new" />
        <Route element={<SetlistsListPage />} path="/setlists" />
        <Route element={<AddToSetlistFormPage />} path="/setlist/add" />
        <Route element={<EditSetlistFormPage />} path="/setlist/:id/edit" />
        <Route element={<SetlistViewPage />} path="/setlist/:id/:songIndex" />
        <Route element={<SetlistViewPage />} path="/setlist/:id" />
        <Route element={<AboutPage />} path="/about" />
        <Route path="/" element={<Navigate to="/songs" />} />
      </Routes>
      {state?.background && (
        <RouteModal open>
          <Routes>
            <Route element={<AddToSetlistFormPage />} path="/setlist/add" />
          </Routes>
        </RouteModal>
      )}
    </>
  );
}

export default AppRootRoutes;
