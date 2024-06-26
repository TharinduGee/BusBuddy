create sequence advertisement_sequence start with 1 increment by 1;

create sequence bus_sequence start with 1 increment by 1;

create sequence business_sequence start with 1 increment by 1;

create sequence document_sequence start with 1 increment by 1;

create sequence employee_sequence start with 1 increment by 1;

create sequence ledger_sequence start with 1 increment by 1;

create sequence review_sequence start with 1 increment by 1;

create sequence route_sequence start with 1 increment by 1;

create sequence trip_sequence start with 1 increment by 1;

create sequence user_sequence start with 1 increment by 1;

-- Table: public.business

-- DROP TABLE IF EXISTS public.business;

CREATE TABLE IF NOT EXISTS public.business
(
    b_id bigint NOT NULL,
    address text COLLATE pg_catalog."default",
    b_name text COLLATE pg_catalog."default" NOT NULL DEFAULT 'Your Bus Business'::text,
    email text COLLATE pg_catalog."default",
    registration_no text COLLATE pg_catalog."default" NOT NULL DEFAULT 'REG00001'::text,
    CONSTRAINT business_pkey PRIMARY KEY (b_id),
    CONSTRAINT business_email_unique UNIQUE (email)
);

-- Table: public.bus

-- DROP TABLE IF EXISTS public.bus;

CREATE TABLE IF NOT EXISTS public.bus
(
    bus_id bigint NOT NULL,
    image bytea,
    last_service_date timestamp(6) without time zone,
    number_plate character varying(255) COLLATE pg_catalog."default" NOT NULL,
    reg_no character varying(255) COLLATE pg_catalog."default",
    seats integer,
    type character varying(255) COLLATE pg_catalog."default",
    b_id bigint,
    CONSTRAINT bus_pkey PRIMARY KEY (bus_id),
    CONSTRAINT fk_bid FOREIGN KEY (b_id)
        REFERENCES public.business (b_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT bus_type_check CHECK (type::text = ANY (ARRAY['LUXURY'::character varying, 'SEMI_LUXURY'::character varying, 'NORMAL'::character varying]::text[]))
);


-- Table: public.employee

-- DROP TABLE IF EXISTS public.employee;

CREATE TABLE IF NOT EXISTS public.employee
(
    emp_id bigint NOT NULL,
    salary real,
    age integer,
    b_day timestamp(6) without time zone NOT NULL,
    designation character varying(255) COLLATE pg_catalog."default",
    image bytea,
    joined_date timestamp(6) without time zone,
    name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    b_id bigint,
    CONSTRAINT employee_pkey PRIMARY KEY (emp_id),
    CONSTRAINT fk_bid FOREIGN KEY (b_id)
        REFERENCES public.business (b_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT employee_designation_check CHECK (designation::text = ANY (ARRAY['EMPLOYEE_TYPE_DRIVER'::character varying, 'EMPLOYEE_TYPE_CONDUCTOR'::character varying]::text[]))
);

-- Table: public.ledger

-- DROP TABLE IF EXISTS public.ledger;

CREATE TABLE IF NOT EXISTS public.ledger
(
    ledger_id bigint NOT NULL,
    credit double precision,
    debit double precision,
    running_balance double precision,
    "timestamp" timestamp(6) without time zone NOT NULL,
    type character varying(255) COLLATE pg_catalog."default",
    b_id bigint,
    CONSTRAINT ledger_pkey PRIMARY KEY (ledger_id),
    CONSTRAINT fk_bid FOREIGN KEY (b_id)
        REFERENCES public.business (b_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT ledger_type_check CHECK (type::text = ANY (ARRAY['TRANSACTION_TYPE_TICKET'::character varying, 'TRANSACTION_TYPE_UNSPECIFIED'::character varying, 'TRANSACTION_TYPE_SERVICE'::character varying]::text[]))
);


-- Table: public.route

-- DROP TABLE IF EXISTS public.route;

CREATE TABLE IF NOT EXISTS public.route
(
    routeid bigint NOT NULL,
    distance double precision,
    end_destination character varying(255) COLLATE pg_catalog."default" NOT NULL,
    no_of_sections integer,
    permit_exp_date timestamp(6) without time zone NOT NULL,
    start_destination character varying(255) COLLATE pg_catalog."default" NOT NULL,
    b_id bigint,
    CONSTRAINT route_pkey PRIMARY KEY (routeid),
    CONSTRAINT fk_bid FOREIGN KEY (b_id)
        REFERENCES public.business (b_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
);


-- Table: public.trip

-- DROP TABLE IF EXISTS public.trip;

CREATE TABLE IF NOT EXISTS public.trip
(
    trip_id bigint NOT NULL,
    date timestamp(6) without time zone NOT NULL,
    end_time time(6) without time zone NOT NULL,
    expense double precision,
    income double precision,
    start_time time(6) without time zone NOT NULL,
    ticket_api character varying(255) COLLATE pg_catalog."default",
    bus bigint,
    conductor bigint,
    driver bigint,
    route bigint,
    b_id bigint,
    CONSTRAINT trip_pkey PRIMARY KEY (trip_id),
    CONSTRAINT fk_bid FOREIGN KEY (b_id)
            REFERENCES public.business (b_id) MATCH SIMPLE
            ON UPDATE CASCADE
            ON DELETE CASCADE,
    CONSTRAINT fk_bus FOREIGN KEY (bus)
        REFERENCES public.bus (bus_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL,
    CONSTRAINT fk_employee_conductor FOREIGN KEY (conductor)
        REFERENCES public.employee (emp_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL,
    CONSTRAINT fk_employee_driver FOREIGN KEY (driver)
        REFERENCES public.employee (emp_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL,
    CONSTRAINT fk_route FOREIGN KEY (route)
        REFERENCES public.route (routeid) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL
);


-- Table: public.review

-- DROP TABLE IF EXISTS public.review;

CREATE TABLE IF NOT EXISTS public.review
(
    review_id bigint NOT NULL,
    comment character varying(255) COLLATE pg_catalog."default" NOT NULL,
    rating double precision,
    "timestamp" timestamp(6) without time zone NOT NULL,
    bus_review_id bigint,
    b_id bigint,
    employee_review_id bigint,
    CONSTRAINT review_pkey PRIMARY KEY (review_id),
    CONSTRAINT fk_bid FOREIGN KEY (b_id)
        REFERENCES public.business (b_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_bus_review FOREIGN KEY (bus_review_id)
        REFERENCES public.bus (bus_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL,
    CONSTRAINT fk_employee_review FOREIGN KEY (employee_review_id)
        REFERENCES public.employee (emp_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL
);



-- Table: public.advertisement

-- DROP TABLE IF EXISTS public.advertisement;

CREATE TABLE IF NOT EXISTS public.advertisement
(
    advertisement_id bigint NOT NULL,
    end_date timestamp(6) without time zone NOT NULL,
    image bytea,
    start_date timestamp(6) without time zone NOT NULL,
    b_id bigint,
    CONSTRAINT advertisement_pkey PRIMARY KEY (advertisement_id),
    CONSTRAINT fk_bid FOREIGN KEY (b_id)
        REFERENCES public.business (b_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
);



CREATE TABLE IF NOT EXISTS public.document
(
    doc_id bigint NOT NULL,
    category character varying(255) COLLATE pg_catalog."default",
    doc_name character varying(255) COLLATE pg_catalog."default" NOT NULL,
    upload_date timestamp(6) without time zone NOT NULL,
    url character varying(255) COLLATE pg_catalog."default" NOT NULL,
    bus_id bigint,
    b_id bigint,
    emp_id bigint,
    ledger_id bigint,
    route_id bigint,
    trip_id bigint,
    CONSTRAINT document_pkey PRIMARY KEY (doc_id),
    CONSTRAINT uk_19lq2be43frqvblksyjvj9npf UNIQUE (bus_id),
    CONSTRAINT uk_34908216eg03sndwtwsduhnn8 UNIQUE (trip_id),
    CONSTRAINT uk_7otucbqypmer3117i581ov423 UNIQUE (route_id),
    CONSTRAINT uk_7wnjpthjualjlcs9q3ydlf5rp UNIQUE (emp_id),
    CONSTRAINT uk_kr4c2gratnln35htg3xhcxre9 UNIQUE (ledger_id),
    CONSTRAINT fk_bid FOREIGN KEY (b_id)
        REFERENCES public.business (b_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_busid FOREIGN KEY (bus_id)
        REFERENCES public.bus (bus_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL,
    CONSTRAINT fk_empid FOREIGN KEY (emp_id)
        REFERENCES public.employee (emp_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL,
    CONSTRAINT fk_ledgerid FOREIGN KEY (ledger_id)
        REFERENCES public.ledger (ledger_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL,
    CONSTRAINT fk_routeid FOREIGN KEY (route_id)
        REFERENCES public.route (routeid) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL,
    CONSTRAINT fk_tripid FOREIGN KEY (trip_id)
        REFERENCES public.trip (trip_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL,
    CONSTRAINT document_category_check CHECK (category::text = ANY (ARRAY['DOC_CATEGORY_NIC'::character varying, 'DOC_CATEGORY_SERVICE_AGREEMENT'::character varying]::text[]))
);


-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    id bigint NOT NULL,
    created_at timestamp(6) without time zone,
    email text COLLATE pg_catalog."default",
    first_name text COLLATE pg_catalog."default" NOT NULL,
    last_name text COLLATE pg_catalog."default" NOT NULL,
    mobile_no text COLLATE pg_catalog."default",
    password text COLLATE pg_catalog."default",
    role character varying(255) COLLATE pg_catalog."default",
    updated_at timestamp(6) without time zone,
    b_id bigint,
    emp_id bigint,
    CONSTRAINT users_pkey PRIMARY KEY (id),
    CONSTRAINT uk_39smkrxk7iywhmw463bgxc0a UNIQUE (emp_id),
    CONSTRAINT uk_p0ph17e6328j6uu1cr2tyd8vb UNIQUE (mobile_no),
    CONSTRAINT user_email_unique UNIQUE (email),
    CONSTRAINT user_password_unique UNIQUE (password),
    CONSTRAINT fk_bid FOREIGN KEY (b_id)
        REFERENCES public.business (b_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE,
    CONSTRAINT fk_empid FOREIGN KEY (emp_id)
        REFERENCES public.employee (emp_id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE SET NULL,
    CONSTRAINT users_role_check CHECK (role::text = ANY (ARRAY['ROLE_SYSTEM_ADMIN'::character varying, 'ROLE_ADMIN'::character varying, 'ROLE_DRIVER'::character varying, 'ROLE_CONDUCTOR'::character varying, 'ROLE_SUPPORTER'::character varying]::text[]))
);

