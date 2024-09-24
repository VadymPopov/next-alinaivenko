import * as Yup from 'yup';

export const nameRegExp = /^[a-zA-Z]+(([' -][a-zA-Z])?[a-zA-Z]*)/;

export const phoneRegExp =
  /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;

export const emailRegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export const validationSchemaClient = Yup.object().shape({
  name: Yup.string()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .matches(nameRegExp, 'Please enter a valid name'),
  email: Yup.string()
    .required('Email is required')
    .matches(emailRegExp, 'Please enter a valid email'),
  phone: Yup.string()
    .trim()
    .optional()
    .nullable()
    .test(
      'is-valid-phone',
      'Please enter a valid phone number',
      (value) => !value || phoneRegExp.test(value),
    ),
  instagram: Yup.string().trim().optional(),
  images: Yup.mixed<File[]>()
    .test('fileSize', 'You can only upload up to 3 images.', (value) => {
      return value && value.length <= 3;
    })
    .nullable(),
  description: Yup.string().trim().optional(),
});
