import { Song } from "~/api/services/songs";
import Link from "~/ui/layout/Link";

type Props = {
  value: string;
  data: Song;
};

const SongTitleCell = ({ value, data }: Props) => (
  <Link className="truncate lg:whitespace-normal" to={`/song/${data._id}/view`}>
    {value}
  </Link>
);

export default SongTitleCell;
