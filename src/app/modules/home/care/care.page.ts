import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'page-home-care',
  templateUrl: './care.page.html',
  styleUrls: ['./care.page.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CarePage implements OnInit {
  selectedSegment: 'symptoms' | 'precautions' = 'symptoms';
  constructor() { }

  ngOnInit() {
  }

  onSegmentChanged(ev: CustomEvent) {
    const { value } = ev.detail;
    this.selectedSegment = value;
  }

}
