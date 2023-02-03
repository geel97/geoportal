import { HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface Cache {
  response: HttpResponse<any>;
  time: number;
}

const MAX_CACHE_AGE = 5 * 60 * 1000; // 5 minuti

@Injectable({
  providedIn: 'root',
})
export class CacheService {
  cacheMap = new Map<string, Cache>();

  getFromCache(req: HttpRequest<any>): HttpResponse<any> | undefined {
    const cached = this.cacheMap.get(req.urlWithParams);

    if (!cached || Date.now() - cached.time > MAX_CACHE_AGE) return undefined;
    return cached.response;
  }

  addToCache(req: HttpRequest<any>, response: HttpResponse<any>): void {
    this.cacheMap.set(req.url, { response, time: Date.now() });
  }
}
