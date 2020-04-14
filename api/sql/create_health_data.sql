create table health_data
(
    owner uuid  not null,
    date  date  not null,
    data  jsonb not null,

    primary key (owner, date)
);
