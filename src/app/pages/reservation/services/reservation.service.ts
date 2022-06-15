import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpParamsOptions} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Pageable} from "../../../shared/services/pageable.service";

export interface Reservation {
  reservationSeq: number;
  scheduleSeq: number;
  seat: number;
  name: string;
  password: string;
  phone: string;
  birth: string;
}

const URL = '/dna/practice/reservation';

@Injectable()
export class ReservationService {

  constructor(private http: HttpClient) {
  }

  list(params: Pageable): Observable<any> {
    return this.http.get<any>(`${URL}`, {params: params as any});
  }

  reservationList(): Observable<any> {
    return this.http.get<any>(`${URL}/seqList`);
  }

  find(reservationSeq: number): Observable<Reservation> {
    return this.http.get<any>(`${URL}/${reservationSeq}`);
  }

  create(reservation: Reservation): Observable<Reservation> {
    return this.http.post<any>(`${URL}`, reservation);
  }

  update(reservationSeq: number, reservation: Reservation): Observable<Reservation> {
    return this.http.put<any>(`${URL}/${reservationSeq}`, reservation);
  }

  delete(reservationSeq: number): Observable<Reservation> {
    return this.http.delete<any>(`${URL}/${reservationSeq}`);
  }

}
