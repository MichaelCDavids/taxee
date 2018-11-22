drop table if exists routes, taxi, taxi_owner, registrations;
create table taxi_owner
(
    id serial primary key not null,
    owner_name text not null
);
create table registrations
(
    id serial primary key not null,
    registration text not null
);

create table routes
(
    id serial primary key not null,
    route_name text not null
);

create table taxi
(
    id serial primary key not null,
    owned_by int not null,
    foreign key (owned_by) references taxi_owner(id),
    taxi_from int not null,
    foreign key (taxi_from) references routes(id),
    taxi_to int not null,
    foreign key (taxi_to) references routes(id),
    registration_number int not null,
    foreign key(registration_number) references registrations(id)
);

insert into taxi_owner
    (owner_name)
values
    ('Mbhele');
insert into taxi_owner
    (owner_name)
values
    ('Maduna');
insert into taxi_owner
    (owner_name)
values
    ('Cirha');
insert into taxi_owner
    (owner_name)
values
    ('Mdumane');
insert into taxi_owner
    (owner_name)
values
    ('Xesibe');
insert into taxi_owner
    (owner_name)
values
    ('Rhadebe');
insert into taxi_owner
    (owner_name)
values
    ('Nxasana');

insert into registrations
    (registration)
values
    ('CA 256-669');
insert into registrations
    (registration)
values
    ('CY 589-145');
insert into registrations
    (registration)
values
    ('CA 489-225');
insert into registrations
    (registration)
values
    ('CF 623-841');
insert into registrations
    (registration)
values
    ('CEY 887-361');
insert into registrations
    (registration)
values
    ('CY 713-369');
insert into registrations
    (registration)
values
    ('CA 555-197');
insert into registrations
    (registration)
values
    ('CEY 133-197');
insert into registrations
    (registration)
values
    ('CA 998-361');
insert into registrations
    (registration)
values
    ('CF 9984125');
insert into registrations
    (registration)
values
    ('CV 713-369');
insert into registrations
    (registration)
values
    ('CA 575-991');
insert into registrations
    (registration)
values
    ('CEY 123-397');
insert into registrations
    (registration)
values
    ('CA 198-061');
insert into registrations
    (registration)
values
    ('CF 0084325');
insert into registrations
    (registration)
values
    ('CY 703-309');
insert into registrations
    (registration)
values
    ('CA 155-100');
insert into registrations
    (registration)
values
    ('CEY 003-197');
insert into registrations
    (registration)
values
    ('CA 938-360');
insert into registrations
    (registration)
values
    ('CF 1984105');



insert into routes
    (route_name)
values
    ('Nyanga');
insert into routes
    (route_name)
values
    ('Athlone');
insert into routes
    (route_name)
values
    ('Bellville');
insert into routes
    (route_name)
values
    ('Cape Town');
insert into routes
    (route_name)
values
    ('Century City');
insert into routes
    (route_name)
values
    ('Claremont');
insert into routes
    (route_name)
values
    ('Delft South');
insert into routes
    (route_name)
values
    ('Elsies River');
insert into routes
    (route_name)
values
    ('Gugulethu');
insert into routes
    (route_name)
values
    ('Khayelitsha Harare');
insert into routes
    (route_name)
values
    ('Langa');
insert into routes
    (route_name)
values
    ('Mitchells Plain');
insert into routes
    (route_name)
values
    ('Mowbray (via Langa)');
insert into routes
    (route_name)
values
    ('Parow');
insert into routes
    (route_name)
values
    ('Tygerberg Hospital');
insert into routes
    (route_name)
values
    ('Vangate Mall');
insert into routes
    (route_name)
values
    ('Vasco Station');
insert into routes
    (route_name)
values
    ('Wynberg');

insert into taxi
    (owned_by, taxi_from, taxi_to, registration_number)
values
    (1, 1, 4, 1);