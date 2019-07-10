export default interface Template {
  readonly name: string;
  generate(): string;
}
