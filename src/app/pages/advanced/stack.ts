class StackItem {
  value: number;
  op: string;
  vg: number;

  constructor(value: number, op: string, vg: number) {
    this.value = value;
    this.op = op;
    this.vg = vg;
  }
}

export default StackItem;
