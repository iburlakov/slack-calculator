-- Table: public.app_tokens

-- DROP TABLE public.app_tokens;

CREATE TABLE public.app_tokens
(
    team_id text COLLATE pg_catalog."default" NOT NULL,
    app_token text COLLATE pg_catalog."default" NOT NULL,
    bot_token text COLLATE pg_catalog."default" NOT NULL,
    team_name text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT team_id_unique UNIQUE (team_id)

)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.app_tokens
    OWNER to iburlakov;

GRANT ALL ON TABLE public.app_tokens TO iburlakov;

GRANT ALL ON TABLE public.app_tokens TO "slack-calculator-user";