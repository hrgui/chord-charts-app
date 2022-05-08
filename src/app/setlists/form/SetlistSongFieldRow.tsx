import * as React from "react";
import ChordSelect from "app/songs/components/ChordSelect";
import { useGetSongQuery } from "app/services/songs";
import Skeleton from "ui/Skeleton";
import MaterialSymbol from "ui/icons/MaterialSymbol";
import { SetlistSong } from "app/services/setlists";

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
  const { index, setlistSong, isMoveUpDisabled, isMoveDownDisabled, onSwap, onRemove, register } =
    props;
  const { data: song, isLoading: loading } = useGetSongQuery(setlistSong._id);

  if (loading) {
    return (
      <tr>
        <td>{index + 1}.</td>
        <td>{<Skeleton width={Math.floor(Math.random() * 100)} height={16} />}</td>
        <td>{<Skeleton width={Math.floor(Math.random() * 75)} height={16} />}</td>
        <td>{<Skeleton width={50} height={16} />}</td>
        <td>{<Skeleton width={200} height={16} />}</td>
      </tr>
    );
  }

  return (
    <tr>
      <td>{index + 1}.</td>
      <td>{song?.title?.toUpperCase() || setlistSong._id}</td>
      <td>{song?.artist}</td>
      <td>
        <ChordSelect {...register(`songs.${index}.settings.overrideKey`)} />
      </td>
      <td>
        <div className="btn-group">
          <button
            className="btn"
            disabled={isMoveUpDisabled}
            type="button"
            onClick={(e) => onSwap(index, index - 1)}
          >
            <MaterialSymbol icon="arrow_upward" />
          </button>
          <button
            className="btn"
            disabled={isMoveDownDisabled}
            type="button"
            onClick={(e) => onSwap(index, index + 1)}
          >
            <MaterialSymbol icon="arrow_downward" />
          </button>
          <button className="btn" type="button" onClick={(e) => onRemove(index)}>
            <MaterialSymbol icon="delete" />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default SetlistSongFieldRow;
