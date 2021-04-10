import React, { useState } from 'react';
import { Form, Input, Button, Icon } from 'semantic-ui-react';

const Kaydol = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
  });

  function handleChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
    console.log(formData);
  }

  return (
    <div className="form d-flex flex-column">
      <Input
        name="username"
        iconPosition="left"
        onChange={(e) => handleChange(e)}
        placeholder="Bir kullanici adi girin"
      >
        <input />
        <Icon name="user" />
      </Input>
      <Input
        name="email"
        iconPosition="left"
        onChange={(e) => handleChange(e)}
        placeholder="Emailinizi girin"
      >
        <input />
        <Icon name="at" />
      </Input>
      <Input
        name="password"
        onChange={(e) => handleChange(e)}
        type="password"
        iconPosition="left"
        placeholder="Sifreniz"
      >
        <input />
        <Icon name="user secret" />
      </Input>
      <Input
        type="password"
        iconPosition="left"
        placeholder="Sifrenizi bir daha girin"
      >
        <input />
        <Icon name="user secret" />
      </Input>

      <Button>Kaydol</Button>
    </div>
  );
};

export default Kaydol;
