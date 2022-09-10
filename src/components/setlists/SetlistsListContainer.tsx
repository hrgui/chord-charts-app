import * as React from "react";
import { useTranslation, Trans } from "react-i18next";

import { Setlist, useGetSetlistsQuery } from "~/api/services/setlists";
import { Song } from "~/api/services/songs";
import Link from "~/ui/layout/Link";
import { Table } from "~/ui/table/Table";

import SetlistTitleCell from "./cells/SetlistTitleCell";
import SetlistActions from "./SetlistActions";

interface SetlistTableProps {
  loading?: boolean;
  data: Setlist[];
  addToSetlistMode?: boolean;
  song?: Song;
  onRequestClose?: () => void;
  error?: any;
}

export function TitleColumnDef() {
  return {
    accessor: "title",
    Header: "Title",
    className: "truncate break-all w-[calc(100%_-_100px)] sm:w-2/4",
    Cell: ({
      cell: {
        value,
        row: { original: data },
      },
    }) => {
      return <SetlistTitleCell value={value} data={data} />;
    },
  };
}

export function ActionsColumnDef(
  {
    addToSetlistMode,
    song,
    onRequestClose,
  }: {
    addToSetlistMode?: boolean;
    song?: Song;
    onRequestClose?: () => void;
  } = {
    addToSetlistMode: false,
    song: undefined,
    onRequestClose: () => null,
  }
) {
  return {
    Header: "Actions",
    id: "actions",
    className: "w-[100px]",
    Cell: ({
      cell: {
        row: { original: data },
      },
    }) => {
      return (
        <SetlistActions
          setlist={data}
          onRequestClose={onRequestClose}
          addToSetlistMode={addToSetlistMode}
          song={song}
        />
      );
    },
  };
}

export function DateColumnDef() {
  return {
    Header: "Date",
    accessor: "date",
    className: "hidden sm:table-cell sm:w-1/4",
  };
}

export function LeaderColumnDef() {
  return {
    accessor: "leader",
    Header: "Leader",
    className: "hidden sm:table-cell sm:w-1/4",
  };
}

export function SetlistTable({
  loading,
  data,
  addToSetlistMode,
  song,
  onRequestClose,
  error,
}: SetlistTableProps) {
  const { t } = useTranslation();

  const columns = React.useMemo(() => {
    return [
      TitleColumnDef(),
      LeaderColumnDef(),
      DateColumnDef(),
      ActionsColumnDef({ addToSetlistMode, song, onRequestClose }),
    ];
  }, [addToSetlistMode, onRequestClose, song]);

  const initialState = React.useMemo(() => {
    return {
      sortBy: [{ id: "date", desc: true }],
    };
  }, []);

  const emptyAction = React.useMemo(
    () => (
      <Trans i18nKey="setlist:list/emptyAction">
        <Link to="/setlist/new" className="text-black">
          Create a new setlist
        </Link>{" "}
        and it will show up here.
      </Trans>
    ),
    []
  );

  return (
    <Table
      error={error}
      emptyHeader={t("setlist:list/emptyHeader")}
      emptyAction={emptyAction}
      initialState={initialState}
      isLoading={loading}
      isPageTable
      columns={columns}
      data={data}
    />
  );
}

export function SetlistListContainer({
  addToSetlistMode,
  song,
  onRequestClose = () => null,
}: {
  addToSetlistMode?: boolean;
  song?: Song;
  onRequestClose?: () => void;
}) {
  const { error, isLoading, data = [] } = useGetSetlistsQuery();

  return (
    <SetlistTable
      error={error}
      loading={isLoading}
      data={data}
      song={song}
      onRequestClose={onRequestClose}
      addToSetlistMode={addToSetlistMode}
    />
  );
}
