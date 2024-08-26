import { Component } from '@angular/core';
import StackItem from './stack';

@Component({
  selector: 'app-advanced',
  standalone: true,
  imports: [],
  templateUrl: './advanced.component.html',
  styleUrls: ['./advanced.component.scss'],
})
export class AdvancedComponent {
  showValue: string = '0';
  degreeRadians: string = 'degree';
  totalDigits = 12;
  pareSize = 12;
  value = 0;
  memory = 0;
  level = 0;
  entered = true;
  decimal = 0;
  fixed = 0;
  exponent = false;
  digits = 0;
  gG: number = 0;
  isShowValue = true;

  Hj: any;
  // uI: any[] = [];
  op: string = '';
  Qk: any;
  // uI: { value: number; op: string; vg: number }[] = [];
  r(A: string | number): void {
    switch (A) {
      case '10x':
      case 'log':
      case 'ex':
      case 'ln':
      case 'sin':
      case 'asin':
      case 'cos':
      case 'acos':
      case 'tan':
      case 'atan':
      case 'e':
      case 'pi':
      case 'n!':
      case 'x2':
      case '1/x':
      case 'swap':
      case 'x3':
      case '3x':
      case 'RND':
      case 'M-':
      case 'qc':
      case 'MC':
      case 'MR':
      case 'MS':
      case 'M+':
      case 'sqrt':
      case 'pc':
        this.func(A);
        break;
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
      case 8:
      case 9:
        this.numInput(A);
        break;
      case 'pow':
      case 'apow':
      case '+':
      case '-':
      case '*':
      case '/':
        this.opt(A);
        // this.showValue += A; // then they are moved to stack
        break;
      case '(':
        this.popen();
        break;
      case ')':
        this.pclose();
        break;
      case 'EXP':
        this.exp();
        break;
      case '.':
        if (this.entered) {
          this.value = 0;
          this.digits = 1;
        }
        this.entered = false;
        if (this.decimal == 0 && this.value == 0 && this.digits == 0) {
          this.digits = 1;
        }
        if (this.decimal == 0) {
          this.decimal = 1;
        }
        this.refresh();
        break;
      case '+/-':
        if (this.exponent) {
          this.Hj = -this.Hj;
        } else {
          this.value = -this.value;
        }
        this.refresh();
        break;
      case 'C':
        this.level = 0;
        this.exponent = false;
        this.value = 0;
        // this.showValue = '';
        this.enter();
        this.refresh();
        break;
      case '=':
        this.enter();
        while (this.level > 0) {
          this.evalx();
        }
        this.refresh();
        break;
      default:
        console.log('Unknown input');
    }
  }
  stackItem = [(this.value = 0), (this.op = '')];
  array(A: number): { value: number; op: string; vg: number }[] {
    const arr: { value: number; op: string; vg: number }[] = [];
    for (let i = 0; i < A; ++i) {
      // arr[i] = new StackItem(this.value, this.op, this.vg);
      arr[i] = new StackItem(0, '', 0);
    }
    return arr;
  }
  // array(A: number): { value: number; op: string; vg: number }[] {
  //   return Array(A).fill(0).map(() => new StackItem(0, '', 0));
  // }
  uI: { value: number; op: string; vg: number }[] = this.array(this.pareSize);
  // const pareSize = 10;
  // const uI = array(pareSize);
  opt(A: string): void {
    this.enter();
    let vg: number;
    switch (A) {
      case '+':
      case '-':
        vg = 1;
        break;
      case '*':
      case '/':
        vg = 2;
        break;
      case 'pow':
      case 'apow':
        vg = 3;
        break;
      default:
        console.log('Unknown operator');
        return;
    }
    if (this.level > 0 && vg <= this.uI[0].vg) {
      this.evalx();
    }
    if (!this.push(this.value, A, vg)) {
      this.value = 0;
    }
    this.refresh();
  }
  push(B: number, C: string, A: number): boolean {
    if (this.level === this.pareSize) {
      return false;
    }
    if (this.uI.length === 0) {
      // check if the array is empty
      this.uI.push({ value: 0, op: '', vg: 0 }); // initialize with a default element
    }
    for (let i = this.level; i > 0; --i) {
      this.uI[i].value = this.uI[i - 1].value;
      this.uI[i].op = this.uI[i - 1].op;
      this.uI[i].vg = this.uI[i - 1].vg;
    }
    this.uI[0].value = B;
    this.uI[0].op = C;
    this.uI[0].vg = A;
    ++this.level;
    return true;
  }
  evalx(): boolean {
    if (this.level === 0) {
      return false;
    }
    this.op = this.uI[0].op;
    this.Qk = this.uI[0].value;
    console.log(this.Qk);
    console.log(this.op);
    switch (this.op) {
      case '+':
        this.value = this.Qk + this.value;
        break;
      case '-':
        this.value = this.Qk - this.value;
        break;
      case '*':
        this.value = this.Qk * this.value;
        break;
      case '/':
        this.value = this.Qk / this.value;
        break;
      case 'pow':
        this.value = Math.pow(this.Qk, this.value);
        break;
      case 'apow':
        this.value = Math.pow(this.Qk, 1 / this.value);
        break;
    }
    this.pop();
    if (this.op === '(') {
      return false;
    }
    return true;
  }
  pop(): boolean {
    if (this.level === 0) {
      return false;
    }
    if (this.uI.length <= this.level) {
      // handle the case where the uI array is not large enough
      console.error('uI array is not large enough');
      return false;
    }
    for (let i = 0; i < this.level; ++i) {
      this.uI[i].value = this.uI[i + 1].value;
      this.uI[i].op = this.uI[i + 1].op;
      this.uI[i].vg = this.uI[i + 1].vg;
    }
    --this.level;
    return true;
  }
  enter(): void {
    if (this.exponent) {
      this.value = this.value * Math.exp(this.Hj * Math.LN10);
    }
    this.entered = true;
    this.exponent = false;
    this.decimal = 0;
    this.fixed = 0;
    // this.refresh();
  }

  refresh(): void {
    let A = this.format(this.value);
    if (this.exponent) {
      if (this.Hj < 0) {
        A += ' ' + this.Hj;
      } else {
        A += ' +' + this.Hj;
      }
    }
    if (A.indexOf('.') < 0 && A !== 'Error ') {
      if (this.entered || this.decimal > 0) {
        A += '.';
      } else {
        A += ' ';
      }
    }
    if (A === '') {
      this.showValue = ' '; //'&nbsp;';
    } else {
      this.showValue = A;
    }
  }
  format(I: number): string {
    // if (typeof cc !== 'undefined') {
    //   return '';
    // }
    let E = '' + I;
    if (E.indexOf('N') >= 0 || (I === 2 * I && I === 1 + I)) {
      return 'Error ';
    }
    let G = E.indexOf('e');
    if (G >= 0) {
      let A = E.substring(G + 1, E.length);
      if (G > 11) {
        G = 11;
      }
      E = E.substring(0, G);
      if (E.indexOf('.') < 0) {
        E += '.';
      } else {
        let j = E.length - 1;
        while (j >= 0 && E.charAt(j) === '0') {
          --j;
        }
        E = E.substring(0, j + 1);
      }
      E += ' ' + A;
    } else {
      let J = false;
      if (I < 0) {
        I = -I;
        J = true;
      }
      let C = Math.floor(I);
      let K = I - C;
      let D = this.totalDigits - ('' + C).length - 1;
      if (!this.entered && this.fixed > 0) {
        D = this.fixed;
      }
      let F: any = ' 1000000000000000000'.substring(1, D + 2) + '';
      if (F === '' || F === ' ') {
        F = 1;
      } else {
        F = parseInt(F, 10);
      }
      let B = Math.floor(K * F + 0.5);
      C = Math.floor(Math.floor(I * F + 0.5) / F);
      if (J) {
        E = '-' + C;
      } else {
        E = '' + C;
      }
      let H = '00000000000000' + B;
      H = H.substring(H.length - D, H.length);
      G = H.length - 1;
      if (this.entered || this.fixed === 0) {
        while (G >= 0 && H.charAt(G) === '0') {
          --G;
        }
        H = H.substring(0, G + 1);
      }
      if (G >= 0) {
        E += '.' + H;
      }
    }
    return E;
  }
  exp(): void {
    if (this.entered || this.exponent) {
      return;
    }
    this.exponent = true;
    this.Hj = 0; // 1
    this.digits = 0;
    this.decimal = 0;
    this.refresh();
  }

  pclose(): void {
    this.enter();
    while (this.evalx()) {}
    this.refresh();
  }

  popen(): void {
    this.enter();
    if (!this.push(0, '(', 0)) {
      this.value = 0;
    }
    this.refresh();
  }

  func(D: string): void {
    this.enter();
    switch (D) {
      case '1/x':
        this.value = 1 / this.value;
        break;
      case 'pc':
        this.value = this.value / 100;
        break;
      case 'qc':
        this.value = this.value / 1000;
        break;
      case 'swap':
        let B = this.value;
        this.value = this.uI[0].value;
        this.uI[0].value = B;
        break;
      case 'n!':
        if (
          this.value < 0 ||
          this.value > 200 ||
          this.value !== Math.round(this.value)
        ) {
          this.value = 0;
        } else {
          let E = 1;
          for (let A = 1; A <= this.value; ++A) {
            E *= A;
          }
          this.value = E;
        }
        break;
      case 'MR':
        this.value = this.memory;
        break;
      case 'M+':
        this.memory += this.value;
        break;
      case 'MS':
        this.memory = this.value;
        break;
      case 'MC':
        this.memory = 0;
        break;
      case 'M-':
        this.memory -= this.value;
        break;
      case 'asin':
        if (this.degreeRadians === 'degree') {
          this.value = (Math.asin(this.value) * 180) / Math.PI;
        } else {
          this.value = Math.asin(this.value);
        }
        break;
      case 'acos':
        if (this.degreeRadians === 'degree') {
          this.value = (Math.acos(this.value) * 180) / Math.PI;
        } else {
          this.value = Math.acos(this.value);
        }
        break;
      case 'atan':
        if (this.degreeRadians === 'degree') {
          this.value = (Math.atan(this.value) * 180) / Math.PI;
        } else {
          this.value = Math.atan(this.value);
        }
        break;
      case 'e^x':
        this.value = Math.exp(this.value * Math.LN10);
        break;
      case '2^x':
        this.value = Math.exp(this.value * Math.LN2);
        break;
      case 'e':
        this.value = Math.E;
        break;
      case 'ex':
        this.value = Math.pow(Math.E, this.value);
        break;
      case '10x':
        this.value = Math.pow(10, this.value);
        break;
      case 'x3':
        this.value = this.value * this.value * this.value;
        break;
      case '3x':
        this.value = Math.pow(this.value, 1 / 3);
        break;
      case 'x2':
        this.value = this.value * this.value;
        break;
      case 'sin':
        if (this.degreeRadians === 'degree') {
          this.value = Math.sin((this.value / 180) * Math.PI);
        } else {
          this.value = Math.sin(this.value);
        }
        break;
      case 'cos':
        if (this.degreeRadians === 'degree') {
          let C = this.value % 360;
          if (C < 0) {
            C = C + 360;
          }
          if (C === 90) {
            this.value = 0;
          } else {
            if (C === 270) {
              this.value = 0;
            } else {
              this.value = Math.cos((this.value / 180) * Math.PI);
            }
          }
        } else {
          let C = ((this.value * 180) / Math.PI) % 360;
          if (C < 0) {
            C = C + 360;
          }
          if (Math.abs(C - 90) < 1e-10 || Math.abs(C - 270) < 1e-10) {
            this.value = 0;
          } else {
            this.value = Math.cos(this.value);
          }
        }
        break;
      case 'tan':
        if (this.degreeRadians === 'degree') {
          this.value = Math.tan((this.value / 180) * Math.PI);
        } else {
          this.value = Math.tan(this.value);
        }
        break;
      case 'log':
        this.value = Math.log(this.value) / Math.LN10;
        break;
      case 'log2':
        this.value = Math.log(this.value) / Math.LN2;
        break;
      case 'ln':
        this.value = Math.log(this.value);
        break;
      case 'sqrt':
        this.value = Math.sqrt(this.value);
        break;
      case 'pi':
        this.value = Math.PI;
        break;
      case 'RND':
        this.value = Math.random();
        break;
      default:
        console.log('Function not implemented');
    }
    this.refresh();
  }

  numInput(A: number): void {
    if (this.entered) {
      this.value = 0;
      this.digits = 0;
      this.entered = false;
    }
    if (A == 0 && this.digits == 0) {
      this.refresh();
      return;
    }
    if (this.exponent) {
      if (this.Hj < 0) {
        A = -A;
      }
      if (this.digits < 3) {
        this.Hj = this.Hj * 10 + A;
        ++this.digits;
        this.refresh();
      }
      return;
    }
    if (this.value < 0) {
      A = -A;
    }
    if (this.digits < this.totalDigits - 1) {
      ++this.digits;
      if (this.decimal > 0) {
        this.decimal = this.decimal * 10;
        this.value = this.value + A / this.decimal;
        ++this.fixed;
      } else {
        this.value = this.value * 10 + A;
      }
    }
    this.refresh();
  }
}
//js
