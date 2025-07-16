const Loading = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-6">
      <div className="w-full max-w-xl bg-white/85 rounded-3xl shadow-2xl p-6 sm:p-8 md:p-10 animate-pulse space-y-6">
        <div className="h-3 bg-gray-300 rounded-full w-full"></div>

        <div className="h-6 bg-gray-300 rounded w-3/4 mx-auto"></div>

        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-10 bg-gray-200 rounded-xl w-full"></div>
        ))}

        <div className="h-12 bg-gray-300 rounded-xl w-full"></div>
      </div>
    </div>
  );
};

export default Loading;
