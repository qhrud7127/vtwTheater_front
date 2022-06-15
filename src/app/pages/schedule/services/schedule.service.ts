import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpParamsOptions} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Pageable} from "../../../shared/services/pageable.service";
import {Movie} from "../../movies/services/movie.service";
import {Theater} from "../../theater/services/theater.service";

export interface Schedule {
  scheduleSeq: number;
  theaterId: number;
  time : string | number | Date;
  movieId: number;
  seats: number;
  remaining: number;
  fee: number;
}

const URL = '/dna/practice/schedule';


@Injectable()
export class ScheduleService {

  constructor(private http: HttpClient) {
  }

  list(params: Pageable): Observable<any> {
    return this.http.get<any>(`${URL}`, {params: params as any});
  }

  scheduleList(): Observable<Schedule> {
    return this.http.get<any>(`${URL}/seqList`);
  }

  scheduleListByMovieId(movieId : number): Observable<Schedule> {
    return this.http.get<any>(`${URL}/movieId/${movieId}`);
  }

  find(scheduleSeq: number): Observable<Schedule> {
    return this.http.get<any>(`${URL}/${scheduleSeq}`);
  }

  create(schedule: Schedule): Observable<Schedule> {
    return this.http.post<any>(`${URL}`, schedule);
  }

  update(scheduleSeq: number, schedule: Schedule): Observable<Schedule> {
    return this.http.put<any>(`${URL}/${scheduleSeq}`, schedule);
  }

  delete(scheduleSeq: number): Observable<Schedule> {
    return this.http.delete<any>(`${URL}/${scheduleSeq}`);
  }

}
