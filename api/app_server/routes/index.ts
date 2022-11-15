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

import { 
    register,
    login,
} from '../controllers/authentication';

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

router.post('/login', login);
router.post('/register', register);

export default router;
