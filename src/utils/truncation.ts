const truncation = (value: string = '', prefix = 5, suffix = 4, flag= '***') => {
    const preValue = value.slice(0, prefix);
    const sufValue = value.slice(value.length - 1 - suffix, value.length - 1);
    return `${preValue}${flag}${sufValue}`;
}
export default truncation;