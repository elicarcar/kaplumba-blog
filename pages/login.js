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
import baseUrl from '../utils/baseUrl';
import { setCookie } from '../utils/clientAuth';

const Login = ({ user }) => {
  const router = useRouter();

  //   useEffect(() => {
  //     if (user) {
  //       router.push('/');
  //     }
  //   });

  const INITIAL = {
    email: '',
    password: '',
  };

  const [formData, setFormData] = useState(INITIAL);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      const token = await axios.post(`${baseUrl}/api/login`, { ...formData });
      setCookie(token);

      console.log(token.data);
      router.push('/profilim');
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div>
      {error && <Message />}
      <Grid
        textAlign="center"
        style={{ height: '100vh' }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
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
