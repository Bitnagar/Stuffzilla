import { Webhook } from "svix";
import { headers } from "next/headers";
import { MongoClient } from "mongodb";

export async function POST(req) {
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
      status: 400
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
      "svix-signature": svix_signature
    });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error occured", {
      status: 400
    });
  }

  const eventType = evt.type;
  if (eventType === "user.created" || eventType === "user.updated") {
    try {
      const { email_address } = evt.data.email_addresses[0];
      const {
        id,
        first_name,
        last_name,
        profile_image_url,
        created_at,
        updated_at
      } = evt.data;

      //insert data to mongodb
      const uri = process.env.DATABASE_URL;
      const client = new MongoClient(uri);
      client
        .connect()
        .then(async () => {
          const collection = client.db("stuffzilla").collection("users");
          //if user already exist, then update it. Else create it
          const userData = collection.updateOne(
            {
              email_address: email_address
            },
            {
              $set: {
                id: id,
                first_name: first_name,
                last_name: last_name,
                email_address: email_address,
                profile_image_url: profile_image_url,
                created_at: created_at,
                updated_at: updated_at
              }
            },
            { upsert: true }
          );
          return userData;
        })
        .then(async (userData) => {
          if (userData) await client.close();
        });

      return new Response(
        JSON.stringify({ "message": "Database updated with user record." }),
        { status: 201 }
      );
    } catch (error) {
      return new Response(JSON.stringify({ "message": error.message }), {
        status: 500
      });
    }
  }
  return new Response(
    JSON.stringify({ "message": "User record upsert failed." }),
    { status: 500 }
  );
}
