create table health_data
(
    owner     uuid        not null,
    timestamp timestamptz not null,
    data      jsonb       not null,

    primary key (owner, timestamp)
);
