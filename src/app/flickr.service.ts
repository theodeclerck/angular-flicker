import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpParams } from '@angular/common/http';
import { SearchImagesParams } from './search-images-params';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FlickrService {
  private readonly apiKey: string;
  private readonly baseURL: string;
  constructor(private http: HttpClient) {
    this.baseURL = "https://www.flickr.com/services/rest/";
    this.apiKey = "92bb8382cce3222fd37afa73c9572f11";
  }

  getBaseParameters(): HttpParams {
    var params = new HttpParams();
    params = params.set("api_key", this.apiKey);
    params = params.set("format", "json");
    params = params.set("nojsoncallback", 1);
    return params;
  }

  buildURL(params: HttpParams): string {
    return `${this.baseURL}?${params.toString()}`;
  }

  searchImages(searchParams: SearchImagesParams): Observable<any> {
    var httpParams = this.getBaseParameters();
    httpParams = httpParams.set("method", "flickr.photos.search");
    if (searchParams.text) {
      httpParams = httpParams.set("text", searchParams.text);
    }
    if (searchParams.tags && searchParams.tags.length > 0) {
      httpParams = httpParams.set("tags", searchParams.tags.join(","));
    }
    if (searchParams.sort) {
      httpParams = httpParams.set("sort", searchParams.sort);
    }
    if (searchParams.minUploadDate) {
      httpParams = httpParams.set("min_upload_date", searchParams.minUploadDate.getTime()/1000)
    }
    if (searchParams.maxUploadDate) {
      httpParams = httpParams.set("max_upload_date", searchParams.maxUploadDate.getTime()/1000)
    }
    if (searchParams.minTakenDate) {
      httpParams = httpParams.set("min_taken_date", searchParams.minTakenDate.getTime()/1000)
    }
    if (searchParams.maxTakenDate) {
      httpParams = httpParams.set("max_taken_date", searchParams.maxTakenDate.getTime()/1000)
    }
    if (searchParams.page) {
      httpParams = httpParams.set("page", searchParams.page)
    }
    if (searchParams.userId) {
      httpParams = httpParams.set("user_id", searchParams.userId)
    }
    if (searchParams.nsfw) {
      httpParams = httpParams.set("safe_search", searchParams.nsfw)
    }
    return this.http.get(this.buildURL(httpParams));
  }

  getImageInfo(photoId: number, imageSecret: string): Observable<any> {
    var httpParams = this.getBaseParameters();
    httpParams = httpParams.set("method", "flickr.photos.getInfo");
    httpParams = httpParams.set("photo_id", photoId);
    if (imageSecret) {
      httpParams = httpParams.set("secret", imageSecret);
    }
    return this.http.get(this.buildURL(httpParams));
  }

  getHotTags(): Observable<any> {
    var httpParams = this.getBaseParameters();
    httpParams = httpParams.set("method", "flickr.tags.getHotList");
    httpParams = httpParams.set("period", "week");
    httpParams = httpParams.set("count", "20");
    return this.http.get(this.buildURL(httpParams));
  }
}
