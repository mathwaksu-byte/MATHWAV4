2025-11-19T11:29:58.191837Z	Cloning repository...
2025-11-19T11:29:58.777577Z	From https://github.com/mathwaksu-byte/MATHWAV4
2025-11-19T11:29:58.77807Z	 * branch            0b662330322b0b1e51e2fe600bd6b89746a83405 -> FETCH_HEAD
2025-11-19T11:29:58.778169Z	
2025-11-19T11:29:58.811474Z	HEAD is now at 0b66233 api
2025-11-19T11:29:58.812201Z	
2025-11-19T11:29:58.894341Z	
2025-11-19T11:29:58.894846Z	Using v2 root directory strategy
2025-11-19T11:29:58.918111Z	Success: Finished cloning repository files
2025-11-19T11:30:00.992958Z	Checking for configuration in a Wrangler configuration file (BETA)
2025-11-19T11:30:00.993572Z	
2025-11-19T11:30:00.995199Z	Found wrangler.toml file. Reading build configuration...
2025-11-19T11:30:01.002128Z	pages_build_output_dir: build/client
2025-11-19T11:30:01.002393Z	Build environment variables: (none found)
2025-11-19T11:30:02.095285Z	Successfully read wrangler.toml file.
2025-11-19T11:30:02.16989Z	Detected the following tools from environment: npm@10.9.2, nodejs@22.16.0
2025-11-19T11:30:02.170589Z	Installing project dependencies: npm clean-install --progress=false
2025-11-19T11:30:05.14297Z	npm warn deprecated rollup-plugin-inject@3.0.2: This package has been deprecated and is no longer maintained. Please use @rollup/plugin-inject.
2025-11-19T11:30:05.19125Z	npm warn deprecated sourcemap-codec@1.4.8: Please use @jridgewell/sourcemap-codec instead
2025-11-19T11:30:11.85318Z	
2025-11-19T11:30:11.853455Z	added 683 packages, and audited 684 packages in 9s
2025-11-19T11:30:11.853709Z	
2025-11-19T11:30:11.854023Z	187 packages are looking for funding
2025-11-19T11:30:11.854164Z	  run `npm fund` for details
2025-11-19T11:30:11.903718Z	
2025-11-19T11:30:11.904162Z	8 moderate severity vulnerabilities
2025-11-19T11:30:11.904335Z	
2025-11-19T11:30:11.904504Z	To address issues that do not require attention, run:
2025-11-19T11:30:11.904625Z	  npm audit fix
2025-11-19T11:30:11.90484Z	
2025-11-19T11:30:11.905032Z	To address all issues possible (including breaking changes), run:
2025-11-19T11:30:11.905143Z	  npm audit fix --force
2025-11-19T11:30:11.90528Z	
2025-11-19T11:30:11.905391Z	Some issues need review, and may require choosing
2025-11-19T11:30:11.905509Z	a different dependency.
2025-11-19T11:30:11.905963Z	
2025-11-19T11:30:11.906071Z	Run `npm audit` for details.
2025-11-19T11:30:11.934936Z	Executing user command: npm run build
2025-11-19T11:30:12.362333Z	
2025-11-19T11:30:12.362681Z	> mathwa-client@0.0.1 build
2025-11-19T11:30:12.362852Z	> remix vite:build
2025-11-19T11:30:12.363024Z	
2025-11-19T11:30:13.106111Z	[33mThe CJS build of Vite's Node API is deprecated. See https://vite.dev/guide/troubleshooting.html#vite-cjs-node-api-deprecated for more details.[39m
2025-11-19T11:30:13.647597Z	[7m[33m warn [39m[27m Fetcher persistence behavior is changing in React Router v7
2025-11-19T11:30:13.64864Z	[33m┃[39m [90mYou can use the `v3_fetcherPersist` future flag to opt-in early.[39m
2025-11-19T11:30:13.649333Z	[33m┃[39m [90m-> https://remix.run/docs/en/2.13.1/start/future-flags#v3_fetcherPersist[39m
2025-11-19T11:30:13.650271Z	[33m┗[39m
2025-11-19T11:30:13.650922Z	[7m[33m warn [39m[27m Route discovery/manifest behavior is changing in React Router v7
2025-11-19T11:30:13.651438Z	[33m┃[39m [90mYou can use the `v3_lazyRouteDiscovery` future flag to opt-in early.[39m
2025-11-19T11:30:13.651777Z	[33m┃[39m [90m-> https://remix.run/docs/en/2.13.1/start/future-flags#v3_lazyRouteDiscovery[39m
2025-11-19T11:30:13.65231Z	[33m┗[39m
2025-11-19T11:30:13.652837Z	[7m[33m warn [39m[27m Relative routing behavior for splat routes is changing in React Router v7
2025-11-19T11:30:13.653374Z	[33m┃[39m [90mYou can use the `v3_relativeSplatPath` future flag to opt-in early.[39m
2025-11-19T11:30:13.653942Z	[33m┃[39m [90m-> https://remix.run/docs/en/2.13.1/start/future-flags#v3_relativeSplatPath[39m
2025-11-19T11:30:13.65436Z	[33m┗[39m
2025-11-19T11:30:13.654804Z	[7m[33m warn [39m[27m Data fetching is changing to a single fetch in React Router v7
2025-11-19T11:30:13.655765Z	[33m┃[39m [90mYou can use the `v3_singleFetch` future flag to opt-in early.[39m
2025-11-19T11:30:13.656104Z	[33m┃[39m [90m-> https://remix.run/docs/en/2.13.1/start/future-flags#v3_singleFetch[39m
2025-11-19T11:30:13.656602Z	[33m┗[39m
2025-11-19T11:30:13.65679Z	[7m[33m warn [39m[27m The format of errors thrown on aborted requests is changing in React Router v7
2025-11-19T11:30:13.65703Z	[33m┃[39m [90mYou can use the `v3_throwAbortReason` future flag to opt-in early.[39m
2025-11-19T11:30:13.657321Z	[33m┃[39m [90m-> https://remix.run/docs/en/2.13.1/start/future-flags#v3_throwAbortReason[39m
2025-11-19T11:30:13.657488Z	[33m┗[39m
2025-11-19T11:30:14.828052Z	[36mvite v5.4.21 [32mbuilding for production...[36m[39m
2025-11-19T11:30:14.89175Z	transforming...
2025-11-19T11:30:16.41275Z	[32m✓[39m 104 modules transformed.
2025-11-19T11:30:16.51372Z	rendering chunks...
2025-11-19T11:30:16.607282Z	computing gzip size...
2025-11-19T11:30:16.620072Z	[2mbuild/client/[22m[32m.vite/manifest.json                    [39m[1m[2m  3.00 kB[22m[1m[22m[2m │ gzip:  0.55 kB[22m
2025-11-19T11:30:16.620368Z	[2mbuild/client/[22m[2massets/[22m[35mtailwind-BbJsmyfG.css           [39m[1m[2m 21.08 kB[22m[1m[22m[2m │ gzip:  4.39 kB[22m
2025-11-19T11:30:16.620503Z	[2mbuild/client/[22m[2massets/[22m[36msitemap_._xml-CSxRPO1x.js       [39m[1m[2m  0.05 kB[22m[1m[22m[2m │ gzip:  0.07 kB[22m
2025-11-19T11:30:16.620604Z	[2mbuild/client/[22m[2massets/[22m[36mrobots_._txt-CSxRPO1x.js        [39m[1m[2m  0.05 kB[22m[1m[22m[2m │ gzip:  0.07 kB[22m
2025-11-19T11:30:16.620697Z	[2mbuild/client/[22m[2massets/[22m[36mgallery-mpuchfZ6.js             [39m[1m[2m  0.64 kB[22m[1m[22m[2m │ gzip:  0.41 kB[22m
2025-11-19T11:30:16.620823Z	[2mbuild/client/[22m[2massets/[22m[36mroot-By9Btg9O.js                [39m[1m[2m  1.62 kB[22m[1m[22m[2m │ gzip:  0.94 kB[22m
2025-11-19T11:30:16.620932Z	[2mbuild/client/[22m[2massets/[22m[36mabout-BD1oSkzc.js               [39m[1m[2m  1.95 kB[22m[1m[22m[2m │ gzip:  0.86 kB[22m
2025-11-19T11:30:16.621027Z	[2mbuild/client/[22m[2massets/[22m[36mentry.client-3-lGPQsV.js        [39m[1m[2m  3.72 kB[22m[1m[22m[2m │ gzip:  1.41 kB[22m
2025-11-19T11:30:16.621117Z	[2mbuild/client/[22m[2massets/[22m[36muniversities._slug-B1pJgxoR.js  [39m[1m[2m  5.97 kB[22m[1m[22m[2m │ gzip:  1.98 kB[22m
2025-11-19T11:30:16.621211Z	[2mbuild/client/[22m[2massets/[22m[36mapply-DjN-S7wY.js               [39m[1m[2m  6.52 kB[22m[1m[22m[2m │ gzip:  1.87 kB[22m
2025-11-19T11:30:16.621309Z	[2mbuild/client/[22m[2massets/[22m[36mjsx-runtime-56DGgGmo.js         [39m[1m[2m  8.11 kB[22m[1m[22m[2m │ gzip:  3.05 kB[22m
2025-11-19T11:30:16.621412Z	[2mbuild/client/[22m[2massets/[22m[36m_index-BGA3huCX.js              [39m[1m[2m 10.13 kB[22m[1m[22m[2m │ gzip:  3.54 kB[22m
2025-11-19T11:30:16.621501Z	[2mbuild/client/[22m[2massets/[22m[36mcomponents-3CgQxf8-.js          [39m[1m[2m247.95 kB[22m[1m[22m[2m │ gzip: 80.08 kB[22m
2025-11-19T11:30:16.621654Z	[32m✓ built in 1.76s[39m
2025-11-19T11:30:16.90065Z	[36mvite v5.4.21 [32mbuilding SSR bundle for production...[36m[39m
2025-11-19T11:30:16.903573Z	transforming...
2025-11-19T11:30:17.018961Z	[32m✓[39m 19 modules transformed.
2025-11-19T11:30:17.041351Z	rendering chunks...
2025-11-19T11:30:17.043432Z	[2mbuild/server/[22m[32m.vite/manifest.json           [39m[1m[2m 0.39 kB[22m[1m[22m
2025-11-19T11:30:17.043693Z	[2mbuild/server/[22m[2massets/[22m[35mtailwind-BbJsmyfG.css  [39m[1m[2m21.08 kB[22m[1m[22m
2025-11-19T11:30:17.045074Z	[2mbuild/server/[22m[36mindex.js                      [39m[1m[2m53.84 kB[22m[1m[22m
2025-11-19T11:30:17.066215Z	[32m✓ built in 143ms[39m
2025-11-19T11:30:17.099271Z	Finished
2025-11-19T11:30:18.088525Z	Checking for configuration in a Wrangler configuration file (BETA)
2025-11-19T11:30:18.089097Z	
2025-11-19T11:30:18.089925Z	Found wrangler.toml file. Reading build configuration...
2025-11-19T11:30:18.097823Z	pages_build_output_dir: build/client
2025-11-19T11:30:18.098158Z	Build environment variables: (none found)
2025-11-19T11:30:19.195903Z	Successfully read wrangler.toml file.
2025-11-19T11:30:19.196999Z	Found Functions directory at /functions. Uploading.
2025-11-19T11:30:19.20353Z	 ⛅️ wrangler 3.101.0
2025-11-19T11:30:19.203778Z	-------------------
2025-11-19T11:30:20.493474Z	✨ Compiled Worker successfully
2025-11-19T11:30:21.595798Z	Validating asset output directory
2025-11-19T11:30:24.343343Z	Deploying your site to Cloudflare's global network...
2025-11-19T11:30:29.780118Z	Uploading... (13/13)
2025-11-19T11:30:29.780975Z	✨ Success! Uploaded 0 files (13 already uploaded) (0.34 sec)
2025-11-19T11:30:29.781226Z	
2025-11-19T11:30:30.333074Z	✨ Upload complete!
2025-11-19T11:30:34.704582Z	Success: Assets published!
2025-11-19T11:30:35.993305Z	Error: Failed to publish your Function. Got error: Could not resolve service binding 'API'. Target script 'mathwa-api' not found. Please verify the target script and try again.