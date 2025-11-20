2025-11-20T19:12:08.949Z	Initializing build environment...
2025-11-20T19:12:11.093Z	Success: Finished initializing build environment
2025-11-20T19:12:11.397Z	Cloning repository...
2025-11-20T19:12:12.287Z	Restoring from dependencies cache
2025-11-20T19:12:12.290Z	Restoring from build output cache
2025-11-20T19:12:12.295Z	Detected the following tools from environment: npm@10.9.2, nodejs@22.16.0
2025-11-20T19:12:13.799Z	Success: Dependencies restored from build cache.
2025-11-20T19:12:13.912Z	Installing project dependencies: npm clean-install --progress=false
2025-11-20T19:12:25.737Z	
2025-11-20T19:12:25.737Z	added 249 packages, and audited 250 packages in 11s
2025-11-20T19:12:25.737Z	
2025-11-20T19:12:25.737Z	34 packages are looking for funding
2025-11-20T19:12:25.737Z	  run `npm fund` for details
2025-11-20T19:12:25.738Z	
2025-11-20T19:12:25.738Z	found 0 vulnerabilities
2025-11-20T19:12:26.047Z	Executing user build command: npm install && npm run build
2025-11-20T19:12:32.271Z	
2025-11-20T19:12:32.271Z	up to date, audited 250 packages in 6s
2025-11-20T19:12:32.271Z	
2025-11-20T19:12:32.272Z	34 packages are looking for funding
2025-11-20T19:12:32.272Z	  run `npm fund` for details
2025-11-20T19:12:32.272Z	
2025-11-20T19:12:32.272Z	found 0 vulnerabilities
2025-11-20T19:12:32.513Z	
2025-11-20T19:12:32.513Z	> mathwa-api@0.0.1 build
2025-11-20T19:12:32.513Z	> tsc -b
2025-11-20T19:12:32.513Z	
2025-11-20T19:12:37.499Z	src/index.ts(20,3): error TS2322: Type '(origin: string) => string | false' is not assignable to type 'string | string[] | ((origin: string, c: Context<any, any, {}>) => string | Promise<string | null | undefined> | null | undefined)'.
2025-11-20T19:12:37.499Z	  Type '(origin: string) => string | false' is not assignable to type '(origin: string, c: Context<any, any, {}>) => string | Promise<string | null | undefined> | null | undefined'.
2025-11-20T19:12:37.499Z	    Type 'string | false' is not assignable to type 'string | Promise<string | null | undefined> | null | undefined'.
2025-11-20T19:12:37.499Z	      Type 'false' is not assignable to type 'string | Promise<string | null | undefined> | null | undefined'.
2025-11-20T19:12:37.625Z	Failed: error occurred while running build command