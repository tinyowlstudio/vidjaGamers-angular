import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-developer-dialog',
  templateUrl: './developer-dialog.component.html',
  styleUrls: ['./developer-dialog.component.scss']
})
export class DeveloperDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }
}
