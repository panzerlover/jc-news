export const upper = (string) => {

    return string.substring(0, 1).toUpperCase() + string.substring(1).toLowerCase();

}

export const dateDiff = (string) => {
    const then = new Date(string);
    const now = new Date();
    const diff = (now - then)/1000;
    const times = [
        ["years", 31536000], 
        ["months", 2592000],
        ["weeks", 604800],
        ["days", 86400],
        ["hours", 3600],
        ["minutes", 60],
    ]
    for (let key of times){
        if (diff > key[1]) {
            return `${Math.floor(diff/key[1])} ${key[0]} ago`;
        }
    }
}