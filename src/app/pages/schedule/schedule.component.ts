import {Component, ViewChild} from '@angular/core';
import 'devextreme/data/odata/store';
import DataSource from "devextreme/data/data_source";
import CustomStore from "devextreme/data/custom_store";
import {Schedule, ScheduleService} from "./services/schedule.service";
import notify from "devextreme/ui/notify";
import {confirm} from "devextreme/ui/dialog";
import {firstValueFrom} from "rxjs";
import {PageableService} from "../../shared/services/pageable.service";
import {ScheduleEditComponent} from "./edit/schedule-edit.component";
import {DxDataGridComponent} from "devextreme-angular";

@Component({
  selector: 'sample-schedule',
  providers: [ScheduleService, PageableService],
  templateUrl: 'schedule.component.html'
})

export class ScheduleComponent {

  schedule: DataSource;
  filter = '';

  @ViewChild(DxDataGridComponent, {static: false}) grid: DxDataGridComponent;
  @ViewChild(ScheduleEditComponent, {static: false}) editPopup: ScheduleEditComponent;

  constructor(private scheduleService: ScheduleService,
              private pageableService: PageableService) {
    this.schedule = new DataSource({
      store: new CustomStore({
        key: 'scheduleSeq',
        load: (loadOptions) => {
          this.grid.instance.clearSelection();

          const pageable = this.pageableService.getPageable(loadOptions);
          pageable.filter = this.filter;

          return firstValueFrom(this.scheduleService.list(pageable)).then(page => {
            return this.pageableService.transformPage(page);
          });
        },
      })
    });
  }

  getSelectedScheduleSeq(): number {
    return this.grid?.instance.getSelectedRowKeys()[0];
  }

  /** Grid Toolbar Button Events */
  search() {
    this.schedule.reload();
  }

  create() {
    this.editPopup.open('create');
  }

  update() {
    this.editPopup.open('update', this.getSelectedScheduleSeq());
  }

  delete() {
    const result = confirm('<i>정말로 해당 상영 시간표를 삭제하시겠습니까?</i>', '상영 시간표 삭제');
    result.then(dialogResult => {
      if (dialogResult) {
        this.scheduleService.delete(this.getSelectedScheduleSeq()).subscribe({
          next: (v) => {
            notify('상영 시간표 삭제가 성공적으로 완료되었습니다.', 'success', 3000);
            this.search();
          },
          error: (e) => {
            console.log(e);
            notify('상영 시간표 삭제에 실패하였습니다.', 'error', 3000);
          }
        });
      }
    });
  }

  /** Edit Popup Events */
  onSaved(schedule: Schedule) {
    this.search();
  }

}
