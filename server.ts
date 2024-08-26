// import { APP_BASE_HREF } from '@angular/common';
// import { CommonEngine } from '@angular/ssr';
// import express from 'express';
// import { fileURLToPath } from 'node:url';
// import { dirname, join, resolve } from 'node:path';
// import bootstrap from './src/main.server';
// import { Routes } from '@angular/router';
// import { AboutComponent } from './src/app/pages/about/about.component';
// import { HomeComponent } from './src/app/pages/home/home.component';
// import { FeaturesComponent } from './src/app/pages/features/features.component';
// import { CalcComponent } from './src/app/pages/calc/calc.component';
// import { PageNotFoundComponent } from './src/app/pages/page-not-found/page-not-found.component';

// // The Express app is exported so that it can be used by serverless Functions.
// export function app(): express.Express {
//   const server = express();
//   const serverDistFolder = dirname(fileURLToPath(import.meta.url));
//   const browserDistFolder = resolve(serverDistFolder, '../browser');
//   const indexHtml = join(serverDistFolder, 'index.server.html');

//   const commonEngine = new CommonEngine();

//   server.set('view engine', 'html');
//   server.set('views', browserDistFolder);

//   // Example Express Rest API endpoints
//   // server.get('/api/**', (req, res) => { });
//   // Serve static files from /browser
//   server.get(
//     '**',
//     express.static(browserDistFolder, {
//       maxAge: '1y',
//       index: 'index.html',
//     })
//   );

//   // All regular routes use the Angular engine
//   server.get('**', (req, res, next) => {
//     const { protocol, originalUrl, baseUrl, headers } = req;

//     commonEngine
//       .render({
//         bootstrap,
//         documentFilePath: indexHtml,
//         url: `${protocol}://${headers.host}${originalUrl}`,
//         publicPath: browserDistFolder,
//         providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
//       })
//       .then((html) => res.send(html))
//       .catch((err) => next(err));
//   });

//   return server;
// }

// function run(): void {
//   const port = process.env['PORT'] || 4000;

//   // Start up the Node server
//   const server = app();
//   server.listen(port, () => {
//     console.log(`Node Express server listening on http://localhost:${port}`);
//   });
// }

// run();
// export const routes: Routes = [
//   { path: 'features', component: FeaturesComponent },
//   { path: 'home', component: HomeComponent },
//   { path: 'calc', component: CalcComponent },
//   { path: 'adv', component: CalcComponent },
//   { path: 'about', component: AboutComponent },
//   { path: '', pathMatch: 'full', redirectTo: 'home' }, // default page
//   { path: '**', loadComponent: () => PageNotFoundComponent }, // default page
// ];
