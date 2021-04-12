import React, { useState } from 'react';
import axios from 'axios';
import baseUrl from '../utils/baseUrl';
import {
  Form,
  Input,
  Button,
  Icon,
  Header,
  Message,
  Grid,
  Segment,
} from 'semantic-ui-react';
import { setCookie } from '../utils/clientAuth';

const Kaydol = () => {
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [contentMessage, setContentMessage] = useState('');

  const INITIAL_DATA = {
    username: '',
    password: '',
    password2: '',
    email: '',
  };

  const [formData, setFormData] = useState(INITIAL_DATA);

  function handleChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  async function handleForm(e) {
    try {
      e.preventDefault();
      setLoading(true);
      const isEmpty = Object.values(formData).some((value) => !value.length);
      const isMatch = formData.password === formData.password2;
      if (isEmpty) {
        setError(true);
        setContentMessage('Lutfen tum alanlari doldurdugunuza emin olun.');
      }
      if (!isMatch || formData.password < 5 || formData.password > 10) {
        setError(true);
        setContentMessage('Lutfen bilgilerinizi kontrol edin');
      }

      const token = await axios.post(`${baseUrl}/api/signup`, { ...formData });
      setSuccess(true);
      setContentMessage('Yasasin!');
      setLoading(false);
      setCookie(token);
    } catch (error) {
      setError(true);
      setContentMessage('Bir sorun olustu. Lutfen tekrar deneyin.');
    } finally {
      setFormData(INITIAL_DATA);
      setLoading(false);
      if (error) {
        setError(false);
      }
    }
  }

  return (
    <>
      {error ||
        (success && (
          <Message
            success={success}
            error={error}
            header="Bir sorun olustu"
            content={contentMessage}
          />
        ))}
      <Grid
        textAlign="center"
        style={{ height: '100vh' }}
        verticalAlign="middle"
      >
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2">
            <Icon name="add" color="green" />
            Hemen Kaydolun!
          </Header>
          <Form
            loading={loading}
            onSubmit={(e) => handleForm(e)}
            error={true}
            size="large"
          >
            <Segment stacked>
              <Form.Input
                name="username"
                iconPosition="left"
                onChange={(e) => handleChange(e)}
                placeholder="Bir kullanici adi girin"
              >
                <input />
                <Icon name="user" />
              </Form.Input>
              <Form.Input
                name="email"
                iconPosition="left"
                onChange={(e) => handleChange(e)}
                placeholder="Emailinizi girin"
              >
                <input />
                <Icon name="at" />
              </Form.Input>
              <Form.Input
                name="password"
                onChange={(e) => handleChange(e)}
                type="password"
                iconPosition="left"
                placeholder="Sifreniz"
              >
                <input />
                <Icon name="user secret" />
              </Form.Input>
              <Form.Input
                name="password2"
                onChange={(e) => handleChange(e)}
                type="password"
                iconPosition="left"
                placeholder="Sifrenizi bir daha girin"
              >
                <input />
                <Icon name="user secret" />
              </Form.Input>
            </Segment>

            <br />
            <br />

            <Form.Field
              control={Button}
              disabled={disabled || loading}
              inverted
              color="teal"
              content="Kaydol"
              icon="pencil alternate"
              type="submit"
            />
          </Form>
        </Grid.Column>
      </Grid>
    </>
  );
};

export default Kaydol;
