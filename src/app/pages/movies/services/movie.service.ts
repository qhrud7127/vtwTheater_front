import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpParamsOptions} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Pageable} from "../../../shared/services/pageable.service";

export interface Movie {
  movieId: number;
  director: string;
  title: string;
  cast: string;
  grade: string;
  information: string;
  runningTime: string;
  poster: string;
}

const URL = '/dna/practice/movie';

@Injectable()
export class MovieService {

  constructor(private http: HttpClient) {
  }

  list(params: Pageable): Observable<any> {
    return this.http.get<any>(`${URL}`, {params: params as any});
  }

  movieList(): Observable<Movie> {
    return this.http.get<any>(`${URL}/seqList`);
  }

  find(movieId: number): Observable<Movie> {
    return this.http.get<any>(`${URL}/${movieId}`);
  }

  create(movie: Movie): Observable<Movie> {
    return this.http.post<any>(`${URL}`, movie);
  }

  update(movieId: number, movie: Movie): Observable<Movie> {
    return this.http.put<any>(`${URL}/${movieId}`, movie);
  }

  delete(movieId: number): Observable<Movie> {
    return this.http.delete<any>(`${URL}/${movieId}`);
  }

}
