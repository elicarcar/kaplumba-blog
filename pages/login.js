import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from 'semantic-ui-react';
import Link from 'next/link';
import axios from 'axios';
import { setCookie } from '../utils/clientAuth';

const Login = ({ user }) => {
  const router = useRouter();

  const INITIAL = {
    email: '',
    password: '',
  };

  const [formData, setFormData] = useState(INITIAL);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorContent, setErrorContent] = useState('');

  useEffect(() => {
    if (user) {
      router.push('/');
    }
  });

  useEffect(() => {
    resetMessage();

    return () => {
      clearTimeout(resetMessage());
    };
  }, [error]);

  function resetMessage() {
    setTimeout(() => {
      setError(false);
      setErrorContent('');
    }, 4000);
  }

  function handleChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleLoginForm(e) {
    e.preventDefault();

    try {
      setLoading(true);
      const token = await axios.post(
        `/api/login`,
        { ...formData },
        {
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': ['POST', 'OPTIONS'],
            'Access-Control-Allow-Headers': 'X-PINGOTHER, Content-Type',
            Accept: 'application/json',
          },
        }
      );
      setCookie(token);

      router.push('/profilim');
    } catch (error) {
      setError(true);
      setErrorContent(error.response.data);
      console.log(error);
    } finally {
      setLoading(false);
      e.target.reset();
    }
  }
  return (
    <div>
      <Grid
        textAlign="center"
        style={{ height: '100vh' }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          {error && <Message color="red" content={errorContent} />}
          <Header as="h2" color="teal" textAlign="center">
            Hesabina giris yap
          </Header>
          <Form loading={loading} onSubmit={handleLoginForm} size="large">
            <Segment stacked>
              <Form.Input
                fluid
                name="email"
                icon="user"
                iconPosition="left"
                placeholder="E-mail address"
                onChange={(e) => handleChange(e)}
              />
              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                type="password"
                onChange={(e) => handleChange(e)}
              />

              <Button color="teal" type="submit" fluid size="large">
                Giris Yap
              </Button>
            </Segment>
          </Form>
          <Message>
            Daha kaydolmadin mi? <Link href="/kaydol">Kaydol</Link>
          </Message>
        </Grid.Column>
      </Grid>
    </div>
  );
};

export default Login;
