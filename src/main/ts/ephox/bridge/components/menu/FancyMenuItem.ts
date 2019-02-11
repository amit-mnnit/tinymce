import { Result, Fun } from '@ephox/katamari';
import { FieldSchema, ValueSchema } from '@ephox/boulder';

export interface FancyMenuItemApi {
  type: 'fancymenuitem';
  fancytype: string;
  onAction: (data: any) => void;
}

export interface FancyMenuItem {
  type: 'fancymenuitem';
  fancytype: keyof FancyActionArgsMap;
  onAction: <K extends keyof FancyActionArgsMap>(data: FancyActionArgsMap[K]) => void;
}

export interface FancyActionArgsMap {
  'inserttable': {numRows: Number, numColumns: Number};
}

export const fancyMenuItemSchema = ValueSchema.objOf([
  FieldSchema.strictString('type'),
  FieldSchema.strictStringEnum('fancytype', ['inserttable']), // These will need to match the keys of FancyActionArgsMap above
  FieldSchema.defaultedFunction('onAction', Fun.noop)
]);

export const createFancyMenuItem = (spec: FancyMenuItemApi): Result<FancyMenuItem, ValueSchema.SchemaError<any>> => {
  return ValueSchema.asRaw('fancymenuitem', fancyMenuItemSchema, spec);
};