2025-11-19T07:22:17.772Z	Initializing build environment...
2025-11-19T07:22:17.772Z	Initializing build environment...
2025-11-19T07:22:19.095Z	Success: Finished initializing build environment
2025-11-19T07:22:19.487Z	Cloning repository...
2025-11-19T07:22:20.662Z	Restoring from dependencies cache
2025-11-19T07:22:20.664Z	Restoring from build output cache
2025-11-19T07:22:20.667Z	Detected the following tools from environment: npm@10.9.2, nodejs@22.16.0
2025-11-19T07:22:21.005Z	Installing project dependencies: npm clean-install --progress=false
2025-11-19T07:22:30.004Z	
2025-11-19T07:22:30.004Z	added 229 packages, and audited 230 packages in 9s
2025-11-19T07:22:30.004Z	
2025-11-19T07:22:30.004Z	34 packages are looking for funding
2025-11-19T07:22:30.004Z	  run `npm fund` for details
2025-11-19T07:22:30.006Z	
2025-11-19T07:22:30.007Z	found 0 vulnerabilities
2025-11-19T07:22:30.226Z	Executing user build command: npm install && npm run build
2025-11-19T07:22:30.935Z	
2025-11-19T07:22:30.936Z	up to date, audited 230 packages in 519ms
2025-11-19T07:22:30.936Z	
2025-11-19T07:22:30.936Z	34 packages are looking for funding
2025-11-19T07:22:30.936Z	  run `npm fund` for details
2025-11-19T07:22:30.936Z	
2025-11-19T07:22:30.936Z	found 0 vulnerabilities
2025-11-19T07:22:31.178Z	
2025-11-19T07:22:31.179Z	> mathwa-api@0.0.1 build
2025-11-19T07:22:31.179Z	> tsc -b
2025-11-19T07:22:31.179Z	
2025-11-19T07:22:35.152Z	Success: Build command completed
2025-11-19T07:22:35.342Z	Executing user deploy command: npx wrangler deploy
2025-11-19T07:22:38.954Z	
2025-11-19T07:22:38.955Z	 ⛅️ wrangler 4.49.0
2025-11-19T07:22:38.955Z	───────────────────
2025-11-19T07:22:38.979Z	
2025-11-19T07:22:39.048Z	✘ [ERROR] The entry-point file at "src/index.ts" was not found.
2025-11-19T07:22:39.049Z	
2025-11-19T07:22:39.049Z	
2025-11-19T07:22:39.071Z	
2025-11-19T07:22:39.071Z	Cloudflare collects anonymous telemetry about your usage of Wrangler. Learn more at https://github.com/cloudflare/workers-sdk/tree/main/packages/wrangler/telemetry.md
2025-11-19T07:22:39.087Z	🪵  Logs were written to "/opt/buildhome/.config/.wrangler/logs/wrangler-2025-11-19_07-22-38_478.log"
2025-11-19T07:22:39.206Z	Failed: error occurred while running deploy command