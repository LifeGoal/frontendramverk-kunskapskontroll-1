const SegmentedProgress = ({ value, message }) => {
    const segments = 10;

    const getColor = (value) => {
        if (value <= 20) return "bg-green-500";
        if (value <= 40) return "bg-yellow-400";
        if (value <= 60) return "bg-orange-500";
        if (value <= 80) return "bg-red-500";
        return "bg-purple-600";
    };

    const colorClass = getColor(value);

    return (
        <div className="w-full">
            <p className="text-sm sm:text-md lg:text-lg font-semibold text-white mb-1">{message || `${value}%`}</p>

            <div className="flex gap-1 w-full">
                {Array.from({ length: segments }).map((_, i) => {
                    const segmentStart = i * 10;
                    const segmentEnd = (i + 1) * 10;
                    let fillPercent = 0;

                    if (value >= segmentEnd) fillPercent = 100;
                    else if (value > segmentStart) fillPercent = ((value - segmentStart) / 10) * 100;

                    return (
                        <div key={i} className="flex-1 h-2 sm:h-3 lg:h-4 bg-slate-700 rounded-sm overflow-hidden">
                            <div className={`h-full ${colorClass} transition-all duration-300`} style={{ width: `${fillPercent}%` }}/>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default SegmentedProgress;