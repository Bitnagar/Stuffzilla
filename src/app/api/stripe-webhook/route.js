export async function POST(req) {
  let event = await req.json();
  console.log(event);
  return new Response({ status: 200 });
}
