create database kiwify;


create table clientes (
	id serial primary key,
  email text not null unique,
  senha text not null
)