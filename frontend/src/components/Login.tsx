import { Field, Formik } from 'formik';
import { Card } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useTranslation } from 'react-i18next';
import * as Yup from 'yup';
import User from '../model/User';
import { login } from '../utils/services/authentication';

function Login() {
  return (
    <div className='row d-flex justify-content-center pt-5'>
      <Card className='col-6'>
        <Card.Body>
          <LoginForm />
        </Card.Body>
      </Card>
    </div>
  );
}

function LoginForm() {
  const { t } = useTranslation();

  function onFormSubmit(user: User) {
    login(user.email, user.password);
  }

  const UserLoginSchema = Yup.object().shape({
    email: Yup.string()
      .min(2, t('too_short', { keyPrefix: 'global.form' }))
      .max(50, t('too_long', { keyPrefix: 'global.form' }))
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
