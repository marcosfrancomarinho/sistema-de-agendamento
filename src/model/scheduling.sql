CREATE TABLE
    IF NOT EXISTS scheduling_user (
        id SERIAL PRIMARY KEY,
        name VARCHAR NOT NULL,
        email VARCHAR NOT NULL,
        phone VARCHAR NOT NULL,
        data_hours TIMESTAMP
    );

