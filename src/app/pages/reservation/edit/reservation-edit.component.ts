import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import 'devextreme/data/odata/store';
import notify from "devextreme/ui/notify";
import {DxFormComponent, DxValidationGroupComponent} from "devextreme-angular";
import {Reservation, ReservationService} from "../services/reservation.service";
import {Schedule, ScheduleService} from "../../schedule/services/schedule.service";
import {Movie, MovieService} from "../../movies/services/movie.service";
import {TheaterService} from "../../theater/services/theater.service";
import {confirm} from "devextreme/ui/dialog";

@Component({
  selector: 'sample-reservation-edit-popup',
  providers: [ReservationService],
  templateUrl: 'reservation-edit.component.html'
})

export class ReservationEditComponent {
  reservation: Reservation;
  editMode: 'create' | 'update';
  popupVisible = false;
  schedule: Schedule;
  selectedSchedule: any = {};
  movie: Movie;
  Movies: any = {};

  @Output() onSaved = new EventEmitter<Reservation>();

  @ViewChild(DxFormComponent, {static: false}) form: DxFormComponent;

  @ViewChild(DxValidationGroupComponent, {static: false}) validationGroup: DxValidationGroupComponent;

  constructor(private reservationService: ReservationService,
              private scheduleService: ScheduleService,
              private moviesService: MovieService) {
    this.moviesService.movieList().subscribe({
      next: (v) => {
        this.movie = v;
        this.Movies = this.movie;
      },
      error: (e) => {
        console.log(e);
        notify('영화 정보를 불러오는데 오류가 발생하였습니다.', 'error', 3000);
      }
    });
  }

  displayExpr(item) {
  return item && 'ID: ' + item.id + ', Name: ' + item.name;
}

  openCreate(movieId: number) {
    this.scheduleService.scheduleListByMovieId(movieId).subscribe({
      next: (v) => {
        this.schedule = v;
        this.selectedSchedule = this.schedule;
      },
      error: (e) => {
        console.log(e);
        notify('영화 정보를 불러오는데 오류가 발생하였습니다.', 'error', 3000);
      }
    });
    this.reservation = {} as Reservation;
    this.popupVisible = true;
  }


  open(editMode: 'create' | 'update', reservationSeq?: number) {
    this.editMode = editMode;
    this.form.clearChangedOptions();

    if (this.isUpdateMode()) {
      this.reservationService.find(reservationSeq).subscribe({
        next: (v) => {
          this.reservation = v;
          this.popupVisible = true;

        },
        error: (e) => {
          console.log(e);
          notify('영화 정보를 불러오는데 오류가 발생하였습니다.', 'error', 3000);
        }
      });
    } else {
      this.reservation = {} as Reservation;
      this.popupVisible = true;
    }

  }

  close() {
    this.popupVisible = false;
  }

  isCreateMode() {
    return this.editMode === 'create';
  }

  isUpdateMode() {
    return this.editMode === 'update';
  }

  /** Popup Button Events */
  save = (e) => {
    let remaining = 0;
    //잔여석 확인
    this.scheduleService.find(this.reservation.scheduleSeq).subscribe({
      next: (v) => {
        this.schedule = v;
        remaining = this.schedule.remaining;
        this.popupVisible = false;

        //잔여 있을때
        if (this.schedule.remaining >= this.reservation.seat) {
          this.reservationService.create(this.reservation).subscribe({
            next: (v) => {
              notify('영화 예약이 성공적으로 완료되었습니다.', 'success', 3000);
              this.onSaved.emit(v);
            },
            error: (e) => {
              console.log(e);
              notify('영화 예약에 실패하였습니다.', 'error', 3000);
            }
          });
        }else{ //잔여 없을때
          notify('잔여석이 부족합니다.', 'error', 3000);
        }
      },
      error: (e) => {
        console.log(e);
        notify('영화 정보를 불러오는데 오류가 발생하였습니다.', 'error', 3000);
      }
    });
  }

  confirm = (e) => {
    console.log('!!!'+this.reservation.scheduleSeq);
    this.scheduleService.find(this.reservation.scheduleSeq).subscribe({
      next: (v) => {
        this.schedule = v;
        const fee = this.schedule.fee;
        const count = this.reservation.seat;
        const price =  fee*count;

        const result = confirm('<i> 금액은 '+ price.toLocaleString('ko-KR') +'원 입니다. 예매 하시겠습니까?</i>', '상영 시간표 삭제');
        result.then(dialogResult => {
          if (dialogResult) {
            this.save(e);
          }
        });

      },
      error: (e) => {
        console.log(e);
        notify('영화 정보를 불러오는데 오류가 발생하였습니다.', 'error', 3000);
      }
    });
  }

  cancel = () => {
    this.popupVisible = false;
  }
}
