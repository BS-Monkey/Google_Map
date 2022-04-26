import React, { Fragment } from "react";
import {
  useTable,
  useSortBy,
  useFilters,
  useExpanded,
  usePagination,
} from "react-table";
import { Table, Row, Col, Input, CustomInput } from "reactstrap";
import { Button, Container, Text } from "../ui";
import { Filter, DefaultColumnFilter } from "./filters";

const TableContainer = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    visibleColumns,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize },
  }: any = useTable(
    {
      columns,
      data,
      defaultColumn: { Filter: DefaultColumnFilter } as any,
      initialState: { pageIndex: 0, pageSize: 10 } as any,
    },
    useFilters,
    useSortBy,
    useExpanded,
    usePagination
  );

  const generateSortingIndicator = (column) => {
    return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : "";
  };

  const onChangeInSelect = (event) => {
    setPageSize(Number(event.target.value));
  };

  const onChangeInInput = (event: { target: { value: any } }) => {
    const page = event.target.value ? Number(event.target.value) - 1 : 0;
    gotoPage(page);
  };

  return (
    <>
<div className="relative overflow-x-auto shadow-md sm:rounded-lg">
<table className="w-full text-sm text-left text-black ">
<thead className="text-xs text-black uppercase bg-gray-50 dark:bg-gray-100 ">
  
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th scope="col" className="px-6 py-3" {...column.getHeaderProps()}>
                  <div className="px-1 py-3 pb-4 text-center" {...column.getSortByToggleProps()} >
                    {column.render("Header")}
                    {generateSortingIndicator(column)}
                  </div>
                  <Filter column={column}  />
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row) => {
            prepareRow(row);
            return (
              <Fragment key={row.getRowProps().key}>
                <tr className="bg-white border-b  dark:border-gray-700 ">
               
                  {row.cells.map((cell) => {
                    return (
                      <td className="px-6 py-4 text-center border-2 border-gray-200 border-x-gray-200" {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              </Fragment>
            );
          })}
        </tbody>
   
</table>

        </div>
        <div className="flex justify-center pt-10 pb-10 bg-gray-50 dark:bg-gray-100">
        <div className="pr-4">
          {" "}
          <Button
            variant="impresbtn"
            color="primary"
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            {"<<"}
          </Button>
          <Button
            color="primary"
            onClick={previousPage}
            disabled={!canPreviousPage}
            variant="impresbtn"
          >
            {"<"}
          </Button>
        </div>
        <div className="-mt-1">
          <div className="dark:text-black text-sm">
            {" "}
            Page{" "}
            <strong className="dark:text-black text-sm">
              {pageIndex + 1} of {pageOptions.length}
            </strong>
          </div>
          <div>
            {" "}
            <CustomInput
              id="custom"
              type="select"
              value={pageSize}
              onChange={onChangeInSelect}
            >
              {[10, 20, 30, 40, 50, 60, 70].map((pageSize, index) => (
                <option
                  key={index}
                  value={pageSize}
                  className="border border-black"
                >
                  Show {pageSize}
                </option>
              ))}
            </CustomInput>
          </div>
        </div>
        <div className="pl-4">
          {" "}
          <Button
            color="primary"
            variant="impresbtn"
            onClick={nextPage}
            disabled={!canNextPage}
          >
            {">"}
          </Button>
          <Button
            variant="impresbtn"
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            {">>"}
          </Button>
        </div>
      </div>




   
    </>
  );
};

export default TableContainer;
