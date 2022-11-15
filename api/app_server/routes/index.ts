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
  .route('/challenges/:challengeid')
  .get(challengeReadOne)
  .put(challengeUpdateOne)
  .delete(challengeDeleteOne);

router
  .route('/challenges/:challengeid/solutions')
  .post(solutionCreate);

router
  .route('/challenges/:challengeid/solutions/:solutionid')
  .get(solutionReadOne)
  .put(solutionUpdateOne)
  .delete(solutionDeleteOne);

export default router;
