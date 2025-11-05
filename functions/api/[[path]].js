export async function onRequest(context) {
  const url = new URL(context.request.url);
  const campaign = url.searchParams.get('campaign') || 'welcome';
  
  // Your HTTP URLs
  const destinations = {
    'welcome': 'http://p8r9.com/?utm_campaign=q0PmHjCTqM&v1=[v1]&v2=[v2]&v3=[v3]',
    'promo': 'http://p8r9.com/?utm_campaign=promo123',
    'special': 'http://p8r9.com/?utm_campaign=special456'
  };
  
  const redirectURL = destinations[campaign] || destinations['welcome'];
  
  // Return HTML with meta refresh or JavaScript redirect
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta http-equiv="refresh" content="0; url=${redirectURL}">
      </head>
      <body>
        <script>window.location.href = '${redirectURL}';</script>
        <p>Redirecting... <a href="${redirectURL}">Click here if not redirected</a></p>
      </body>
    </html>
  `;
  
  return new Response(html, {
    headers: { 'Content-Type': 'text/html' }
  });
}
