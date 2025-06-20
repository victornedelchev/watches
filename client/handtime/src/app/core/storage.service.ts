import { isPlatformBrowser, isPlatformServer, JsonPipe } from '@angular/common';
import { PLATFORM_ID, Provider } from '@angular/core';

interface IStorage {
  setItem<T>(key: string, item: T): T;
  getItem<T>(key: string): T | null;
}

export class StorageService implements IStorage {
  setItem<T>(key: string, item: T): T {
    return item;
  }

  getItem<T>(key: string): T | null {
    return null;
  }
}

export function storageFactory(platformId: string): any {
  if (isPlatformBrowser(platformId)) {
    return new BrowserStorage();
  }

  if (isPlatformServer(platformId)) {
    return new ServerStorage();
  }

  throw new Error('No implementation for this platform: ' + platformId);
}

export const storageServiceProvider: Provider = {
  provide: StorageService,
  useFactory: storageFactory,
  deps: [PLATFORM_ID],
};

export class BrowserStorage {
  localStorage = localStorage;

  setItem<T>(key: string, item: T): T {
    const str = typeof item === 'string' ? item : JSON.stringify(item);

    this.localStorage.setItem(key, str);

    return item;
  }

  getItem<T>(key: string): T | null {
    let item;
    const tmp = this.localStorage.getItem(key);

    if (!tmp) {
      return null;
    }

    try {
      item = tmp ? JSON.parse(tmp) : null;
    } catch (error) {
      item = tmp;
    }

    return item;
  }
}

export class ServerStorage {
  localStorage = {
    data: {} as { [key: string]: any },
    setItem<T>(key: string, item: T): void {
      this.data[key] = item;
    },
    getItem<T>(key: string): T | null {
      return this.data[key] || null;
    },
  };

  setItem<T>(key: string, item: T): T {
    this.localStorage.setItem(key, JSON.stringify(item));

    return item;
  }

  getItem<T>(key: string): T | null {
    let item;
    const tmp = this.localStorage.getItem(key) as any;

    if (!tmp) {
      return null;
    }

    try {
      item = JSON.parse(tmp);
    } catch (error) {
      item = tmp;
    }

    return item;
  }
}
