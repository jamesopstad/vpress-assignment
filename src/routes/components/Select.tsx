import { Listbox } from '@headlessui/react';
import { SelectorIcon, CheckIcon } from '@heroicons/react/solid';
import { classNames } from '../../utils';

export function Select({
	items,
	selectedItem,
	label,
	onChange
}: {
	items: string[];
	selectedItem: string;
	label: string;
	onChange: (item: string) => void;
}) {
	return (
		<Listbox
			value={selectedItem}
			onChange={onChange}
			as="div"
			className="relative flex flex-col w-30"
		>
			{({ open }) => (
				<>
					<Listbox.Label className="text-sm font-medium">{label}</Listbox.Label>
					<Listbox.Button
						className={classNames(
							'pl-3 pr-1 py-1 flex items-center justify-between rounded-md cursor-default shadow-sm border-2 border-gray-400 outline-none text-md',
							open ? 'bg-gray-100' : 'bg-white'
						)}
					>
						{selectedItem}
						<SelectorIcon aria-hidden="true" className="w-5 h-5" />
					</Listbox.Button>
					<Listbox.Options className="absolute top-full w-full z-10 shadow-lg border border-gray-500 bg-white rounded-md mt-2">
						{items.map((item) => (
							<Listbox.Option
								key={item}
								value={item}
								className={({ active, selected }) =>
									classNames(
										'm-1 rounded-md p-2 text-sm outline-none cursor-default flex items-center justify-between',
										active && 'bg-indigo-600 text-white',
										selected && 'font-bold'
									)
								}
							>
								{({ selected }) => (
									<>
										{item}
										{selected && (
											<CheckIcon aria-hidden="true" className="w-5 h-5" />
										)}
									</>
								)}
							</Listbox.Option>
						))}
					</Listbox.Options>
				</>
			)}
		</Listbox>
	);
}
