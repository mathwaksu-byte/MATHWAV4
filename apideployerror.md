2025-11-19T11:41:56.717Z	Initializing build environment...
2025-11-19T11:41:58.092Z	Success: Finished initializing build environment
2025-11-19T11:41:58.360Z	Cloning repository...
2025-11-19T11:41:59.330Z	Detected the following tools from environment: npm@10.9.2, nodejs@22.16.0
2025-11-19T11:41:59.331Z	Restoring from dependencies cache
2025-11-19T11:41:59.333Z	Restoring from build output cache
2025-11-19T11:42:00.222Z	Success: Dependencies restored from build cache.
2025-11-19T11:42:00.334Z	Installing project dependencies: npm clean-install --progress=false
2025-11-19T11:42:06.569Z	
2025-11-19T11:42:06.570Z	added 229 packages, and audited 230 packages in 6s
2025-11-19T11:42:06.570Z	
2025-11-19T11:42:06.570Z	34 packages are looking for funding
2025-11-19T11:42:06.570Z	  run `npm fund` for details
2025-11-19T11:42:06.570Z	
2025-11-19T11:42:06.570Z	found 0 vulnerabilities
2025-11-19T11:42:06.748Z	Executing user build command: npm install && npm run build
2025-11-19T11:42:07.425Z	
2025-11-19T11:42:07.425Z	up to date, audited 230 packages in 514ms
2025-11-19T11:42:07.425Z	
2025-11-19T11:42:07.425Z	34 packages are looking for funding
2025-11-19T11:42:07.425Z	  run `npm fund` for details
2025-11-19T11:42:07.426Z	
2025-11-19T11:42:07.426Z	found 0 vulnerabilities
2025-11-19T11:42:07.626Z	
2025-11-19T11:42:07.626Z	> mathwa-api@0.0.1 build
2025-11-19T11:42:07.626Z	> tsc -b
2025-11-19T11:42:07.626Z	
2025-11-19T11:42:11.471Z	Success: Build command completed
2025-11-19T11:42:11.577Z	Executing user deploy command: npx wrangler deploy
2025-11-19T11:42:14.133Z	
2025-11-19T11:42:14.133Z	 ⛅️ wrangler 4.49.0
2025-11-19T11:42:14.133Z	───────────────────
2025-11-19T11:42:14.144Z	
2025-11-19T11:42:14.191Z	✘ [ERROR] Missing entry-point to Worker script or to assets directory
2025-11-19T11:42:14.191Z	
2025-11-19T11:42:14.191Z	  
2025-11-19T11:42:14.191Z	  If there is code to deploy, you can either:
2025-11-19T11:42:14.191Z	  - Specify an entry-point to your Worker script via the command line (ex: `npx wrangler deploy src/index.ts`)
2025-11-19T11:42:14.192Z	  - Or create a "wrangler.jsonc" file containing:
2025-11-19T11:42:14.192Z	  
2025-11-19T11:42:14.192Z	  ```
2025-11-19T11:42:14.192Z	  {
2025-11-19T11:42:14.192Z	    "name": "worker-name",
2025-11-19T11:42:14.192Z	    "compatibility_date": "2025-11-19",
2025-11-19T11:42:14.192Z	    "main": "src/index.ts"
2025-11-19T11:42:14.192Z	  }
2025-11-19T11:42:14.192Z	  ```
2025-11-19T11:42:14.192Z	  
2025-11-19T11:42:14.192Z	  
2025-11-19T11:42:14.192Z	  If are uploading a directory of assets, you can either:
2025-11-19T11:42:14.192Z	  - Specify the path to the directory of assets via the command line: (ex: `npx wrangler deploy --assets=./dist`)
2025-11-19T11:42:14.192Z	  - Or create a "wrangler.jsonc" file containing:
2025-11-19T11:42:14.192Z	  
2025-11-19T11:42:14.192Z	  ```
2025-11-19T11:42:14.192Z	  {
2025-11-19T11:42:14.192Z	    "name": "worker-name",
2025-11-19T11:42:14.192Z	    "compatibility_date": "2025-11-19",
2025-11-19T11:42:14.192Z	    "assets": {
2025-11-19T11:42:14.192Z	      "directory": "./dist"
2025-11-19T11:42:14.192Z	    }
2025-11-19T11:42:14.192Z	  }
2025-11-19T11:42:14.192Z	  ```
2025-11-19T11:42:14.192Z	  
2025-11-19T11:42:14.193Z	
2025-11-19T11:42:14.193Z	
2025-11-19T11:42:14.205Z	
2025-11-19T11:42:14.205Z	Cloudflare collects anonymous telemetry about your usage of Wrangler. Learn more at https://github.com/cloudflare/workers-sdk/tree/main/packages/wrangler/telemetry.md
2025-11-19T11:42:14.216Z	🪵  Logs were written to "/opt/buildhome/.config/.wrangler/logs/wrangler-2025-11-19_11-42-13_686.log"
2025-11-19T11:42:14.302Z	Failed: error occurred while running deploy command