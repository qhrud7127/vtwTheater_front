import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import 'devextreme/data/odata/store';
import notify from "devextreme/ui/notify";
import {DxFormComponent, DxValidationGroupComponent} from "devextreme-angular";
import {Schedule, ScheduleService} from "../services/schedule.service";

@Component({
  selector: 'sample-schedule-edit-popup',
  providers: [ScheduleService],
  templateUrl: 'schedule-edit.component.html'
})

export class ScheduleEditComponent {
  schedule: Schedule;
  editMode: 'create' | 'update';
  popupVisible = false;
  genders = [{code: 'Male', text: '남자'}, {code: 'Female', text: '여자'}];

  @Output() onSaved = new EventEmitter<Schedule>();

  @ViewChild(DxFormComponent, {static: false}) form: DxFormComponent;

  @ViewChild(DxValidationGroupComponent, {static: false}) validationGroup: DxValidationGroupComponent;

  constructor(private scheduleService: ScheduleService) {
  }

  open(editMode: 'create' | 'update', scheduleSeq?: number) {
    this.editMode = editMode;

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
    const result = this.validationGroup.instance.validate();
    if (!result.isValid) {
      return;
    }

    this.popupVisible = false;
    if (this.isCreateMode()) {
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
