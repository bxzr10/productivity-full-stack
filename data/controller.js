const { readProjects, readProjectById, readProjectByMonth, updateProject, createProject, deleteProject,
    readItems, readItemsByMonth, updateItem, createItem, deleteItem } = require('./model');

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

// can i handle these as promises? for catching errors?

// PROJECTS

exports.getProjectsAll = async (req, res, next) => {
    try {
        const response = await readProjects();
        return res.status(200).json({ data: response.rows });
    } catch(error) {
        return res.status(400).json({ error });
    }
}

// exports.getProjectById = async (req, res, next) => {
//     const { id } = req.params;
//     try {
//         const response = await readProjectById(id);
//         return res.status(200).json({ data: response.rows[0] });
//     } catch(error) {
//         return res.status(400).json({ error });
//     }
// }

// exports.getProjectByMonth = async (req, res, next) => {
//     const { monthName } = req.params;

//     const startMonth = MONTHS.findIndex(month => month.toLowerCase() === monthName.toLowerCase()) + 1;

//     if (startMonth <= 0) return res.status(400).json({ error: 'Invalid date' });

//     const year = new Date().getFullYear();
//     const startZero = startMonth < 10 ? '0' : '';
//     const endZero = startMonth + 1 < 10 ? '0' : '';
//     const endMonthDay = startMonth + 1 > 12 ? `1231` : `${startMonth + 1}01`;

//     const firstValidDate = `${year}${startZero}${startMonth}01`;
//     const firstInvalidDate = `${year}${endZero}${endMonthDay}`;

//     try {
//         const response = await readProjectByMonth(firstValidDate, firstInvalidDate);
//         return res.status(200).json({ data: response.rows });
//     } catch(error) {
//         return res.status(400).json({ error });
//     }
// }

exports.updateProject = async (req, res, next) => {
    const { id, valuesArray } = req.body;
    try {
        const response = await updateProject(id, valuesArray);
        return res.status(200).json({ data: response.rows[0] });
    } catch(error) {
        return res.status(400).json({ error });
    }
}

exports.newProject = async (req, res, next) => {
    const { id, valuesArray } = req.body;
    try {
        const response = await createProject(id, valuesArray);
        return res.status(201).json({ data: response.rows[0] });
    } catch(error) {
        return res.status(400).json({ error });
    }
}

exports.deleteProject = async (req, res, next) => {
    const { id } = req.params;
    try {
        await deleteProject(id);
        return res.sendStatus(204);
    } catch(error) {
        return res.status(400).json({ error });
    }
}


// ITEMS

exports.getItemsAll = async (req, res, next) => {
    try {
        const response = await readItems();
        return res.status(200).json({ data: response.rows });
    } catch(error) {
        return res.status(400).json({ error });
    }
}

exports.getItemsByMonth = async (req, res, next) => {
    const { monthName } = req.params;

    const startMonth = MONTHS.findIndex(month => month.toLowerCase() === monthName.toLowerCase());

    if (startMonth <= 0) return res.status(400).json({ error: 'Invalid date' });

    const year = new Date().getFullYear();
    const startZero = startMonth < 10 ? '0' : '';
    const endZero = startMonth + 1 < 10 ? '0' : '';
    const endMonth = startMonth + 1 > 12 ? '12' : `${startMonth + 1}`;
    const endDay = startMonth + 1 > 12 ? '31' : '01';
    // const endMonthDay = startMonth + 1 > 12 ? `1231` : `${startMonth + 1}01`;

    const firstValid = new Date(year, startMonth, 1);
    const firstInvalid = new Date(year, endMonth, endDay);

    // const firstValidDate = `${year}${startZero}${startMonth}01`;
    // const firstInvalidDate = `${year}${endZero}${endMonthDay}`;

    // const firstValid = new Date(firstValidDate).getTime();
    // const firstInvalid = new Date(firstInvalidDate).getTime();

    console.log('timestamp range:', firstValid, firstInvalid);

    try {
        const response = await readItemsByMonth(firstValid.getTime(), firstInvalid.getTime());
        return res.status(200).json({ data: response.rows });
    } catch(error) {
        return res.status(400).json({ error });
    }
}

exports.updateItem = async (req, res, next) => {
    const { id, valuesArray } = req.body;
    try {
        const response = await updateItem(id, valuesArray);
        return res.status(200).json({ data: response.rows[0] });
    } catch(error) {
        return res.status(400).json({ error });
    }
}

exports.newItem = async (req, res, next) => {
    const { id, valuesArray } = req.body;
    try {
        const response = await createItem(id, valuesArray);
        return res.status(201).json({ data: response.rows[0] });
    } catch(error) {
        return res.status(400).json({ error });
    }
}

exports.deleteItem = async (req, res, next) => {
    const { id } = req.params;
    try {
        await deleteItem(id);
        return res.sendStatus(204);
    } catch(error) {
        return res.status(400).json({ error });
    }
}