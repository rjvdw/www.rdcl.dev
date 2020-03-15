create table financial_accounts
(
    owner       uuid not null,
    id          uuid not null,
    description text not null,

    primary key (owner, id)
);

create table transactions
(
    owner         uuid        not null,
    timestamp     timestamptz not null,
    account       uuid        not null,
    counter_party varchar(64) not null,
    currency      char(3)     not null,
    amount        int         not null,
    description   text        not null,
    category      varchar(64) default null,

    primary key (owner, timestamp)
);

create table transaction_categories
(
    owner uuid        not null,
    path  varchar(64) not null,
    name  text        not null,

    primary key (owner, path)
);

alter table transactions
    add constraint fk_transactions_account
        foreign key (owner, account)
            references financial_accounts (owner, id);

-- TODO: Requires a bit more thought
-- alter table transactions
--     add constraint fk_transactions_categories
--         foreign key (owner, category)
--             references transaction_categories (owner, path);
