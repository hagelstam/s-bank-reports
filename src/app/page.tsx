import Upload from '@/components/Upload';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-text-accent font-serif text-7xl">S-Bank Reports</h1>
      <p className="mb-8 text-xl">Generate reports for S-Bank accounts.</p>
      <Upload />
    </div>
  );
}
