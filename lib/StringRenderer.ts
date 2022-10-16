

export const StringRenderer = (template: string, values: { [ke: string]: string }) => {
    const replaceValue = template.replace(
        /\{\{(.+?)\}\}/g,
        (matching, value) => {
            const v = values[value.trim()];
            // values[value.trim()] || value.trim()
            const placeValue = v || v =='0' ? v : value.trim()
            // console.log(value, values[value.trim()], placeValue)
            return placeValue
        }
    );
    
    return replaceValue;
}