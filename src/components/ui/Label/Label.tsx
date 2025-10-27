interface LabelType
{
    text : string;
    htmlFor?: string;

}
export default function Label({text , htmlFor} : LabelType) {
  return (
    <label className=" font-semibold  text-sm mb-3 block" htmlFor={htmlFor}>
      {text}
    </label>
  )
}
