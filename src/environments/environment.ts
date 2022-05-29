// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  serverBaseURL: 'http://localhost:8080',
  defaultConnectionIsOnline: true,
  timeToAnswerInMs: 5000,
  initEndState: 3,
  evolPoints: 20,
  evolEndStatePositiveInARow: 3,
  evolEndStatePositive: 0,
  evolEndStateNegative: -1,
  evolEndStateNegativeInARow: 3
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
