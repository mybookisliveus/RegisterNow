export async function onRequest(context) {
  const { request, env } = context;
  return await env.REDIRECT_WORKER.fetch(request);
}
