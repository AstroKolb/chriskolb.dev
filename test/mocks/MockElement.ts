// style testing interface; style value is stored under _values
interface MockStyle extends CSSStyleDeclaration {
   // eslint-disable-next-line @typescript-eslint/naming-convention
   _values: {
      width: string;
      'flex-direction': 'row' | 'row-reverse' | 'column' | 'column-reverse';
   };
}

export interface MockElement extends HTMLElement {
   style: MockStyle;
}

export interface MockParent extends ParentNode {
   style: MockStyle;
}
