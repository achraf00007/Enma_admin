"use client";

import { DataTable } from "@/components/custom ui/DataTable";
import Loader from "@/components/custom ui/Loader";
import { columns } from "@/components/products/ProductColumns";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Products() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<ProductType[]>([]);

  const router = useRouter();

  const getProducts = async () => {
    try {
      const response = await fetch("/api/products", { method: "GET" });
      const data = await response.json();
      setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error("[Products_GET]", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <div className="px-10 py-5">
      <div className="flex justify-between items-center">
        <p className="text-heading2-bold text-primary-700">Products</p>
        <Button
          className="bg-primary-700 text-white"
          onClick={() => router.push("/products/new")}
        >
          <Plus className="h4 w-4 mr-2" /> New product
        </Button>
      </div>

      <Separator className="bg-primary-300 mt-4 mb-7" />

      <DataTable columns={columns} data={products} searchKey="title" />
    </div>
  );
}
