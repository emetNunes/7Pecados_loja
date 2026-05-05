export default function ProductSkeleton() {
  return (
    <div className=" space-y-6 animate-pulse">
      <section>
        <div className="grid grid-cols-3 gap-5">
          <div className="col-span-2">
            <div className="h-[52px] w-full rounded-2xl bg-zinc-300 dark:bg-zinc-700" />
          </div>

          <div className="flex items-center gap-3 bg-base rounded-2xl p-2 w-full max-w-[200px]">
            <div className="w-[44px] h-[44px] rounded-2xl bg-zinc-300 dark:bg-zinc-700" />
            <div className="flex flex-col gap-2">
              <div className="h-4 w-24 bg-zinc-300 dark:bg-zinc-700 rounded" />
              <div className="h-3 w-16 bg-zinc-200 dark:bg-zinc-600 rounded" />
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="
              flex flex-col
              rounded-3xl
              border border-default-400/60
              bg-base p-4
              dark:border-zinc-700
              dark:bg-zinc-900
              shadow-sm
            "
          >
            <div className="h-[200px] rounded-2xl bg-zinc-300 dark:bg-zinc-700" />

            <div className="flex flex-col gap-5 py-4">
              <div className="flex flex-col gap-2">
                <div className="h-5 w-3/4 bg-zinc-300 dark:bg-zinc-700 rounded" />
                <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-600 rounded" />
                <div className="h-4 w-2/3 bg-zinc-200 dark:bg-zinc-600 rounded" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
