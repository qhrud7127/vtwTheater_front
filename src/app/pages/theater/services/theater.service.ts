import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpParamsOptions} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Pageable} from "../../../shared/services/pageable.service";
import {Movie} from "../../movies/services/movie.service";

export interface Theater {
  theaterId: number;
  theaterNm: string;
  address: string;

}

const URL = '/dna/practice/theater';

@Injectable()
export class TheaterService {

  constructor(private http: HttpClient) {
  }

  list(params: Pageable): Observable<any> {
    return this.http.get<any>(`${URL}`, {params: params as any});
  }

  find(theaterId: number): Observable<Theater> {
    return this.http.get<any>(`${URL}/${theaterId}`);
  }

  theaterList(): Observable<Theater> {
    return this.http.get<any>(`${URL}/seqList`);
  }

  create(theater: Theater): Observable<Theater> {
    return this.http.post<any>(`${URL}`, theater);
  }

  update(theaterId: number, theater: Theater): Observable<Theater> {
    return this.http.put<any>(`${URL}/${theaterId}`, theater);
  }

  delete(theaterId: number): Observable<Theater> {
    return this.http.delete<any>(`${URL}/${theaterId}`);
  }

}
