import Collection from "@/lib/models/Collection";
import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    await connectToDB();

    const product = await Product.findById(params.productId).populate({
      path: "collections",
      model: Collection,
    });

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        { status: 404 }
      );
    }

    return NextResponse.json(product, { status: 200 });
  } catch (err) {
    console.log("[productId_GET]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { productId: string } }
) => {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    let product = await Product.findById(params.productId);

    if (!product) {
      return new NextResponse(
        JSON.stringify({ message: "Product not found" }),
        { status: 404 }
      );
    }

    const {
      title,
      description,
      media,
      category,
      collections,
      tags,
      sizes,
      colors,
      price,
      cost,
    } = await req.json();

    if (!title || !description || !media || !category || !price || !cost) {
      return new NextResponse("Not Enough to create a new product", {
        status: 400,
      });
    }

    const addedCollection = collections.filter(
      (collectionId: string) => !product.collections.includes(collectionId)
    );

    const removedCollection = product.collections.filter(
      (collection: string) => !collections.includes(collection)
    );

    await Promise.all([
      ...addedCollection.map((collectionId: string) => 
        Collection.findByIdAndUpdate(collectionId, {
          $push: { products: product._id },
        })
      ),

      ...removedCollection.map((collectionId: string) => 
        Collection.findByIdAndUpdate(collectionId, {
          $pull: { products: product._id },
        })
      )
    ]);

    const updatedProduct = await Product.findByIdAndUpdate(product._id, {
      title,
      description,
      media,
      category,
      collections,
      tags,
      sizes,
      colors,
      price,
      cost,
    }, { new: true }).populate({ path: "collections", model: Collection });

    await updatedProduct.save();

    return NextResponse.json(updatedProduct, { status: 200 });
  } catch (err) {
    console.log("[productId_POST]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};
