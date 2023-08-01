export class RandomGenerator {
  constructor(
    private min: number,
    private max: number,
    private integer: boolean
  ) {}

  public random() {
    if (this.max === this.min) return this.min;
    const r = Math.random() * (this.max - this.min + +this.integer) + this.min;
    return this.integer ? Math.floor(r) : r;
  }
}
