drop table if exists routes, passengers;

create table modes(
    id serial primary key not null,
    type_of_transport text not null
);

insert into modes (type_of_transport) values ('Bus');
insert into modes (type_of_transport) values ('Train');
insert into modes (type_of_transport) values ('Taxi');

create table routes(
    id serial primary key not null,
    route_name text not null
);

insert into routes (route_name) values ('A1');
insert into routes (route_name) values ('A2');
insert into routes (route_name) values ('A3');
insert into routes (route_name) values ('B1');

create table passengers(
    id serial primary key not null,
    passenger int not null
    -- route_selected int not null,
    -- foreign key (route_selected) references routes(id)
);

insert into passengers (passenger) values ('Mike');
insert into passengers (passenger) values ('Greg');
insert into passengers (passenger) values ('Lorenzo');
insert into passengers (passenger) values ('Bus');

create table history(
    id serial primary key not null,
    passenger_id int not null,
    foreign key (passenger_id) references passengers(id)
);


