CREATE TABLE items(
    id uuid primary key,
    title varchar(225) not null,
    recurring bool,
    parent_recurrence uuid,
    completed_on_ms bigint,
    created_on_ms bigint not null,
  	scheduled_start_ms bigint,
  	scheduled_end_ms bigint,
    status varchar(30) not null,
    precedence int,
    in_order int,
  	project_id uuid,
  	constraint fk_project foreign key(project_id) references projects(id) on delete cascade
);

/*
item_id uuid primary key,
title varchar(225) not null,
recurring bool,
parent_recurrence uuid,
completed_on_ms bigint,
created_on_ms bigint not null,
scheduled_start_ms bigint,
scheduled_end_ms bigint,
status varchar(30) not null,
precedence int,
in_order int,
project_id uuid,
constraint fk_project foreign key(project_id) references projects(project_id) on delete cascade
*/

CREATE TABLE projects(
    id uuid primary key,
    title varchar(225) not null,
  	completed_on_ms bigint,
  	created_on_ms bigint not null,
  	scheduled_start_ms bigint,
  	scheduled_end_ms bigint,
    status varchar(30) not null
);

/*
project_id*
title*
completed_on_ms
created_on_ms*
scheduled_start_ms
scheduled_end_ms
status*
*/