import { Service } from "typedi";

@Service()
export class FeaturesService {
  public isEnabled(feature: string): boolean {
    //@ts-ignore
    return window.Terrasoft.Features.getIsEnabled(feature);
  }
}