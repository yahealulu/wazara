import { useState } from "react";
import AuthField from "./AuthField";
import AuthBtn from "../ui/Buttons/AuthBtn";
import { useTranslation } from '../../hooks/useTranslation';
import { useAuthData } from '../../hooks/useAuthData';
import LanguageToggle from "../LanguageToggle/LanguageToggle";
import { useAuth } from "../../contexts/AuthContext";

export default function AuthForm() {
    const t = useTranslation();
    const { loginData } = useAuthData();
    const { login, error, isLoading } = useAuth();
    const [formData, setFormData] = useState({
        PhoneNumbe: "",
        Password: ""
    });
    
    const data = loginData[0];
    
    const handleChange = (id: string, value: string) => {
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await login(formData.PhoneNumbe, formData.Password);
    };
    
  return (
    <>
        <LanguageToggle />
        <h2 className="text-center text-xl font-semibold mb-2">{data.title}</h2>
        <p className="text-center mb-8 text-sm text-[#737373]">{data.subTitle}</p>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        <form className="w-full" onSubmit={handleSubmit}>
            {data.form.map((field, index) => (
                <AuthField 
                    key={index} 
                    label={field.label} 
                    input={field.input}
                    onChange={handleChange}
                    value={formData[field.input.id as keyof typeof formData] || ""}
                />
            ))}
            <AuthBtn text={isLoading ? t.loading : data.button} disabled={isLoading} />
        </form>       
    </>
  )
}
