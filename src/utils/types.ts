type TZone = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export type TEvents = {
  id: string;
  timestamp: number;
  duration: number;
  zone: TZone;
  formatDate?: string;
};
