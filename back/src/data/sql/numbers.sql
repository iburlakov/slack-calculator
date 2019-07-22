-- Table: public.numbers

-- DROP TABLE public.numbers;

CREATE TABLE public.numbers
(
    "number" bigint NOT NULL,
    added date DEFAULT now(),
    team_id text COLLATE pg_catalog."default",
    channel_id text COLLATE pg_catalog."default"
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.numbers
    OWNER to iburlakov;

GRANT ALL ON TABLE public.numbers TO iburlakov;

GRANT ALL ON TABLE public.numbers TO "slack-calculator-user";