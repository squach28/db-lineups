import { Gender } from "./Gender";
import { SidePreference } from "./SidePreference";

export type Paddler = {
  id: string;
  fullName: string;
  gender: Gender;
  weight: number;
  canSteer: boolean;
  canDrum: boolean;
  sidePreference: SidePreference;
};
