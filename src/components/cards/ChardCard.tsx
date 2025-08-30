const ChartCard = ({
  title,
  icon: Icon,
  children,
}: {
  title: string;
  icon: any;
  children: React.ReactNode;
  fullWidth?: boolean;
}) => (
  <div>
    <div className="flex items-center gap-4 pb-4 border-b border-gray-200/50">
      <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl group-hover:from-blue-100 group-hover:to-indigo-100 transition-all duration-300">
        <Icon className="h-6 w-6 text-blue-600 group-hover:text-blue-700 transition-colors duration-300" />
      </div>
      <h3 className="font-bold text-xl text-gray-900 group-hover:text-gray-800 transition-colors duration-300">
        {title}
      </h3>
    </div>
    <>{children}</>
  </div>
);

export default ChartCard;
