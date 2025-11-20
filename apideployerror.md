2025-11-20T19:15:01.963Z	Initializing build environment...
2025-11-20T19:15:01.963Z	Initializing build environment...
2025-11-20T19:15:17.669Z	Success: Finished initializing build environment
2025-11-20T19:15:18.136Z	Cloning repository...
2025-11-20T19:15:19.338Z	Restoring from dependencies cache
2025-11-20T19:15:19.339Z	Restoring from build output cache
2025-11-20T19:15:19.343Z	Detected the following tools from environment: npm@10.9.2, nodejs@22.16.0
2025-11-20T19:15:21.416Z	Success: Dependencies restored from build cache.
2025-11-20T19:15:21.602Z	Installing project dependencies: npm clean-install --progress=false
2025-11-20T19:15:33.388Z	
2025-11-20T19:15:33.388Z	added 249 packages, and audited 250 packages in 11s
2025-11-20T19:15:33.388Z	
2025-11-20T19:15:33.388Z	34 packages are looking for funding
2025-11-20T19:15:33.388Z	  run `npm fund` for details
2025-11-20T19:15:33.390Z	
2025-11-20T19:15:33.390Z	found 0 vulnerabilities
2025-11-20T19:15:33.717Z	Executing user build command: npm install && npm run build
2025-11-20T19:15:38.080Z	
2025-11-20T19:15:38.080Z	up to date, audited 250 packages in 4s
2025-11-20T19:15:38.080Z	
2025-11-20T19:15:38.080Z	34 packages are looking for funding
2025-11-20T19:15:38.080Z	  run `npm fund` for details
2025-11-20T19:15:38.081Z	
2025-11-20T19:15:38.081Z	found 0 vulnerabilities
2025-11-20T19:15:38.308Z	
2025-11-20T19:15:38.309Z	> mathwa-api@0.0.1 build
2025-11-20T19:15:38.309Z	> tsc -b
2025-11-20T19:15:38.309Z	
2025-11-20T19:15:43.335Z	src/index.ts(20,3): error TS2322: Type '(origin: string) => string | false' is not assignable to type 'string | string[] | ((origin: string, c: Context<any, any, {}>) => string | Promise<string | null | undefined> | null | undefined)'.
2025-11-20T19:15:43.335Z	  Type '(origin: string) => string | false' is not assignable to type '(origin: string, c: Context<any, any, {}>) => string | Promise<string | null | undefined> | null | undefined'.
2025-11-20T19:15:43.336Z	    Type 'string | false' is not assignable to type 'string | Promise<string | null | undefined> | null | undefined'.
2025-11-20T19:15:43.336Z	      Type 'false' is not assignable to type 'string | Promise<string | null | undefined> | null | undefined'.
2025-11-20T19:15:43.383Z	Failed: error occurred while running build command