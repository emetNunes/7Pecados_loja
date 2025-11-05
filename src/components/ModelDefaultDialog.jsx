const ModelDefaultDialog = ({ title_dialog, info_dialog, children }) => {
  return (
    <div className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur-sm z-100">
      <div className="rounded-xl bg-white p-5 text-center shadow">
        <h2 className="text-xl font-semibold text-[#35383E]">{title_dialog}</h2>
        <p className="mb-4 mt-1 text-sm text-[#9A9C9F]">{info_dialog}</p>
        <div className="flex min-w-[336px] flex-col space-y-4">{children}</div>
      </div>
    </div>
  );
};

export default ModelDefaultDialog;
