interface btnType {
    text: string;
    disabled?: boolean;
}

export default function AuthBtn({text, disabled}: btnType) {
  return (
    <button 
      type="submit"
      disabled={disabled}
      className={`mt-2 w-full mb-4 rounded-xl p-3 text-sm font-medium text-center text-white ${disabled ? 'bg-gray-400' : 'bg-Primary'}`}
    >
      {text}
    </button>
  )
}
