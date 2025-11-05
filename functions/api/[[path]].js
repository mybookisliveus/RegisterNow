export async function onRequest(context) {
  const { request, env } = context;
  return await env.API.fetch(request);
}
