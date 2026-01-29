import Link from "next/link";

export default function TestPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Tech Blog Test</h1>
        <p className="text-muted-foreground mb-8">
          If you see this, the app is working!
        </p>

        <Link
          href="/"
          className="text-primary hover:underline"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
