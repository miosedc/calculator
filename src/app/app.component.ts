import {Component, HostListener} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  display = '0';
  subDisplay = '';
  key;
  operators = ['/', '*', '+', '-'];
  numbers = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', '.'];
  error = '';

  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.key = event.key;
    if (this.numbers.includes(this.key)) {
      this.buildNumber(this.key);
    }
    if (this.key === 'Enter') {
      this.calculate();
    }
    if (this.operators.includes(this.key)) {
      this.selectOperator(this.key);
    }
    if (this.key === 'Backspace') {
      this.subDisplay = this.subDisplay.slice(0, -1);
    }
    if (this.key === 'Delete') {
      this.clear();
    }
  }

  buildNumber(item) {
    this.subDisplay += +item;
  }

  selectOperator(operator) {
    const lastOperator =  this.subDisplay[this.subDisplay.length - 1];
    if ((this.numbers.includes(lastOperator))) {
      this.subDisplay += operator;
    } else {
      this.subDisplay = this.subDisplay.slice(0, -1) + operator;
    }
  }

  calculate() {
    if (this.subDisplay[0] === '*' || this.subDisplay[0] === '/') {
      this.error = `error: your first operator is ${this.subDisplay[0]}`;
    } else {
      this.error = '';
    }
    if (this.operators.includes(this.subDisplay[this.subDisplay.length - 1])) {
      this.subDisplay = this.subDisplay.slice(0, -1);
    }
    if (this.display.length > 10) {
      this.display = this.result(this.subDisplay).toFixed(10);
    } else {
      this.display = this.result(this.subDisplay);
    }
    this.subDisplay = '';
  }

  clear() {
    this.display = '0';
    this.subDisplay = '';
  }

  result(num) {
    return new Function('return ' + num)();
  }

}
