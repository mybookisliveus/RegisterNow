export async function onRequest(context) {
  try {
    // Get the original request URL and parameters
    const url = new URL(context.request.url);
    const campaign = url.searchParams.get('campaign') || 'welcome';
    
    // Call your Worker with the campaign parameter
    const workerURL = `https://redirect-worker.mybookisliveus.workers.dev/?campaign=${campaign}`;
    
    const response = await fetch(workerURL);
    return response;
    
  } catch (error) {
    return new Response(`Pages Function error: ${error.message}`, { 
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
}
