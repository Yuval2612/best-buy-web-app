import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Observable, throwError, of } from "rxjs";
import { catchError, map } from "rxjs/operators";

const API_PREFIX = environment.apiEndpoint;

@Injectable({ providedIn: "root" })
export class ApiService {
  constructor(private http: HttpClient) {}

  // GET request
  public get<T>(
    path: string,
    query: any = {},
    responseType?: any
  ): Observable<T> {
    return this.performRequest<T>(HttpMethod.Get, path, query, responseType);
  }

  // POST request
  public post<T>(path: string, data: any = null): Observable<T> {
    return this.performRequest<T>(HttpMethod.Post, path, data);
  }

  // POST request
  public put<T>(path: string, data: any = null): Observable<T> {
    return this.performRequest<T>(HttpMethod.Put, path, data);
  }

  // POST request
  public delete<T>(path: string, data: any = null): Observable<T> {
    return this.performRequest<T>(HttpMethod.Delete, path, data);
  }

  // Perform the actual request, internal only
  private performRequest<T>(
    method: HttpMethod,
    path: string,
    data: any,
    responseType?: any
  ): Observable<T> {
    let url = API_PREFIX + path;
    let request: Observable<T>;

    switch (method) {
      case HttpMethod.Post:
        request = this.http.post<T>(url, data);
        break;
      case HttpMethod.Put:
        request = this.http.put<T>(url, data);
        break;
      case HttpMethod.Delete:
        request = this.http.delete<T>(url, { params: data });
        break;
      case HttpMethod.Get:
      default:
        request = this.http.get<T>(url, {
          params: data,
          responseType: responseType,
        });
        break;
    }

    return request.pipe(
      map((resp) => {
        return resp;
      }),
      catchError((resp) => {
        if (!resp.error) {
          resp.error = {
            code: 0,
            message: "Unknown",
          };
        }
        if (resp.status === 401) {
          //TODO: logout
        }
        //TODO: log error

        return throwError({
          message: resp.error.message,
          code: resp.error.code,
          status: resp.status,
        });
      })
    );
  }
}

// Available HTTP methods
enum HttpMethod {
  Get,
  Post,
  Put,
  Delete,
}
