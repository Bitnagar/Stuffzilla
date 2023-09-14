import { Webhook } from "svix";
import { headers } from "next/headers";
import { PrismaClient } from "@prisma/client";

export async function POST(req) {
  const prisma = new PrismaClient();
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

  if (!WEBHOOK_SECRET) {
    throw new Error(
      "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error occured -- no svix headers", {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new SVIX instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);

  let evt;

  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400,
    });
  }

  const eventType = evt.type;
  if (eventType === "user.created" || eventType === "user.updated") {
    const { email_address } = evt.data.email_addresses[0];
    const {
      id,
      first_name,
      last_name,
      profile_image_url,
      created_at,
      updated_at,
    } = evt.data;

    await prisma.user.upsert({
      where: { clerkId: id },
      create: {
        clerkId: id,
        email: email_address,
        avatar: profile_image_url || "",
        firstName: first_name,
        lastName: last_name || "",
        createdAt: new Date(created_at),
        updatedAt: new Date(updated_at),
      },
      update: {
        email: email_address,
        avatar: profile_image_url || "",
        firstName: first_name,
        lastName: last_name || "",
        updatedAt: new Date(updated_at),
      },
    });

    await prisma.cart.upsert({
      where: { userId: id },
      create: {
        userId: id,
        products: { "products": [""] },
        createdAt: new Date(created_at),
        updatedAt: new Date(updated_at),
      },
      update: {
        products: { "products": [""] },
        updatedAt: new Date(updated_at),
      },
    });
  }

  return new Response("", { status: 201 });
}
