import * as React from "react";
import Link from "ui/layout/Link";
import { Table } from "ui/table/Table";
import { Trans } from "react-i18next";
import { useTranslation } from "react-i18next";
import SongActions from "./SongActions";
import { Song, useGetSongsQuery } from "api/services/songs";
import SongTitleCell from "./table/SongTitleCell";

export function SongListContainer({
  addToSetlistMode,
  onAddSong,
}: {
  addToSetlistMode?;
  onAddSong?: (song: Song) => void;
}) {
  const { t } = useTranslation();
  const { isLoading: loading, data = [], error } = useGetSongsQuery();

  const columns = React.useMemo(() => {
    return [
      {
        accessor: "title",
        Header: "Title",
        className: "truncate break-all w-[calc(100%_-_100px)] sm:w-2/4",
        Cell: ({
          cell: {
            value,
            row: { original: data },
          },
        }) => {
          return <SongTitleCell value={value} data={data} />;
        },
      },
      {
        accessor: "artist",
        Header: "Artist",
        className: "hidden sm:table-cell sm:w-1/4",
      },
      {
        accessor: "key",
        Header: "Key",
        className: "hidden sm:table-cell sm:w-1/4",
      },
      {
        Header: "Actions",
        id: "actions",
        className: "w-[100px]",
        Cell: ({
          cell: {
            row: { original: data },
          },
        }) => {
          return (
            <SongActions onAddSong={onAddSong!} addToSetlistMode={addToSetlistMode} song={data} />
          );
        },
      },
    ];
  }, [addToSetlistMode, onAddSong]);

  const emptyAction = React.useMemo(() => {
    return (
      <Trans i18nKey="song:list/emptyAction">
        <Link to="/song/new" className="text-black" alt="New Song">
          Create a new song
        </Link>{" "}
        and it'll show up here.
      </Trans>
    );
  }, []);

  return (
    <Table
      error={error}
      emptyHeader={t("song:list/emptyHeader")}
      emptyAction={emptyAction}
      columns={columns}
      isLoading={loading}
      isPageTable
      data={data}
    />
  );
}
