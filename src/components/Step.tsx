interface StepProps {
  stepNumber: number;
  title: string;
  description: string;
}

export const Step = ({ stepNumber, title, description }: StepProps) => {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-gray-200 p-4">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-lg text-green-600">
        {stepNumber}
      </div>
      <h3 className="text-text-primary text-lg font-semibold">{title}</h3>
      <p className="text-md text-gray-600">{description}</p>
    </div>
  );
};
