import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import 'devextreme/data/odata/store';
import notify from "devextreme/ui/notify";
import {DxFormComponent, DxValidationGroupComponent} from "devextreme-angular";
import {Movie, MovieService} from "../services/movie.service";

@Component({
  selector: 'sample-movie-edit-popup',
  providers: [MovieService],
  templateUrl: 'movie-edit.component.html'
})

export class MovieEditComponent {
  movie: Movie;
  editMode: 'create' | 'update';
  popupVisible = false;

  @Output() onSaved = new EventEmitter<Movie>();

  @ViewChild(DxFormComponent, {static: false}) form: DxFormComponent;

  @ViewChild(DxValidationGroupComponent, {static: false}) validationGroup: DxValidationGroupComponent;

  constructor(private movieService: MovieService) {
  }

  open(editMode: 'create' | 'update', movieId?: number) {
    this.editMode = editMode;

    if (this.isUpdateMode()) {
      this.movieService.find(movieId).subscribe({
        next: (v) => {
          this.movie = v;
          this.popupVisible = true;
        },
        error: (e) => {
          console.log(e);
          notify('직원 정보를 불러오는데 오류가 발생하였습니다.', 'error', 3000);
        }
      });
    } else {
      this.movie = {} as Movie;
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
    const result = this.validationGroup.instance.validate();
    if (!result.isValid) {
      return;
    }

    this.popupVisible = false;
    if (this.isCreateMode()) {
      this.movieService.create(this.movie).subscribe({
        next: (v) => {
          notify('직원 생성이 성공적으로 완료되었습니다.', 'success', 3000);
          this.onSaved.emit(v);
        },
        error: (e) => {
          console.log(e);
          notify('직원 생성에 실패하였습니다.', 'error', 3000);
        }
      });
    } else {
      this.movieService.update(this.movie.movieId, this.movie).subscribe({
        next: (v) => {
          notify('직원 변경이 성공적으로 완료되었습니다.', 'success', 3000);
          this.onSaved.emit(v);
        },
        error: (e) => {
          console.log(e);
          notify('직원 변경에 실패하였습니다.', 'error', 3000);
        }
      });
    }
  }

  cancel = () => {
    this.popupVisible = false;
  }

}