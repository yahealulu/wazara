import { FileItem } from "./FileItem";
import { LinkItem } from "./LinkItem";

type SectionProps = {
  title: string;
  links?: {  url: string }[];
  files?: { filename: string; fileUrl: string }[];
};

export default function SectionLinks({ title, links, files }: SectionProps) {
  return (
    <div>
      <h2 className="mb-6 text-lg font-semibold">{title}</h2>
      {links?.map((link, index) => (
        <LinkItem key={index} index={index} url={link.url} />
      ))}
      {files?.map((file, index) => (
        <FileItem  index={index} key={index} filename={file.filename} fileUrl={file.fileUrl} />
      ))}
    </div>
  )
}