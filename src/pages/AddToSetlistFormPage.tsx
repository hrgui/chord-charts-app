import AddToSetlistForm from "../components/setlists/form/AddToSetlistForm";
import useQueryParams from "~/hooks/useQueryParams";
import { useNavigate } from "react-router-dom";

export default function AddToSetlistFormPage() {
  const navigate = useNavigate();
  const query = useQueryParams();
  const song_id = query.get("song_id");

  if (!song_id) {
    return null;
  }

  return <AddToSetlistForm song_id={song_id} navigate={navigate} />;
}
