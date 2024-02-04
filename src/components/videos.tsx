interface videoProps{
    data: {
        id: string;
        name: string;
        banner: string
    },

    functionChangeSond: () => void;
}

export default function Videos({data, functionChangeSond}: videoProps) {
    return (
        <a href="#" onClick={functionChangeSond} className="text-white block px-4 py-2 text-sm" role="menuitem" tabIndex={-1} id={data.id}>
            <img src={data.banner} alt={`video de id ${data.id}`} />
            {data.name}
        </a>
    )
}