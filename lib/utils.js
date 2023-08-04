export const currentFormatter = (total) =>{
    const formatter = Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' });
    return formatter.format(total);
};