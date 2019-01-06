import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit {

  message;

  constructor( public dialogRef: MatDialogRef<MessageComponent>,
               @Inject(MAT_DIALOG_DATA) public data) {
    this.message = data.message;
  }

  ngOnInit() {
  }

}
