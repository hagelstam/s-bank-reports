import Upload from '@/components/Upload';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="text-text-accent mb-4 font-serif text-7xl">
        S-Bank Reports
      </h1>
      <p className="text-xl">Generate reports for S-Bank accounts.</p>
      <Upload />
    </div>
  );
}
