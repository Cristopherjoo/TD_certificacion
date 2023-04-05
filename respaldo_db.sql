
DROP TABLE IF EXISTS usuarios, categorias, publicaciones, comentarios;

CREATE TABLE usuarios(
	id serial primary key,
	nombre VARCHAR(50) NOT NULL,
	email VARCHAR(50) NOT NULL,
	password VARCHAR(150) NOT NULL
);


CREATE TABLE categorias(
	id serial primary key,
	nombre VARCHAR(50) NOT NULL
);


CREATE TABLE publicaciones(
	id serial primary key,
	titulo VARCHAR(255) NOT NULL,
	contenido VARCHAR(1000) NOT NULL,
	fecha date NOT NULL,
	id_categoria INT NOT NULL,
	id_usuario INT NOT NULL,
	imagen VARCHAR(255),
	FOREIGN KEY(id_categoria) REFERENCES categorias(id),
	FOREIGN KEY(id_usuario) REFERENCES usuarios(id)
);


CREATE TABLE comentarios(
	id serial primary key,
	contenido VARCHAR(1000) NOT NULL,
	id_usuario INT NOT NULL,
	id_publicacion INT NOT NULL,
	fecha date NOT NULL DEFAULT NOW(),
	FOREIGN KEY(id_usuario) REFERENCES usuarios(id),
	FOREIGN KEY(id_publicacion) REFERENCES publicaciones(id)
);

INSERT INTO categorias(nombre) VALUES('Farandula'), ('Politica');

INSERT INTO usuarios(nombre, email, password) VALUES('marco', 'marco@gmail.com', '123456'), ('luisa', 'luisa@gmail.com', '123456');

