import {Fproduct} from "./fproduct.model";

export class ChoiceBoxModel{
  fproduct?: Fproduct;
  isSelected?: boolean;

  constructor(fproduct: Fproduct, isSelected: boolean) {
    this.fproduct = fproduct;
    this.isSelected = isSelected;
  }
}
