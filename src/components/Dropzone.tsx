interface DropzoneProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileName: string;
}

export const Dropzone = ({ onChange, fileName }: DropzoneProps) => {
  return (
    <div className="flex w-full max-w-xl items-center justify-center px-4">
      <label
        htmlFor="dropzone-file"
        className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="mb-4 h-8 w-8 text-gray-500"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
          {fileName.length !== 0 ? (
            <p className="text-text-accent text-sm font-semibold">{fileName}</p>
          ) : (
            <>
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500">CSV (MAX 5MB)</p>
            </>
          )}
        </div>
        <input
          id="dropzone-file"
          accept=".csv"
          type="file"
          className="hidden"
          onChange={onChange}
          multiple={false}
        />
      </label>
    </div>
  );
};
