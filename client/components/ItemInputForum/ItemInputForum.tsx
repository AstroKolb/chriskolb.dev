import { useState } from 'react';
import { itemTable } from '@/store';
import { useDispatch } from 'react-redux';
import css from './ItemInputForum.module.scss';

const defaultInput = 'dateTime,character,itemID,offspec,id';
const defaultEntry = `
2023-05-13,Lalanalal,45481,1,52513447977664717400
2023-05-08,_disenchanted,45644,0,53511728413038143110
`;

const tmpEntry = `2023-06-01,player1,1002,0,300303030
2023-06-02,player2,1002,1,003030303`;

export const ItemInputForum = (): JSX.Element => {
   const [formData, setFormData] = useState<string>(tmpEntry);
   const dispatch = useDispatch();
   const { addItem } = itemTable.actions;

   //
   const handleSubmit = (e: React.FormEvent): void => {
      e.preventDefault();
      const dateRE = /([0-9]{4}(-[0-1]{1}[0-9]{1}){2})/;
      const itemIdRE = /([0-9]{4,5})/;
      const offSpecRE = /([01]{1})/;
      const entries = formData.split('\n');
      const parsedEntries = entries.forEach((entry: string) => {
         const [date, character, itemId, offSpec, transactionId] = entry.split(/(?:\s*,\s*)/); // separate and remove spaces

         // validate
         if (!dateRE.test(date)) throw new Error('date does not match YYYY-MM-DD format.');
         if (!itemIdRE.test(itemId)) throw new Error('itemId should be a 4-5 digit number.');
         if (!offSpecRE.test(offSpec)) throw new Error('offSpec should be boolean (0 or 1)');

         // return { date, character, itemId, offSpec, transactionId };
         dispatch(addItem({ date, character, itemId, offSpec, transactionId }));
      });
   };
   return (
      <div>
         <form onSubmit={handleSubmit}>
            <textarea value={formData} onChange={(e) => setFormData(e.target.value)} />
            <button type="submit">Submit</button>
            <button type="reset">Clear</button>
         </form>
      </div>
   );
};
