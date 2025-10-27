import { useTranslation } from './useTranslation';

export const useAuthData = () => {
  const t = useTranslation();
  
  const loginData = [
    {
      title: t.welcomeBack,
      subTitle: t.enterYourInfoToLogin,
      form: [
        {
          label: t.phoneNumber,
          input: 
            {
              id : 'PhoneNumbe',
              type: 'text',
              placeholder: t.phonePlaceholder,
            },
          
        },
        {
          label: t.password,
          input: 
            {
              id : 'Password',
              type: 'password',
              placeholder: t.passwordPlaceholder,
            },
          
        },
      ],
      button: t.signIn,
    },
  ];

  return { loginData };
};