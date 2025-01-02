"use client";

import { columns } from "@/components/collections/CollectionColumns";
import { DataTable } from "@/components/custom ui/DataTable";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Collections() {

  const [loading, setLoading] = useState(false);
  const [collections, setCollections] = useState([]);
  const router = useRouter();

  const getCollections = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/collections",{ method: "GET" });
      const data = await response.json();
      setCollections(data);
      setLoading(false);
    } catch (err) {
      console.log("[Collections_GET]", err);
    }
  }

  useEffect(() => {
    getCollections();
  }, []);

  return(
    <div className="px-10 py-5">
      <div className="flex justify-between items-center">
        <p className="text-heading2-bold">
          Collections
        </p>
        <Button className="bg-blue-1 text-white" onClick={() => router.push("/collections/new")}>
          <Plus className="h4 w-4 mr-2" /> New collection
        </Button>
      </div>

      <Separator className="bg-grey-1 mt-4 mb-7" />

      <DataTable columns={columns} data={collections} searchKey="title" />
    </div>
  );
}
