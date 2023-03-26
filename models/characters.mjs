import {pool} from '../models/pgConfig.mjs'
//import * as fs from 'fs'; 
//import {csv} from 'csv-parser';
//const {pool} = require('./pgConfig.mjs')
//const fs = require('fs')
//const csv = require('csv-parser') 


let taskCounter = 0

;(async ()=>
	{
		const sql1=`drop table if exists gradebook; 
		drop table if exists presences;
		drop table if exists lectures;
		drop table if exists subjects;
		drop table if exists plan;
		drop table if exists problemset; 
		drop table if exists characters; 
		drop table if exists houses; 
		drop table if exists education_type;
		drop table if exists emails;
		
		create table education_type(id serial primary key, name text);


		create table houses(id serial primary key, house text, is_active boolean, id_education_type int references education_type(id), notes text); 

		create table characters(id serial primary key, username text,
		firstname text, lastname text, surname text, email text, id_house int references houses(id)); 

		create table problemset (id serial primary key, name text, description text); 

		create table plan (id_problemset int references problemset(id), id_house int references houses(id),
		primary key(id_problemset, id_house));

		create table gradebook ( 
		id_character int references characters(id), 
		id_problemset int references problemset(id), grade int, notes text, 
		is_done boolean, is_checked boolean, url text, timestamp_done timestamp,
		primary key(id_character, id_problemset)); 
		create table emails (id serial primary key, id_house int references houses(id), subject text, message text); 


		create table subjects (id serial primary key, name text unique, description text default '');

		create table lectures (
			id serial primary key, 
			id_subject int references subjects(id), 
			id_house int references houses(id), 
			date date default current_date, notes text default '');

		create table presences (
			id serial primary key,
			id_lecture int references lectures(id),
			id_character int references characters(id), 
			is_present boolean default false,
			constraint u_lecture_character unique (id_character, id_lecture)); 

		insert into education_type (name) values ('очная'), ('заочная'), ('дистанционная'), ('самостоятельная');

		insert into houses (house, is_active, id_education_type) values  ('Teacher', false, 1); 

		insert into houses (house, is_active, id_education_type) values   ('чужие', true, 1);

		insert into problemset (name) values 
		('Зачёт'),
		('Экзамен');

		insert into characters (username, firstname, lastname, surname, email, id_house) values ('vadimgb', 'Vadim', 'Bulenok', 'Gennadievich', 'vadimgb@yandex.ru', 1);`
		
		pool.query(sql1, (err, result) => {
			if(err) console.log(err)
			pool.end()
		})
		
	//	await csvToDb()
	})()

function csvToDb()
{
    const fStream = fs.createReadStream('characters.csv')
    const csvStream = csv()
    csvStream.on('data', addRow)
    fStream.pipe(csvStream)
}

async function addRow(data)
{
	function houses(house)
	{
		switch(house)
		{
			case 'Слизерин':
				return 2
			case 'Когтевран':
				return 3
			case 'Пуффендуй':
				return 4
			case 'Гриффиндор':
				return 5
		}
	}
    const row = [data['username'], data['имя'], data['фамилия'], houses(data['факультет'])]
    const sql2 = `insert into characters (username, firstname, lastname, id_house)
    values ($1, $2, $3, $4);`
    await pool.query(sql2, row) 
}
