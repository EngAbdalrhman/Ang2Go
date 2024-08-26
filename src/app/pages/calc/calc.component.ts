import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-calc',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calc.component.html',
  styleUrl: './calc.component.scss',
})
export class CalcComponent {
  inputSTR = '';
  MetaData: string[][] = [
    ['1', '2', '3', '+'],
    ['4', '5', '6', '-'],
    ['7', '8', '9', '/'],
    ['C', '0', '=', '*'],
  ];

  HandleCalc(cell: string) {
    if (cell == '=') {
      this.inputSTR = eval(this.inputSTR);
    } else if (cell == 'C') this.inputSTR = '';
    else this.inputSTR += cell;

    if (this.inputSTR.includes('undefined') && cell == '=') {
      this.inputSTR = '';
    } else if (this.inputSTR.includes('undefined')) this.inputSTR = cell;
  }
}
