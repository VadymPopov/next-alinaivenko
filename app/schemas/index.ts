import * as Yup from 'yup';

export const nameRegExp = /^[a-zA-Z]+(([' -][a-zA-Z])?[a-zA-Z]*)/;

export const phoneRegExp =
  /\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}/;

export const emailRegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export const governmentId = /^[-\sA-Za-z0-9]+$/;

const addressRegex = /^[0-9a-zA-Z\s.,-]+\s*$/;

export const validationSchemaClient = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .matches(nameRegExp, 'Please enter a valid name'),
  email: Yup.string()
    .trim()
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

export const validationSchemaSchedule = Yup.object().shape({
  date: Yup.date().required('Date is required'),
  slot: Yup.string().required('Time is required'),
});

export const validationSchemaPaymentForm = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .matches(nameRegExp, 'Please enter a valid name'),
  email: Yup.string()
    .trim()
    .required('Email is required')
    .matches(emailRegExp, 'Please enter a valid email'),
  amount: Yup.number()
    .required('Amount is required')
    .typeError('Amount must be a number')
    .positive('Amount must be greater than zero')
    .transform((value, originalValue) =>
      originalValue === '' ? undefined : value,
    ),
});

export const validationSchemaCustomTip = Yup.object().shape({
  amount: Yup.number()
    .required('Amount is required')
    .typeError('Amount must be a number')
    .positive('Amount must be greater than zero')
    .transform((value, originalValue) =>
      originalValue === '' ? undefined : value,
    ),
});

export const validationSchemaWaiverStepOne = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required('Name is required')
    .matches(nameRegExp, 'Please enter a valid name')
    .min(2, 'Name must be at least 2 characters'),
  email: Yup.string()
    .trim()
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
  governmentId: Yup.string()
    .trim()
    .required('Government ID is required')
    .matches(governmentId, 'Please enter a valid government-issued ID number'),
  dob: Yup.string().trim().required('Birthday date is required'),
  address: Yup.string()
    .trim()
    .required('Address is required')
    .matches(addressRegex, 'Please enter a valid address'),
});

export const validationSchemaWaiverStepTwo = Yup.object().shape({
  bodyPart: Yup.string()
    .trim()
    .required('Body part is required')
    .matches(nameRegExp, 'Please enter a valid body part'),
  design: Yup.string()
    .trim()
    .required('Design is required')
    .matches(nameRegExp, 'Please enter a valid design description'),
  service: Yup.string().required('Service is required'),
  appointmentDate: Yup.string().required('Date is required'),
});

export const validationSchemaWaiverStepThree = Yup.object().shape({
  waveRelease: Yup.boolean().oneOf([true], 'Wave and Release must be accepted'),
});

export const validationSchemaWaiverStepFour = Yup.object().shape({
  pain: Yup.boolean().oneOf([true], 'Pain must be acknowledged'),
  infection: Yup.boolean().oneOf([true], 'Infection must be acknowledged'),
  healing: Yup.boolean().oneOf([true], 'Healing must be acknowledged'),
  outcome: Yup.boolean().oneOf([true], 'Outcome must be acknowledged'),
});

export const validationSchemaWaiverStepFive = Yup.object().shape({
  refund: Yup.boolean().oneOf([true], 'Refund policy must be accepted'),
  permanentChange: Yup.boolean().oneOf(
    [true],
    'Permanent Change must be acknowledged',
  ),
  media: Yup.boolean().oneOf([true], 'Media usage must be accepted'),
  age: Yup.boolean().oneOf([true], 'Age verification must be accepted'),
});

export const validationSchemaWaiverStepSix = Yup.object().shape({
  drugs: Yup.boolean().oneOf([true], 'Drugs condition must be accepted'),
  disease: Yup.boolean().oneOf([true], 'Disease condition must be accepted'),
  medication: Yup.boolean().oneOf(
    [true],
    'Medication condition must be accepted',
  ),
  skin: Yup.boolean().oneOf([true], 'Skin condition must be accepted'),
  recipientOrgan: Yup.boolean().oneOf(
    [true],
    'Recipient Organ condition must be accepted',
  ),
  pregnancy: Yup.boolean().optional(),
});

export const validationSchemaWaiverStepSeven = (isClientUnder18: boolean) => {
  return Yup.object().shape({
    agreement: Yup.boolean().oneOf(
      [true],
      'Acknowledgement of Agreement must be accepted',
    ),
    lot: Yup.string()
      .trim()
      .required('Lot number is required (Ask Tattoo Artist)'),
    clientSignature: Yup.string().when([], {
      is: () => isClientUnder18 === false,
      then: (schema) => schema.required('Please provide a signature'),
      otherwise: (schema) => schema,
    }),
    parentalSignature: Yup.string().when([], {
      is: () => isClientUnder18 === true,
      then: (schema) => schema.required('Please provide a signature'),
      otherwise: (schema) => schema,
    }),
    parentalConsent: Yup.boolean().when([], {
      is: () => isClientUnder18 === true,
      then: (schema) =>
        schema.oneOf(
          [true],
          'Parental/Guardian consent is required for minors.',
        ),
      otherwise: (schema) => schema,
    }),
    parentalName: Yup.string().when([], {
      is: () => isClientUnder18 === true,
      then: (schema) =>
        schema
          .trim()
          .required('Parental/Guardian name is required.')
          .matches(nameRegExp, 'Please enter a valid name')
          .min(3, 'Name must be at least 3 characters'),
      otherwise: (schema) => schema,
    }),
    parentGovernmentId: Yup.string().when([], {
      is: () => isClientUnder18 === true,
      then: (schema) =>
        schema
          .trim()
          .required('Parental/Guardian Government ID is required.')
          .matches(
            governmentId,
            'Please enter a valid government-issued ID number',
          ),
      otherwise: (schema) => schema,
    }),
  });
};

export const validationSchemaAddAppointment = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .matches(nameRegExp, 'Please enter a valid name'),
  email: Yup.string()
    .trim()
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
  description: Yup.string().trim().optional(),
  slot: Yup.string().required('Time is required'),
  service: Yup.string().required('Service is required'),
  date: Yup.date().required('Date is required'),
  duration: Yup.string().required('Duration is required'),
});

export const validationSchemaEditAppointment = Yup.object().shape({
  name: Yup.string()
    .trim()
    .required('Name is required')
    .min(2, 'Name must be at least 2 characters')
    .matches(nameRegExp, 'Please enter a valid name'),
  email: Yup.string()
    .trim()
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
  description: Yup.string().trim().optional(),
  slot: Yup.string().required('Time is required'),
  service: Yup.string().required('Service is required'),
  date: Yup.date().required('Date is required'),
  duration: Yup.string().required('Duration is required'),
  depositAmount: Yup.number().optional(),
  depositTax: Yup.number().optional(),
  depositTotal: Yup.number().optional(),
  depositFee: Yup.number().optional(),
  paymentAmount: Yup.number().optional(),
  paymentTax: Yup.number().optional(),
  paymentTotal: Yup.number().optional(),
  paymentFee: Yup.number().optional(),
});

export const validationSchemaSetMaxBookingDate = Yup.object().shape({
  date: Yup.date().required('Date is required'),
});

export const validationSchemaBlockSlot = Yup.object().shape({
  reason: Yup.string().trim().optional(),
  slot: Yup.string().required('Time is required'),
  date: Yup.date().required('Date is required'),
  duration: Yup.string().required('Duration is required'),
});
