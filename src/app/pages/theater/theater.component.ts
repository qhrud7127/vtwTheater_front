import {Component, ViewChild} from '@angular/core';
import 'devextreme/data/odata/store';
import DataSource from "devextreme/data/data_source";
import CustomStore from "devextreme/data/custom_store";
import {Theater, TheaterService} from "./services/theater.service";
import notify from "devextreme/ui/notify";
import {confirm} from "devextreme/ui/dialog";
import {firstValueFrom} from "rxjs";
import {PageableService} from "../../shared/services/pageable.service";
import {TheaterEditComponent} from "./edit/theater-edit.component";
import {DxDataGridComponent} from "devextreme-angular";

@Component({
  selector: 'sample-employee',
  providers: [TheaterService, PageableService],
  templateUrl: 'theater.component.html'
})

export class TheaterComponent {

  theater: DataSource;
  filter = '';

  @ViewChild(DxDataGridComponent, {static: false}) grid: DxDataGridComponent;
  @ViewChild(TheaterEditComponent, {static: false}) editPopup: TheaterEditComponent;

  constructor(private theaterService: TheaterService,
              private pageableService: PageableService) {
    this.theater = new DataSource({
      store: new CustomStore({
        key: 'theaterId',
        load: (loadOptions) => {
          this.grid.instance.clearSelection();

          const pageable = this.pageableService.getPageable(loadOptions);
          pageable.filter = this.filter;

          return firstValueFrom(this.theaterService.list(pageable)).then(page => {
            return this.pageableService.transformPage(page);
          });
        },
      })
    });
  }

  getSelectedTheaterId(): number {
    return this.grid?.instance.getSelectedRowKeys()[0];
  }

  /** Grid Toolbar Button Events */
  search() {
    this.theater.reload();
  }

  create() {
    this.editPopup.open('create');
  }

  update() {
    this.editPopup.open('update', this.getSelectedTheaterId());
  }

  delete() {
    const result = confirm('<i>정말로 해당 영화관을 삭제하시겠습니까?</i>', '영화관 삭제');
    result.then(dialogResult => {
      if (dialogResult) {
        this.theaterService.delete(this.getSelectedTheaterId()).subscribe({
          next: (v) => {
            notify('영화관 삭제가 성공적으로 완료되었습니다.', 'success', 3000);
            this.search();
          },
          error: (e) => {
            console.log(e);
            notify('영화관 삭제에 실패하였습니다.', 'error', 3000);
          }
        });
      }
    });
  }

  /** Edit Popup Events */
  onSaved(theater: Theater) {
    this.search();
  }

}
