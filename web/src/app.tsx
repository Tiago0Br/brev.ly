export function App() {
	return (
		<main className="mt-20">
			<form className="mx-auto w-[380px] h-[340px] bg-gray-100 rounded-lg p-8 flex flex-col gap-6">
				<h2 className="text-xl text-gray-600 font-bold">Novo link</h2>

				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-2">
						<label htmlFor="originalLink" className="text-xs uppercase text-gray-500">
							Link original
						</label>
						<input
							type="text"
							id="originalLink"
							placeholder="www.exemplo.com.br"
							className="border border-gray-300 rounded-md p-2 placeholder:text-sm"
						/>
					</div>

					<div className="flex flex-col gap-2">
						<label htmlFor="shortLink" className="text-xs uppercase text-gray-500">
							Link encurtado
						</label>
						<input
							type="text"
							id="shortLink"
							placeholder="brev.ly/"
							className="border border-gray-300 rounded-md p-2 placeholder:text-sm"
						/>
					</div>
				</div>

				<button
					type="submit"
					className="w-full bg-blue-base text-white rounded-md p-2 cursor-pointer hover:bg-blue-dark transition-colors"
				>
					Salvar link
				</button>
			</form>
		</main>
	)
}
