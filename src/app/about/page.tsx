'use client';

import { Button, Step } from '@/components';
import { DEMO_CSV } from '@/lib/constants';
import { downloadFile } from '@/lib/utils';

export default function About() {
  const downloadDemoCsv = () => {
    downloadFile(
      new Blob([DEMO_CSV], { type: 'text/csv' }),
      'demo-transactions.csv'
    );
  };

  return (
    <div className="flex flex-col gap-10">
      <div className="flex flex-col gap-4">
        <h1 className="text-text-accent font-serif text-7xl">
          About S-Bank Reports
        </h1>
        <p className="text-lg">
          S-Bank Reports is a simple tool for generating financial reports from
          your S-Bank transaction data. Whether you&apos;re tracking personal
          finances or managing business expenses, our tool helps you visualize
          your data with ease.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-text-accent font-serif text-5xl">How It Works</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Step
            stepNumber={1}
            title="Export Your Data"
            description="Export your transactions from S-Bank as a CSV file"
          />
          <Step
            stepNumber={2}
            title="Upload CSV"
            description="Upload your CSV file to our platform"
          />
          <Step
            stepNumber={3}
            title="Get Your Report"
            description="Download a beautifully formatted PDF report"
          />
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-text-accent font-serif text-5xl">Try It Out</h2>
        <p className="text-lg">
          Want to test the tool? Download our demo CSV file with sample
          transactions and try generating a report.
        </p>
        <div className="flex">
          <Button onClick={downloadDemoCsv}>Download Demo CSV</Button>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-text-accent font-serif text-5xl">
          Privacy & Security
        </h2>
        <p className="text-lg">
          We take your privacy seriously. Your transaction data is processed
          securely on our server and is never stored permanently. The CSV file
          you upload is processed only for the purpose of generating your
          report, and we don&apos;t keep any of your financial information after
          the report is generated.
        </p>
      </div>
    </div>
  );
}
