"use client";

import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<CustomerType>[] = [
    {
        accessorKey: "fullName",
        header: "FullName",
    },
    {
        accessorKey: "phone",
        header: "Phone",
    },
    {
        accessorKey: "shippingAddress",
        header: "ShippingAddress",
    },
];