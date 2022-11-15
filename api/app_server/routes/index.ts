import {Router} from 'express';
import {
  challengeList,
  challengeCreate,
  challengeReadOne,
  challengeDeleteOne,
  challengeUpdateOne,
} from '../controllers/challenges';

import {
  solutionCreate,
  solutionReadOne,
  solutionDeleteOne,
  solutionUpdateOne,
} from '../controllers/solutions';

const router = Router();

router
  .route('/challenges')
  .get(challengeList)
  .post(challengeCreate);

router
  .route('/challenges/:id')
  .get(challengeReadOne)
  .put(challengeUpdateOne)
  .delete(challengeDeleteOne);

router
  .route('/challenges/:challid/solutions')
  .post(solutionCreate);

router
  .route('/challenges/:challid/solutions/:solid')
  .get(solutionReadOne)
  .put(solutionUpdateOne)
  .delete(solutionDeleteOne);

export default router;
