import { Paddler } from "./Paddler";

export type Lineup = {
  id: string;
  name: string;
  lefts: Array<Paddler | null>;
  rights: Array<Paddler | null>;
};
