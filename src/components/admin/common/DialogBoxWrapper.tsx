

import React from "react";
import { DialogPosition } from "@/lib/utills/getDialogPosition";
import DialogBox from "./ActionDialogbox";

interface RowData {
  _id: string;
  [key: string]: unknown;
}

interface Props<T extends RowData> {
  position: DialogPosition;
  setOpenDialog: React.Dispatch<React.SetStateAction<number | null>>;
  row: T;
}

const DialogBoxWrapper = React.forwardRef<HTMLDivElement, Props<RowData>>(
  ({ position, setOpenDialog, row }, ref) => {
    return (
      <div
        ref={ref}
        className={`absolute right-0 z-10 ${
          position === "top" ? "bottom-full mb-2" : "top-full mt-2"
        }`}
      >
        <DialogBox setOpenDialog={setOpenDialog} row={row} />
      </div>
    );
  }
);

DialogBoxWrapper.displayName = "DialogBoxWrapper";

export default DialogBoxWrapper;
