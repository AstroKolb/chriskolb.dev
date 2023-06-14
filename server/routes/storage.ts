import express from 'express';
import { logger } from '@server/utils';

const storageRouter = express.Router();

let testData = [
   { name: 'player1', item: '1003', received: true },
   { name: 'player2', item: '1003', received: false, prio: 3 },
   { name: 'player2', item: '1004', received: true },
   { name: 'player1', item: '1001', received: false, prio: 2 },
   { name: 'player1', item: '1002', received: false, prio: 1 },
   { name: 'player3', item: '1004', received: false, prio: 1 },
   { name: 'player4', item: '1001', received: false, prio: 3 },
   { name: 'player4', item: '1002', received: true, prio: 2 },
   { name: 'player4', item: '1003', received: false, prio: 1 },
   { name: 'player4', item: '1004', received: false, prio: 4 },
];

storageRouter.get('/', (request: express.Request, response: express.Response) => {
   response.json(testData);
});

storageRouter.post('/', (request: express.Request, response: express.Response) => {
   const newData = request.body;

   console.log('data:', newData);

   testData = [...testData, newData];
   response.send(true);
});

export { storageRouter };
