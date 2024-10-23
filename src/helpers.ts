export const toCurrency = (number: number | string, locale = 'en-US', currency = 'USD') => {
    const amount = parseFloat(number as string);
    if (isNaN(amount)) return 'Invalid number';

    return new Intl.NumberFormat(locale, {
        style: 'currency',
        currency: currency,
    }).format(amount);
};

export const orderStatus = (abr: string) => {
    switch (abr) {
        case 'PE':
            return {
                value: "pending",
                color: 'primary'
            };
        case 'CO':
            return {
                value: "confirmed",
                color: 'green'
            };
        case 'CN':
            return {
                value: "canceled",
                color: 'red'
            };
        default:
            return "";
    }
};
