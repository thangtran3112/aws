export default function ProtectedPage({ user, signOut }: any) {
  if (!signOut) {
    return <div>You are not authenticated</div>;
  }
  return (
    <div>
      <h1>Protected Page</h1>
      <button onClick={signOut}>Sign out</button>
    </div>
  );
}
