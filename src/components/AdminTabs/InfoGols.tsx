interface InfoGolsProps {
  title: string;
  text: string;
}

export default function InfoGols({ title, text }: InfoGolsProps) {
  return (
    <div>
      <h2 className="mb-4 text-[#737373] text-base">{title}</h2>
      <p>{text}</p>
    </div>
  )
}