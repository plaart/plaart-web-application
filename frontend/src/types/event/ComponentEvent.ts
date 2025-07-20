/* eslint-disable @typescript-eslint/no-explicit-any */

export interface ComponentEvent {
  type: string;
  payload?: any;
  timestamp: number;
  source: string;
}
