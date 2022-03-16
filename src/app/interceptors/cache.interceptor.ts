import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { CacheService } from '../services/cache.service';
import { tap } from 'rxjs/operators';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
  constructor(private readonly cacheService: CacheService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Don't cache if it's not a GET request
    if (request.method !== 'GET') {
      return next.handle(request);
    }

    // delete cache if no header is set by service's method
    /*if (!req.headers.get('cache-response')) {
      if (this.cacheService.cacheMap.get(req.urlWithParams)) {
        this.cacheService.cacheMap.delete(req.urlWithParams);
      }

      return next.handle(req);
    }*/

    // Checked if there is cached data for this URI
    const cachedResponse = this.cacheService.getFromCache(request);
    if (cachedResponse) {
      // In case of parallel requests to same URI,
      // return the request already in progress
      // otherwise return the last cached data
      return cachedResponse instanceof Observable ? cachedResponse : of(cachedResponse.clone());
    }

    // If the request of going through for first time
    // then let the request proceed and cache the response
    return next.handle(request).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.cacheService.addToCache(request, event);
        }
      })
    );
  }
}
