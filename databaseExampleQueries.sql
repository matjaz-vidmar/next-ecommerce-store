CREATE TABLE products(
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name varchar(50) not NULL,
  description varchar(200) not NULL,
  price integer not NULL
);

INSERT INTO products
(name, description, price)
VALUES
 ( 'existentialism','God is dead. Nietzsche, 1883. Nietzsche is dead. God, 1900.', 275 ),
  ( 'nihilism', 'If we believe in nothing, if nothing has any meaning and if we can affirm no values whatsoever, then everything is possible and nothing has any importance.', 593 ),
  ( 'post-structuralism', 'To pretend, I actually do the thing: I have therefore only pretended to pretend', 1250 ),
  ( 'stoicism','We suffer more often in imagination than in reality.', 46 );

SELECT * FROM products;
