export const debounce = (callback: (evt: any) => void, delay: number) => {
    let timer: NodeJS.Timeout;
    return (evt: any) => {
        clearTimeout(timer);
        timer = setTimeout(() => {
            callback(evt);
        }, delay);
    };
};
