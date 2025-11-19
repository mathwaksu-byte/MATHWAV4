2025-11-19T08:11:09.909498Z	Cloning repository...
2025-11-19T08:11:10.642703Z	From https://github.com/mathwaksu-byte/MATHWAV4
2025-11-19T08:11:10.643242Z	 * branch            68dbd75b8a8b7dd42b90d4452e245fb61ffbe3c3 -> FETCH_HEAD
2025-11-19T08:11:10.643403Z	
2025-11-19T08:11:10.678312Z	HEAD is now at 68dbd75 client
2025-11-19T08:11:10.678781Z	
2025-11-19T08:11:10.761078Z	
2025-11-19T08:11:10.761587Z	Using v2 root directory strategy
2025-11-19T08:11:10.785321Z	Success: Finished cloning repository files
2025-11-19T08:11:12.568161Z	Checking for configuration in a Wrangler configuration file (BETA)
2025-11-19T08:11:12.569128Z	
2025-11-19T08:11:12.570815Z	Found wrangler.toml file. Reading build configuration...
2025-11-19T08:11:12.577114Z	pages_build_output_dir: build/client
2025-11-19T08:11:12.577336Z	Build environment variables: (none found)
2025-11-19T08:11:13.682439Z	Successfully read wrangler.toml file.
2025-11-19T08:11:13.756663Z	Detected the following tools from environment: npm@10.9.2, nodejs@22.16.0
2025-11-19T08:11:13.757214Z	Installing project dependencies: npm clean-install --progress=false
2025-11-19T08:11:20.787351Z	
2025-11-19T08:11:20.787622Z	added 630 packages, and audited 631 packages in 7s
2025-11-19T08:11:20.787867Z	
2025-11-19T08:11:20.787989Z	180 packages are looking for funding
2025-11-19T08:11:20.788079Z	  run `npm fund` for details
2025-11-19T08:11:20.810206Z	
2025-11-19T08:11:20.810465Z	7 moderate severity vulnerabilities
2025-11-19T08:11:20.810655Z	
2025-11-19T08:11:20.810854Z	To address issues that do not require attention, run:
2025-11-19T08:11:20.811288Z	  npm audit fix
2025-11-19T08:11:20.811404Z	
2025-11-19T08:11:20.811601Z	Some issues need review, and may require choosing
2025-11-19T08:11:20.811698Z	a different dependency.
2025-11-19T08:11:20.812425Z	
2025-11-19T08:11:20.812548Z	Run `npm audit` for details.
2025-11-19T08:11:20.840665Z	Executing user command: npm run build
2025-11-19T08:11:21.245801Z	
2025-11-19T08:11:21.246076Z	> mathwa-client@0.0.1 build
2025-11-19T08:11:21.246204Z	> remix vite:build
2025-11-19T08:11:21.246318Z	
2025-11-19T08:11:21.977238Z	[33mThe CJS build of Vite's Node API is deprecated. See https://vite.dev/guide/troubleshooting.html#vite-cjs-node-api-deprecated for more details.[39m
2025-11-19T08:11:22.506232Z	[7m[33m warn [39m[27m Fetcher persistence behavior is changing in React Router v7
2025-11-19T08:11:22.50651Z	[33m┃[39m [90mYou can use the `v3_fetcherPersist` future flag to opt-in early.[39m
2025-11-19T08:11:22.506664Z	[33m┃[39m [90m-> https://remix.run/docs/en/2.13.1/start/future-flags#v3_fetcherPersist[39m
2025-11-19T08:11:22.506762Z	[33m┗[39m
2025-11-19T08:11:22.50761Z	[7m[33m warn [39m[27m Route discovery/manifest behavior is changing in React Router v7
2025-11-19T08:11:22.507868Z	[33m┃[39m [90mYou can use the `v3_lazyRouteDiscovery` future flag to opt-in early.[39m
2025-11-19T08:11:22.508019Z	[33m┃[39m [90m-> https://remix.run/docs/en/2.13.1/start/future-flags#v3_lazyRouteDiscovery[39m
2025-11-19T08:11:22.508522Z	[33m┗[39m
2025-11-19T08:11:22.508676Z	[7m[33m warn [39m[27m Relative routing behavior for splat routes is changing in React Router v7
2025-11-19T08:11:22.508933Z	[33m┃[39m [90mYou can use the `v3_relativeSplatPath` future flag to opt-in early.[39m
2025-11-19T08:11:22.509213Z	[33m┃[39m [90m-> https://remix.run/docs/en/2.13.1/start/future-flags#v3_relativeSplatPath[39m
2025-11-19T08:11:22.509606Z	[33m┗[39m
2025-11-19T08:11:22.509746Z	[7m[33m warn [39m[27m Data fetching is changing to a single fetch in React Router v7
2025-11-19T08:11:22.50986Z	[33m┃[39m [90mYou can use the `v3_singleFetch` future flag to opt-in early.[39m
2025-11-19T08:11:22.509966Z	[33m┃[39m [90m-> https://remix.run/docs/en/2.13.1/start/future-flags#v3_singleFetch[39m
2025-11-19T08:11:22.510115Z	[33m┗[39m
2025-11-19T08:11:22.510212Z	[7m[33m warn [39m[27m The format of errors thrown on aborted requests is changing in React Router v7
2025-11-19T08:11:22.510308Z	[33m┃[39m [90mYou can use the `v3_throwAbortReason` future flag to opt-in early.[39m
2025-11-19T08:11:22.510405Z	[33m┃[39m [90m-> https://remix.run/docs/en/2.13.1/start/future-flags#v3_throwAbortReason[39m
2025-11-19T08:11:22.51062Z	[33m┗[39m
2025-11-19T08:11:22.545443Z	Error: Cannot find package 'wrangler' imported from /opt/buildhome/repo/client/node_modules/@remix-run/dev/dist/vite/cloudflare-proxy-plugin.js
2025-11-19T08:11:22.545701Z	    at Object.getPackageJSONURL (node:internal/modules/package_json_reader:256:9)
2025-11-19T08:11:22.545881Z	    at packageResolve (node:internal/modules/esm/resolve:768:81)
2025-11-19T08:11:22.546101Z	    at moduleResolve (node:internal/modules/esm/resolve:854:18)
2025-11-19T08:11:22.546364Z	    at defaultResolve (node:internal/modules/esm/resolve:984:11)
2025-11-19T08:11:22.54651Z	    at ModuleLoader.defaultResolve (node:internal/modules/esm/loader:780:12)
2025-11-19T08:11:22.546626Z	    at ModuleLoader.#cachedDefaultResolve (node:internal/modules/esm/loader:704:25)
2025-11-19T08:11:22.546747Z	    at ModuleLoader.resolve (node:internal/modules/esm/loader:687:38)
2025-11-19T08:11:22.54685Z	    at ModuleLoader.getModuleJobForImport (node:internal/modules/esm/loader:305:38)
2025-11-19T08:11:22.546947Z	    at onImport.tracePromise.__proto__ (node:internal/modules/esm/loader:643:36)
2025-11-19T08:11:22.547063Z	    at TracingChannel.tracePromise (node:diagnostics_channel:344:14) {
2025-11-19T08:11:22.547177Z	  code: 'ERR_MODULE_NOT_FOUND'
2025-11-19T08:11:22.547294Z	}
2025-11-19T08:11:22.567351Z	Failed: Error while executing user command. Exited with error code: 1
2025-11-19T08:11:22.57851Z	Failed: build command exited with code: 1
2025-11-19T08:11:23.708936Z	Failed: error occurred while running build command