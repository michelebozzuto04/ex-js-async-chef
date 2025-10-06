const fetchJson = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

const getChefBirthday = async (id) => {
    let receipt;
    try {
        receipt = await fetchJson(`https://dummyjson.com/recipes/${id}`);

        if (receipt.message) {
            throw new Error(receipt.message);
        }
    } catch (error) {
        throw new Error(`Non sono riuscito a trovare la ricetta con id ${id}`);
    }

    let chef;
    try {
        chef = await fetchJson(`https://dummyjson.com/users/${receipt.userId}`);

        if (chef.message) {
            throw new Error(chef.message);
        }
        return chef.birthDate;
    } catch (error) {
        throw new Error(`Non sono riuscito a trovare lo chef con id ${receipt.userId}`);
    }
}

getChefBirthday(10)
    .then(birthDate => console.log('Data di nascita dello chef:', birthDate))
    .catch(error => console.log("Errore:", error.message))