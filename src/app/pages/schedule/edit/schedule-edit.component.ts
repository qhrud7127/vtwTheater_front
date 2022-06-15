import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import 'devextreme/data/odata/store';
import notify from "devextreme/ui/notify";
import {DxFormComponent, DxValidationGroupComponent} from "devextreme-angular";
import {Schedule, ScheduleService} from "../services/schedule.service";
import {Movie, MovieService} from "../../movies/services/movie.service";
import {Theater, TheaterService} from "../../theater/services/theater.service";
import {confirm} from "devextreme/ui/dialog";

@Component({
  selector: 'sample-schedule-edit-popup',
  providers: [ScheduleService],
  templateUrl: 'schedule-edit.component.html'
})

export class ScheduleEditComponent {
  schedule: Schedule;
  movie: Movie;
  theater: Theater;
  editMode: 'create' | 'update';
  popupVisible = false;
  selectedMovies: any = {};
  selectedTheaters: any = {};

  @Output() onSaved = new EventEmitter<Schedule>();

  @ViewChild(DxFormComponent, {static: false}) form: DxFormComponent;

  @ViewChild(DxValidationGroupComponent, {static: false}) validationGroup: DxValidationGroupComponent;

  constructor(private scheduleService: ScheduleService,
              private MovieService: MovieService,
              private TheaterService: TheaterService) {

  }


  open(editMode: 'create' | 'update', scheduleSeq?: number) {
    this.editMode = editMode;

    this.MovieService.movieList().subscribe({
      next: (v) => {
        this.movie = v;
        this.selectedMovies = this.movie;
      },
      error: (e) => {
        console.log(e);
        notify('영화 정보를 불러오는데 오류가 발생하였습니다.', 'error', 3000);
      }
    });

    this.TheaterService.theaterList().subscribe({
      next: (v) => {
        this.theater = v;
        this.selectedTheaters = this.theater;
      },
      error: (e) => {
        console.log(e);
        notify('영화관 정보를 불러오는데 오류가 발생하였습니다.', 'error', 3000);
      }
    });

    if (this.isUpdateMode()) {
      this.scheduleService.find(scheduleSeq).subscribe({
        next: (v) => {
          this.schedule = v;
          this.popupVisible = true;
        },
        error: (e) => {
          console.log(e);
          notify('상영 정보를 불러오는데 오류가 발생하였습니다.', 'error', 3000);
        }
      });
    } else {
      this.schedule = {} as Schedule;
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
    console.log(e);

    this.popupVisible = false;
    if (this.isCreateMode()) {
      this.schedule.remaining = this.schedule.seats;
      this.scheduleService.create(this.schedule).subscribe({
        next: (v) => {
          notify('상영 정보 생성이 성공적으로 완료되었습니다.', 'success', 3000);
          this.onSaved.emit(v);
        },
        error: (e) => {
          console.log(e);
          notify('상영 정보 생성에 실패하였습니다.', 'error', 3000);
        }
      });
    } else {
      this.schedule.remaining = this.schedule.remaining;
      this.scheduleService.update(this.schedule.scheduleSeq, this.schedule).subscribe({
        next: (v) => {
          notify('상영 정보 변경이 성공적으로 완료되었습니다.', 'success', 3000);
          this.onSaved.emit(v);
        },
        error: (e) => {
          console.log(e);
          notify('상영 정보 변경에 실패하였습니다.', 'error', 3000);
        }
      });
    }
  }


  cancel = () => {
    this.popupVisible = false;
  }



}
