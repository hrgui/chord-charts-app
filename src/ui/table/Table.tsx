import classnames from "classnames";
import * as React from "react";
import { Alert, Input } from "react-daisyui";
import { useTable, useFilters, useSortBy, usePagination } from "react-table";

import ErrorIcon from "~/ui/icons/ErrorIcon";
import MaterialSymbol from "~/ui/icons/MaterialSymbol";
import Loading from "~/ui/layout/Loading";

function DefaultColumnFilter({ column: { filterValue, setFilter } }) {
  return (
    <Input
      className="w-full"
      size="sm"
      value={filterValue || ""}
      onChange={(e) => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
    />
  );
}

export interface TableProps {
  isLoading?: boolean;
  error?;
  columns?;
  data?;
  className?;
  isPageTable?;
  emptyHeader?;
  errorText?: React.ReactNode;
  emptyAction?: React.ReactNode;
  initialState?;
}

function UnstyledTable({
  isLoading = false,
  error = null,
  columns,
  data,
  emptyHeader = "There's nothing here.",
  emptyAction = "Create a new thing and it will show up here.",
  errorText = "An error occurred",
  initialState,
}: TableProps) {
  const filterTypes = React.useMemo(
    () => ({
      // Or, override the default text filter to use
      // "startWith"
      text: (rows, id, filterValue) => {
        return rows.filter((row) => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      },
    }),
    []
  );

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    page,
  } = useTable(
    {
      columns,
      data: data || [],
      filterTypes,
      defaultColumn,
      initialState: { pageSize: 25, ...initialState },
    },
    useFilters,
    useSortBy,
    usePagination
  );

  if (error) {
    return (
      <div>
        <Alert icon={<MaterialSymbol icon="error" />} status="error">
          {error.stack}
        </Alert>
      </div>
    );
  }

  // Render the UI for your table
  return (
    <>
      <table className="table table-fixed  w-full" {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, i) => (
            <tr key={i} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column, i) => (
                <th
                  key={i}
                  className="tableHeaderCell"
                  {...column.getHeaderProps(
                    {
                      className: column.className,
                      style: column.style,
                    },

                    column.getSortByToggleProps()
                  )}
                >
                  <div className="sortableHeaderContainer">
                    <div>{column.render("Header")}</div>
                    {column.canSort && (
                      <div className={"sortingSwitch"}>
                        <div
                          className={classnames("sortingTicker", {
                            sortingTickerActive: column.isSortedDesc === false,
                            sortingTickerInactive: column.isSortedDesc,
                          })}
                        >
                          {/* <ArrowDropUpIcon fontSize="small" /> */}
                        </div>
                        <div
                          className={classnames("sortingTicker", {
                            sortingTickerActive: column.isSortedDesc === true,
                            sortingTickerInactive:
                              column.isSortedDesc === false,
                          })}
                        >
                          {/* <ArrowDropDownIcon fontSize="small" /> */}
                        </div>
                      </div>
                    )}
                  </div>
                  <div>{column.canFilter ? column.render("Filter") : null}</div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map(
            (row) =>
              prepareRow(row) || (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell, i) => {
                    return (
                      <td
                        key={i}
                        size="small"
                        {...cell.getCellProps({
                          className: cell.column.className,
                          style: cell.column.style,
                        })}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              )
          )}
        </tbody>
      </table>

      {!isLoading && rows.length === 0 && !error && (
        <div className={"emptyMessage p-4"}>
          <Alert status="info" icon={<MaterialSymbol icon={"info"} />}>
            <h1 className="font-semibold text-2xl">{emptyHeader}</h1>
            <h2 className="emptyAction">{emptyAction}</h2>
          </Alert>
        </div>
      )}
      {isLoading && (
        <div className={"emptyMessage p-4"}>
          <Loading />
        </div>
      )}
      {error && (
        <div className={"emptyMessage p-4"}>
          <Alert
            status="error"
            icon={<ErrorIcon className="w-6 h-6 mx-2 stroke-current" />}
          >
            {errorText}
          </Alert>
        </div>
      )}
    </>
  );
}

export const Table = UnstyledTable;
