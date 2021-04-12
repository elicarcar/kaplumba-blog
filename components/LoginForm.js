import React from 'react';
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

const LoginForm = ({ handleChange }) => {
  return (
    <Grid textAlign="center" style={{ height: '100vh' }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          Hesabina giris yap
        </Header>
        <Form size="large">
          <Segment stacked>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="E-mail address"
              onChange={(e) => handleChange(e)}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              onChange={(e) => handleChange(e)}
            />

            <Button color="teal" fluid size="large">
              Giris Yap
            </Button>
          </Segment>
        </Form>
        <Message>
          Daha kaydolmadin mi? <Link href="/kaydol">Kaydol</Link>
        </Message>
      </Grid.Column>
    </Grid>
  );
};

export default LoginForm;
