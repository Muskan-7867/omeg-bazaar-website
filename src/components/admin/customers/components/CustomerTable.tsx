"use client"
import { useQuery } from "@tanstack/react-query";

import { fetchUsersQuery } from "../../../../services/queries";

import { CurrentUser } from "../../../../types/auth";
import { useEffect } from "react";
import Pagination from "@/components/common/Pagination";
import TableData, { Column } from "./TableData";

const OrderTable = () => {
  const itemsPerPage = 10;
  const { data: users } = useQuery(fetchUsersQuery());

  useEffect(() => {
    if (users) {
      console.log("from table", users);
    }
  }, [users]);

  const columns: Column<CurrentUser>[] = [
    { label: "UserName", key: "username" },
    { label: "Email", key: "email" },
    {
      label: "Contact",
      render: (row) =>
        typeof row.address === "object" && row.address !== null
          ? row.address.phone || "N/A"
          : "N/A"
    },

    {
      label: "Orders",
      render: (row) => row.order?.length
    },
    {
      label: "Address",
      render: (row) => (
        <div className="">
          {typeof row.address === "object" && row.address !== null ? (
            <>
              <span>{row.address.address1 || "Address 1 not available"}</span>
              {", "}
              <span>{row.address.street || "Street not available"}</span>
              {", "}
              <span>{row.address.city || "City not available"}</span>
              {", "}
              <span>{row.address.state || "State not available"}</span>
              {", "}
              <span>{row.address.country || "Country not available"}</span>
            </>
          ) : (
            "No address available"
          )}
        </div>
      )
    }
  ];

  return (
    <>
      <TableData<CurrentUser> columns={columns} data={users ?? []} />
      <Pagination
        totalProducts={users?.length ?? 0}
        productPerPage={itemsPerPage}
      />
    </>
  );
};

export default OrderTable;
