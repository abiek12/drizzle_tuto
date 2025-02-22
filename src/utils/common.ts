export const generateUniqueString = (length: number)=> {
    try {
        const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let uniqueStr = "";
        for(let i=0; i<length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            uniqueStr += characters[randomIndex];
        }
        return uniqueStr;
    } catch (error) {
        console.error("Error while generating random string.")
        throw error;
    }
}