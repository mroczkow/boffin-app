import {Component, Inject} from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';

@Component({
  selector: 'app-confirm-snack-bar',
  templateUrl: './confirm-snack-bar.component.html'
})
export class ConfirmSnackBarComponent {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }
}
