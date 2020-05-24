import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HttpCacheService {

  private requests: any = { };

  constructor() { }

  public put(url: string, response: HttpResponse<any>): void {
    this.requests[url] = response;
  }

  public get(url: string): HttpResponse<any> {
    return this.requests[url];
  }

  public invalidateCache(): void {
    this.requests = { };
  }
}
