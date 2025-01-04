import Product from "@/lib/models/Product";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const { userId } = await auth();

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }

        await connectToDB();

        const { title, description, media, category, collections, tags, sizes, colors, price, cost } = await req.json();
        if (!title || !description || !media || !category || !price || !cost) {
            return new NextResponse("Not enough data to create a new product", { status: 400 });
        }

        const newProduct = await Product.create({
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
        });

        await newProduct.save();

        return NextResponse.json(newProduct, { status: 200 });

    } catch (err) {
        console.log("[products_POST]", err);
        return new NextResponse("Internal Error", { status: 500 }); 
    }
};