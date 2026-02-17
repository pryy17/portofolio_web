export default function AgencyLoading() {
    return (
        <div className="fixed inset-0 z-[100] grid place-items-center bg-[#0a0a0a]">
            <div className="flex flex-col items-center gap-4">
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 rounded-full border-4 border-zinc-800" />
                    <div className="absolute inset-0 rounded-full border-4 border-t-orange-500 animate-spin border-r-transparent border-b-transparent border-l-transparent" />
                </div>
                <div className="text-zinc-500 font-mono text-sm tracking-widest animate-pulse">
                    LOADING
                </div>
            </div>
        </div>
    )
}
