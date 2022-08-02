import { Component, Input, OnInit } from '@angular/core';

import { Chart } from './interface/chart';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss'],
})
export class ChartsComponent implements OnInit {
  @Input() expense!: number;
  @Input() income!: number;
  @Input() investment!: number;

  List: Chart[] = [
    { value: 1162.80, color: '#498B94', size: '', legend: 'real' },
    { value: 3000, color: '#F8C622', size: '', legend: 'ideal' },
    { value: 1000, color: '#498B94', size: '', legend: 'real' },
    { value: 1000, color: '#F8C622', size: '', legend: 'ideal' },
    { value: 2600, color: '#498B94', size: '', legend: 'real' },
    { value: 5000, color: '#F8C622', size: '', legend: 'ideal' },
  ];

  public total = 0;
  public maxHeight = 160;

  constructor() {}

  ngOnInit(): void {
    this.buildChart();

    setTimeout(() => {
      this.getValue()
    }, 1000);
  }

  getValue() {
    console.log(this.expense);
    console.log(this.income);
    console.log(this.investment);

  }

  buildChart() {
    this.List.forEach((element) => {
      this.total += element.value;
    });

    this.List.forEach((element) => {
      element.size =
        Math.round((element.value * this.maxHeight) / this.total) + '%';
    });
  }
}
