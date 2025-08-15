interface SectionHeaderProps {
  title: string;
  actionText?: string;
  onAction?: () => void;
  count?: number;
}

const SectionHeader = ({ title, actionText, onAction, count }: SectionHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center space-x-2">
        <h2 className="text-lg font-medium text-gray-900">{title}</h2>
        {count !== undefined && (
          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
            {count}
          </span>
        )}
      </div>
      {actionText && onAction && (
        <button
          onClick={onAction}
          className="text-blue-600 hover:text-blue-700 text-sm font-medium"
        >
          {actionText}
        </button>
      )}
    </div>
  );
};

export default SectionHeader;
