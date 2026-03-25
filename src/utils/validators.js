export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) return 'Email është i detyrueshëm!';
  if (!regex.test(email)) return 'Email nuk është i vlefshëm!';
  return '';
};

export const validatePhone = (phone) => {
  const regex = /^[0-9]{10}$/;
  if (!phone) return 'Telefoni është i detyrueshëm!';
  if (!regex.test(phone)) return 'Telefoni duhet të ketë 10 shifra!';
  return '';
};

export const validateNationalId = (id) => {
  if (!id) return 'Numri personal është i detyrueshëm!';
  if (id.length < 10) return 'Numri personal duhet të ketë të paktën 10 karaktere!';
  return '';
};

export const validateFullName = (name) => {
  if (!name) return 'Emri është i detyrueshëm!';
  if (name.length < 3) return 'Emri duhet të ketë të paktën 3 karaktere!';
  return '';
};

export const validateTitle = (title) => {
  if (!title) return 'Titulli është i detyrueshëm!';
  if (title.length < 5) return 'Titulli duhet të ketë të paktën 5 karaktere!';
  return '';
};

export const validateDescription = (desc) => {
  if (!desc) return 'Përshkrimi është i detyrueshëm!';
  if (desc.length < 10) return 'Përshkrimi duhet të ketë të paktën 10 karaktere!';
  return '';
};