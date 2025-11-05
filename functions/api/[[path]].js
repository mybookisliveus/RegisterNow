export async function onRequest(context) {
  const { request, env } = context;
  try {
    // Create a new request to the Worker's direct URL
    const workerURL = 'https://redirect-worker.mybookisliveus.workers.dev/';
    const newRequest = new Request(workerURL, {
      method: request.method,
      headers: request.headers,
      body: request.body
    });
    
    return await fetch(newRequest);
    
  } catch (error) {
    return new Response(`Pages Function error: ${error.message}`, { 
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}
