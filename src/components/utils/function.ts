export const search = (word: string, item: any, attributes: string[]): string[] | null => {
	const match = attributes.some((attribute) => {
	  if (
		item[attribute] &&
		item[attribute].toLowerCase().includes(word.toLowerCase())
	  ) {
		return true;
	  }
	  return false;
	});
  
	if (match) {
	  const result = attributes
		.map((attribute) => item[attribute] || "")
		.slice(0, 2);
	  return result;
	}
  
	return null;
  };