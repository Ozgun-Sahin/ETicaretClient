import { Component, EventEmitter, Output } from '@angular/core';
import { BaseComponent, SpinnerType } from '../../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AlertifyService, MessageType, Position } from '../../../../services/admin/alertify.service';
import { RoleService } from '../../../../services/common/models/role.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent extends BaseComponent {
  constructor(spinner: NgxSpinnerService, private roleService: RoleService, private alertify: AlertifyService) {
    super(spinner)
  }


  ngOnInit(): void {
  }

  @Output() createdRole: EventEmitter<string> = new EventEmitter();



  create(name: HTMLInputElement) {
    this.showSpinner(SpinnerType.BallAtom);
   
    this.roleService.create(name.value, () => {
      this.hideSpinner(SpinnerType.BallAtom)
      this.alertify.message("Rol Başarıyla Eklenmiştir.", {
        dismissOthers: true,
        messageType: MessageType.Success,
        position: Position.TopRight
      });
      this.createdRole.emit(name.value);
    }, errorMessage => {
      this.alertify.message(errorMessage,
        {
          dismissOthers: true,
          messageType: MessageType.Error,
          position: Position.TopRight
        });
    });
  }
}
