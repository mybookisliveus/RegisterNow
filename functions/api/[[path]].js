export async function onRequest(context) {
  try {
    // Call your Worker directly by its URL
    const workerResponse = await fetch('https://redirect-worker.mybookisliveus.workers.dev/');
    return workerResponse;
  } catch (error) {
    return new Response(`Error: ${error.message}`, { status: 500 });
  }
}
