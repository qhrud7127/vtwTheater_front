import {Component, ViewChild} from '@angular/core';
import 'devextreme/data/odata/store';
import DataSource from "devextreme/data/data_source";
import CustomStore from "devextreme/data/custom_store";
import {Movie, MovieService} from "./services/movie.service";
import notify from "devextreme/ui/notify";
import {confirm} from "devextreme/ui/dialog";
import {firstValueFrom} from "rxjs";
import {PageableService} from "../../shared/services/pageable.service";
import {MovieEditComponent} from "./edit/movie-edit.component";
import {DxDataGridComponent} from "devextreme-angular";

@Component({
  selector: 'sample-employee',
  providers: [MovieService, PageableService],
  templateUrl: 'movie.component.html'
})

export class MovieComponent {

  movie: DataSource;
  filter = '';

  @ViewChild(DxDataGridComponent, {static: false}) grid: DxDataGridComponent;
  @ViewChild(MovieEditComponent, {static: false}) editPopup: MovieEditComponent;

  constructor(private movieService: MovieService,
              private pageableService: PageableService) {
    this.movie = new DataSource({
      store: new CustomStore({
        key: 'movieId',
        load: (loadOptions) => {
          this.grid.instance.clearSelection();

          const pageable = this.pageableService.getPageable(loadOptions);
          pageable.filter = this.filter;

          return firstValueFrom(this.movieService.list(pageable)).then(page => {
            return this.pageableService.transformPage(page);
          });
        },
      })
    });
  }

  getSelectedMovieId(): number {
    return this.grid?.instance.getSelectedRowKeys()[0];
  }

  /** Grid Toolbar Button Events */
  search() {
    this.movie.reload();
  }

  create() {
    this.editPopup.open('create');
  }

  update() {
    this.editPopup.open('update', this.getSelectedMovieId());
  }

  delete() {
    const result = confirm('<i>정말로 해당 직원를 삭제하시겠습니까?</i>', '직원 삭제');
    result.then(dialogResult => {
      if (dialogResult) {
        this.movieService.delete(this.getSelectedMovieId()).subscribe({
          next: (v) => {
            notify('직원 삭제가 성공적으로 완료되었습니다.', 'success', 3000);
            this.search();
          },
          error: (e) => {
            console.log(e);
            notify('직원 삭제에 실패하였습니다.', 'error', 3000);
          }
        });
      }
    });
  }

  /** Edit Popup Events */
  onSaved(movie: Movie) {
    this.search();
  }

}
