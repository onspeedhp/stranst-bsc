export async function GET() {
  const serverTime = new Date().toISOString();
  return new Response(JSON.stringify({ serverTime }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
