import { Field, Formik } from 'formik';
import { Dispatch, SetStateAction, useContext } from 'react';
import { Card } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import User from '../model/User';
import CurrentUserContext from '../utils/providers/CurrentUserContext';
import { login } from '../utils/services/authentication';

function Login() {
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);
  return (
    <div className='row d-flex justify-content-center pt-5'>
      <Card className='col-6'>
        <Card.Body>
          <LoginForm setCurrentUser={setCurrentUser} />
        </Card.Body>
      </Card>
    </div>
  );
}

type FormParams = {
  setCurrentUser: Dispatch<SetStateAction<User>>;
};

function LoginForm(props: FormParams) {
  const { t } = useTranslation();
  const { setCurrentUser } = props;
  const navigate = useNavigate();

  function onFormSubmit(user: User) {
    login(user.email, user.password).then((user) => {
      if (user) {
        setCurrentUser(user);
        navigate('/');
      }
    });
  }

  const UserLoginSchema = Yup.object().shape({
    email: Yup.string()
      .email(t('emailInvalid', { keyPrefix: 'login' }))
      .required(t('required', { keyPrefix: 'global.form' })),
    password: Yup.string().required(
      t('required', { keyPrefix: 'global.form' }),
    ),
  });

  const entry: User = { email: '', password: '' };

  return (
    <div className='form-wrapper'>
      <Formik
        initialValues={{
          ...entry,
        }}
        onSubmit={async (values) => {
          const loginUser = {
            ...values,
          };

          onFormSubmit(loginUser);
        }}
        validationSchema={UserLoginSchema}
      >
        {({ handleSubmit, touched, errors }) => (
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor='email' className='form-label'>
                {t('email', { keyPrefix: 'login' })}
              </label>
              <Field
                as={Form.Control}
                id='email'
                name='email'
                className='form-control'
                required
                isInvalid={!!touched.email && !!errors.email}
              />
              {touched.email && errors.email && (
                <div className='invalid-feedback'>{errors.email}</div>
              )}
            </div>

            <div className='mb-3'>
              <label htmlFor='password' className='form-label'>
                {t('password', { keyPrefix: 'login' })}
              </label>
              <Field
                as={Form.Control}
                id='password'
                name='password'
                className='form-control'
                type='password'
                required
                isInvalid={!!touched.password && !!errors.password}
              />
              {touched.password && errors.password && (
                <div className='invalid-feedback'>{errors.password}</div>
              )}
            </div>

            <button className='btn btn-primary' type='submit'>
              {t('login', { keyPrefix: 'login' })}
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Login;
