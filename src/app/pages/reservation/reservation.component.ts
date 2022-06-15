import {Component, ViewChild} from '@angular/core';
import 'devextreme/data/odata/store';
import DataSource from "devextreme/data/data_source";
import CustomStore from "devextreme/data/custom_store";
import {Reservation, ReservationService} from "./services/reservation.service";
import notify from "devextreme/ui/notify";
import {confirm} from "devextreme/ui/dialog";
import {firstValueFrom} from "rxjs";
import {PageableService} from "../../shared/services/pageable.service";
import {ReservationEditComponent} from "./edit/reservation-edit.component";
import {DxDataGridComponent} from "devextreme-angular";
import {Movie, MovieService} from "../movies/services/movie.service";

@Component({
  selector: 'sample-movie',
  providers: [ReservationService, PageableService],
  templateUrl: 'reservation.component.html',
  styleUrls: [ './reservation.component.scss' ]

})

export class ReservationComponent {

  reservation: DataSource;
  filter = '';
  colCountByScreen: object;
  movie: Movie;
  Movies: any = {};
  Reservations: any = {};



  @ViewChild(ReservationEditComponent, {static: false}) editPopup: ReservationEditComponent;

  constructor(private moviesService: MovieService,
              private reservationService: ReservationService) {

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

    this.reservationService.reservationList().subscribe({
      next: (v) => {
        this.reservation = v;
        this.Reservations = this.reservation;
      },
      error: (e) => {
        console.log(e);
        notify('영화 정보를 불러오는데 오류가 발생하였습니다.', 'error', 3000);
      }
    });
    console.log(JSON.stringify(this.reservation));

    this.colCountByScreen = {
      xs: 1,
      sm: 2,
      md: 3,
      lg: 4
    };
  }

  onClick(movieId: number): void {
    this.editPopup.openCreate(movieId);
  }

  /*getSelectedMovieId(): number {
    return this.grid?.instance.getSelectedRowKeys()[0];
  }
*/
  /** Grid Toolbar Button Events */
  search() {
    this.reservation.reload();
  }

  create() {
    this.editPopup.open('create');
  }

  /** Edit Popup Events */
  onSaved(reservation: Reservation) {
    this.search();
  }

}
