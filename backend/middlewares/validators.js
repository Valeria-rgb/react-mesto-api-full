const { celebrate, Joi } = require('celebrate');

const signupValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'any.required': 'Обязательное поле',
    }),
    password: Joi.string().required().pattern(/^[A-Za-z0-9]/i).messages({
      'string.min': 'Минимум два символа',
      'string.max': 'Максимум 30 символов',
      'any.required': 'Обязательное поле',
    }),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(/^http[s]?:\/\/\w+/),
  }),
});

const signinValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      'any.required': 'Обязательное поле',
    }),
    password: Joi.string().required().pattern(/^[A-Za-z0-9]/i).messages({
      'string.min': 'Минимум два символа',
      'string.max': 'Максимум 30 символов',
      'any.required': 'Обязательное поле',
    }),
  }),
});

const getUserByIdValidator = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().length(24).hex(),
  }),
});

const updateProfileValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    about: Joi.string().required().min(2).max(30),
  }),
});

const updateAvatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().regex(/^http[s]?:\/\/\w+/),
  }),
});

const postCardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().regex(/^http[s]?:\/\/\w+/),
  }),
});

const deleteCardValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }).unknown(true),
});

const putLikeValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }).unknown(true),
});

const deleteLikeValidator = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().required().length(24).hex(),
  }).unknown(true),
});

module.exports = {
  signupValidator,
  signinValidator,
  getUserByIdValidator,
  updateAvatarValidator,
  updateProfileValidator,
  postCardValidator,
  deleteCardValidator,
  putLikeValidator,
  deleteLikeValidator,
};
