import { Router } from 'express';
import { errorWrapper } from '../utils';
import {
  UpdateStadiumData,
  getAllStadiums,
  getStadiumDetails,
  getStadiumProfile,
} from '../controllers';

export const stadiumRouter: Router = Router();

stadiumRouter.get('/', errorWrapper(getAllStadiums));
stadiumRouter.get('/details/:id', errorWrapper(getStadiumDetails));
stadiumRouter.get('/profile/:id', errorWrapper(getStadiumProfile));
stadiumRouter.patch('/edit', errorWrapper(UpdateStadiumData));
