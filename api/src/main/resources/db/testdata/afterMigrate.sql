insert into "auth"."user" (id, email, display_name)
values ('f277b076-f061-403c-bf7b-266eab926677', 'john.doe@example.com', 'John Doe')
on conflict do nothing;

insert into "auth"."allowed_callback" (url)
values ('https://example.com/login/verify'),
       ('http://localhost:5173/login/verify')
on conflict do nothing;
