import React, { useRef, useState } from "react";

import { CiMenuKebab } from "react-icons/ci"; 
import { useSingleOrderStore } from "../../../../store/product/Table.store";
import DialogBox from "../../common/ActionDialogbox";


export interface ITableItem {
  _id: string;
}
export interface Column<T> {
  label: string | React.ReactNode;
  key?: keyof T | "action";
  render?: (item: T) => React.ReactNode;
  renderData?: (
    item: T,
    index: number,
    handleActionClick?: (
      rowIndex: number,
      event: React.MouseEvent,
      row: T
    ) => void
  ) => React.ReactNode;
}

interface TableProps<T extends ITableItem> {
  columns: Column<T>[];
  data: T[];
  className?: string;
}

function TableData<T extends ITableItem>({ columns, data, className = "" }: TableProps<T>) {
  const tableRef = useRef<HTMLDivElement>(null);
  const [dialogPosition, setDialogPosition] = useState<"top" | "bottom">(
    "bottom"
  );
  const [openDialog, setOpenDialog] = useState<number | null>(null);
  const { setSelectedRow } = useSingleOrderStore();

  const handleActionClick = (
    rowIndex: number,
    event: React.MouseEvent,
    row: T
  ) => {
    setSelectedRow(row);

    if (openDialog === rowIndex) {
      setOpenDialog(null);
      return;
    }

    const tableRect = tableRef.current?.getBoundingClientRect();
    const buttonRect = event.currentTarget.getBoundingClientRect();

    if (tableRect && buttonRect) {
      const spaceBelow = tableRect.bottom - buttonRect.bottom;
      const spaceAbove = buttonRect.top - tableRect.top;

      setDialogPosition(
        spaceBelow < 500 && spaceAbove > 150 ? "top" : "bottom"
      );
    }

    setOpenDialog(rowIndex);
  };

  return (
    <div className={`w-full overflow-hidden ${className}`}>
      <div
        ref={tableRef}
        className="overflow-x-auto w-full relative scrollbar-hide"
      >
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="">
            <tr>
              {columns.map((col, i) => (
                <th
                  key={i}
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider whitespace-nowrap"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {data.map((item, idx) => (
              <tr
                key={idx}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                {columns.map((col, colIndex) => (
                  <td
                    key={colIndex}
                    className="px-4 py-4 whitespace-normal align-top"
                  >
                    <div className="text-sm text-gray-900">
                      {col.renderData ? (
                        col.renderData(item, idx, handleActionClick)
                      ) : col.render ? (
                        col.render(item)
                      ) : col.key === "action" ? (
                        <div className="relative">
                          <button
                            className="p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
                            onClick={(event) => handleActionClick(idx, event, item)}
                          >
                            <CiMenuKebab />
                          </button>
                          {openDialog === idx && (
                            <div
                              className={`absolute right-0 z-10 ${
                                dialogPosition === "top"
                                  ? "bottom-full mb-2"
                                  : "top-full mt-2"
                              }`}
                            >
                              <DialogBox setOpenDialog={setOpenDialog} row={item} />
                            </div>
                          )}
                        </div>
                      ) : col.key ? (
                        String(item[col.key as keyof T])
                      ) : (
                        ""
                      )}
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TableData;