import Upload from '@/components/Upload';

export default function Home() {
  return (
    <main className="p-8">
      <h1 className="text-text-accent font-serif text-[104px]">
        S-Bank Reports
      </h1>
      <p className="text-[27px]">Generate reports for S-Bank accounts.</p>
      <Upload />
    </main>
  );
}
