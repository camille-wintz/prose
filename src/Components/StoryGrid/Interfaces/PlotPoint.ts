export enum PlotPointTypes {
  IncitingEvent = 0,
  Complication = 1,
  Crisis = 2,
  Resolution = 3,
}

export const plotPointNames = [
  "Inciting Event",
  "Complication",
  "Crisis",
  "Resolution",
];

export interface PlotPoint {
  eventType: PlotPointTypes;
  content: string;
  scene: string;
}
