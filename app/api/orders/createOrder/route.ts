import { NextRequest, NextResponse } from "next/server";
import Order from "@/lib/models/Order";
import Customer from "@/lib/models/Customer";
import { connectToDB } from "@/lib/mongoDB";

export const POST = async (req: NextRequest) => {
  try {
    await connectToDB();

    // Récupération des données de la requête
    const { products, totalAmount, customer } = await req.json();

    // Vérification basique des données reçues
    if (!products || !Array.isArray(products) || products.length === 0) {
      return new NextResponse("Products are required", { status: 400 });
    }
    if (!customer || !customer.fullName || !customer.phone) {
      return new NextResponse("Customer fullName and phone are required", { status: 400 });
    }

    // Gestion du Customer
    let existingCustomer = await Customer.findOne({ phone: customer.phone });

    if (existingCustomer) {
      // Mise à jour des informations du client existant
      existingCustomer.fullName = customer.fullName;
      existingCustomer.shippingAddress = customer.shippingAddress;
      existingCustomer.updatedAt = new Date();
      await existingCustomer.save();
    } else {
      // Création d'un nouveau client
      existingCustomer = await Customer.create({
        fullName: customer.fullName,
        phone: customer.phone,
        shippingAddress: customer.shippingAddress,
      });
    }

    // Création de la commande
    const newOrder = await Order.create({
      products: products.map((p:any)=>({
        product: p.item._id,
        color: p.color,
        size: p.size,
        quantity: p.quantity,
      })),
      customer: {
        fullName: existingCustomer.fullName,
        phone: existingCustomer.phone,
        shippingAddress: existingCustomer.shippingAddress,
      },
      totalAmount,
    });

    // Ajout de l'ID de la commande dans le Customer
    existingCustomer.orders.push(newOrder._id);
    await existingCustomer.save();

    // Retour de la réponse
    return new NextResponse(
      JSON.stringify({
        message: "Order and Customer created/updated",
        order: newOrder,
        customer: existingCustomer,
      }),
      { status: 201, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("[Order_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};
