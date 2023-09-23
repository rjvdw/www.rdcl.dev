create schema if not exists "auth";

create table "auth"."user"
(
    id           uuid         not null default gen_random_uuid() primary key,
    email        varchar(511) not null unique,
    display_name varchar(511) not null
);

create table "auth"."allowed_callback"
(
    id  uuid         not null default gen_random_uuid() primary key,
    url varchar(511) not null unique
);

create table "auth"."login_attempt"
(
    session_token     varchar(255) not null,
    verification_code varchar(255) not null,
    "user"            uuid         not null references "auth"."user" (id),
    created           timestamp default now(),

    primary key (session_token, verification_code)
);
