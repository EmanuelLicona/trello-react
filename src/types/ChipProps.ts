import { ILabel } from '../interfaces'

export interface ChipProps {
  item: ILabel;
  removeLabel?: (label: ILabel) => void;
}