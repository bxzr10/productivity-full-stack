const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

exports.readProjects = () => {
    return pool.query(
        'SELECT * FROM projects'
    );
}

exports.updateProject = (id, valuesArray) => {
    return pool.query(
        'UPDATE projects SET title = $2, completed_on_ms = $3, created_on_ms = $4, scheduled_start_ms = $5, scheduled_end_ms = $6, status = $7 WHERE id = $1 RETURNING *',
        [id, ...valuesArray]
    )
} 

exports.createProject = (id, valuesArray) => {
    return pool.query(
        'INSERT INTO projects VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [id, ...valuesArray]
    );
}

exports.deleteProject = (id) => {
    return pool.query(
        'DELETE FROM projects WHERE id = $1', 
        [id]
    );
}


// ITEMS

exports.readItems = () => {
    return pool.query(
        'SELECT * FROM items'
    );
}

exports.readItemsByMonth = (firstValidDate, firstInvalidDate) => {
    return pool.query(
        'SELECT * FROM items WHERE scheduled_start_ms >= $1 AND scheduled_start_ms < $2',
        [firstValidDate, firstInvalidDate]
    )
}

exports.updateItem = (id, valuesArray) => {
    return pool.query(
        'UPDATE items SET title = $2, recurring = $3, parent_recurrence = $4, completed_on_ms = $5, created_on_ms = $6, scheduled_start_ms = $7, scheduled_end_ms = $8, status = $9, precedence = $10, in_order = $11, project_id = $12 WHERE id = $1 RETURNING *',
        [id, ...valuesArray]
    )
} 

exports.createItem = (id, valuesArray) => {
    return pool.query(
        'INSERT INTO items VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *',
        [id, ...valuesArray]
    );
}

exports.deleteItem = (id) => {
    return pool.query(
        'DELETE FROM items WHERE id = $1', 
        [id]
    );
}