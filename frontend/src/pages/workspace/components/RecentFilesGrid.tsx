import { FileCard } from "./FileCard";


type Props = {
  files: any[];
};

export const RecentFilesGrid = ({ files }: Props) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
    {files.map((file) => (
      <FileCard key={file.id} file={file} />
    ))}
  </div>
);
