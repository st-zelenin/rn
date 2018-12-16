export const getDescription = (customAttributes = []) => {
  const description = customAttributes.find(attr => attr.attribute_code === 'description') || {};

  return description.value || 'No description';
};
