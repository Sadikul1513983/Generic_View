export const getNextId = (data) => {
    const maxId = data.reduce((prev, current) =>
        (prev && prev.id > current.id) ? prev : current, null);

    return maxId ? maxId.id + 1 : 1;
};

