export interface IEventsExport {
  name: string;
  once?: boolean;
  execute: (...args: any) => Promise<void> | void;
}
