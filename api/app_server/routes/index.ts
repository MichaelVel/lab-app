import {Router} from 'express';
import {expressjwt} from 'express-jwt';

import dotenv from 'dotenv';

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

dotenv.config();

const secret = process.env.JWT_SECRET as string;
const auth = expressjwt({
  secret: secret,
  algorithms: ["HS256"],
});

const router = Router();

router
  .route('/challenges')
  .get(challengeList)
  .post(auth,challengeCreate);

router
  .route('/challenges/:challengeid')
  .get(challengeReadOne)
  .put(auth, challengeUpdateOne)
  .delete(auth, challengeDeleteOne);

router
  .route('/challenges/:challengeid/solutions')
  .post(auth, solutionCreate);

router
  .route('/challenges/:challengeid/solutions/:solutionid')
  .get(solutionReadOne)
  .put(auth, solutionUpdateOne)
  .delete(auth, solutionDeleteOne);

router.post('/login', login);
router.post('/register', register);

export default router;
