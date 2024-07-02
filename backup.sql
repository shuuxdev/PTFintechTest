--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3
-- Dumped by pg_dump version 16.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: labels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.labels (
    label_id integer NOT NULL,
    name character varying(50) NOT NULL,
    color character varying(7) DEFAULT '#FFFFFF'::character varying
);


ALTER TABLE public.labels OWNER TO postgres;

--
-- Name: labels_label_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.labels_label_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.labels_label_id_seq OWNER TO postgres;

--
-- Name: labels_label_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.labels_label_id_seq OWNED BY public.labels.label_id;


--
-- Name: permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.permissions (
    permission_id integer NOT NULL,
    name character varying(50) NOT NULL,
    description text
);


ALTER TABLE public.permissions OWNER TO postgres;

--
-- Name: permissions_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.permissions_permission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.permissions_permission_id_seq OWNER TO postgres;

--
-- Name: permissions_permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.permissions_permission_id_seq OWNED BY public.permissions.permission_id;


--
-- Name: role_permissions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role_permissions (
    role_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.role_permissions OWNER TO postgres;

--
-- Name: roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.roles (
    role_id integer NOT NULL,
    name character varying(50) NOT NULL,
    description text
);


ALTER TABLE public.roles OWNER TO postgres;

--
-- Name: roles_role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.roles_role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.roles_role_id_seq OWNER TO postgres;

--
-- Name: roles_role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.roles_role_id_seq OWNED BY public.roles.role_id;


--
-- Name: task_labels; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.task_labels (
    task_id integer NOT NULL,
    label_id integer NOT NULL
);


ALTER TABLE public.task_labels OWNER TO postgres;

--
-- Name: tasks; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.tasks (
    task_id integer NOT NULL,
    assigned_to integer,
    title character varying(100) NOT NULL,
    description text,
    status character varying(20) DEFAULT 'Pending'::character varying,
    priority character varying(20) DEFAULT 'Medium'::character varying,
    due_date date,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT tasks_status_check CHECK (((status)::text = ANY (ARRAY[('Pending'::character varying)::text, ('In Progress'::character varying)::text, ('Completed'::character varying)::text, ('To-Do'::character varying)::text])))
);


ALTER TABLE public.tasks OWNER TO postgres;

--
-- Name: tasks_task_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.tasks_task_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.tasks_task_id_seq OWNER TO postgres;

--
-- Name: tasks_task_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.tasks_task_id_seq OWNED BY public.tasks.task_id;


--
-- Name: user_roles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.user_roles (
    user_id integer NOT NULL,
    role_id integer NOT NULL
);


ALTER TABLE public.user_roles OWNER TO postgres;

--
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying(50) NOT NULL,
    password character varying(100) NOT NULL,
    email character varying(100),
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.users OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_user_id_seq OWNER TO postgres;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: labels label_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.labels ALTER COLUMN label_id SET DEFAULT nextval('public.labels_label_id_seq'::regclass);


--
-- Name: permissions permission_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permissions ALTER COLUMN permission_id SET DEFAULT nextval('public.permissions_permission_id_seq'::regclass);


--
-- Name: roles role_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles ALTER COLUMN role_id SET DEFAULT nextval('public.roles_role_id_seq'::regclass);


--
-- Name: tasks task_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks ALTER COLUMN task_id SET DEFAULT nextval('public.tasks_task_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: labels; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.labels (label_id, name, color) FROM stdin;
1	Bug	#FF0000
2	Enhancement	#00FF00
3	Documentation	#0000FF
4	UI/UX	#FF00FF
5	Backend	#00FFFF
6	Frontend	#FFFF00
7	Testing	#FF8000
8	Deployment	#8000FF
9	Research	#00FF80
10	Code Review	#800080
\.


--
-- Data for Name: permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.permissions (permission_id, name, description) FROM stdin;
1	view_tasks	View tasks in the system
2	create_tasks	Create new tasks
3	edit_tasks	Edit existing tasks
4	delete_tasks	Delete tasks
5	view_projects	View projects in the system
6	create_projects	Create new projects
7	edit_projects	Edit existing projects
8	delete_projects	Delete projects
9	manage_users	Manage user accounts
10	assign_roles	Assign roles to users
\.


--
-- Data for Name: role_permissions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.role_permissions (role_id, permission_id) FROM stdin;
1	1
1	2
1	3
1	4
1	5
1	6
1	7
1	8
1	9
1	10
2	1
2	3
2	5
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.roles (role_id, name, description) FROM stdin;
1	Admin	Full access to all system features and settings
2	Developer	Work on assigned tasks and update progress
\.


--
-- Data for Name: task_labels; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.task_labels (task_id, label_id) FROM stdin;
1	2
4	1
5	4
6	3
7	7
8	8
9	9
10	10
11	3
13	3
14	3
37	1
\.


--
-- Data for Name: tasks; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.tasks (task_id, assigned_to, title, description, status, priority, due_date, created_at, updated_at) FROM stdin;
5	4	Design UI for Project Delta	Design the user interface for Project Delta	In Progress	High	2024-07-25	2024-06-30 15:13:17.979763	2024-06-30 15:13:17.979763
6	5	Write Documentation for Epsilon	Document the setup and usage of Project Epsilon	Pending	Medium	2024-07-30	2024-06-30 15:13:17.979763	2024-06-30 15:13:17.979763
7	6	Test Project Zeta	Perform thorough testing on Project Zeta	In Progress	High	2024-08-05	2024-06-30 15:13:17.979763	2024-06-30 15:13:17.979763
8	7	Deploy Project Eta	Deploy Project Eta to production	Pending	Critical	2024-08-10	2024-06-30 15:13:17.979763	2024-06-30 15:13:17.979763
10	9	Code Review for Iota	Review the code base of Project Iota	In Progress	Medium	2024-08-20	2024-06-30 15:13:17.979763	2024-06-30 15:13:17.979763
11	12	Update	Improve the UI for the task management system	In Progress	High	2024-07-10	2024-06-30 14:30:00	2024-07-01 10:15:00
4	\N	Implement Module X	Implement module X for Project Gamma	In Progress	\N	2024-08-01	\N	\N
23	3	Test	Testtt	Completed	Medium	2024-07-11	2024-07-02 13:10:48.805981	2024-07-02 13:10:48.805981
24	3	Testtt222	EAtaet	Completed	Medium	2024-07-12	2024-07-02 13:10:59.564119	2024-07-02 13:10:59.564119
25	3	Test ass	Test ass	In Progress	\N	2024-07-17	\N	\N
26	3	Te	Te	In Progress	\N	2024-07-12	\N	\N
27	3	Teee	Teee	In Progress	\N	2024-07-25	\N	\N
28	4	Again Task	Again Task	Completed	\N	2024-07-24	\N	\N
9	2	Research for Theta	Conduct research for Project Theta requirements	Completed	\N	2024-08-15	\N	\N
29	4	ww	ww	Completed	\N	2024-07-18	\N	\N
13	12	Create new task	Improve the UI for the task management system	In Progress	High	2024-07-10	2024-06-30 14:30:00	2024-07-01 10:15:00
14	12	Create new task	Improve the UI for the task management system	In Progress	High	2024-07-10	2024-06-30 14:30:00	2024-07-01 10:15:00
30	4	gg	gg	To-Do	\N	2024-07-19	\N	\N
31	4	ggg	ggg	To-Do	\N	2024-07-12	\N	\N
18	4	Update Test	Update Test	In Progress	\N	2024-07-25	\N	\N
34	12	bvbb	asdv	Completed	Medium	2024-07-18	2024-07-02 13:47:51.05924	2024-07-02 13:47:51.05924
1	4	Update Test 12345	Improve the UI  for the task management system	In Progress	\N	2024-07-10	\N	\N
22	4	Test create	Test create	To-Do	\N	2024-07-03	\N	\N
21	3	Test	Test2323	In Progress	\N	2024-07-11	\N	\N
37	12	string	string	To-Do	string	2024-07-02	2024-07-02 09:16:24.478	2024-07-02 09:16:24.478
15	2	Update Test Create	Update Test Create	In Progress	\N	2024-07-17	\N	\N
19	2	Testtttttttt	Testtt	To-Do	\N	2024-07-12	\N	\N
\.


--
-- Data for Name: user_roles; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.user_roles (user_id, role_id) FROM stdin;
1	1
2	2
3	2
4	2
5	2
6	2
7	2
8	2
9	2
10	2
12	2
12	1
20	1
20	2
21	1
21	2
22	1
22	2
23	1
23	2
24	1
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, username, password, email, created_at) FROM stdin;
1	admin_user	password123	admin@example.com	2024-06-30 15:13:09.140178
2	project_manager	password123	manager@example.com	2024-06-30 15:13:09.140178
4	developer_user2	password123	developer2@example.com	2024-06-30 15:13:09.140178
5	viewer_user	password123	viewer@example.com	2024-06-30 15:13:09.140178
6	dev_jane	password123	jane@example.com	2024-06-30 15:13:09.140178
7	dev_john	password123	john@example.com	2024-06-30 15:13:09.140178
8	dev_bob	password123	bob@example.com	2024-06-30 15:13:09.140178
9	dev_alice	password123	alice@example.com	2024-06-30 15:13:09.140178
10	project_lead	password123	lead@example.com	2024-06-30 15:13:09.140178
12	Shuu	hD3LKyvGPRxbUr9lt/fBmw==:KpaP0h7Ds2liRKVcOb2YN+Nbgvu+Ipo5q4fxaul0aJM=	\N	2024-07-01 00:34:46.193857
13	Test	UiTY19ekaYOWnxiT665ArA==:PogBW8qZ0qDTkKbCkSggL2clgUJsJZsNZVI8HCNcD8A=	\N	2024-07-01 14:23:23.902925
14	Test1	e7uRxJs9F01mPx2/6zy7iA==:7tGkU4br8XVeu8WxiQDIrshV71zDISanPCAQbrrFA3w=	\N	2024-07-01 14:24:47.746167
3	developer_user1	hD3LKyvGPRxbUr9lt/fBmw==:KpaP0h7Ds2liRKVcOb2YN+Nbgvu+Ipo5q4fxaul0aJM=	developer1@example.com	2024-06-30 15:13:09.140178
15	nam	ML4U3plV4jA6v9Eb1Zb7wQ==:u0CatqLPeBuBH2jO2umXd/xAzBPiiP72yEpY30JpA7s=	\N	2024-07-02 15:29:08.674769
16	nam1	VNB1k20LPbdg+Df61NN5DQ==:FdZIsVi8LqB20MRyrM4yn1CxTsKGCENUeVNmWqnM0ko=	\N	2024-07-02 15:30:13.336742
17	minh	bGeUJItkaQCcMhdAZIu95w==:sCco88fWsx2GdrSrKGIvW4GK31i1IpGQXyfsi44eZt0=	\N	2024-07-02 15:30:29.204884
18	minh1	2gYp9t9id9ccnwI8GX7riA==:RlZmYbkrZEd2Gb8LdpyYhbleiMDElR5FxZ8fdoqecgg=	\N	2024-07-02 15:30:54.807167
19	long	/JZHjM1fV17/cS1WzHAcew==:VEqETFS3xztcF9Q0YUMLQnuBU7FN1C/vUSvofW+Ngr4=	\N	2024-07-02 15:32:14.364826
20	ha1	qguec6LcmoEGNm6iNm4J3g==:8FyDpmpj6LwdprZ0U34GzPuM7o7zc79jJOIg4cr7ETc=	ha@gmail.com	2024-07-02 15:44:24.175639
21	Nghia1	mBAfppIZUJcjuhZH5NAGfg==:HFLoiwfAqwj84Fk8Bfz3/IHvqJC103Cywz19yj0nIXo=	Nghia1@gmail.com	2024-07-02 15:47:52.029372
22	Linh1	JPNNB2uwy8vTcSte4z7Rgg==:zCZAMiA7ExIpvZl51pzBx4nfEAz49q64y1PhjCUGV78=	Linh1@gmail.com	2024-07-02 15:50:14.873593
23	where1	cHNcsou29hy9LhYSIcGZ+A==:MMnuYt7u78yYQCOa9kBV5wF6TmZsDItejuBd7x6cm1A=	where1@gmail.com	2024-07-02 15:51:11.266061
24	hhhhhh	QdgIKhKqvuz30gTYJ5PmVQ==:1ACVuXiOs0D/Aw6J4nF993pOOgMMlqSSJQl+SjCkn5I=	hhhhhh@gmail.com	2024-07-02 16:01:36.590098
\.


--
-- Name: labels_label_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.labels_label_id_seq', 10, true);


--
-- Name: permissions_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.permissions_permission_id_seq', 10, true);


--
-- Name: roles_role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.roles_role_id_seq', 2, true);


--
-- Name: tasks_task_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.tasks_task_id_seq', 37, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 24, true);


--
-- Name: labels labels_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.labels
    ADD CONSTRAINT labels_name_key UNIQUE (name);


--
-- Name: labels labels_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.labels
    ADD CONSTRAINT labels_pkey PRIMARY KEY (label_id);


--
-- Name: permissions permissions_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permissions_name_key UNIQUE (name);


--
-- Name: permissions permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.permissions
    ADD CONSTRAINT permissions_pkey PRIMARY KEY (permission_id);


--
-- Name: role_permissions role_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_permissions
    ADD CONSTRAINT role_permissions_pkey PRIMARY KEY (role_id, permission_id);


--
-- Name: roles roles_name_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_name_key UNIQUE (name);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (role_id);


--
-- Name: task_labels task_labels_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task_labels
    ADD CONSTRAINT task_labels_pkey PRIMARY KEY (task_id, label_id);


--
-- Name: tasks tasks_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_pkey PRIMARY KEY (task_id);


--
-- Name: user_roles user_roles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_pkey PRIMARY KEY (user_id, role_id);


--
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: users users_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_username_key UNIQUE (username);


--
-- Name: role_permissions role_permissions_permission_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_permissions
    ADD CONSTRAINT role_permissions_permission_id_fkey FOREIGN KEY (permission_id) REFERENCES public.permissions(permission_id) ON DELETE CASCADE;


--
-- Name: role_permissions role_permissions_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role_permissions
    ADD CONSTRAINT role_permissions_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(role_id) ON DELETE CASCADE;


--
-- Name: task_labels task_labels_label_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task_labels
    ADD CONSTRAINT task_labels_label_id_fkey FOREIGN KEY (label_id) REFERENCES public.labels(label_id) ON DELETE CASCADE;


--
-- Name: task_labels task_labels_task_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.task_labels
    ADD CONSTRAINT task_labels_task_id_fkey FOREIGN KEY (task_id) REFERENCES public.tasks(task_id) ON DELETE CASCADE;


--
-- Name: tasks tasks_assigned_to_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.tasks
    ADD CONSTRAINT tasks_assigned_to_fkey FOREIGN KEY (assigned_to) REFERENCES public.users(user_id) ON DELETE SET NULL;


--
-- Name: user_roles user_roles_role_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.roles(role_id) ON DELETE CASCADE;


--
-- Name: user_roles user_roles_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.user_roles
    ADD CONSTRAINT user_roles_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

