export interface FitbitActivity {
  duration: number;
  activityName: string;
}

export interface FitbitActivitySingle {
  duration: number;
  calories: number;
  activityParentName: string;
}

export interface FitbitChartItem {
  id: number;
  label: string;
  frequency: number;
  value: number;
}

export interface CalendarItem {
  $M: number;
  $D: number;
  $y: number;
}

export interface ImageMap {
  Treadmill: string;
  Walk: string;
  "Strength training": string;
  Stairclimber: string;
  Weights: string;
  Weightlifting: string;
  "Core training": string;
  "Rowing machine": string;
  Spinning: string;
  Elliptical: string;
  other: string;
}
