import {Component, ViewChild} from '@angular/core';
import 'devextreme/data/odata/store';
import DataSource from "devextreme/data/data_source";
import CustomStore from "devextreme/data/custom_store";
import notify from "devextreme/ui/notify";
import {confirm} from "devextreme/ui/dialog";
import {firstValueFrom} from "rxjs";
import {DxDataGridComponent} from "devextreme-angular";
import {ReservationService} from "../services/reservation.service";
import {PageableService} from "../../../shared/services/pageable.service";

@Component({
  selector: 'sample-movies',
  providers: [ReservationService, PageableService],
  templateUrl: 'reservation-list.component.html'
})

export class ReservationListComponent {

  reservation: DataSource;
  filter = '';

  @ViewChild(DxDataGridComponent, {static: false}) grid: DxDataGridComponent;

  constructor(private reservationService: ReservationService,
              private pageableService: PageableService) {
    this.reservation = new DataSource({
      store: new CustomStore({
        key: 'reservationSeq',
        load: (loadOptions) => {
          this.grid.instance.clearSelection();

          const pageable = this.pageableService.getPageable(loadOptions);
          pageable.filter = this.filter;

          return firstValueFrom(this.reservationService.list(pageable)).then(page => {
            return this.pageableService.transformPage(page);
          });
        },
      })
    });
  }

  getSelectedreservationSeq(): number {
    return this.grid?.instance.getSelectedRowKeys()[0];
  }

  /** Grid Toolbar Button Events */
  search() {
    this.reservation.reload();
  }

  delete(){
    console.log(this.getSelectedreservationSeq());
    const result = confirm('<i>정말로 예매를 취소하시겠습니까?</i>', '예매 취소');
    result.then(dialogResult => {
      if (dialogResult) {
        this.reservationService.delete(this.getSelectedreservationSeq()).subscribe({
          next: (v) => {
            notify('예매 취소가 성공적으로 완료되었습니다.', 'success', 3000);
            this.search();
          },
          error: (e) => {
            console.log(e);
            notify('예매 취소에 실패하였습니다.', 'error', 3000);
          }
        });
      }
    });
  }

}
