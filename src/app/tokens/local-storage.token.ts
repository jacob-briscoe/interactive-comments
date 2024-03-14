import { InjectionToken, makeEnvironmentProviders } from '@angular/core';

const LOCAL_STORAGE_TOKEN = new InjectionToken<Storage>(
  'browser local storage',
);

const STORAGE: Storage = localStorage;

export const provideLocalStorage = () =>
  makeEnvironmentProviders([
    {
      provide: LOCAL_STORAGE_TOKEN,
      useValue: STORAGE,
    },
  ]);

export default LOCAL_STORAGE_TOKEN;
