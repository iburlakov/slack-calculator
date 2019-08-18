-- Table: public.users

-- DROP TABLE public.users;

CREATE TABLE public.users
(
    user_id uuid NOT NULL DEFAULT uuid_generate_v4(),
    email text COLLATE pg_catalog."default" NOT NULL,
    slack_token text COLLATE pg_catalog."default" NOT NULL,
    slack_name text COLLATE pg_catalog."default" NOT NULL,
    slack_id text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT user_pkey PRIMARY KEY (user_id),
    CONSTRAINT "userId_Unique" UNIQUE (user_id)

)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.users
    OWNER to iburlakov;

GRANT ALL ON TABLE public.users TO iburlakov;

GRANT ALL ON TABLE public.users TO "slack-calculator-user";