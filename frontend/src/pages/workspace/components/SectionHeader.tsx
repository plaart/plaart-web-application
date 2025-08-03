type Props = {
  title: string;
  actionText?: string;
};

const SectionHeader = ({ title, actionText}: Props) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-lg font-medium text-gray-900">{title}</h2>
      {actionText && (
        <button className="text-sm text-blue-600 hover:text-blue-700">
          {actionText}
        </button>
      )}
    </div>
  );
};

export default SectionHeader;
