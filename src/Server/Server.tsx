import express from 'express';
import fs from 'fs';
import path from 'path';
import { renderToString } from 'react-dom/server';
import {
  createStaticHandler,
  createStaticRouter,
  StaticRouterProvider,
} from 'react-router-dom/server';
import routes from '../Routes';

const app = express();
const PORT = 3000;
const CLIENT_DIST = 'dist/client';
const ASSETS_PATH = path.resolve(CLIENT_DIST, 'assets');

// Serve static client assets
app.use(express.static(CLIENT_DIST));

app.get('/{*any}', async (req, res) => {
  // Detect client JS bundle
  let jsBundle = '/assets/main.js';
  try {
    const jsFiles = fs.readdirSync(ASSETS_PATH).filter((f) => f.endsWith('.js'));
    if (jsFiles.length > 0) jsBundle = `/assets/${jsFiles[0]}`;
    else console.warn('⚠️ No JS bundle found in assets directory.');
  } catch (err) {
    console.warn('⚠️ Could not resolve JS bundle:', err);
  }

  const handler = createStaticHandler(routes);
  const request = new Request(`${req.protocol}://${req.get('host')}${req.originalUrl}`, {
    method: req.method,
    headers: req.headers as HeadersInit,
    body: ['GET', 'HEAD'].includes(req.method) ? undefined : req.body,
  });

  const context = await handler.query(request);

  // Handle redirect or error responses
  if (context instanceof Response) {
    const location = context.headers.get('Location');
    if (context.status >= 300 && context.status < 400 && location) {
      return res.redirect(context.status, location);
    }
    const text = await context.text();
    return res.status(context.status).send(text);
  }

  const router = createStaticRouter(handler.dataRoutes, context);
  const html = renderToString(<StaticRouterProvider router={router} context={context} />);

  res.send(`<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Movie Browser App</title>
      </head>
      <body>
        <div id="root">${html}</div>
        <script type="module" src="${jsBundle}"></script>
      </body>
    </html>`);
});

app.listen(PORT, () => console.info(`Server running on http://localhost:${PORT}`));
