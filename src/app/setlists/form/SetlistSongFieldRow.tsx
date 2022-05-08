import * as React from "react";
import ChordSelect from "app/songs/components/ChordSelect";
import { Skeleton } from "@material-ui/lab";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import DeleteIcon from "@material-ui/icons/Delete";
import { useTranslation } from "react-i18next";
import { useGetSongQuery } from "app/services/songs";

export interface ISetlistSongFieldRowProps {
  index;
  songId;
  onSwap;
  onRemove;
  settings;
  onSongKeyChange;
}

export default function SetlistSongFieldRow(props: ISetlistSongFieldRowProps) {
  const { index, songId, onSwap, onRemove, settings, onSongKeyChange } = props;
  const { data: song, isLoading: loading } = useGetSongQuery(songId);

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
      <td>{song?.title?.toUpperCase() || songId}</td>
      <td>{song?.artist}</td>
      <td>
        <ChordSelect value={settings?.overrideKey || song?.key} onChange={onSongKeyChange} />
      </td>
      <td>
        <div className="btn-group">
          <button onClick={(e) => onSwap(index, index - 1)}>
            <ArrowUpwardIcon />
          </button>
          <button onClick={(e) => onSwap(index, index + 1)}>
            <ArrowDownwardIcon />
          </button>
          <button onClick={(e) => onRemove(index)}>
            <DeleteIcon />
          </button>
        </div>
      </td>
    </tr>
  );
}

export function NoSongsRow({ isNew }: { isNew? }) {
  const { t } = useTranslation();
  return (
    <tr>
      <td className={"text-center"}>
        {isNew ? t("setlist:form/no_songs_new") : t("setlist:form/no_songs")}
      </td>
    </tr>
  );
}
