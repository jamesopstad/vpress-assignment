export function DisplayError({ error }: { error: string }) {
	return (
		<main className="fixed inset-0 flex justify-center items-center text-2xl">
			<p>
				<span className="font-bold">Error:</span> {error}
			</p>
		</main>
	);
}
