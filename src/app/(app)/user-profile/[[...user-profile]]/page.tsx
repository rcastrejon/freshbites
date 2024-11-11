import { UserProfile } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex justify-center">
      <UserProfile path="/user-profile" />
    </div>
  );
}
