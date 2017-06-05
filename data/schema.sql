DROP TABLE IF EXISTS contacts;

CREATE TABLE contacts (
  id serial,
  name varchar(255) NOT NULL,
  email varchar(255),
  phone varchar(255),
  street varchar(255),
  city varchar(255),
  state varchar(255),
  country varchar(255),
  zip varchar(255),
  birthday date,
  website varchar(255)
);
