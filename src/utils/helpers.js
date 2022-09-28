export const upper = (string) => {
    if (!string) return "";
    return string.substring(0, 1).toUpperCase() + string.substring(1).toLowerCase();

}

export const dateDiff = (string) => {
    const then = new Date(string);
    const now = new Date();
    const diff = (now - then)/1000;
    const times = [
        ["year", 31536000], 
        ["month", 2592000],
        ["week", 604800],
        ["day", 86400],
        ["hour", 3600],
        ["minute", 60],
    ]
    for (let key of times){
        if (diff > key[1]) {
            let amount = Math.round(diff/key[1]);
            let label = key[0];
            if (amount > 1) {
                label += 's'
            }
            return `${amount} ${label} ago`;
        }
    }
}