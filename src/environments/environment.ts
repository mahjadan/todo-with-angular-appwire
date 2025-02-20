// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // APP_ENDPOINT: 'https://demo.appwrite.io/v1',
  APP_ENDPOINT: 'http://localhost/v1',
  APP_PROJECT_ID: 'Masjid-demo-ID',
  APP_DATABASE_ID: 'test-db-ID',
  APP_COLLECTION_ID: 'todo-demo-ID',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
