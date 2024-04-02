-- Create tables
create table member (
	username VARCHAR(30) primary key,
	password VARCHAR(30) not null
); 

create table post (
	id serial primary key,
	author VARCHAR(30) not null,
	title VARCHAR(45) not null,
	tags text,
	publish_date timestamp default current_timestamp not null,
	thumbnail_path text not null,
	content_path text not null,
	constraint author_title unique (author, title),
	constraint post_author foreign key (author) 
		references member(username)
		on delete cascade
);

-- Dummy Data
INSERT INTO member (username, password)
values
	('dummy', 123);

INSERT INTO post ( author, title, tags, thumbnail_path, content_path )
values
	('dummy', 'title 1', 'art,Noveau', '/image/path', '/content/path'),
	('dummy', 'title 2', 'drawing,draft', '/image/path', '/content/path');
