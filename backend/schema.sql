create table member (
	username VARCHAR(30) primary key,
	password VARCHAR(30) not null
); 

create table post (
	id serial primary key,
	author VARCHAR(30) not null,
	tags VARCHAR(50),
	publish_date timestamp default current_timestamp not null,
	thumbnail_path text not null,
	content_path text not null,
	constraint post_author foreign key (author) 
		references member(username)
		on delete cascade
);

drop table post, member;

-- Dummy Data
INSERT INTO member (username, password)
values
	('dummy', 123);

