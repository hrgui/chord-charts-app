import { SetlistSong } from "~/api/services/setlists";
import { useGetSongQuery } from "~/api/services/songs";
import ChordSelect from "~/components/songs/ChordSelect";
import MaterialSymbol from "~/ui/icons/MaterialSymbol";
import Skeleton from "~/ui/Skeleton";

export interface ISetlistSongFieldRowProps {
  index: number;
  setlistSong: SetlistSong;
  onSwap: (from: number, to: number) => void;
  onRemove: (index: number) => void;
  register: any;
  isMoveUpDisabled?: boolean;
  isMoveDownDisabled?: boolean;
}

export function SetlistSongFieldRow(props: ISetlistSongFieldRowProps) {
  const {
    index,
    setlistSong,
    isMoveUpDisabled,
    isMoveDownDisabled,
    onSwap,
    onRemove,
    register,
  } = props;
  const { data: song, isLoading: loading } = useGetSongQuery(setlistSong._id);

  const actions = (
    <div className="btn-group">
      <button
        className="btn btn-sm"
        disabled={isMoveUpDisabled}
        type="button"
        onClick={() => onSwap(index, index - 1)}
      >
        <MaterialSymbol icon="arrow_upward" />
      </button>
      <button
        className="btn btn-sm"
        disabled={isMoveDownDisabled}
        type="button"
        onClick={() => onSwap(index, index + 1)}
      >
        <MaterialSymbol icon="arrow_downward" />
      </button>
      <button
        className="btn btn-sm"
        type="button"
        onClick={() => onRemove(index)}
      >
        <MaterialSymbol icon="delete" />
      </button>
    </div>
  );

  if (loading) {
    return (
      <tr>
        <td className="hidden sm:table-cell">{index + 1}.</td>
        <td>
          {<Skeleton width={Math.floor(Math.random() * 100)} height={16} />}
        </td>
        <td>
          {<Skeleton width={Math.floor(Math.random() * 75)} height={16} />}
        </td>
        <td>{<Skeleton width={50} height={16} />}</td>
      </tr>
    );
  }

  return (
    <tr>
      <td className="hidden sm:table-cell">{index + 1}.</td>
      <td className="truncate">
        <div className="truncate">
          {song?.title?.toUpperCase() || setlistSong._id}
        </div>
        {actions}
      </td>
      <td className="hidden sm:table-cell">{song?.artist}</td>
      <td>
        <ChordSelect {...register(`songs.${index}.settings.overrideKey`)} />
      </td>
    </tr>
  );
}

export default SetlistSongFieldRow;
