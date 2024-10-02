import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600">
      <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
        <SignIn />
      </div>
    </div>
  );
}
