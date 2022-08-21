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

export const plotPointContents = [
  "Something happens to the protagonist that starts this subplot",
  "The protagonist takes an action that changes the story",
  "The protagonist is in danger or is confronted to a difficult choice",
  "The subplot reaches a new status quo",
];

export interface PlotPoint {
  eventType: PlotPointTypes;
  content: string;
  scene: string;
}
