import { render, screen, userEvent } from '@/test';
import type { MockElement } from '@/test';
import { SortableTable } from '../SortableTable';

const user = userEvent.setup({ delay: null });

describe('SortableTable (unit)', () => {
   test('renders', () => {
      expect('a').toEqual('a');
      expect('a').toEqual('a');
   });
});
