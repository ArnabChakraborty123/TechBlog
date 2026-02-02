export function BackgroundEffects() {
  return (
    <>
      {/* Enhanced animated background effects */}
      <div className="fixed inset-0 mesh-gradient pointer-events-none opacity-40" />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] pointer-events-none" />
      
      {/* Animated orbs */}
      <div className="fixed top-1/4 -left-48 w-96 h-96 bg-primary/20 dark:bg-primary/30 rounded-full blur-[128px] animate-pulse pointer-events-none" style={{ animationDuration: '4s' }} />
      <div className="fixed bottom-1/4 -right-48 w-96 h-96 bg-purple-500/20 dark:bg-purple-500/30 rounded-full blur-[128px] animate-pulse pointer-events-none" style={{ animationDuration: '6s', animationDelay: '2s' }} />
    </>
  );
}