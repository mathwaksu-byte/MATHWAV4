2025-11-19T07:49:35.50167Z	Cloning repository...
2025-11-19T07:49:36.13947Z	From https://github.com/mathwaksu-byte/MATHWAV4
2025-11-19T07:49:36.139992Z	 * branch            c9a7a6174bad6d046dda1ef22805e69268ef5508 -> FETCH_HEAD
2025-11-19T07:49:36.140199Z	
2025-11-19T07:49:36.173165Z	HEAD is now at c9a7a61 api
2025-11-19T07:49:36.173768Z	
2025-11-19T07:49:36.254323Z	
2025-11-19T07:49:36.254828Z	Using v2 root directory strategy
2025-11-19T07:49:36.276916Z	Success: Finished cloning repository files
2025-11-19T07:49:38.0336Z	Checking for configuration in a Wrangler configuration file (BETA)
2025-11-19T07:49:38.034619Z	
2025-11-19T07:49:38.03573Z	Found wrangler.toml file. Reading build configuration...
2025-11-19T07:49:38.043065Z	pages_build_output_dir: build/client
2025-11-19T07:49:38.043187Z	Build environment variables: (none found)
2025-11-19T07:49:39.141931Z	Successfully read wrangler.toml file.
2025-11-19T07:49:39.210589Z	Detected the following tools from environment: npm@10.9.2, nodejs@22.16.0
2025-11-19T07:49:39.211304Z	Installing project dependencies: npm clean-install --progress=false
2025-11-19T07:49:41.283944Z	npm error code ERESOLVE
2025-11-19T07:49:41.284187Z	npm error ERESOLVE could not resolve
2025-11-19T07:49:41.284313Z	npm error
2025-11-19T07:49:41.284422Z	npm error While resolving: @remix-run/dev@2.17.2
2025-11-19T07:49:41.284489Z	npm error Found: wrangler@4.49.0
2025-11-19T07:49:41.284565Z	npm error node_modules/wrangler
2025-11-19T07:49:41.284669Z	npm error   dev wrangler@"^4.49.0" from the root project
2025-11-19T07:49:41.284769Z	npm error
2025-11-19T07:49:41.284864Z	npm error Could not resolve dependency:
2025-11-19T07:49:41.284964Z	npm error peerOptional wrangler@"^3.28.2" from @remix-run/dev@2.17.2
2025-11-19T07:49:41.285049Z	npm error node_modules/@remix-run/dev
2025-11-19T07:49:41.285125Z	npm error   dev @remix-run/dev@"^2.7.2" from the root project
2025-11-19T07:49:41.285224Z	npm error
2025-11-19T07:49:41.285356Z	npm error Conflicting peer dependency: wrangler@3.114.15
2025-11-19T07:49:41.28544Z	npm error node_modules/wrangler
2025-11-19T07:49:41.285521Z	npm error   peerOptional wrangler@"^3.28.2" from @remix-run/dev@2.17.2
2025-11-19T07:49:41.285612Z	npm error   node_modules/@remix-run/dev
2025-11-19T07:49:41.285747Z	npm error     dev @remix-run/dev@"^2.7.2" from the root project
2025-11-19T07:49:41.286064Z	npm error
2025-11-19T07:49:41.286293Z	npm error Fix the upstream dependency conflict, or retry
2025-11-19T07:49:41.28643Z	npm error this command with --force or --legacy-peer-deps
2025-11-19T07:49:41.286577Z	npm error to accept an incorrect (and potentially broken) dependency resolution.
2025-11-19T07:49:41.286688Z	npm error
2025-11-19T07:49:41.286807Z	npm error
2025-11-19T07:49:41.287049Z	npm error For a full report see:
2025-11-19T07:49:41.287156Z	npm error /opt/buildhome/.npm/_logs/2025-11-19T07_49_39_592Z-eresolve-report.txt
2025-11-19T07:49:41.28733Z	npm error A complete log of this run can be found in: /opt/buildhome/.npm/_logs/2025-11-19T07_49_39_592Z-debug-0.log
2025-11-19T07:49:41.312116Z	Error: Exit with error code: 1
2025-11-19T07:49:41.312318Z	    at ChildProcess.<anonymous> (/snapshot/dist/run-build.js)
2025-11-19T07:49:41.312457Z	    at Object.onceWrapper (node:events:652:26)
2025-11-19T07:49:41.312551Z	    at ChildProcess.emit (node:events:537:28)
2025-11-19T07:49:41.312649Z	    at ChildProcess._handle.onexit (node:internal/child_process:291:12)
2025-11-19T07:49:41.323104Z	Failed: build command exited with code: 1
2025-11-19T07:49:42.491466Z	Failed: error occurred while running build command