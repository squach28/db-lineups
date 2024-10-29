import { Gender } from "./Gender";
import { SidePreference } from "./SidePreference";

export type PaddlerInfo = {
  fullName: string;
  gender: Gender;
  weight: number;
  sidePreference: SidePreference;
  canSteer: boolean;
  canDrum: boolean;
};
