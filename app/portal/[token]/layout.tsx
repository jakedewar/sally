export default function PortalLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-black w-full">
            {children}
        </div>
    )
} 