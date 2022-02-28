export const changeBrowserState = (doc, page, variable, value, title) => {
	if (variable.trim() === '') {
		window.history.replaceState('', '', page);
	} else {
		window.history.replaceState('', '', `${page}?${variable}=${value}`);
	}
	doc.title = title;
};

export const getParameterValueFromUrl = (parameter) => {
	const urlParams = new URLSearchParams(window.location.search);
	const value = urlParams.get(parameter);
	if (value === null) {
		return '';
	}
	return String(value);
}