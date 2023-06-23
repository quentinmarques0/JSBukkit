

export class Help {
    static helps = [];

    static Add(object) {
        const keys = Object.values(object);

        keys.forEach(key => {
            Help.helps.push(key);
        });
    }

    static Get() {
        return (Help.helps);
    }
}